export const runtime = "nodejs";

import { signPayload } from "@/app/lib/portal-token";

const NINETY_DAYS = 90 * 24 * 3600;

// NOTE: This endpoint trusts any session_id that looks like a Stripe session (cs_...).
// When you switch to live Stripe keys, replace this with a real Stripe API verification.
export async function POST(req: Request) {
  try {
    const { session_id } = (await req.json()) as { session_id?: string };

    if (!session_id?.startsWith("cs_")) {
      return Response.json({ valid: false }, { status: 400 });
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
