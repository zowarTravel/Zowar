import { getStripe } from "@/app/lib/stripe";
import { sendBookingEmails } from "@/app/lib/booking-emails";

export const runtime = "nodejs";
export const maxDuration = 30;

// Backup for the Stripe webhook; sendBookingEmails drops the duplicate
export async function POST(req: Request) {
  try {
    const { session_id } = (await req.json()) as { session_id?: string };

    if (!session_id?.startsWith("cs_")) {
      return Response.json({ error: "Invalid session_id" }, { status: 400 });
    }

    const session = await getStripe().checkout.sessions.retrieve(session_id);
    await sendBookingEmails(session);

    return Response.json({ ok: true });
  } catch (err: unknown) {
    const e = err as { message?: string };
    console.error("[send-confirmation]", err);
    return Response.json({ error: e?.message || "Failed" }, { status: 500 });
  }
}
