"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SuccessPage() {
  const router = useRouter();
  const sp = useSearchParams();
  const lang = sp.get("lang") === "ar" ? "ar" : "en";
  const isAr = lang === "ar";

  useEffect(() => {
    localStorage.setItem("zowar_unlocked", "1");

    const timer = setTimeout(() => {
      router.replace(`/portal?lang=${lang}`);
    }, 1800);

    return () => clearTimeout(timer);
  }, [lang, router]);

  const copy = {
    en: {
      eyebrow: "Booking confirmed",
      title: "Your portal is unlocked",
      body: "We’re taking you to your Zowar portal now so you can begin the experience.",
      cta: "Go to Portal now",
      home: "Back to Home",
    },
    ar: {
      eyebrow: "تم تأكيد الحجز",
      title: "تم فتح البوابة",
      body: "يتم الآن نقلك إلى بوابة زُوّار لبدء التجربة.",
      cta: "الذهاب إلى البوابة الآن",
      home: "العودة للرئيسية",
    },
  } as const;

  const t = copy[lang];

  return (
    <main
      dir={isAr ? "rtl" : "ltr"}
      className="min-h-screen bg-[radial-gradient(900px_600px_at_18%_24%,rgba(249,115,22,0.16),transparent_55%),radial-gradient(700px_500px_at_80%_30%,rgba(0,0,0,0.05),transparent_55%),linear-gradient(to_bottom,#ffffff,#f6f6f7)] text-neutral-900"
    >
      <div className="mx-auto flex min-h-screen max-w-3xl items-center px-6 py-16">
        <div className="w-full rounded-[32px] border border-black/10 bg-white/80 p-8 shadow-[0_18px_60px_rgba(0,0,0,0.08)] backdrop-blur-xl md:p-10">
          <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-full bg-z-orange-soft border border-z-orange/20">
            <svg
              viewBox="0 0 24 24"
              className="h-7 w-7 text-z-orange"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </div>

          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-z-orange">
            {t.eyebrow}
          </p>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            {t.title}
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-7 text-neutral-600">
            {t.body}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={`/portal?lang=${lang}`}
              className="glow-z-orange bg-z-orange inline-flex rounded-2xl px-5 py-3 font-semibold text-neutral-950 transition hover:opacity-95"
            >
              {t.cta}
            </Link>

            <Link
              href={`/?lang=${lang}`}
              className="inline-flex rounded-2xl border border-black/10 bg-white px-5 py-3 font-semibold text-neutral-900 transition hover:bg-black/[0.03]"
            >
              {t.home}
            </Link>
          </div>

          <div className="mt-8">
            <div className="h-2 w-full overflow-hidden rounded-full bg-black/5">
              <div className="h-full w-full origin-left animate-[successLoad_1.8s_linear_forwards] rounded-full bg-z-orange" />
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes successLoad {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }
      `}</style>
    </main>
  );
}