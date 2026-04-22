"use client";

import React from "react";
import { setRoundSolved, serverSetRoundSolved } from "./progress";
import { riddle1 } from "./riddlecontent";
import type { Locale } from "./riddlecontent";

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
  const [isChecking, setIsChecking] = React.useState(false);

  const solvedOnceRef = React.useRef(false);

  const markSolved = React.useCallback(
    (nextStatus: "correct" | "close") => {
      if (solvedOnceRef.current) return;
      solvedOnceRef.current = true;

      setStatus(nextStatus);
      setRoundSolved("r1");
      serverSetRoundSolved("r1"); // fire-and-forget server sync
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
        body: JSON.stringify({ round: "r1", answer, locale: safeLocale }),
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

  const cardGlow =
    status === "correct"
      ? "ring-2 ring-green-500/35 shadow-[0_0_50px_rgba(34,197,94,0.14)]"
      : status === "wrong"
      ? "ring-2 ring-red-500/25"
      : status === "close"
      ? "ring-2 ring-orange-500/25 shadow-[0_0_40px_rgba(249,115,22,0.10)]"
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
        {/* Softer background glow accents */}
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
          {/* subtle top sheen */}
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
                {isAr ? "الجولة ١ · لغز" : "Round 1 · Riddle"}
              </div>
              <h2 className="text-2xl font-semibold tracking-tight text-neutral-950">
                {t.title[safeLocale]}
              </h2>
              <p className="mt-1 text-sm text-neutral-700">
                {isAr ? "أجب عن اللغز لفتح الجولة التالية." : "Answer the riddle to unlock the next round."}
              </p>
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
                {showHint ? t.ui.hideHint[safeLocale] : t.ui.showHint[safeLocale]}
              </button>

              {showHint && (
                <button
                  type="button"
                  onClick={() => setShowAnswer((v) => !v)}
                  className="rounded-2xl border border-black/10 bg-white px-4 py-2 text-sm font-medium text-neutral-900 shadow-sm transition hover:bg-neutral-50"
                >
                  {showAnswer ? t.ui.hideAnswer[safeLocale] : t.ui.showAnswer[safeLocale]}
                </button>
              )}
            </div>
          </div>

          <div className="relative mt-5 rounded-2xl border border-black/8 bg-white/80 p-4 sm:p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
            <p className="whitespace-pre-line text-base leading-8 text-neutral-900">
              {t.prompt[safeLocale]}
            </p>
          </div>

          {showHint && (
            <div className="relative mt-4 rounded-2xl border border-black/8 bg-[#fffaf4] p-4 text-sm text-neutral-800">
              <div className="font-semibold text-neutral-950">{isAr ? "التلميح" : "Hint"}</div>
              <div className="mt-1 leading-7">{t.hint[safeLocale]}</div>

              {showAnswer && (
                <div className="mt-4 rounded-2xl border border-black/8 bg-white p-3">
                  <div className="font-semibold text-neutral-950">{isAr ? "الإجابة" : "Answer"}</div>
                  <div className="mt-1">{t.answer[safeLocale]}</div>
                </div>
              )}
            </div>
          )}

          <div className="mt-6">
            <label className="text-sm font-semibold text-neutral-950">
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
              className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-base text-neutral-950 outline-none placeholder:text-neutral-400 focus:border-z-orange focus:ring-4 focus:ring-orange-100"
            />

            <div className="mt-4 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={check}
                disabled={!answer.trim() || isChecking}
                className="rounded-2xl bg-z-orange px-5 py-3 text-sm font-semibold text-white transition hover:opacity-95 disabled:opacity-50"
              >
                {isChecking ? t.ui.checking[safeLocale] : t.ui.check[safeLocale]}
              </button>

              <button
                type="button"
                onClick={reset}
                className="rounded-2xl border border-black/10 bg-white px-5 py-3 text-sm font-medium text-neutral-900 transition hover:bg-neutral-50"
              >
                {t.ui.reset[safeLocale]}
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
                  {t.tryAgain[safeLocale]}
                </div>
              )}

              {status === "close" && (
                <div className="rounded-2xl border border-orange-500/20 bg-orange-50 p-3 text-sm text-neutral-900 animate-[zowarPop_520ms_ease-out_1]">
                  {t.closeEnough[safeLocale]}
                </div>
              )}

              {status === "correct" && (
                <div className="rounded-2xl border border-green-500/20 bg-green-50 p-3 text-sm text-neutral-900 animate-[zowarPop_520ms_ease-out_1]">
                  {t.success[safeLocale]}
                </div>
              )}
            </div>
          </div>

          <style jsx>{`
            .sparkle {
              position: absolute;
              width: 6px;
              height: 6px;
              border-radius: 9999px;
              opacity: 0;
              background: rgba(249, 115, 22, 0.7);
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
                filter: brightness(1.04);
              }
              100% {
                transform: translateY(0) scale(1);
                filter: brightness(1);
              }
            }

            @keyframes zowarSuccessPulse {
              0% {
                box-shadow: 0 16px 50px rgba(0, 0, 0, 0.1);
              }
              45% {
                box-shadow: 0 20px 60px rgba(34, 197, 94, 0.14);
              }
              100% {
                box-shadow: 0 16px 50px rgba(0, 0, 0, 0.1);
              }
            }

            @keyframes zowarClosePulse {
              0% {
                box-shadow: 0 16px 50px rgba(0, 0, 0, 0.1);
              }
              45% {
                box-shadow: 0 20px 60px rgba(249, 115, 22, 0.12);
              }
              100% {
                box-shadow: 0 16px 50px rgba(0, 0, 0, 0.1);
              }
            }
          `}</style>
        </section>
      </div>
    </div>
  );
}
