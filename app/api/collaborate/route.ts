import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

type Locale = "en" | "ar";

function safeLocale(x: unknown): Locale {
  return x === "ar" ? "ar" : "en";
}

export async function POST(req: Request) {
  try {
  const key = process.env.RESEND_API_KEY;

if (!key) {
  return NextResponse.json(
    {
      error: "Missing RESEND_API_KEY in environment.",
      debug: {
        cwd: process.cwd(),
        hasEnvLocalLikeVars: {
          hasStripe: Boolean(process.env.STRIPE_SECRET_KEY),
          hasFreeCode: Boolean(process.env.FREE_BOOKING_CODE),
          hasResend: Boolean(process.env.RESEND_API_KEY),
        },
        resendLen: process.env.RESEND_API_KEY?.length ?? 0,
      },
    },
    { status: 500 }
  );
}
  
    const body = (await req.json()) as {
      locale?: Locale;
      business?: string;
      contact?: string;
      email?: string;
      phone?: string;
      area?: string;
      type?: string;
      message?: string;
    };

    const locale = safeLocale(body.locale);

    const business = (body.business || "").trim();
    const contact = (body.contact || "").trim();
    const email = (body.email || "").trim();
    const phone = (body.phone || "").trim();
    const area = (body.area || "").trim();
    const type = (body.type || "").trim();
    const message = (body.message || "").trim();

    if (!business || !contact || !email) {
      return NextResponse.json(
        {
          error:
            locale === "ar"
              ? "الحقول المطلوبة ناقصة (اسم المحل، الاسم، الإيميل)."
              : "Missing required fields (business, contact, email).",
        },
        { status: 400 }
      );
    }

    const resend = new Resend(key);

    // ✅ IMPORTANT:
    // - "from" must be a verified sender in Resend.
    // - For dev, onboarding@resend.dev works.
    const from = "Zowar <onboarding@resend.dev>";

    // ✅ your destination inbox (this can be Gmail)
    const to = "zowartravelers@gmail.com";

    const subject = `Zowar Partner Inquiry — ${business}`;

    const text = [
      `Business: ${business}`,
      `Contact: ${contact}`,
      `Email: ${email}`,
      `Phone/WhatsApp: ${phone || "-"}`,
      `Area: ${area || "-"}`,
      `Type: ${type || "-"}`,
      "",
      "Message:",
      message || "-",
    ].join("\n");

    const { error } = await resend.emails.send({
      from,
      to,
      subject,
      text,
      replyTo: email, // ✅ makes replying easy
    });

    if (error) {
      return NextResponse.json(
        { error: error.message || "Resend failed." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || "Unexpected server error." },
      { status: 500 }
    );
  }
}
