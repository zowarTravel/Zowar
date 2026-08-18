"use client";

import React from "react";
import { setRoundSolved, serverSetRoundSolved, readProgress } from "./progress";
import type { Locale } from "./riddlecontent";

const ROUND_KEY = "r5b" as const;

const COPY = {
  en: {
    badge: "Round 6 · Riddle",
    title: "The Desert Wanderer",
    subtitle: "Answer the riddle to unlock the next round.",
    prompt: `A hill on my back,\nI kneel before I rise,\nI walk on burning ground,\nand sail where no water lies.`,
    hint1: "An animal known for surviving where nothing else can — across deserts and trade routes for thousands of years.",
    hint2: "Think of the animal that's an unofficial symbol of the Arab world.",
    answer: "Camel",
    showHint: "I need a clue",
    hideHint: "Hide clue",
    showAnswer: "Show answer",
    hideAnswer: "Hide answer",
    yourAnswer: "Your answer",
    placeholder: "Type your answer…",
    check: "Check",
    checking: "Checking…",
    reset: "Reset",
    wrong: "Not quite — try again.",
    closeEnough: "Close enough ✅ — we'll count it!",
    success: "That's it! ✅",
    lockedTitle: "Round 6 Locked",
    lockedBody: "Solve Round 5 first to unlock this riddle.",
    revealEyebrow: "You found it",
    revealTitle: "Mlabbas",
    revealAbout: "Mlabbas is a playful Jordanian design shop filled with locally inspired clothing, gifts, and unexpected details. Keep an eye out for its larger-than-life camel, built from bicycle parts and standing watch over Rainbow Street.",
    revealPrompt: "Now look around and find the camel that never leaves its post.",
  },
  ar: {
    badge: "الجولة ٦ · لغز",
    title: "المسافر الصحراوي",
    subtitle: "أجب عن اللغز لفتح الجولة التالية.",
    prompt: `على ظهري تلّ،\nأركع قبل أن أنهض،\nأمشي فوق أرضٍ تحترق،\nوأبحر حيث لا ماء.`,
    hint1: "حيوان اشتُهر بالبقاء في أقسى الظروف — عبر الصحاري وطرق التجارة منذ آلاف السنين.",
    hint2: "فكّر في الحيوان الذي يُعدّ رمزاً غير رسمي للعالم العربي.",
    answer: "جمل",
    showHint: "أحتاج تلميحاً",
    hideHint: "إخفاء التلميح",
    showAnswer: "إظهار الإجابة",
    hideAnswer: "إخفاء الإجابة",
    yourAnswer: "إجابتك",
    placeholder: "اكتب إجابتك…",
    check: "تحقق",
    checking: "جارٍ التحقق…",
    reset: "إعادة",
    wrong: "ليست صحيحة — حاول مرة أخرى.",
    closeEnough: "قريبة جداً ✅ — مقبولة!",
    success: "إجابة صحيحة! ✅",
    lockedTitle: "الجولة ٦ مقفلة",
    lockedBody: "حل الجولة ٥ أولاً لفتح هذا اللغز.",
    revealEyebrow: "وجدته",
    revealTitle: "ملبّس",
    revealAbout: "ملبّس محل تصميم أردني مرح مليء بالملابس والهدايا المستوحاة من البيئة المحلية وتفاصيل غير متوقعة. تفقّد جمله الضخم المصنوع من قطع الدراجات الهوائية والمرابط في مدخله يحرس شارع الرينبو.",
    revealPrompt: "الآن انظر حولك وابحث عن الجمل الذي لا يغادر مكانه.",
  },
} as const;

export default function PuzzleR5b({
  locale,
  onSolved,
}: {
  locale: Locale;
  onSolved?: () => void;
}) {
  const safeLocale: Locale = locale === "ar" ? "ar" : "en";
  const isAr = safeLocale === "ar";
  const t = COPY[safeLocale];

  const progress = React.useMemo(() => readProgress(), []);
  const locked = !progress.r5;

  const [answer, setAnswer] = React.useState("");
  const [showHint, setShowHint] = React.useState(false);
  const [showAnswer, setShowAnswer] = React.useState(false);
  const [status, setStatus] = React.useState<"idle" | "correct" | "close" | "wrong">("idle");
  const [isChecking, setIsChecking] = React.useState(false);

  const solvedOnceRef = React.useRef(false);

  const markSolved = React.useCallback(
    (nextStatus: "correct" | "close") => {
      if (solvedOnceRef.current) return;
      solvedOnceRef.current = true;

      setStatus(nextStatus);
      setRoundSolved(ROUND_KEY);
      serverSetRoundSolved(ROUND_KEY);
      onSolved?.();
    },
    [onSolved]
  );

  const check = React.useCallback(async () => {
    if (solvedOnceRef.current || isChecking) return;
    const norm = answer.trim();
    if (!norm) return;

    setIsChecking(true);
    try {
      const res = await fetch("/api/portal/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ round: ROUND_KEY, answer, locale: safeLocale }),
      });
      const { result } = await res.json();
      if (result === "correct") markSolved("correct");
      else if (result === "close") markSolved("close");
      else setStatus("wrong");
    } catch {
      setStatus("wrong");
    } finally {
      setIsChecking(false);
    }
  }, [answer, safeLocale, isChecking, markSolved]);

  function reset() {
    setAnswer("");
    setShowHint(false);
    setShowAnswer(false);
    setStatus("idle");
    solvedOnceRef.current = false;
  }

  if (locked) {
    return (
      <div className="rounded-3xl border border-neutral-200 bg-white p-5">
        <h2 className="text-xl font-semibold">{t.lockedTitle}</h2>
        <p className="mt-2 text-neutral-700">{t.lockedBody}</p>
      </div>
    );
  }

  const cardGlow =
    status === "correct"
      ? "ring-2 ring-green-500/35 shadow-[0_0_50px_rgba(34,197,94,0.14)]"
      : status === "wrong"
      ? "ring-2 ring-red-500/25"
      : status === "close"
      ? "ring-2 ring-z-terracotta/25 shadow-[0_0_40px_rgba(200,105,74,0.10)]"
      : "ring-1 ring-black/8";

  const successPulse =
    status === "correct"
      ? "animate-[zowarSuccessPulse_900ms_ease-out_1]"
      : status === "close"
      ? "animate-[zowarClosePulse_900ms_ease-out_1]"
      : "";

  const showSparkles = status === "correct" || status === "close";

  return (
    <div dir={isAr ? "rtl" : "ltr"} className="w-full">
      <div className="relative mx-auto mt-8 max-w-2xl px-1 sm:px-0">
        <div className="pointer-events-none absolute -top-6 left-[-10px] h-32 w-32 rounded-full bg-z-orange-soft blur-3xl opacity-40" />
        <div className="pointer-events-none absolute -bottom-8 right-[-10px] h-36 w-36 rounded-full bg-white blur-3xl opacity-30" />

        <section
          className={[
            "relative overflow-hidden rounded-3xl border border-black/10",
            "bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(250,247,242,0.94))]",
            "p-5 sm:p-6",
            "shadow-[0_16px_50px_rgba(0,0,0,0.10)]",
            cardGlow,
            successPulse,
          ].join(" ")}
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(255,255,255,0.45),rgba(255,255,255,0))]" />

          {showSparkles && (
            <div className="pointer-events-none absolute inset-0">
              <span className="sparkle s1" />
              <span className="sparkle s2" />
              <span className="sparkle s3" />
              <span className="sparkle s4" />
            </div>
          )}

          <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-z-orange bg-z-orange-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] z-orange">
                {t.badge}
              </div>
              <h2 className="text-2xl font-semibold tracking-tight text-neutral-950">
                {t.title}
              </h2>
              <p className="mt-1 text-sm text-neutral-700">{t.subtitle}</p>
            </div>

            <div className="flex flex-wrap gap-2 sm:justify-end">
              <button
                type="button"
                onClick={() => {
                  setShowHint((v) => !v);
                  setShowAnswer(false);
                }}
                className="rounded-2xl border border-black/10 bg-white px-4 py-2 text-sm font-medium text-neutral-900 shadow-sm transition hover:bg-neutral-50"
              >
                {showHint ? t.hideHint : t.showHint}
              </button>

              {showHint && (
                <button
                  type="button"
                  onClick={() => setShowAnswer((v) => !v)}
                  className="rounded-2xl border border-black/10 bg-white px-4 py-2 text-sm font-medium text-neutral-900 shadow-sm transition hover:bg-neutral-50"
                >
                  {showAnswer ? t.hideAnswer : t.showAnswer}
                </button>
              )}
            </div>
          </div>

          <div className="relative mt-5 rounded-2xl border border-black/8 bg-white/80 p-4 sm:p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
            <p className="whitespace-pre-line text-base leading-8 text-neutral-900">
              {t.prompt}
            </p>
          </div>

          {showHint && (
            <div className="relative mt-4 rounded-2xl border border-black/8 bg-z-off-white p-4 text-sm text-neutral-800">
              <div className="font-semibold text-neutral-950">{isAr ? "التلميح" : "Hint"}</div>
              <div className="mt-1 leading-7">{t.hint1}</div>
              <div className="mt-3 leading-7">{t.hint2}</div>

              {showAnswer && (
                <div className="mt-4 rounded-2xl border border-black/8 bg-white p-3">
                  <div className="font-semibold text-neutral-950">{isAr ? "الإجابة" : "Answer"}</div>
                  <div className="mt-1">{t.answer}</div>
                </div>
              )}
            </div>
          )}

          <div className="mt-6">
            <label className="text-sm font-semibold text-neutral-950">
              {t.yourAnswer}
            </label>

            <input
              value={answer}
              onChange={(e) => {
                setAnswer(e.target.value);
                if (!solvedOnceRef.current) setStatus("idle");
              }}
              onKeyDown={(e) => e.key === "Enter" && check()}
              placeholder={t.placeholder}
              className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-base text-neutral-950 outline-none placeholder:text-neutral-400 focus:border-z-orange focus:ring-4 focus:ring-[rgba(200,105,74,0.12)]"
            />

            <div className="mt-4 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={check}
                disabled={!answer.trim() || isChecking}
                className="rounded-2xl bg-z-orange px-5 py-3 text-sm font-semibold text-white transition hover:opacity-95 disabled:opacity-50"
              >
                {isChecking ? t.checking : t.check}
              </button>

              <button
                type="button"
                onClick={reset}
                className="rounded-2xl border border-black/10 bg-white px-5 py-3 text-sm font-medium text-neutral-900 transition hover:bg-neutral-50"
              >
                {t.reset}
              </button>
            </div>

            <div
              className={`mt-4 transition-all duration-500 ease-out ${
                status === "idle"
                  ? "pointer-events-none translate-y-2 opacity-0"
                  : "translate-y-0 opacity-100"
              }`}
            >
              {status === "wrong" && (
                <div className="rounded-2xl border border-red-500/20 bg-red-50 p-3 text-sm text-neutral-900">
                  {t.wrong}
                </div>
              )}

              {status === "close" && (
                <div className="rounded-2xl border border-z-terracotta/20 bg-z-terracotta-soft p-3 text-sm text-neutral-900 animate-[zowarPop_520ms_ease-out_1]">
                  {t.closeEnough}
                </div>
              )}

              {status === "correct" && (
                <div className="rounded-2xl border border-green-500/20 bg-green-50 p-3 text-sm text-neutral-900 animate-[zowarPop_520ms_ease-out_1]">
                  {t.success}
                </div>
              )}
            </div>
          </div>

          {(status === "correct" || status === "close") && (
            <div className="mt-6 overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-50 animate-[zowarFadeUp_420ms_cubic-bezier(.22,1,.36,1)_1]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/Mechanical%20Camel.png"
                alt="The mechanical camel at Mlabbas"
                className="w-full object-cover"
                style={{ aspectRatio: "4/3" }}
              />
              <div className="p-5">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-z-orange">
                {t.revealEyebrow}
              </div>
              <h3 className="mt-2 text-xl font-semibold text-neutral-950">
                {t.revealTitle}
              </h3>
              <div className="mt-3 space-y-3 text-sm leading-7 text-neutral-700">
                <p>{t.revealAbout}</p>
              </div>
              <div className="mt-4 rounded-2xl border border-z-orange/20 bg-white px-4 py-3">
                <p className="text-sm leading-6 text-neutral-800">{t.revealPrompt}</p>
              </div>
              </div>
            </div>
          )}

          <style jsx>{`
            .sparkle {
              position: absolute;
              width: 6px;
              height: 6px;
              border-radius: 9999px;
              opacity: 0;
              background: rgba(200, 105, 74, 0.7);
              filter: blur(0.2px);
              animation: zowarSparkle 850ms ease-out 1;
            }
            .s1 { top: 16px; left: 22px; animation-delay: 40ms; }
            .s2 { top: 34px; right: 34px; animation-delay: 120ms; }
            .s3 { top: 58px; left: 55%; animation-delay: 200ms; }
            .s4 { top: 22px; left: 70%; animation-delay: 280ms; }

            @keyframes zowarSparkle {
              0%   { transform: translateY(6px) scale(0.7); opacity: 0; }
              35%  { opacity: 0.9; }
              100% { transform: translateY(-10px) scale(1.1); opacity: 0; }
            }
            @keyframes zowarPop {
              0%   { transform: translateY(2px) scale(0.98); filter: brightness(1); }
              45%  { transform: translateY(-1px) scale(1.02); filter: brightness(1.04); }
              100% { transform: translateY(0) scale(1); filter: brightness(1); }
            }
            @keyframes zowarSuccessPulse {
              0%   { box-shadow: 0 16px 50px rgba(0, 0, 0, 0.1); }
              45%  { box-shadow: 0 20px 60px rgba(34, 197, 94, 0.14); }
              100% { box-shadow: 0 16px 50px rgba(0, 0, 0, 0.1); }
            }
            @keyframes zowarClosePulse {
              0%   { box-shadow: 0 16px 50px rgba(0, 0, 0, 0.1); }
              45%  { box-shadow: 0 20px 60px rgba(200, 105, 74, 0.12); }
              100% { box-shadow: 0 16px 50px rgba(0, 0, 0, 0.1); }
            }
            @keyframes zowarFadeUp {
              0%   { opacity: 0; transform: translateY(10px); }
              100% { opacity: 1; transform: translateY(0); }
            }
          `}</style>
        </section>
      </div>
    </div>
  );
}
