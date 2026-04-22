"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import type { Locale } from "./riddlecontent";
import { setRoundSolved, serverSetRoundSolved } from "./progress";

const ROUND_KEY = "r6" as const;

type StepItem = {
  label: string;
  text: string;
};

type FrontageOption = {
  id: string;
  image: string;
  isCorrect: boolean;
};

const content = {
  en: {
    eyebrow: "Route Puzzle",
    title: "Follow the Street",
    subtitle:
      "Trace the route, find the dessert stop, then choose the correct storefront sketch.",
    instruction:
      "Follow the clues below. Once you arrive, tap “Found it!” and select the matching frontage.",
    foundIt: "Found it!",
    backToRoute: "Back to route",
    reset: "Reset",
    showHint: "Show hint",
    hideHint: "Hide hint",
    hintTitle: "A blooming clue",
    hintBody: "Jasmine in Arabic is called Al Yasmeenah (الياسمينة).",
    steps: [
      { label: "Orient", text: "Head toward First Circle." },
      { label: "Transition", text: "Leave the colorful street behind." },
      { label: "Movement", text: "Follow the rocky road downhill." },
      { label: "Identity", text: "Stop and smell the flower for your dessert." },
    ] satisfies StepItem[],
    selectionTitle: "Select the correct frontage",
    selectionBody:
      "You found the stop — now tap the sketch that matches the storefront you reached.",
    optionLabel: "Frontage",
    wrong:
      "Not quite. Look again at the storefront details and choose the correct sketch.",
    successTitle: "Correct!",
    successBody:
      "Nice work — you found the correct storefront and completed the route.",
    helperText:
      "Use the sketch details, proportions, and storefront features to pick the correct option.",
  },
  ar: {
    eyebrow: "لغز الطريق",
    title: "اتبع الشارع",
    subtitle:
      "اتبع المسار، اعثر على محطة الحلوى، ثم اختر رسم الواجهة الصحيح.",
    instruction:
      "اتبع الإشارات أدناه. عندما تصل، اضغط «وجدتها!» ثم اختر الواجهة المطابقة.",
    foundIt: "وجدتها!",
    backToRoute: "العودة إلى المسار",
    reset: "إعادة",
    showHint: "إظهار التلميح",
    hideHint: "إخفاء التلميح",
    hintTitle: "تلميح مزهر",
    hintBody: "اسم الياسمين بالعربية هو الياسمينة (Al Yasmeenah).",
    steps: [
      { label: "الاتجاه", text: "اتجه نحو الدوار الأول." },
      { label: "الانتقال", text: "اترك الشارع الملوّن خلفك." },
      { label: "الحركة", text: "اتبع الطريق الحجري نزولاً." },
      { label: "الهوية", text: "توقف واشمم الزهرة قبل التحلية." },
    ] satisfies StepItem[],
    selectionTitle: "اختر الواجهة الصحيحة",
    selectionBody:
      "لقد وصلت إلى المحطة — الآن اضغط على الرسم الذي يطابق واجهة المكان الذي وجدته.",
    optionLabel: "واجهة",
    wrong:
      "ليست هذه الواجهة الصحيحة. انظر جيداً إلى تفاصيل المحل ثم اختر الرسم المطابق.",
    successTitle: "إجابة صحيحة!",
    successBody:
      "أحسنت — لقد اخترت الواجهة الصحيحة وأكملت هذا المسار.",
    helperText:
      "استخدم تفاصيل الرسم ونِسَب الواجهة وعناصر المحل لاختيار الخيار الصحيح.",
  },
} as const;

const frontageOptions: FrontageOption[] = [
  {
    id: "a",
    image: "/images/puzzles/r6/frontage-a.png",
    isCorrect: false,
  },
  {
    id: "b",
    image: "/images/puzzles/r6/frontage-b.png",
    isCorrect: false,
  },
  {
    id: "c",
    image: "/images/puzzles/r6/frontage-c.png",
    isCorrect: true,
  },
];

function CompassIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="12" cy="12" r="8.5" />
      <path d="M14.8 9.2l-2 5.6-5.6 2 2-5.6 5.6-2z" />
    </svg>
  );
}

function StreamerIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M3 7c2.5 0 2.5 2 5 2s2.5-2 5-2 2.5 2 5 2 2.5-2 3-2" />
      <path d="M6 9v5" />
      <path d="M11 9v7" />
      <path d="M16 9v4" />
      <path d="M20 9v6" />
    </svg>
  );
}

function PathIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M5 20c0-5 4-5 4-10s-4-5-4-10" />
      <path d="M11 20c0-5 4-5 4-10s-4-5-4-10" opacity="0.7" />
      <path d="M17 20c0-5 4-5 4-10s-4-5-4-10" opacity="0.45" />
    </svg>
  );
}

function FlowerIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="12" cy="12" r="1.8" />
      <path d="M12 5.2c1.6-2.3 4.7-2 5.4.4.4 1.5-.3 2.8-1.7 3.7" />
      <path d="M18.2 10.4c2.7-.3 4.4 2.3 3.2 4.4-.8 1.4-2.2 1.8-3.8 1.7" />
      <path d="M15.5 17.3c1.4 2.3-.4 5.1-2.8 4.9-1.6-.1-2.5-1.3-3-2.8" />
      <path d="M8.5 17.3c-1.4 2.3-4.6 2-5.3-.4-.4-1.5.3-2.8 1.7-3.7" />
      <path d="M5.8 10.4c-2.7-.3-4.4 2.3-3.2 4.4.8 1.4 2.2 1.8 3.8 1.7" />
      <path d="M8.5 6.7c-1.4-2.3.4-5.1 2.8-4.9 1.6.1 2.5 1.3 3 2.8" />
    </svg>
  );
}

function HintIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M12 3a7 7 0 0 0-4.5 12.4c.9.8 1.5 1.7 1.7 2.6h5.6c.2-.9.8-1.8 1.7-2.6A7 7 0 0 0 12 3z" />
      <path d="M9.5 21h5" />
      <path d="M10 18.5h4" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.1"
    >
      <path d="M5 12.5l4.2 4.2L19 7" />
    </svg>
  );
}

function StorefrontIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M4 10h16" />
      <path d="M5 10l1-4h12l1 4" />
      <path d="M6 10v8h12v-8" />
      <path d="M10 18v-4h4v4" />
    </svg>
  );
}

function StepCard({
  index,
  label,
  text,
  icon,
}: {
  index: number;
  label: string;
  text: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-4 shadow-lg backdrop-blur-xl">
      <div className="absolute inset-x-0 top-0 h-1 bg-z-orange" />
      <div className="mb-3 flex items-center justify-between">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-z-orange bg-z-orange-soft z-orange glow-z-orange">
          {icon}
        </div>
        <div className="inline-flex h-8 min-w-8 items-center justify-center rounded-full border border-z-orange bg-z-orange-soft px-2 text-sm font-semibold z-orange">
          {index}
        </div>
      </div>

      <div className="space-y-1">
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
          {label}
        </div>
        <div className="text-sm font-medium leading-6 text-white/90">
          {text}
        </div>
      </div>
    </div>
  );
}

function PuzzleR6({ locale }: { locale: Locale }) {
  const safeLocale: Locale = locale === "ar" ? "ar" : "en";
  const t = content[safeLocale];
  const dir = safeLocale === "ar" ? "rtl" : "ltr";

  const [showHint, setShowHint] = useState(false);
  const [foundIt, setFoundIt] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "wrong" | "success">("idle");

  const icons = useMemo(
    () => [
      <CompassIcon key="compass" />,
      <StreamerIcon key="streamers" />,
      <PathIcon key="path" />,
      <FlowerIcon key="flower" />,
    ],
    []
  );

  function handleFoundIt() {
    setFoundIt(true);
    setStatus("idle");
    setSelectedId(null);
  }

  function handleBackToRoute() {
    setFoundIt(false);
    setStatus("idle");
    setSelectedId(null);
  }

  function handleReset() {
    setShowHint(false);
    setFoundIt(false);
    setSelectedId(null);
    setStatus("idle");
  }

  function handleSelectFrontage(option: FrontageOption) {
    setSelectedId(option.id);

    if (option.isCorrect) {
      setStatus("success");
      setRoundSolved(ROUND_KEY);
      serverSetRoundSolved(ROUND_KEY);
      return;
    }

    setStatus("wrong");
  }

  return (
    <section dir={dir} className="mx-auto w-full max-w-6xl px-4 pb-24">
      <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 shadow-2xl backdrop-blur-2xl">
        <div className="absolute -top-24 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-z-orange-soft blur-3xl" />

        <div className="relative border-b border-white/10 p-6 sm:p-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-z-orange bg-z-orange-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] z-orange">
            <CompassIcon />
            {t.eyebrow}
          </div>

          <div className="max-w-3xl">
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              {t.title}
            </h2>
            <p className="mt-3 text-base leading-7 text-white/75 sm:text-lg">
              {t.subtitle}
            </p>
          </div>

          <div className="mt-6 rounded-3xl border border-white/10 bg-black/20 p-4">
            <div className="text-sm font-medium text-white/70">
              {t.instruction}
            </div>

            <div className="mt-4 hidden items-center gap-3 md:flex">
              {icons.map((icon, i) => (
                <React.Fragment key={i}>
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-z-orange bg-z-orange-soft z-orange glow-z-orange">
                    {icon}
                  </div>
                  {i < icons.length - 1 && (
                    <div className="h-[2px] flex-1 rounded-full bg-white/15">
                      <div className="h-full w-2/3 rounded-full bg-z-orange" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        <div className="relative p-6 sm:p-8">
          {!foundIt && (
            <>
              <div className="grid gap-4 md:grid-cols-2">
                {t.steps.map((step, i) => (
                  <StepCard
                    key={step.label}
                    index={i + 1}
                    label={step.label}
                    text={step.text}
                    icon={icons[i]}
                  />
                ))}
              </div>

              <div className="mt-6 rounded-[28px] border border-z-orange bg-z-orange-soft p-[1px] glow-z-orange">
                <div className="rounded-[27px] bg-black/30 p-5 sm:p-6">
                  <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="text-sm font-semibold uppercase tracking-[0.2em] text-white/55">
                      {t.instruction}
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowHint((v) => !v)}
                      className="inline-flex items-center justify-center gap-2 rounded-2xl border border-z-orange bg-z-orange-soft px-4 py-2 text-sm font-medium z-orange transition hover:scale-[1.01]"
                    >
                      <HintIcon />
                      {showHint ? t.hideHint : t.showHint}
                    </button>
                  </div>

                  {showHint && (
                    <div className="mb-5 overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-4 sm:p-5">
                      <div className="flex items-start gap-4">
                        <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-z-orange bg-z-orange-soft z-orange glow-z-orange">
                          <FlowerIcon />
                        </div>

                        <div className="min-w-0">
                          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-white/55">
                            {t.hintTitle}
                          </div>

                          <div className="mt-2 text-base leading-7 text-white/85">
                            {t.hintBody}
                          </div>

                          <div className="mt-3 inline-flex rounded-full border border-z-orange bg-z-orange-soft px-3 py-1 text-sm font-medium z-orange">
                            الياسمينة
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <button
                      type="button"
                      onClick={handleFoundIt}
                      className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-z-orange px-5 font-semibold text-white transition hover:scale-[1.01]"
                    >
                      <CheckIcon />
                      {t.foundIt}
                    </button>

                    <button
                      type="button"
                      onClick={handleReset}
                      className="inline-flex h-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-5 font-medium text-white/85 transition hover:bg-white/10"
                    >
                      {t.reset}
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {foundIt && (
            <div className="rounded-[28px] border border-z-orange bg-z-orange-soft p-[1px] glow-z-orange">
              <div className="rounded-[27px] bg-black/30 p-5 sm:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="max-w-3xl">
                    <div className="inline-flex items-center gap-2 rounded-full border border-z-orange bg-z-orange-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] z-orange">
                      <StorefrontIcon />
                      {t.selectionTitle}
                    </div>

                    <h3 className="mt-4 text-2xl font-semibold text-white">
                      {t.selectionTitle}
                    </h3>
                    <p className="mt-2 text-base leading-7 text-white/75">
                      {t.selectionBody}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-white/55">
                      {t.helperText}
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 sm:min-w-[180px]">
                    <button
                      type="button"
                      onClick={handleBackToRoute}
                      className="inline-flex h-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 text-sm font-medium text-white/85 transition hover:bg-white/10"
                    >
                      {t.backToRoute}
                    </button>

                    <button
                      type="button"
                      onClick={handleReset}
                      className="inline-flex h-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 text-sm font-medium text-white/85 transition hover:bg-white/10"
                    >
                      {t.reset}
                    </button>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  {frontageOptions.map((option, idx) => {
                    const isSelected = selectedId === option.id;
                    const showSuccess = status === "success" && option.isCorrect;
                    const showWrong = status === "wrong" && isSelected;

                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => handleSelectFrontage(option)}
                        className={[
                          "group relative overflow-hidden rounded-3xl border bg-white/5 text-left transition",
                          "hover:scale-[1.01] hover:border-z-orange",
                          isSelected
                            ? "border-z-orange glow-z-orange"
                            : "border-white/10",
                          showSuccess ? "ring-2 ring-emerald-400/60" : "",
                          showWrong ? "ring-2 ring-red-400/50" : "",
                        ].join(" ")}
                      >
                        <div className="relative aspect-[4/5] w-full overflow-hidden bg-black/20">
                          <Image
                            src={option.image}
                            alt={`${t.optionLabel} ${idx + 1}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 33vw"
                            priority={idx === 0}
                          />
                        </div>

                        <div className="border-t border-white/10 p-4">
                          <div className="flex items-center justify-between gap-3">
                            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-white/65">
                              {t.optionLabel} {idx + 1}
                            </div>

                            {showSuccess && (
                              <div className="inline-flex items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-100">
                                <CheckIcon />
                              </div>
                            )}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {status === "wrong" && (
                  <div className="mt-5 rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
                    {t.wrong}
                  </div>
                )}

                {status === "success" && (
                  <div className="mt-5 rounded-3xl border border-emerald-400/30 bg-emerald-500/10 p-4 sm:p-5">
                    <div className="flex items-start gap-3">
                      <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-400/15 text-emerald-200">
                        <CheckIcon />
                      </div>
                      <div>
                        <div className="text-lg font-semibold text-emerald-100">
                          {t.successTitle}
                        </div>
                        <div className="mt-1 text-sm leading-6 text-emerald-50/90">
                          {t.successBody}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export { PuzzleR6 };
export default PuzzleR6;