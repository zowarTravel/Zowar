"use client";

import React from "react";
import Image from "next/image";
import type { Locale } from "./riddlecontent";
import { setRoundSolved, serverSetRoundSolved } from "./progress";

const ROUND_KEY = "r6" as const;
const MAP_IMAGE = "/images/puzzles/r6/knafeh.png";

type HintLevel = 0 | 1 | 2 | 3;

type MapPin = {
  id: string;
  top: string;
  left: string;
  isCorrect: boolean;
};

const MAP_PINS: MapPin[] = [
  { id: "pin-a", top: "33.5%", left: "27.5%", isCorrect: false },
  { id: "pin-b", top: "47%", left: "27%", isCorrect: true },
  { id: "pin-c", top: "12.5%", left: "74.5%", isCorrect: false },
  { id: "pin-d", top: "67.5%", left: "31.5%", isCorrect: false },
  { id: "pin-e", top: "76%", left: "59.5%", isCorrect: false },
  { id: "pin-f", top: "84%", left: "90.5%", isCorrect: false },
];

const CONTENT = {
  en: {
    kicker: "Round 6 · Map Puzzle",
    title: "Find the Sweet Stop",
    subtitle:
      "Study the clue below, then tap the pin on the map that marks the right location.",
    clueLabel: "Clue",
    clueText:
      "On the diagonal between First Circle and the street of colorful decorations waits a traditional sweet no Jordanian celebration is complete without.",
    showHint: "Show hint",
    nextHint: "Next hint",
    hideHints: "Hide hints",
    hintLabel: "Hint",
    hints: [
      "Leave the colorful decorations hanging behind and walk towards First Circle.",
      "Look for a knafeh spot named after an Arabic flower.",
      "You're looking for Al Yasmeenah.",
    ],
    mapInstruction: "Tap the pin that matches the clue.",
    wrong:
      "Not quite — revisit the diagonal between First Circle and the decorated street, then try again.",
    successTitle: "Correct!",
    successBody: "You found Al Yasmeenah.",
    aboutEyebrow: "About this stop",
    aboutTitle: "Mijana",
    aboutBody1:
      "Time to enjoy all the tasty bites and the magical Amman view at Mijana.",
    aboutBody2:
      "Make your way to Mijana — your table and the view are waiting.",
    reset: "Reset",
  },
  ar: {
    kicker: "الجولة ٦ · لغز الخريطة",
    title: "اعثر على محطة الحلوى",
    subtitle:
      "اقرأ الدليل أدناه، ثم اضغط على الدبوس الذي يُشير إلى الموقع الصحيح.",
    clueLabel: "الدليل",
    clueText:
      "على الخط القطري بين الدوار الأول والشارع المزيّن بالألوان تنتظرك حلوى تقليدية لا تكتمل أي مناسبة أردنية من دونها.",
    showHint: "إظهار تلميح",
    nextHint: "التلميح التالي",
    hideHints: "إخفاء التلميحات",
    hintLabel: "تلميح",
    hints: [
      "اترك الزينة الملوّنة المعلّقة خلفك وامشِ باتجاه الدوار الأول.",
      "ابحث عن محل كنافة اسمه مأخوذ من زهرة عربية.",
      "أنت تبحث عن الياسمينة.",
    ],
    mapInstruction: "اضغط على الدبوس الذي يطابق الدليل.",
    wrong:
      "ليست هذه — ارجع إلى الخط القطري بين الدوار الأول والشارع المزيّن وحاول مجدداً.",
    successTitle: "إجابة صحيحة!",
    successBody: "لقد وجدت الياسمينة.",
    aboutEyebrow: "عن هذه المحطة",
    aboutTitle: "ميجانا",
    aboutBody1:
      "حان وقت الاستمتاع بكل اللقيمات اللذيذة والإطلالة الرائعة على عمّان في ميجانا.",
    aboutBody2:
      "توجّه إلى ميجانا — طاولتك والإطلالة بانتظارك.",
    reset: "إعادة",
  },
} as const;

type Props = {
  locale: Locale;
  onSolved?: () => void;
};

function PinSvg({ fill }: { fill: string }) {
  return (
    <svg viewBox="0 0 24 24" className="h-8 w-8" fill={fill} aria-hidden="true">
      <path d="M12 22s7-7.1 7-12a7 7 0 1 0-14 0c0 4.9 7 12 7 12Z" />
      <circle cx="12" cy="10" r="2.8" fill="white" />
    </svg>
  );
}

export default function PuzzleR6({ locale, onSolved }: Props) {
  const safeLocale: Locale = locale === "ar" ? "ar" : "en";
  const isAr = safeLocale === "ar";
  const t = CONTENT[safeLocale];

  const [selectedPinId, setSelectedPinId] = React.useState<string | null>(null);
  const [status, setStatus] = React.useState<"idle" | "wrong" | "success">("idle");
  const [hintsRevealed, setHintsRevealed] = React.useState<HintLevel>(0);
  const solvedRef = React.useRef(false);

  function handleReset() {
    setSelectedPinId(null);
    setStatus("idle");
    setHintsRevealed(0);
  }

  function handlePinSelect(pin: MapPin) {
    if (status === "success") return;
    setSelectedPinId(pin.id);

    if (pin.isCorrect) {
      setStatus("success");
      if (!solvedRef.current) {
        solvedRef.current = true;
        setRoundSolved(ROUND_KEY);
        void serverSetRoundSolved(ROUND_KEY);
        onSolved?.();
      }
    } else {
      setStatus("wrong");
    }
  }

  const card =
    "rounded-3xl border border-black/10 " +
    "bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(250,247,242,0.94))] " +
    "shadow-[0_16px_50px_rgba(0,0,0,0.10)]";

  const btn =
    "rounded-2xl px-4 py-2 text-sm font-medium transition active:scale-[0.99] " +
    "border border-black/10 bg-white text-neutral-900 shadow-sm hover:bg-neutral-50";

  const btnOrange =
    "inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold transition active:scale-[0.99] " +
    "border border-z-orange bg-z-orange-soft z-orange";

  return (
    <div dir={isAr ? "rtl" : "ltr"} className="mx-auto w-full max-w-5xl px-4 py-8 sm:py-10">
      <style>{`
        @keyframes r6-fade-up {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className={`${card} relative p-5 sm:p-6`}>
        <div className="pointer-events-none absolute -top-6 left-[-10px] h-32 w-32 rounded-full bg-z-orange-soft blur-3xl opacity-40" />

        <div className="relative flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-z-orange bg-z-orange-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] z-orange">
              {t.kicker}
            </div>
            <h1 className="text-2xl font-semibold text-neutral-950 sm:text-3xl">{t.title}</h1>
            <p className="mt-2 text-sm leading-relaxed text-neutral-700">{t.subtitle}</p>
          </div>

          <button type="button" className={btn} onClick={handleReset}>
            {t.reset}
          </button>
        </div>

        <div className="relative mt-5 overflow-hidden rounded-2xl border border-black/8 bg-z-off-white p-4">
          <div className="absolute inset-x-0 top-0 h-0.5 bg-z-orange" />
          <div className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-neutral-500">
            {t.clueLabel}
          </div>
          <p className="text-sm leading-7 text-neutral-800">{t.clueText}</p>
        </div>

        <div className="mt-4">
          <div className="flex flex-wrap gap-2">
            {hintsRevealed < 3 && (
              <button
                type="button"
                className={btnOrange}
                onClick={() => setHintsRevealed((p) => Math.min(p + 1, 3) as HintLevel)}
              >
                {hintsRevealed === 0 ? t.showHint : t.nextHint}
              </button>
            )}
            {hintsRevealed > 0 && (
              <button type="button" className={btn} onClick={() => setHintsRevealed(0)}>
                {t.hideHints}
              </button>
            )}
          </div>

          {hintsRevealed > 0 && (
            <div className="mt-3 grid gap-2">
              {(t.hints as readonly string[]).slice(0, hintsRevealed).map((hint, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-black/8 bg-z-off-white p-3 text-sm leading-7 text-neutral-700"
                >
                  <span className="mb-0.5 block text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-500">
                    {t.hintLabel} {idx + 1}
                  </span>
                  {hint}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-6">
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.18em] text-neutral-500">
            {t.mapInstruction}
          </p>

          <div className="relative overflow-hidden rounded-3xl border border-black/10 bg-neutral-100 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.04)]">
            <div className="relative aspect-square w-full">
              <Image
                src={MAP_IMAGE}
                alt={isAr ? "خريطة اللغز" : "Puzzle map"}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 900px"
                priority
              />

              {MAP_PINS.map((pin) => {
                const isSelected = selectedPinId === pin.id;
                const isCorrectAndSolved = status === "success" && pin.isCorrect;
                const isWrong = status === "wrong" && isSelected;

                const fill = isCorrectAndSolved
                  ? "#059669"
                  : isWrong
                    ? "#EF4444"
                    : isSelected
                      ? "#a8563b"
                      : "#C8694A";

                const scale = isSelected || isCorrectAndSolved ? 1.22 : 1;
                const shadow =
                  isSelected || isCorrectAndSolved
                    ? "drop-shadow(0 6px 12px rgba(0,0,0,0.30))"
                    : "drop-shadow(0 2px 5px rgba(0,0,0,0.22))";

                return (
                  <button
                    key={pin.id}
                    type="button"
                    onClick={() => handlePinSelect(pin)}
                    className="absolute -translate-x-1/2 -translate-y-full transition-transform duration-150"
                    style={{
                      top: pin.top,
                      left: pin.left,
                      transform: `translate(-50%, -100%) scale(${scale})`,
                      filter: shadow,
                    }}
                    aria-label={pin.id}
                  >
                    <PinSvg fill={fill} />
                  </button>
                );
              })}
            </div>
          </div>

          {status === "wrong" && (
            <div
              className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              style={{ animation: "r6-fade-up .22s ease-out" }}
            >
              {t.wrong}
            </div>
          )}

          {status === "success" && (
            <>
              <div
                className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3"
                style={{ animation: "r6-fade-up .22s ease-out" }}
              >
                <div className="text-sm font-semibold text-emerald-800">{t.successTitle}</div>
                <div className="mt-1 text-sm leading-6 text-emerald-700">{t.successBody}</div>
              </div>

              <div
                className="mt-4 rounded-3xl border border-black/8 bg-z-off-white p-4 sm:p-5"
                style={{ animation: "r6-fade-up .28s ease-out" }}
              >
                <div className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-neutral-500">
                  {t.aboutEyebrow}
                </div>
                <h3 className="text-lg font-semibold text-neutral-950">{t.aboutTitle}</h3>
                <div className="mt-2 space-y-2 text-sm leading-7 text-neutral-700">
                  <p>{t.aboutBody1}</p>
                  <p>{t.aboutBody2}</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}