export const runtime = "nodejs";

import { NextRequest } from "next/server";
import { verifyPayload, signPayload } from "@/app/lib/portal-token";

type Auth = { sessionId: string; exp: number };
type Progress = { w1: boolean; w2: boolean; w3: boolean; w4: boolean; w5: boolean; w6: boolean; w7: boolean };

const NINETY_DAYS = 90 * 24 * 3600;
const EMPTY: Progress = { w1: false, w2: false, w3: false, w4: false, w5: false, w6: false, w7: false };

function getAuth(req: NextRequest): Auth | null {
  const token = req.cookies.get("zowar_auth")?.value;
  if (!token) return null;
  const payload = verifyPayload<Auth>(token);
  if (!payload) return null;
  if (payload.exp && payload.exp < Date.now()) return null;
  return payload;
}

function getProgress(req: NextRequest): Progress {
  const token = req.cookies.get("zowar_weibdeh_progress")?.value;
  if (!token) return { ...EMPTY };
  return verifyPayload<Progress>(token) ?? { ...EMPTY };
}

function progressCookie(p: Progress): string {
  const token = signPayload(p);
  return `zowar_weibdeh_progress=${token}; HttpOnly; Path=/; SameSite=Strict; Max-Age=${NINETY_DAYS}`;
}

export async function GET(req: NextRequest) {
  if (!getAuth(req)) return Response.json({ error: "Unauthorized" }, { status: 401 });
  return Response.json(getProgress(req));
}

export async function POST(req: NextRequest) {
  if (!getAuth(req)) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const body = (await req.json()) as Partial<Progress>;
  const current = getProgress(req);

  const next: Progress = {
    w1: current.w1 || body.w1 === true,
    w2: current.w2 || body.w2 === true,
    w3: current.w3 || body.w3 === true,
    w4: current.w4 || body.w4 === true,
    w5: current.w5 || body.w5 === true,
    w6: current.w6 || body.w6 === true,
    w7: current.w7 || body.w7 === true,
  };

  return new Response(JSON.stringify(next), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": progressCookie(next),
    },
  });
}
