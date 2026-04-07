import { createHmac, timingSafeEqual } from "crypto";

function getSecret(): string {
  const s = process.env.PORTAL_SECRET;
  if (!s) throw new Error("PORTAL_SECRET is not set");
  return s;
}

export function signPayload(payload: object): string {
  const data = JSON.stringify(payload);
  const sig = createHmac("sha256", getSecret()).update(data).digest("hex");
  return Buffer.from(data).toString("base64url") + "." + sig;
}

export function verifyPayload<T extends object>(token: string): T | null {
  try {
    const dotIdx = token.lastIndexOf(".");
    if (dotIdx === -1) return null;
    const b64 = token.slice(0, dotIdx);
    const sig = token.slice(dotIdx + 1);
    const data = Buffer.from(b64, "base64url").toString("utf8");
    const expected = createHmac("sha256", getSecret()).update(data).digest("hex");
    const a = Buffer.from(sig.padEnd(64, "0"), "hex");
    const b = Buffer.from(expected, "hex");
    if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
    return JSON.parse(data) as T;
  } catch {
    return null;
  }
}
