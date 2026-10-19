"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { canAccessPortal, portalPathFor, type ExperienceId } from "@/app/lib/experiences";


const copy = {
  en: {
    lockedTitle: "Portal Locked",
    lockedBody: "Book first to unlock your puzzles.",
    cta: "Go to Booking",
    verifying: "Verifying your booking…",
    wrongTitle: "This booking is for Rainbow Street Highlights",
    wrongBody: "Your booking unlocks the Rainbow Street Highlights route. Head to your portal to begin.",
    wrongCta: "Go to my Highlights portal",
  },
  ar: {
    lockedTitle: "البوابة مقفلة",
    lockedBody: "قم بالحجز أولاً لفتح الألغاز.",
    cta: "الانتقال إلى الحجز",
    verifying: "جارٍ التحقق من حجزك…",
    wrongTitle: "هذا الحجز لجولة أبرز محطات شارع الرينبو",
    wrongBody: "حجزك يفتح مسار أبرز محطات شارع الرينبو. توجّه إلى بوابتك لتبدأ.",
    wrongCta: "الذهاب إلى بوابتي",
  },
  es: {
    lockedTitle: "Portal Bloqueado",
    lockedBody: "Reserva primero para desbloquear tus puzzles.",
    cta: "Ir a Reservas",
    verifying: "Verificando tu reserva…",
    wrongTitle: "Esta reserva es para Lo Mejor de Calle Rainbow",
    wrongBody: "Tu reserva desbloquea la ruta Lo Mejor de Calle Rainbow. Ve a tu portal para comenzar.",
    wrongCta: "Ir a mi portal",
  },
} as const;

type PortalLocale = "en" | "ar" | "es";

/* Progress endpoint used to probe the auth cookie for each portal */
function probeEndpoint(experience: ExperienceId): string {
  return experience === "highlights" ? "/api/portal/highlights-progress" : "/api/portal/progress";
}

export function PortalGate({
  locale,
  experience = "rainbow",
  children,
}: {
  locale: string;
  experience?: ExperienceId;
  children: React.ReactNode;
}) {
  const safeLocale: PortalLocale = locale === "ar" ? "ar" : locale === "es" ? "es" : "en";
  const isAr = safeLocale === "ar";
  const t = copy[safeLocale];
  const sp = useSearchParams();

  const [state, setState] = React.useState<"checking" | "unlocked" | "locked" | "wrong">("checking");

  React.useEffect(() => {
    let cancelled = false;

    async function check() {
      // Dev bypass
      const DEV = process.env.NODE_ENV === "development";
      const devParam = sp.get("dev") === "1";
      if (DEV && devParam) {
        localStorage.setItem("zowar_unlocked", "1");
      }

      // Set when a valid booking exists but it is for a different experience
      let wrongExperience = false;

      // Step 1: try the server cookie (httpOnly) — if the progress endpoint returns 200, we're good
      try {
        const res = await fetch(probeEndpoint(experience));
        if (res.ok && !cancelled) {
          setState("unlocked");
          return;
        }
        if (res.status === 403) wrongExperience = true;
      } catch {
        // network error — fall through
      }

      // Step 2: try session_id from URL (magic link) or localStorage
      const sessionId = sp.get("session_id") || localStorage.getItem("zowar_session_id");
      if (sessionId) {
        try {
          const res = await fetch("/api/portal/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ session_id: sessionId }),
          });
          if (res.ok) {
            const { valid, experience: booked } = await res.json();
            if (valid && canAccessPortal(booked, experience) && !cancelled) {
              setState("unlocked");
              return;
            }
            if (valid) wrongExperience = true;
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

      if (!cancelled) setState(wrongExperience ? "wrong" : "locked");
    }

    check();
    return () => { cancelled = true; };
  }, [sp, experience]);

  if (state === "wrong") {
    return (
      <div dir={isAr ? "rtl" : "ltr"} className="min-h-screen bg-z-black text-white">
        <div className="mx-auto max-w-2xl px-6 py-16">
          <h1 className="text-3xl font-semibold">{t.wrongTitle}</h1>
          <p className="mt-3 text-white/70">{t.wrongBody}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`${portalPathFor("highlights")}?lang=${safeLocale}`}
              className="inline-flex rounded-2xl bg-z-clay px-5 py-4 font-semibold text-neutral-950 hover:opacity-90"
            >
              {t.wrongCta}
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (state === "checking") {
    return (
      <div dir={isAr ? "rtl" : "ltr"} className="min-h-screen bg-z-black text-white flex items-center justify-center">
        <p className="text-white/60 text-sm">{t.verifying}</p>
      </div>
    );
  }

  if (state === "locked") {
    return (
      <div dir={isAr ? "rtl" : "ltr"} className="min-h-screen bg-z-black text-white">
        <div className="mx-auto max-w-2xl px-6 py-16">
          <h1 className="text-3xl font-semibold">{t.lockedTitle}</h1>
          <p className="mt-3 text-white/70">{t.lockedBody}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`/booking?lang=${safeLocale}`}
              className="inline-flex rounded-2xl bg-z-clay px-5 py-4 font-semibold text-neutral-950 hover:opacity-90"
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
