"use client";

import React from "react";
import Image from "next/image";
import type { Locale } from "./riddlecontent";
import { setRoundSolved, serverSetRoundSolved } from "./progress";

type Status = "idle" | "wrong" | "correct";

const MAP_FRAMES = [
  "/images/puzzles/r3/Destination Map 1-Faded.png",
  "/images/puzzles/r3/Destination Map 2-Faded.png",
  "/images/puzzles/r3/Destination Map 3-Faded.png",
] as const;

const LOGO_OPTIONS = [
  {
    id: "f1",
    src: "/images/puzzles/r3/Falafel 1.png",
  },
  {
    id: "f2",
    src: "/images/puzzles/r3/Falafel 2.png",
  },
  {
    id: "f3",
    src: "/images/puzzles/r3/Falafel 3.png",
  },
] as const;

const CORRECT_LOGO_ID = "f1";

const COPY = {
  en: {
    title: "Round 4: Follow the Clue",
    subtitle:
      "Study the map, use the hints if needed, then confirm the real sign when you arrive.",
    mapTitle: "Clue map",
    mapCaptions: [
      "Start by studying the original clue map.",
      "Hint 1 adds the destination marker.",
      "Hint 2 reveals the final place name.",
    ],
    riddleLabel: "Clue",
    riddle:
      "First, find the view. Nearby waits a golden, crispy staple of the Jordanian breakfast spread.",
    ui: {
      showHint: "Show hint",
      nextHint: "Next hint",
      allHintsShown: "All hints shown",
      reset: "Reset",
      foundIt: "Found it!",
      mapUpdated1: "Map updated",
      mapUpdated2: "Map refined",
      hintHelper:
        "Use the map first. If you need help, each hint reveals a little more.",
      keepWalking:
        `When you think you've found the place, press “Found it!”`,
      foundPrompt:
        "Nice. Now look at the real sign and choose the logo that matches it.",
      arrivalCheck: "Arrival check",
      arrivalPrompt: "Which logo matches the real Falafel Al Quds sign?",
      arrivalSub:
        "Look closely at the sign and choose the correct number of mint leaves and falafel.",
      check: "Check",
      solved: "Solved!",
      tryAgain:
        "Not quite — look closely at the sign again and try one more time.",
      nextStep:
        "Perfect. You found the classic — enjoy your bite at Al Quds Falafel.",
      selectOne: "Select one logo to continue.",
      aboutTitle: "About this stop",
      aboutText: [
        "Al Quds Falafel has been on Rainbow Street since 1966. The name means Jerusalem — and when this place opened, that name carried real weight. A generation had just arrived in Amman carrying it with them, and a falafel shop named Al Quds was both a meal and a statement.",
        "Nearly sixty years on, the recipe hasn't changed. Falafel pressed and fried to order, served in sesame kaʿek with tahini and pickles. The Royal Family has eaten here. So have generations of Ammani regulars, students from these streets, and first-time visitors who came on someone's insistence.",
        "The price is still what it should be. The falafel is still the point.",
      ],
    },
  },
  ar: {
    title: "الجولة ٤: اتبع الدليل",
    subtitle:
      "ادرس الخريطة، استخدم التلميحات إذا احتجت، ثم أكّد اللافتة الحقيقية عندما تصل.",
    mapTitle: "خريطة الدليل",
    mapCaptions: [
      "ابدأ بدراسة خريطة الدليل الأصلية.",
      "التلميح الأول يضيف علامة الوجهة.",
      "التلميح الثاني يكشف اسم المكان النهائي.",
    ],
    riddleLabel: "الدليل",
    riddle:
      "أولًا، ابحث عن الإطلالة. بالقرب منها تنتظرك لقمة ذهبية مقرمشة لا تخلو منها سفرة الفطور الأردنية.",
    ui: {
      showHint: "إظهار التلميح",
      nextHint: "التلميح التالي",
      allHintsShown: "تم عرض كل التلميحات",
      reset: "إعادة",
      foundIt: "وصلت!",
      mapUpdated1: "تم تحديث الخريطة",
      mapUpdated2: "تم توضيح الخريطة",
      hintHelper:
        "استخدم الخريطة أولًا. وإذا احتجت مساعدة، كل تلميح يكشف جزءًا إضافيًا.",
      keepWalking:
        `عندما تعتقد أنك وجدت المكان، اضغط على "وصلت!"`,
      foundPrompt:
        "ممتاز. الآن انظر إلى اللافتة الحقيقية واختر الشعار المطابق لها.",
      arrivalCheck: "تأكيد الوصول",
      arrivalPrompt: "أي شعار يطابق لافتة فلافل القدس الحقيقية؟",
      arrivalSub:
        "انظر جيدًا إلى اللافتة واختر العدد الصحيح من أوراق النعنع وحبات الفلافل.",
      check: "تحقق",
      solved: "تم الحل!",
      tryAgain:
        "ليست صحيحة — انظر إلى اللافتة مرة أخرى ثم جرّب من جديد.",
      nextStep:
        "ممتاز. لقد وجدت الكلاسيكي — استمتع بلقمتك في فلافل القدس.",
      selectOne: "اختر شعارًا واحدًا للمتابعة.",
      aboutTitle: "عن هذه المحطة",
      aboutText: [
        "يقدّم فلافل القدس ساندويشاته الشهيرة على شارع الرينبو منذ عام 1966. الاسم وحده يختزل ذاكرة جيل كامل — القدس التي حمل الناس اسمها معهم إلى عمّان، وفتح هذا المحل على اسمها كان أكثر من مجرد بداية مشروع.",
        "مرّت ستة عقود دون أن يتغير شيء جوهري: فلافل تُقلى على الطلب وتُقدَّم في كعك بالسمسم مع الطحينة والمخلل. أكل هنا أفراد من الأسرة الحاكمة، وزبائن عمّانيون لم يعرفوا بديلاً، وزوّار جاؤوا بتوصية شخص نشأ على هذا الشارع.",
        "السعر لا يزال في متناول الجميع. الفلافل لا تزال هي المقصد.",
      ],
    },
  },
} as const;

function LogoOption({
  src,
  alt,
  selected,
  onClick,
}: {
  src: string;
  alt: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "group relative overflow-hidden rounded-2xl border bg-white/90 p-3 transition",
        "shadow-[0_8px_30px_rgba(0,0,0,0.06)]",
        "hover:-translate-y-0.5 hover:shadow-[0_12px_34px_rgba(0,0,0,0.10)]",
        selected
          ? "border-z-orange bg-z-orange-soft ring-2 ring-z-orange/30"
          : "border-black/10",
      ].join(" ")}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.95),rgba(255,255,255,0.75)_55%,transparent_100%)] opacity-70" />

      <div className="relative mx-auto flex min-h-[140px] items-center justify-center">
        <Image
          src={src}
          alt={alt}
          width={180}
          height={180}
          className="h-auto max-h-[150px] w-auto object-contain"
        />
      </div>
    </button>
  );
}

export default function PuzzleR4({
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

  const [hintStep, setHintStep] = React.useState(0);
  const [foundIt, setFoundIt] = React.useState(false);
  const [selectedLogoId, setSelectedLogoId] = React.useState<string | null>(
    null
  );
  const [status, setStatus] = React.useState<Status>("idle");
  const [flashBadge, setFlashBadge] = React.useState(false);

  const hasMoreHints = hintStep < MAP_FRAMES.length - 1;

  React.useEffect(() => {
    if (hintStep === 0) return;

    setFlashBadge(true);

    const timer = window.setTimeout(() => {
      setFlashBadge(false);
    }, 1200);

    return () => window.clearTimeout(timer);
  }, [hintStep]);

  function advanceHint() {
    if (!hasMoreHints) return;

    setHintStep((prev) => Math.min(prev + 1, MAP_FRAMES.length - 1));
    setStatus("idle");
  }

  function resetAll() {
    setHintStep(0);
    setFoundIt(false);
    setSelectedLogoId(null);
    setStatus("idle");
  }

  function handleFoundIt() {
    setFoundIt(true);
    setStatus("idle");

    window.setTimeout(() => {
      const el = document.getElementById("r4-arrival-check");
      el?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 80);
  }

  function chooseLogo(id: string) {
    setSelectedLogoId(id);
    if (status !== "correct") setStatus("idle");
  }

  function checkAnswer() {
    if (!foundIt) return;

    if (!selectedLogoId) {
      setStatus("wrong");
      return;
    }

    if (selectedLogoId !== CORRECT_LOGO_ID) {
      setStatus("wrong");
      return;
    }

    setStatus("correct");

    if (!solvedRef.current) {
      solvedRef.current = true;
      setRoundSolved("r4");
      serverSetRoundSolved("r4");
      onSolved?.();
    }
  }

  const cardGlow =
    status === "correct"
      ? "ring-2 ring-green-300 shadow-[0_0_40px_rgba(34,197,94,0.12)]"
      : status === "wrong"
      ? "ring-2 ring-red-200 shadow-[0_0_0_4px_rgba(239,68,68,0.06)]"
      : "ring-1 ring-black/8";

  const shake =
    status === "wrong" ? "animate-[zowarShake_280ms_ease-in-out_1]" : "";

  const hintButtonLabel =
    hintStep === 0
      ? t.ui.showHint
      : hasMoreHints
      ? t.ui.nextHint
      : t.ui.allHintsShown;

  return (
    <div dir={isAr ? "rtl" : "ltr"} className="w-full">
      <div className="relative mx-auto max-w-4xl px-1 sm:px-0">
        <div className="pointer-events-none absolute -top-6 left-[-10px] h-32 w-32 rounded-full bg-z-orange-soft opacity-50 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-8 right-[-10px] h-36 w-36 rounded-full bg-white opacity-30 blur-3xl" />

        <div
          className={[
            "relative overflow-hidden rounded-3xl border border-black/10",
            "bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(250,247,242,0.94))]",
            "p-5 sm:p-6",
            "shadow-[0_16px_50px_rgba(0,0,0,0.10)]",
            cardGlow,
            shake,
          ].join(" ")}
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.75),transparent_40%)]" />

          <div className="relative">
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-z-orange bg-z-orange-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] z-orange">
                  {isAr ? "الجولة ٤ · اتبع الدليل" : "Round 4 · Follow the Clue"}
                </div>

                <h2 className="text-2xl font-semibold tracking-tight text-neutral-950">
                  {t.title}
                </h2>

                <p className="mt-1 max-w-2xl text-sm leading-6 text-neutral-600">
                  {t.subtitle}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={advanceHint}
                  disabled={!hasMoreHints}
                  className={[
                    "rounded-2xl px-4 py-2 text-sm font-semibold transition",
                    hasMoreHints
                      ? "bg-z-orange text-white shadow-[0_8px_24px_rgba(200,105,74,0.25)] hover:opacity-95 hover:translate-y-[-1px]"
                      : "cursor-not-allowed bg-z-orange-soft text-z-orange opacity-60",
                  ].join(" ")}
                >
                  {hintButtonLabel}
                </button>

                <button
                  type="button"
                  onClick={resetAll}
                  className="rounded-2xl border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-neutral-800 transition hover:bg-neutral-50"
                >
                  {t.ui.reset}
                </button>
              </div>
            </div>

            <div className="grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
              <section className="relative">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <h3 className="text-sm font-semibold text-neutral-900">
                    {t.mapTitle}
                  </h3>

                  <p className="text-end text-xs text-neutral-500">
                    {t.mapCaptions[hintStep]}
                  </p>
                </div>

                <div className="relative overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
                  {flashBadge && (
                    <div
                      className={[
                        "pointer-events-none absolute end-4 top-4 z-20 rounded-full px-3 py-1.5 text-xs font-semibold text-white",
                        "bg-z-orange shadow-[0_10px_25px_rgba(200,105,74,0.28)]",
                        "animate-[zowarHintBadge_1.15s_ease-out_1]",
                      ].join(" ")}
                    >
                      {hintStep === 1 ? t.ui.mapUpdated1 : t.ui.mapUpdated2}
                    </div>
                  )}

                  <div
                    key={`map-frame-${hintStep}`}
                    className="animate-[zowarMapSwap_420ms_cubic-bezier(.22,1,.36,1)_1]"
                  >
                    <Image
                      src={MAP_FRAMES[hintStep]}
                      alt={`Puzzle 4 clue map ${hintStep + 1}`}
                      width={1600}
                      height={900}
                      priority={hintStep === 0}
                      className="h-auto w-full object-contain brightness-[1.02] contrast-[1.06]"
                    />
                  </div>
                </div>
              </section>

              <aside className="space-y-4">
                <div className="rounded-3xl border border-black/10 bg-white/80 p-4 shadow-[0_8px_28px_rgba(0,0,0,0.05)]">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-z-orange">
                    {t.riddleLabel}
                  </p>

                  <p className="mt-2 text-sm leading-7 text-neutral-800 sm:text-[15px]">
                    {t.riddle}
                  </p>

                  <p className="mt-3 text-xs leading-5 text-neutral-500">
                    {t.ui.hintHelper}
                  </p>
                </div>

                {!foundIt && (
                  <div className="rounded-3xl border border-black/10 bg-white/85 p-4 shadow-[0_8px_28px_rgba(0,0,0,0.05)] animate-[zowarFadeUp_320ms_cubic-bezier(.22,1,.36,1)_1]">
                    <p className="text-sm leading-6 text-neutral-700">
                      {t.ui.keepWalking}
                    </p>

                    <button
                      type="button"
                      onClick={handleFoundIt}
                      className="mt-4 w-full rounded-2xl bg-z-orange px-4 py-3 text-sm font-semibold text-white shadow-[0_10px_26px_rgba(200,105,74,0.25)] transition hover:opacity-95"
                    >
                      {t.ui.foundIt}
                    </button>
                  </div>
                )}

                {foundIt && (
                  <div
                    id="r4-arrival-check"
                    className="rounded-3xl border border-black/10 bg-white/85 p-4 shadow-[0_8px_28px_rgba(0,0,0,0.05)] animate-[zowarRevealQuestion_420ms_cubic-bezier(.22,1,.36,1)_1]"
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-z-orange">
                      {t.ui.arrivalCheck}
                    </p>

                    <h3 className="mt-2 text-lg font-semibold text-neutral-950">
                      {t.ui.arrivalPrompt}
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-neutral-600">
                      {t.ui.arrivalSub}
                    </p>

                    <div className="mt-4 grid grid-cols-3 gap-2">
                      {LOGO_OPTIONS.map((option, idx) => (
                        <LogoOption
                          key={option.id}
                          src={option.src}
                          alt={`Falafel logo option ${idx + 1}`}
                          selected={selectedLogoId === option.id}
                          onClick={() => chooseLogo(option.id)}
                        />
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={checkAnswer}
                      disabled={!selectedLogoId}
                      className="mt-4 w-full rounded-2xl bg-z-orange px-4 py-3 text-sm font-semibold text-white shadow-[0_10px_26px_rgba(200,105,74,0.25)] transition hover:opacity-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
                    >
                      {t.ui.check}
                    </button>

                    {status === "wrong" && (
                      <p className="mt-3 rounded-2xl border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
                        {selectedLogoId ? t.ui.tryAgain : t.ui.selectOne}
                      </p>
                    )}

                    {status === "correct" && (
                      <div className="mt-3 space-y-3">
                        <div className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-green-800">
                          <p className="text-sm font-semibold">
                            {t.ui.solved}
                          </p>

                          <p className="mt-1 text-sm">{t.ui.nextStep}</p>
                        </div>

                        <div className="rounded-2xl border border-z-orange/20 bg-z-orange-soft px-4 py-3 text-neutral-800">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-z-orange">
                            {t.ui.aboutTitle}
                          </p>

                          <div className="mt-2 space-y-3 text-sm leading-6">
                            {(t.ui.aboutText as readonly string[]).map((p, i) => (
                              <p key={i}>{p}</p>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </aside>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes zowarMapSwap {
          0% {
            opacity: 0;
            transform: translateY(8px) scale(0.988);
            filter: saturate(0.95);
          }

          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: saturate(1);
          }
        }

        @keyframes zowarHintBadge {
          0% {
            opacity: 0;
            transform: translateY(-6px) scale(0.96);
          }

          15% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }

          82% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }

          100% {
            opacity: 0;
            transform: translateY(-4px) scale(0.98);
          }
        }

        @keyframes zowarFadeUp {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }

          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes zowarRevealQuestion {
          0% {
            opacity: 0;
            transform: translateY(12px) scale(0.985);
            filter: blur(2px);
          }

          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }

        @keyframes zowarShake {
          0%,
          100% {
            transform: translateX(0);
          }

          25% {
            transform: translateX(-4px);
          }

          50% {
            transform: translateX(4px);
          }

          75% {
            transform: translateX(-2px);
          }
        }
      `}</style>
    </div>
  );
}
