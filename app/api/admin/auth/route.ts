import { createHmac } from "crypto";
import { cookies } from "next/headers";

export const runtime = "nodejs";

// Add ADMIN_PASSWORD to your .env.local:
// ADMIN_PASSWORD=your-secure-password-here
function makeAdminToken(password: string): string {
  return createHmac("sha256", password).update("zowar:admin:v1").digest("hex");
}

export async function POST(req: Request) {
  const { password } = (await req.json()) as { password?: string };

  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    return Response.json({ error: "ADMIN_PASSWORD not configured" }, { status: 500 });
  }

  if (!password || password !== adminPassword) {
    return Response.json({ error: "Invalid password" }, { status: 401 });
  }

  const token = makeAdminToken(adminPassword);
  const jar = await cookies();
  jar.set("zowar_admin", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });

  return Response.json({ ok: true });
}

export async function DELETE() {
  const jar = await cookies();
  jar.delete("zowar_admin");
  return Response.json({ ok: true });
}
