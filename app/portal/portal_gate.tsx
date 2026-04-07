"use client";

import React from "react";
import { useSearchParams } from "next/navigation";


const copy = {
  en: {
    lockedTitle: "Portal Locked",
    lockedBody: "Book first to unlock your puzzles.",
    cta: "Go to Booking",
    verifying: "Verifying your booking…",
  },
  ar: {
    lockedTitle: "البوابة مقفلة",
    lockedBody: "قم بالحجز أولاً لفتح الألغاز.",
    cta: "الانتقال إلى الحجز",
    verifying: "جارٍ التحقق من حجزك…",
  },
  es: {
    lockedTitle: "Portal Bloqueado",
    lockedBody: "Reserva primero para desbloquear tus puzzles.",
    cta: "Ir a Reservas",
    verifying: "Verificando tu reserva…",
  },
} as const;

type PortalLocale = "en" | "ar" | "es";

export function PortalGate({
  locale,
  children,
}: {
  locale: string;
  children: React.ReactNode;
}) {
  const safeLocale: PortalLocale = locale === "ar" ? "ar" : locale === "es" ? "es" : "en";
  const isAr = safeLocale === "ar";
  const t = copy[safeLocale];
  const sp = useSearchParams();

  const [state, setState] = React.useState<"checking" | "unlocked" | "locked">("checking");

  React.useEffect(() => {
    let cancelled = false;

    async function check() {
      // Dev bypass
      const DEV = process.env.NODE_ENV === "development";
      const devParam = sp.get("dev") === "1";
      if (DEV && devParam) {
        localStorage.setItem("zowar_unlocked", "1");
      }

      // Step 1: try the server cookie (httpOnly) — if /api/portal/progress returns 200, we're good
      try {
        const res = await fetch("/api/portal/progress");
        if (res.ok && !cancelled) {
          setState("unlocked");
          return;
        }
      } catch {
        // network error — fall through
      }

      // Step 2: try verifying session_id from localStorage
      const sessionId = localStorage.getItem("zowar_session_id");
      if (sessionId) {
        try {
          const res = await fetch("/api/portal/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ session_id: sessionId }),
          });
          if (res.ok) {
            const { valid } = await res.json();
            if (valid && !cancelled) {
              setState("unlocked");
              return;
            }
          }
        } catch {
          // fall through
        }
      }

      // Step 3: fall back to legacy localStorage flag (for existing users)
      const legacy = localStorage.getItem("zowar_unlocked") === "1";
      if (legacy && !cancelled) {
        setState("unlocked");
        return;
      }

      if (!cancelled) setState("locked");
    }

    check();
    return () => { cancelled = true; };
  }, [sp]);

  if (state === "checking") {
    return (
      <div dir={isAr ? "rtl" : "ltr"} className="min-h-screen bg-neutral-950 text-white flex items-center justify-center">
        <p className="text-white/60 text-sm">{t.verifying}</p>
      </div>
    );
  }

  if (state === "locked") {
    return (
      <div dir={isAr ? "rtl" : "ltr"} className="min-h-screen bg-neutral-950 text-white">
        <div className="mx-auto max-w-2xl px-6 py-16">
          <h1 className="text-3xl font-semibold">{t.lockedTitle}</h1>
          <p className="mt-3 text-white/70">{t.lockedBody}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`/booking?lang=${safeLocale}`}
              className="inline-flex rounded-2xl bg-orange-500 px-5 py-4 font-semibold text-neutral-950 hover:bg-orange-400"
            >
              {t.cta}
            </a>
            {process.env.NODE_ENV === "development" && (
              <a
                href={`/portal?lang=${safeLocale}&dev=1`}
                className="inline-flex rounded-2xl border border-white/20 px-5 py-4 font-semibold text-white hover:bg-white/10"
              >
                {safeLocale === "ar" ? "فتح للتجربة (Dev)" : "Dev Unlock Preview"}
              </a>
            )}
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
