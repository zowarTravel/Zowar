import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Uses Web Crypto API (available in Edge runtime)
async function makeAdminToken(password: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode("zowar:admin:v1"));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function proxy(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/admin")) {
    if (req.nextUrl.pathname === "/admin/login") {
      return NextResponse.next();
    }

    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminPassword) {
      return new NextResponse("Admin not configured — set ADMIN_PASSWORD env var", {
        status: 503,
      });
    }

    const cookie = req.cookies.get("zowar_admin")?.value;
    const expected = await makeAdminToken(adminPassword);

    if (!cookie || cookie !== expected) {
      const loginUrl = new URL("/admin/login", req.url);
      loginUrl.searchParams.set("from", req.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
