export const runtime = "nodejs";

import { NextRequest } from "next/server";
import { verifyPayload, signPayload } from "@/app/lib/portal-token";
import { canAccessPortal } from "@/app/lib/experiences";

type Auth = { sessionId: string; exp: number; experience?: string };
type Progress = { r2: boolean; r4: boolean; r5: boolean };

const NINETY_DAYS = 90 * 24 * 3600;
const EMPTY: Progress = { r2: false, r4: false, r5: false };

function getAuth(req: NextRequest): Auth | null {
  const token = req.cookies.get("zowar_auth")?.value;
  if (!token) return null;
  const payload = verifyPayload<Auth>(token);
  if (!payload) return null;
  if (payload.exp && payload.exp < Date.now()) return null;
  return payload;
}

function getProgress(req: NextRequest): Progress {
  const token = req.cookies.get("zowar_highlights_progress")?.value;
  if (!token) return { ...EMPTY };
  return verifyPayload<Progress>(token) ?? { ...EMPTY };
}

function progressCookie(p: Progress): string {
  const token = signPayload(p);
  return `zowar_highlights_progress=${token}; HttpOnly; Path=/; SameSite=Strict; Max-Age=${NINETY_DAYS}`;
}

function authorize(req: NextRequest): Response | null {
  const auth = getAuth(req);
  if (!auth) return Response.json({ error: "Unauthorized" }, { status: 401 });
  if (!canAccessPortal(auth.experience, "highlights")) {
    return Response.json({ error: "Wrong experience" }, { status: 403 });
  }
  return null;
}

export async function GET(req: NextRequest) {
  const denied = authorize(req);
  if (denied) return denied;
  return Response.json(getProgress(req));
}

export async function POST(req: NextRequest) {
  const denied = authorize(req);
  if (denied) return denied;

  const body = (await req.json()) as Partial<Progress>;
  const current = getProgress(req);

  const next: Progress = {
    r2: current.r2 || body.r2 === true,
    r4: current.r4 || body.r4 === true,
    r5: current.r5 || body.r5 === true,
  };

  return new Response(JSON.stringify(next), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": progressCookie(next),
    },
  });
}
