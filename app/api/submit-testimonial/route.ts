import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const key = process.env.RESEND_API_KEY;
    if (!key) {
      return NextResponse.json({ error: "Missing RESEND_API_KEY." }, { status: 500 });
    }

    const body = (await req.json()) as {
      name?: string;
      travelerType?: string;
      month?: string;
      location?: string;
      text?: string;
      email?: string;
      locale?: string;
    };

    const name = (body.name || "").trim();
    const text = (body.text || "").trim();

    if (!name || !text) {
      return NextResponse.json({ error: "Name and review text are required." }, { status: 400 });
    }

    const resend = new Resend(key);

    const lines = [
      `Name: ${name}`,
      `Traveler type: ${body.travelerType || "-"}`,
      `Month: ${body.month || "-"}`,
      `Location: ${body.location || "-"}`,
      `Email (for follow-up): ${body.email || "-"}`,
      `Locale: ${body.locale || "-"}`,
      "",
      "Review:",
      text,
    ];

    const { error } = await resend.emails.send({
      from: "Zowar <onboarding@resend.dev>",
      to: "zowartravelers@gmail.com",
      subject: `New Zowar Review — ${name}`,
      text: lines.join("\n"),
      replyTo: body.email || undefined,
    });

    if (error) {
      return NextResponse.json({ error: error.message || "Resend failed." }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Unexpected error.";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
