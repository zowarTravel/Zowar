"use client";

import React from "react";
import { useSearchParams } from "next/navigation";

type Locale = "en" | "ar";

const copy = {
  en: {
    lockedTitle: "Portal Locked",
    lockedBody: "Book first to unlock your puzzles.",
    cta: "Go to Booking",
  },
  ar: {
    lockedTitle: "البوابة مقفلة",
    lockedBody: "قم بالحجز أولاً لفتح الألغاز.",
    cta: "الانتقال إلى الحجز",
  },
} as const;

export function PortalGate({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const isAr = locale === "ar";
  const t = copy[locale];

  const sp = useSearchParams();

  const [ready, setReady] = React.useState(false);
  const [unlocked, setUnlocked] = React.useState(false);

  React.useEffect(() => {
    const DEV = process.env.NODE_ENV === "development";
    const devParam = sp.get("dev") === "1";

    if (DEV && devParam) {
      localStorage.setItem("zowar_unlocked", "1");
    }

    const ok = localStorage.getItem("zowar_unlocked") === "1";
    setUnlocked(ok);
    setReady(true);
  }, [sp]);

  if (!ready) return null;

  if (!unlocked) {
    return (
      <div dir={isAr ? "rtl" : "ltr"} className="min-h-screen bg-neutral-950 text-white">
        <div className="mx-auto max-w-2xl px-6 py-16">
          <h1 className="text-3xl font-semibold">{t.lockedTitle}</h1>
          <p className="mt-3 text-white/70">{t.lockedBody}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`/booking?lang=${isAr ? "ar" : "en"}`}
              className="inline-flex rounded-2xl bg-orange-500 px-5 py-4 font-semibold text-neutral-950 hover:bg-orange-400"
            >
              {t.cta}
            </a>

            {/* Dev-only helper link (only visible in development) */}
            {process.env.NODE_ENV === "development" && (
              <a
                href={`/portal?lang=${isAr ? "ar" : "en"}&dev=1`}
                className="inline-flex rounded-2xl border border-white/20 px-5 py-4 font-semibold text-white hover:bg-white/10"
              >
                {isAr ? "فتح للتجربة (Dev)" : "Dev Unlock Preview"}
              </a>
            )}
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}