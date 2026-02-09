"use client";

import React from "react";
import { setRoundSolved } from "./progress";
import type { Locale } from "./riddlecontent";

/* -------------------- HELPERS -------------------- */

function normalizeAnswer(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ")
    .replace(/[^\p{L}\p{N}\s]/gu, "");
}

function levenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;

  const dp = Array.from({ length: m + 1 }, () => new Array<number>(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
    }
  }
  return dp[m][n];
}

function isCloseEnough(input: string, accepted: readonly string[]): boolean {
  const norm = normalizeAnswer(input);
  if (!norm) return false;

  const acceptedNorm = accepted.map(normalizeAnswer);
  if (acceptedNorm.includes(norm)) return true;

  const maxEdits = norm.length <= 5 ? 1 : 2;
  return acceptedNorm.some((a) => levenshtein(norm, a) <= maxEdits);
}

/* -------------------- RIDDLE CONTENT -------------------- */

const riddle1 = {
  title: { en: "Riddle 1", ar: "اللغز ١" },
  prompt: {
    en: `Red crown upon my head,
A hundred jewels I guard in bed.
Inside are pearls, outside is leather,
Name this fruit, if you are clever.`,
    ar: `تاج أحمر فوق رأسي،
أخفي مئة جوهرة في بطني.
من جوة لؤلؤ، ومن برة جلد،
احزر الفاكهة إن كنت ذكي.`,
  },
  hint: {
    en: "Think of a fruit filled with jewel-like seeds.",
    ar: "فكّر بفاكهة مليئة ببذور تشبه الجواهر.",
  },
  answer: { en: "Pomegranate", ar: "رمان" },
  acceptedAnswers: {
    en: ["pomegranate", "a pomegranate"],
    ar: ["رمان", "الرمان"],
  },
  ui: {
    showHint: { en: "Show hint", ar: "إظهار التلميح" },
    hideHint: { en: "Hide hint", ar: "إخفاء التلميح" },
    showAnswer: { en: "Show answer", ar: "إظهار الإجابة" },
    hideAnswer: { en: "Hide answer", ar: "إخفاء الإجابة" },
    yourAnswer: { en: "Your answer", ar: "إجابتك" },
    placeholder: { en: "Type your answer...", ar: "اكتب إجابتك..." },
    check: { en: "Check", ar: "تحقق" },
    reset: { en: "Reset", ar: "إعادة" },
  },
  success: { en: "Correct ✅", ar: "إجابة صحيحة ✅" },
  closeEnough: { en: "Close enough ✅ (we’ll count it!)", ar: "قريبة جدًا ✅ (مقبولة!)" },
  tryAgain: { en: "Not quite — try again.", ar: "ليست صحيحة — حاول مرة أخرى." },
} as const;

/* -------------------- COMPONENT -------------------- */

export default function PuzzleR1({
  locale,
  onSolved,
}: {
  locale: Locale;
  onSolved?: () => void;
}) {
  const safeLocale: Locale = locale === "ar" ? "ar" : "en";
  const isAr = safeLocale === "ar";
  const t = riddle1;

  const [answer, setAnswer] = React.useState("");
  const [showHint, setShowHint] = React.useState(false);
  const [showAnswer, setShowAnswer] = React.useState(false);
  const [status, setStatus] = React.useState<"idle" | "correct" | "close" | "wrong">("idle");

  const solvedOnceRef = React.useRef(false);

  const markSolved = React.useCallback(
    (nextStatus: "correct" | "close") => {
      if (solvedOnceRef.current) return;
      solvedOnceRef.current = true;

      setStatus(nextStatus);
      setRoundSolved("r1");
      onSolved?.();
    },
    [onSolved]
  );

  const check = React.useCallback(() => {
    if (solvedOnceRef.current) return;

    const accepted = t.acceptedAnswers[safeLocale];
    const norm = normalizeAnswer(answer);
    if (!norm) return;

    if (accepted.map(normalizeAnswer).includes(norm)) {
      markSolved("correct");
    } else if (isCloseEnough(answer, accepted)) {
      markSolved("close");
    } else {
      setStatus("wrong");
    }
  }, [answer, safeLocale, t.acceptedAnswers, markSolved]);

  function reset() {
    setAnswer("");
    setShowHint(false);
    setShowAnswer(false);
    setStatus("idle");
    solvedOnceRef.current = false;
  }

  const cardGlow =
    status === "correct"
      ? "ring-2 ring-green-500/35 shadow-[0_0_70px_rgba(34,197,94,0.20)]"
      : status === "wrong"
      ? "ring-2 ring-red-500/25"
      : status === "close"
      ? "ring-2 ring-orange-500/25"
      : "ring-1 ring-white/10";

  const successPulse =
    status === "correct"
      ? "animate-[zowarSuccessPulse_900ms_ease-out_1]"
      : status === "close"
      ? "animate-[zowarClosePulse_900ms_ease-out_1]"
      : "";

  const showSparkles = status === "correct" || status === "close";

  return (
    <div dir={isAr ? "rtl" : "ltr"} className="w-full">
      <div className="relative mx-auto mt-8 max-w-2xl">
        {/* Glow blobs (liquid glass vibe) */}
        <div className="pointer-events-none absolute -top-10 left-[-30px] h-48 w-48 rounded-full bg-amber-200/35 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-10 right-[-30px] h-56 w-56 rounded-full bg-sky-200/35 blur-3xl" />

        <section
          className={[
            "relative overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-5 backdrop-blur-xl",
            "shadow-[0_20px_70px_rgba(0,0,0,0.12)]",
            cardGlow,
            successPulse,
          ].join(" ")}
        >
          {/* Sparkles (subtle) */}
          {showSparkles && (
            <div className="pointer-events-none absolute inset-0">
              <span className="sparkle s1" />
              <span className="sparkle s2" />
              <span className="sparkle s3" />
              <span className="sparkle s4" />
            </div>
          )}

          {/* Header row */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-neutral-900">{t.title[safeLocale]}</h2>
              <p className="mt-1 text-sm text-neutral-700">
                {isAr ? "أجب عن اللغز لفتح الجولة التالية." : "Answer the riddle to unlock the next round."}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setShowHint((v) => !v);
                  setShowAnswer(false);
                }}
                className="rounded-xl border border-white/30 bg-white/10 px-3 py-2 text-sm text-neutral-900 hover:bg-white/15"
              >
                {showHint ? t.ui.hideHint[safeLocale] : t.ui.showHint[safeLocale]}
              </button>

              {showHint && (
                <button
                  type="button"
                  onClick={() => setShowAnswer((v) => !v)}
                  className="rounded-xl border border-white/30 bg-white/10 px-3 py-2 text-sm text-neutral-900 hover:bg-white/15"
                >
                  {showAnswer ? t.ui.hideAnswer[safeLocale] : t.ui.showAnswer[safeLocale]}
                </button>
              )}
            </div>
          </div>

          {/* Prompt */}
          <div className="mt-5 rounded-2xl border border-white/20 bg-white/10 p-4 text-neutral-900">
            <p className="whitespace-pre-line leading-relaxed">{t.prompt[safeLocale]}</p>
          </div>

          {/* Hint / Answer */}
          {showHint && (
            <div className="mt-4 rounded-2xl border border-white/20 bg-white/10 p-4 text-sm text-neutral-800">
              <div className="font-semibold text-neutral-900">{isAr ? "التلميح" : "Hint"}</div>
              <div className="mt-1">{t.hint[safeLocale]}</div>

              {showAnswer && (
                <div className="mt-4 rounded-2xl border border-white/20 bg-white/10 p-3">
                  <div className="font-semibold text-neutral-900">{isAr ? "الإجابة" : "Answer"}</div>
                  <div className="mt-1">{t.answer[safeLocale]}</div>
                </div>
              )}
            </div>
          )}

          {/* Answer input */}
          <div className="mt-6">
            <label className="text-sm font-semibold text-neutral-900">
              {t.ui.yourAnswer[safeLocale]}
            </label>

            <input
              value={answer}
              onChange={(e) => {
                setAnswer(e.target.value);
                if (!solvedOnceRef.current) setStatus("idle");
              }}
              onKeyDown={(e) => e.key === "Enter" && check()}
              placeholder={t.ui.placeholder[safeLocale]}
              className="mt-2 w-full rounded-2xl border border-white/25 bg-white/10 px-4 py-3 text-neutral-900 outline-none placeholder:text-neutral-500 focus:border-neutral-900/50 focus:bg-white/15"
            />

            <div className="mt-4 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={check}
                className="rounded-2xl bg-neutral-900 px-4 py-2 text-sm font-semibold text-white hover:opacity-95"
              >
                {t.ui.check[safeLocale]}
              </button>

              <button
                type="button"
                onClick={reset}
                className="rounded-2xl border border-white/30 bg-white/10 px-4 py-2 text-sm font-medium text-neutral-900 hover:bg-white/15"
              >
                {t.ui.reset[safeLocale]}
              </button>
            </div>

            {/* Feedback */}
            <div
              className={`mt-4 transition-all duration-500 ease-out ${
                status === "idle"
                  ? "pointer-events-none translate-y-2 opacity-0"
                  : "translate-y-0 opacity-100"
              }`}
            >
              {status === "wrong" && (
                <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-neutral-900">
                  {t.tryAgain[safeLocale]}
                </div>
              )}

              {status === "close" && (
                <div className="rounded-2xl border border-orange-500/20 bg-orange-500/10 p-3 text-sm text-neutral-900 animate-[zowarPop_520ms_ease-out_1]">
                  {t.closeEnough[safeLocale]}
                </div>
              )}

              {status === "correct" && (
                <div className="rounded-2xl border border-green-500/20 bg-green-500/10 p-3 text-sm text-neutral-900 animate-[zowarPop_520ms_ease-out_1]">
                  {t.success[safeLocale]}
                </div>
              )}
            </div>
          </div>

          <style jsx>{`
            /* sparkle dots */
            .sparkle {
              position: absolute;
              width: 6px;
              height: 6px;
              border-radius: 9999px;
              opacity: 0;
              background: rgba(255, 255, 255, 0.75);
              filter: blur(0.2px);
              animation: zowarSparkle 850ms ease-out 1;
            }
            .s1 {
              top: 16px;
              left: 22px;
              animation-delay: 40ms;
            }
            .s2 {
              top: 34px;
              right: 34px;
              animation-delay: 120ms;
            }
            .s3 {
              top: 58px;
              left: 55%;
              animation-delay: 200ms;
            }
            .s4 {
              top: 22px;
              left: 70%;
              animation-delay: 280ms;
            }

            @keyframes zowarSparkle {
              0% {
                transform: translateY(6px) scale(0.7);
                opacity: 0;
              }
              35% {
                opacity: 0.9;
              }
              100% {
                transform: translateY(-10px) scale(1.1);
                opacity: 0;
              }
            }

            @keyframes zowarPop {
              0% {
                transform: translateY(2px) scale(0.98);
                filter: brightness(1);
              }
              45% {
                transform: translateY(-1px) scale(1.02);
                filter: brightness(1.08);
              }
              100% {
                transform: translateY(0) scale(1);
                filter: brightness(1);
              }
            }

            @keyframes zowarSuccessPulse {
              0% {
                box-shadow: 0 20px 70px rgba(0, 0, 0, 0.12);
              }
              45% {
                box-shadow: 0 25px 85px rgba(34, 197, 94, 0.18);
              }
              100% {
                box-shadow: 0 20px 70px rgba(0, 0, 0, 0.12);
              }
            }

            @keyframes zowarClosePulse {
              0% {
                box-shadow: 0 20px 70px rgba(0, 0, 0, 0.12);
              }
              45% {
                box-shadow: 0 25px 85px rgba(245, 158, 11, 0.16);
              }
              100% {
                box-shadow: 0 20px 70px rgba(0, 0, 0, 0.12);
              }
            }
          `}</style>
        </section>
      </div>
    </div>
  );
}
