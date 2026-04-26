export const runtime = "nodejs";

import Stripe from "stripe";
import { signPayload } from "@/app/lib/portal-token";

const NINETY_DAYS = 90 * 24 * 3600;

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("Missing STRIPE_SECRET_KEY");
  return new Stripe(key);
}

export async function POST(req: Request) {
  try {
    const { session_id } = (await req.json()) as { session_id?: string };

    if (!session_id?.startsWith("cs_")) {
      return Response.json({ valid: false }, { status: 400 });
    }

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(session_id);

    const paid =
      session.payment_status === "paid" ||
      session.payment_status === "no_payment_required";

    if (!paid) {
      return Response.json({ valid: false }, { status: 402 });
    }

    const token = signPayload({
      sessionId: session_id,
      exp: Date.now() + NINETY_DAYS * 1000,
    });

    return new Response(JSON.stringify({ valid: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": `zowar_auth=${token}; HttpOnly; Path=/; SameSite=Strict; Max-Age=${NINETY_DAYS}`,
      },
    });
  } catch (err: any) {
    console.error("[portal/verify]", err);
    return Response.json({ valid: false }, { status: 500 });
  }
}
