import type Stripe from "stripe";
import { Resend } from "resend";
import { EXPERIENCE_NAME, normalizeExperience, portalPathFor } from "@/app/lib/experiences";

const FROM = "Zowar <hello@zowar.net>";
const OWNER_EMAIL = "zowartravelers@gmail.com";

/*
 * Sends the customer confirmation and the owner alert for a completed checkout.
 * Called by the Stripe webhook and, as a backup, by the success page. Everything
 * comes from the session so both callers build identical emails, which lets
 * Resend's idempotency keys drop the second send (keys last 24 hours).
 */
export async function sendBookingEmails(session: Stripe.Checkout.Session): Promise<void> {
  if (session.payment_status === "unpaid") return;

  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) throw new Error("Missing RESEND_API_KEY");
  const resend = new Resend(resendKey);

  const meta = session.metadata ?? {};
  const locale = meta.lang ?? "en";
  const email = session.customer_details?.email;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://zowar.net";

  const bookedExperience = normalizeExperience(meta.experience);
  const magicLink = `${siteUrl}${portalPathFor(bookedExperience)}?session_id=${session.id}&lang=${locale}`;
  const experienceName = EXPERIENCE_NAME[bookedExperience][locale === "ar" ? "ar" : "en"];

  const subject =
    bookedExperience === "highlights"
      ? locale === "ar"
        ? "تأكيد حجزك لجولة أبرز محطات شارع الرينبو 🎉"
        : "Your Zowar Rainbow Street Highlights Booking is Confirmed 🎉"
      : locale === "ar"
      ? "تأكيد حجزك مع زُوّار 🎉"
      : "Your Zowar Booking is Confirmed 🎉";

  const sendOnce = async (
    idempotencyKey: string,
    payload: Parameters<Resend["emails"]["send"]>[0]
  ) => {
    const { error } = await resend.emails.send(payload, { idempotencyKey });
    // The webhook and success page often arrive together; the loser can stand down
    if (error && error.name !== "concurrent_idempotent_requests") {
      throw new Error(error.message);
    }
  };

  const details = bookingDetails(meta, locale);
  const owner = ownerAlert(session, EXPERIENCE_NAME[bookedExperience].en);

  await Promise.all([
    email
      ? sendOnce(`booking-confirmation/${session.id}`, {
          from: FROM,
          to: email,
          subject,
          html: buildEmail({ email, magicLink, experienceName, locale, details }),
        })
      : Promise.resolve(),
    sendOnce(`booking-alert/${session.id}`, {
      from: FROM,
      to: OWNER_EMAIL,
      ...(email ? { replyTo: email } : {}),
      subject: owner.subject,
      html: owner.html,
    }),
  ]);
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function ownerAlert(session: Stripe.Checkout.Session, experienceName: string) {
  const meta = session.metadata ?? {};
  const schedule = bookingDetails(meta, "en");
  const date = schedule.find((r) => r.label === "Date")?.value;

  const rows: DetailRow[] = [
    { label: "Customer", value: escapeHtml(session.customer_details?.name ?? "Unknown") },
    { label: "Email", value: escapeHtml(session.customer_details?.email ?? "Not provided") },
    { label: "Experience", value: escapeHtml(experienceName) },
    ...schedule,
    { label: "Promo code", value: escapeHtml(meta.promo_code || "None") },
  ];

  return {
    subject: `New booking: ${experienceName}${date ? ` on ${date}` : ""}`,
    html: `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:24px 16px;background:#f5f4f0;font-family:sans-serif">
  <table width="100%" style="max-width:520px;margin:0 auto;background:#fff;border-radius:16px;padding:24px">
    <tr><td>
      <p style="margin:0;color:#C8694A;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:2px">New booking</p>
      ${detailsTable(rows, false)}
    </td></tr>
  </table>
</body>
</html>`,
  };
}

type DetailRow = { label: string; value: string };

/* Date, start time and guests from the checkout metadata — rows with no value are skipped */
function bookingDetails(meta: Record<string, string>, locale: string): DetailRow[] {
  const isAr = locale === "ar";
  const loc = isAr ? "ar-JO" : "en-GB";
  const rows: DetailRow[] = [];

  if (/^\d{4}-\d{2}-\d{2}$/.test(meta.date ?? "")) {
    rows.push({
      label: isAr ? "التاريخ" : "Date",
      value: new Date(`${meta.date}T00:00:00Z`).toLocaleDateString(loc, {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "UTC",
      }),
    });
  }

  if (/^\d{2}:\d{2}$/.test(meta.timeSlot ?? "")) {
    rows.push({
      label: isAr ? "وقت البداية" : "Start time",
      value: new Date(`1970-01-01T${meta.timeSlot}:00Z`).toLocaleTimeString(isAr ? "ar-JO" : "en-US", {
        hour: "numeric",
        minute: "2-digit",
        timeZone: "UTC",
      }),
    });
  }

  const qty = parseInt(meta.qty ?? "", 10);
  if (qty > 0) {
    rows.push({
      label: isAr ? "عدد الأشخاص" : "Guests",
      value: isAr ? qty.toLocaleString("ar-JO") : String(qty),
    });
  }

  return rows;
}

function detailsTable(rows: DetailRow[], isAr: boolean): string {
  if (!rows.length) return "";
  const align = isAr ? "right" : "left";
  const cells = rows
    .map(
      (r) =>
        `<tr><td style="padding:6px 0;color:#888;font-size:14px;text-align:${align};width:40%">${r.label}</td><td style="padding:6px 0;color:#111;font-size:14px;font-weight:600;text-align:${align}">${r.value}</td></tr>`
    )
    .join("");
  return `<table cellpadding="0" cellspacing="0" width="100%" style="margin:16px 0 20px;background:#faf8f4;border-radius:14px;padding:12px 16px">${cells}</table>`;
}

function buildEmail({
  magicLink,
  experienceName,
  locale,
  details,
}: {
  email: string;
  magicLink: string;
  experienceName: string;
  locale: string;
  details: DetailRow[];
}) {
  const isAr = locale === "ar";
  const dir = isAr ? "rtl" : "ltr";
  const detailsHtml = detailsTable(details, isAr);

  if (isAr) {
    return `
<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f4f0;font-family:sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 16px">
    <tr><td align="center">
      <table width="100%" style="max-width:520px;background:#fff;border-radius:24px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08)">
        <tr><td style="background:#C8694A;padding:32px;text-align:center">
          <p style="margin:0;color:#fff;font-size:28px;font-weight:700;letter-spacing:2px">زُوّار</p>
        </td></tr>
        <tr><td style="padding:36px 32px;direction:rtl;text-align:right">
          <p style="margin:0 0 8px;color:#C8694A;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:2px">تم تأكيد الحجز</p>
          <h1 style="margin:0 0 16px;font-size:24px;color:#111;font-weight:700">بوابتك مفتوحة! 🎉</h1>
          <p style="margin:0 0 8px;color:#444;font-size:15px;line-height:1.6">شكراً لحجزك <strong>${experienceName}</strong>.</p>
          ${detailsHtml}
          <p style="margin:0 0 28px;color:#444;font-size:15px;line-height:1.6">استخدم الرابط أدناه للدخول إلى البوابة في أي وقت — يمكنك إعادة استخدامه إذا أغلقت المتصفح.</p>
          <table cellpadding="0" cellspacing="0" width="100%"><tr><td align="center">
            <a href="${magicLink}" style="display:inline-block;background:#C8694A;color:#fff;text-decoration:none;padding:16px 32px;border-radius:14px;font-weight:700;font-size:16px">ادخل إلى البوابة</a>
          </td></tr></table>
          <p style="margin:28px 0 0;color:#888;font-size:12px;word-break:break-all">أو انسخ هذا الرابط: ${magicLink}</p>
        </td></tr>
        <tr><td style="padding:28px 32px;border-top:1px solid #f0ede8;direction:rtl;text-align:right">
          <p style="margin:0 0 8px;color:#111;font-size:15px;font-weight:700">قبل يوم مغامرتك</p>
          <p style="margin:0;color:#444;font-size:15px;line-height:1.6">افتح بوابتك و<strong>حلّ اللغز الأول</strong> — سيكشف لك بالضبط أين تبدأ عند وصولك. <strong>احتفظ ببقية الألغاز لليوم الكبير!</strong></p>
        </td></tr>
        <tr><td style="padding:0 32px 28px;direction:rtl;text-align:right">
          <p style="margin:0 0 12px;color:#111;font-size:15px;font-weight:700">ماذا تحضر معك</p>
          <table cellpadding="0" cellspacing="0">
            <tr><td style="padding:4px 0;color:#444;font-size:15px;line-height:1.6">&#10003;&nbsp;&nbsp;اتصال إنترنت موثوق</td></tr>
            <tr><td style="padding:4px 0;color:#444;font-size:15px;line-height:1.6">&#10003;&nbsp;&nbsp;حذاء مريح للمشي</td></tr>
            <tr><td style="padding:4px 0;color:#444;font-size:15px;line-height:1.6">&#10003;&nbsp;&nbsp;روح مغامِرة</td></tr>
          </table>
        </td></tr>
        <tr><td style="padding:20px 32px;border-top:1px solid #f0ede8;text-align:center">
          <p style="margin:0;color:#aaa;font-size:12px">© زُوّار عمّان</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
  }

  return `
<!DOCTYPE html>
<html dir="${dir}" lang="${locale}">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f4f0;font-family:sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 16px">
    <tr><td align="center">
      <table width="100%" style="max-width:520px;background:#fff;border-radius:24px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08)">
        <tr><td style="background:#C8694A;padding:32px;text-align:center">
          <p style="margin:0;color:#fff;font-size:28px;font-weight:700;letter-spacing:2px">ZOWAR</p>
        </td></tr>
        <tr><td style="padding:36px 32px">
          <p style="margin:0 0 8px;color:#C8694A;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:2px">Booking Confirmed</p>
          <h1 style="margin:0 0 16px;font-size:24px;color:#111;font-weight:700">Your portal is unlocked 🎉</h1>
          <p style="margin:0 0 8px;color:#444;font-size:15px;line-height:1.6">Thanks for booking the <strong>${experienceName}</strong>.</p>
          ${detailsHtml}
          <p style="margin:0 0 28px;color:#444;font-size:15px;line-height:1.6">Use the link below to enter your portal any time — including if you close your browser or switch devices.</p>
          <table cellpadding="0" cellspacing="0" width="100%"><tr><td align="center">
            <a href="${magicLink}" style="display:inline-block;background:#C8694A;color:#fff;text-decoration:none;padding:16px 32px;border-radius:14px;font-weight:700;font-size:16px">Enter the Portal</a>
          </td></tr></table>
          <p style="margin:28px 0 0;color:#888;font-size:12px;word-break:break-all">Or copy this link: ${magicLink}</p>
        </td></tr>
        <tr><td style="padding:28px 32px;border-top:1px solid #f0ede8">
          <p style="margin:0 0 8px;color:#111;font-size:15px;font-weight:700">Before your adventure begins</p>
          <p style="margin:0;color:#444;font-size:15px;line-height:1.6">Open your portal and <strong>solve the first puzzle</strong> — it reveals exactly where to head when you arrive. <strong>Save the rest for the day itself!</strong></p>
        </td></tr>
        <tr><td style="padding:0 32px 28px">
          <p style="margin:0 0 12px;color:#111;font-size:15px;font-weight:700">What to bring</p>
          <table cellpadding="0" cellspacing="0">
            <tr><td style="padding:4px 0;color:#444;font-size:15px;line-height:1.6">&#10003;&nbsp;&nbsp;A reliable internet connection</td></tr>
            <tr><td style="padding:4px 0;color:#444;font-size:15px;line-height:1.6">&#10003;&nbsp;&nbsp;Comfortable shoes</td></tr>
            <tr><td style="padding:4px 0;color:#444;font-size:15px;line-height:1.6">&#10003;&nbsp;&nbsp;An adventurous spirit</td></tr>
          </table>
        </td></tr>
        <tr><td style="padding:20px 32px;border-top:1px solid #f0ede8;text-align:center">
          <p style="margin:0;color:#aaa;font-size:12px">© Zowar Amman</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
