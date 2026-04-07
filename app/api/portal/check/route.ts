export const runtime = "nodejs";

import { NextRequest } from "next/server";

// No auth check here — the portal itself is protected by PortalGate.
// Answer validation is server-side to keep accepted answers out of the client bundle.

const R1: Record<string, string[]> = {
  en: ["pomegranate", "a pomegranate"],
  ar: ["رمان", "الرمان"],
  es: ["granada", "una granada"],
};

function normalize(s: string): string {
  return s.toLowerCase().trim().replace(/\s+/g, " ").replace(/[^\p{L}\p{N}\s]/gu, "");
}

function levenshtein(a: string, b: string): number {
  const m = a.length, n = b.length;
  if (!m) return n;
  if (!n) return m;
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++) {
      const c = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + c);
    }
  return dp[m][n];
}

export async function POST(req: NextRequest) {

  const { round, answer, locale } = (await req.json()) as {
    round: string;
    answer: string;
    locale: string;
  };

  if (round === "r1") {
    const lang = locale === "ar" ? "ar" : locale === "es" ? "es" : "en";
    const accepted = R1[lang];
    const norm = normalize(answer ?? "");
    if (!norm) return Response.json({ result: "wrong" });

    const accNorm = accepted.map(normalize);
    if (accNorm.includes(norm)) return Response.json({ result: "correct" });

    const maxEdits = norm.length <= 5 ? 1 : 2;
    const close = accNorm.some((a) => levenshtein(norm, a) <= maxEdits);
    return Response.json({ result: close ? "close" : "wrong" });
  }

  return Response.json({ result: "wrong" });
}
