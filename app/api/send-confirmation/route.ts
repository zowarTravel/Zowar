import Stripe from "stripe";
import { Resend } from "resend";

export const runtime = "nodejs";
export const maxDuration = 30;

let _stripe: Stripe | null = null;
function getStripe(): Stripe {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) throw new Error("Missing STRIPE_SECRET_KEY");
    _stripe = new Stripe(key);
  }
  return _stripe;
}

export async function POST(req: Request) {
  try {
    const { session_id, locale = "en", experience = "rainbow" } =
      (await req.json()) as {
        session_id?: string;
        locale?: string;
        experience?: string;
      };

    if (!session_id?.startsWith("cs_")) {
      return Response.json({ error: "Invalid session_id" }, { status: 400 });
    }

    const resendKey = process.env.RESEND_API_KEY;
    if (!resendKey) {
      return Response.json({ error: "Missing RESEND_API_KEY" }, { status: 500 });
    }

    // Get customer email from Stripe
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(session_id);

    const email = session.customer_details?.email;
    if (!email) {
      return Response.json({ error: "No email on Stripe session" }, { status: 400 });
    }

    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL || "https://zowar.net";

    const portalPath = experience === "weibdeh" ? "/portal/weibdeh" : "/portal";
    const magicLink = `${siteUrl}${portalPath}?session_id=${session_id}&lang=${locale}`;

    const experienceName =
      locale === "ar"
        ? experience === "weibdeh" ? "تجربة الويبدة" : "تجربة شارع الرينبو"
        : experience === "weibdeh" ? "Al Weibdeh Experience" : "Rainbow Street Experience";

    const resend = new Resend(resendKey);

    const { error } = await resend.emails.send({
      from: "Zowar <onboarding@resend.dev>",
      to: email,
      subject:
        locale === "ar"
          ? "تأكيد حجزك مع زُوّار 🎉"
          : "Your Zowar Booking is Confirmed 🎉",
      html: buildEmail({ email, magicLink, experienceName, locale }),
    });

    if (error) {
      console.error("[send-confirmation] Resend error:", error);
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ ok: true });
  } catch (err: unknown) {
    const e = err as { message?: string };
    console.error("[send-confirmation]", err);
    return Response.json({ error: e?.message || "Failed" }, { status: 500 });
  }
}

function buildEmail({
  magicLink,
  experienceName,
  locale,
}: {
  email: string;
  magicLink: string;
  experienceName: string;
  locale: string;
}) {
  const isAr = locale === "ar";
  const dir = isAr ? "rtl" : "ltr";

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
          <p style="margin:0 0 28px;color:#444;font-size:15px;line-height:1.6">استخدم الرابط أدناه للدخول إلى البوابة في أي وقت — يمكنك إعادة استخدامه إذا أغلقت المتصفح.</p>
          <table cellpadding="0" cellspacing="0" width="100%"><tr><td align="center">
            <a href="${magicLink}" style="display:inline-block;background:#C8694A;color:#fff;text-decoration:none;padding:16px 32px;border-radius:14px;font-weight:700;font-size:16px">ادخل إلى البوابة</a>
          </td></tr></table>
          <p style="margin:28px 0 0;color:#888;font-size:12px;word-break:break-all">أو انسخ هذا الرابط: ${magicLink}</p>
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
          <p style="margin:0 0 28px;color:#444;font-size:15px;line-height:1.6">Use the link below to enter your portal any time — including if you close your browser or switch devices.</p>
          <table cellpadding="0" cellspacing="0" width="100%"><tr><td align="center">
            <a href="${magicLink}" style="display:inline-block;background:#C8694A;color:#fff;text-decoration:none;padding:16px 32px;border-radius:14px;font-weight:700;font-size:16px">Enter the Portal</a>
          </td></tr></table>
          <p style="margin:28px 0 0;color:#888;font-size:12px;word-break:break-all">Or copy this link: ${magicLink}</p>
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
