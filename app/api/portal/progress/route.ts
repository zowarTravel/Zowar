export const runtime = "nodejs";

import { NextRequest } from "next/server";
import { verifyPayload, signPayload } from "@/app/lib/portal-token";

type Auth = { sessionId: string; exp: number };
type Progress = { r1: boolean; r2: boolean; r3: boolean; r4: boolean; r5: boolean; r6: boolean };

const NINETY_DAYS = 90 * 24 * 3600;
const EMPTY: Progress = { r1: false, r2: false, r3: false, r4: false, r5: false, r6: false };

function getAuth(req: NextRequest): Auth | null {
  const token = req.cookies.get("zowar_auth")?.value;
  if (!token) return null;
  const payload = verifyPayload<Auth>(token);
  if (!payload) return null;
  if (payload.exp && payload.exp < Date.now()) return null;
  return payload;
}

function getProgress(req: NextRequest): Progress {
  const token = req.cookies.get("zowar_progress")?.value;
  if (!token) return { ...EMPTY };
  return verifyPayload<Progress>(token) ?? { ...EMPTY };
}

function progressCookie(p: Progress): string {
  const token = signPayload(p);
  return `zowar_progress=${token}; HttpOnly; Path=/; SameSite=Strict; Max-Age=${NINETY_DAYS}`;
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
    r1: current.r1 || body.r1 === true,
    r2: current.r2 || body.r2 === true,
    r3: current.r3 || body.r3 === true,
    r4: current.r4 || body.r4 === true,
    r5: current.r5 || body.r5 === true,
    r6: current.r6 || body.r6 === true,
  };

  return new Response(JSON.stringify(next), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": progressCookie(next),
    },
  });
}
