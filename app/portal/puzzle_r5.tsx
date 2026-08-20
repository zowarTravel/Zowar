"use client";

import React from "react";
import Image from "next/image";
import type { Locale } from "./riddlecontent";
import { setRoundSolved, serverSetRoundSolved } from "./progress";

const ROUND_KEY = "r5" as const;

const MAISA_MAPS_URL = "https://maps.app.goo.gl/X4rE5Tv96jMD7aDw9";

const MAP_IMAGE = "/images/puzzles/r6/Maisa%20Map.png";

const COPY = {
  en: {
    badge: "Round 5 · Follow the City",
    title: "Follow the City",
    subtitle: "Let the spirit of the city and the colors guide you on an adventure trail from Tabrizi to your next stop. Follow the colorful stairs in front of Tabrizi to begin your adventure.",
    showHint: "Need directions?",
    hideHint: "Hide directions",
    hintLabel: "Your destination",
    hintPrefix: "Head to ",
    hintLink: "Maisa Space",
    arrivedBtn: "Found Maisa Space!",
    successEyebrow: "Your next stop",
    successHead: "You found Maisa Space",
    successBody: "Step inside for a surprise rotating tasting based on what is in season!",
    successInst: "Go inside and show this screen.",
    aboutEyebrow: "About this stop",
    aboutTitle: "Maisa Space",
    aboutBody:
      "Maisa Space brings together homemade flavors, pantry staples, and seasonal produce inspired by the way food has long been prepared and preserved in Jordanian homes. What you find on the shelves can change with the season — from jams and pickles to other small-batch creations made from what's fresh. Don't forget to explore the boutique shop as well!",
  },
  ar: {
    badge: "الجولة ٥ · اتبع المدينة",
    title: "اتبع المدينة",
    subtitle: "دع روح المدينة وألوانها تقودك في مسار مغامرة من تبريزي إلى محطتك التالية. اتبع الدرج الملوّن أمام تبريزي لتبدأ مغامرتك.",
    showHint: "تحتاج إلى توجيهات؟",
    hideHint: "إخفاء التوجيهات",
    hintLabel: "وجهتك",
    hintPrefix: "توجّه إلى ",
    hintLink: "مساحة ميسا",
    arrivedBtn: "!وجدت مساحة ميسا",
    successEyebrow: "محطتك التالية",
    successHead: "وجدت مساحة ميسا",
    successBody: "ادخل لتجربة تذوّق دوّارة مفاجئة تعتمد على ما هو في موسمه!",
    successInst: "ادخل واعرض هذه الشاشة.",
    aboutEyebrow: "عن هذه المحطة",
    aboutTitle: "ميسا سبيس",
    aboutBody:
      "تجمع ميسا سبيس نكهات بيتية ومؤناً أساسية ومنتجات موسمية مستوحاة من طريقة تحضير الطعام وحفظه في البيوت الأردنية منذ أمد بعيد. ما تجده على الرفوف يتغيّر مع الموسم — من المربّيات والمخلّلات إلى إبداعات صغيرة الحجم مصنوعة مما هو طازج. ولا تنسَ استكشاف المتجر البوتيك أيضاً!",
  },
} as const;

export default function PuzzleR5({
  locale,
  onSolved,
}: {
  locale: Locale;
  onSolved?: () => void;
}) {
  const safeLocale: Locale = locale === "ar" ? "ar" : "en";
  const isAr = safeLocale === "ar";
  const t = COPY[safeLocale];

  const solvedRef = React.useRef(false);
  const successRef = React.useRef<HTMLDivElement>(null);

  const [showHint, setShowHint] = React.useState(false);
  const [solved, setSolved] = React.useState(false);

  function handleArrived() {
    if (solvedRef.current) return;
    solvedRef.current = true;
    setSolved(true);
    setRoundSolved(ROUND_KEY);
    void serverSetRoundSolved(ROUND_KEY);
    onSolved?.();
    window.setTimeout(() => {
      successRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 200);
  }

  return (
    <div dir={isAr ? "rtl" : "ltr"} className="w-full space-y-4">
      <style>{`
        @keyframes r5MapFadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Header */}
      <div className="rounded-3xl border border-neutral-200 bg-white p-5 sm:p-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-z-orange bg-z-orange-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] z-orange">
          {t.badge}
        </div>
        <h2 className="mt-3 text-xl font-semibold text-neutral-950">{t.title}</h2>
        <p className="mt-1 text-sm leading-6 text-neutral-600">{t.subtitle}</p>
      </div>

      {/* Map */}
      <div className="overflow-hidden rounded-3xl border border-black/10 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.04)]">
        <div className="relative aspect-square w-full sm:aspect-[4/3]">
          <Image
            src={MAP_IMAGE}
            alt={isAr ? "خريطة توجيهية" : "Navigation map"}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 700px"
            priority
          />
        </div>
      </div>

      {/* Hint + Arrived */}
      {!solved && (
        <div className="rounded-3xl border border-neutral-200 bg-white p-5 sm:p-6">
          <button
            type="button"
            onClick={() => setShowHint((v) => !v)}
            className="inline-flex items-center gap-2 rounded-2xl border border-z-orange bg-z-orange-soft px-4 py-2 text-sm font-semibold z-orange transition hover:opacity-90"
          >
            {showHint ? t.hideHint : t.showHint}
          </button>

          {showHint && (
            <div
              className="mt-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3.5"
              style={{ animation: "r5MapFadeUp 250ms ease-out" }}
            >
              <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.18em] text-amber-600">
                {t.hintLabel}
              </p>
              <p className="text-sm leading-6 text-amber-900">
                {t.hintPrefix}
                <a
                  href={MAISA_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold underline decoration-amber-400 hover:decoration-amber-600"
                >
                  {t.hintLink}
                </a>
              </p>
            </div>
          )}

          <button
            type="button"
            onClick={handleArrived}
            className="mt-5 w-full rounded-2xl bg-z-orange px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-95 active:scale-[0.99]"
          >
            {t.arrivedBtn}
          </button>
        </div>
      )}

      {/* Success */}
      {solved && (
        <div
          ref={successRef}
          className="space-y-4"
          style={{ animation: "r5MapFadeUp 420ms cubic-bezier(.22,1,.36,1) both" }}
        >
          <div className="rounded-3xl border border-z-orange/20 bg-z-orange-soft p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] z-orange">
              {t.successEyebrow}
            </p>
            <h3 className="mt-2 text-xl font-semibold text-neutral-950">{t.successHead}</h3>
            <p className="mt-2 text-sm leading-6 text-neutral-700">{t.successBody}</p>
            <div className="mt-3 rounded-2xl border border-z-orange/20 bg-white/70 px-3 py-2.5">
              <p className="text-sm font-medium text-neutral-800">{t.successInst}</p>
            </div>
          </div>

          <div className="rounded-3xl border border-neutral-200 bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] z-orange">
              {t.aboutEyebrow}
            </p>
            <h4 className="mt-2 text-lg font-semibold text-neutral-950">{t.aboutTitle}</h4>
            <p className="mt-2 text-sm leading-7 text-neutral-700">{t.aboutBody}</p>
          </div>
        </div>
      )}
    </div>
  );
}
