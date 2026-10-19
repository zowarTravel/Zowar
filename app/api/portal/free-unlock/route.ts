export const runtime = "nodejs";

import { signPayload } from "@/app/lib/portal-token";

const NINETY_DAYS = 90 * 24 * 3600;

// Add more codes here as needed, lowercase (BESTOFAMMANFREE retired)
const FREE_CODES = new Set<string>(["z0war"]);

export async function POST(req: Request) {
  try {
    const { code } = (await req.json()) as { code?: string };
    const raw = (code ?? "").trim().toLowerCase();

    if (!FREE_CODES.has(raw)) {
      return Response.json({ error: "Invalid code" }, { status: 400 });
    }

    // No `experience` on the token: free codes unlock every portal (Full + Highlights)
    const token = signPayload({
      sessionId: `free:${Date.now()}`,
      exp: Date.now() + NINETY_DAYS * 1000,
    });

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": `zowar_auth=${token}; HttpOnly; Path=/; SameSite=Strict; Max-Age=${NINETY_DAYS}`,
      },
    });
  } catch (err: unknown) {
    const e = err as { message?: string };
    console.error("[free-unlock]", err);
    return Response.json({ error: e?.message || "Failed" }, { status: 500 });
  }
}
