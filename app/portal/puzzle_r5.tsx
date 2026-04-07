"use client";

import React from "react";
import { setRoundSolved, serverSetRoundSolved } from "./progress";
import type { Locale } from "./riddlecontent";
import { riddle5 } from "./riddlecontent";

/* -------------------- HELPERS -------------------- */

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function isSolved(order: number[]) {
  for (let i = 0; i < order.length; i++) if (order[i] !== i) return false;
  return true;
}

function shuffled(total: number) {
  const arr = Array.from({ length: total }, (_, i) => i);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  if (isSolved(arr) && arr.length >= 2) [arr[0], arr[1]] = [arr[1], arr[0]];
  return arr;
}

/* -------------------- COMPONENT -------------------- */

type Props = {
  locale: Locale;
  onSolved?: () => void;
};

type Spark = {
  id: string;
  x: number;
  y: number;
};

export default function PuzzleR5({ locale, onSolved }: Props) {
  const safeLocale: Locale = locale === "ar" ? "ar" : "en";
  const isAr = safeLocale === "ar";

  const t: any = riddle5 ?? {};
  const grid = clamp(t.gridSize ?? 3, 2, 5);
  const total = grid * grid;

  const imageSrc: string = typeof t.imageSrc === "string" ? t.imageSrc : "";
  const canShowImage = Boolean(imageSrc);

  const [order, setOrder] = React.useState<number[]>(() => shuffled(total));
  const [selected, setSelected] = React.useState<number | null>(null);

  const [locked, setLocked] = React.useState<boolean[]>(() =>
    Array.from({ length: total }, () => false)
  );

  const prevLockedRef = React.useRef<boolean[]>(Array.from({ length: total }, () => false));
  const [snapPulse, setSnapPulse] = React.useState<number[]>(() =>
    Array.from({ length: total }, () => 0)
  );

  const [showHint, setShowHint] = React.useState(false);
  const [solved, setSolved] = React.useState(false);

  const [merged, setMerged] = React.useState(false);
  const mergeTimerRef = React.useRef<number | null>(null);

  const [sparks, setSparks] = React.useState<Spark[]>([]);
  const sparkTimerRef = React.useRef<number | null>(null);

  const solvedOnceRef = React.useRef(false);

  /* -------------------- EFFECTS -------------------- */

  React.useEffect(() => {
    const nextLocked = order.map((pieceId, slotIndex) => pieceId === slotIndex);

    const prev = prevLockedRef.current;
    const nextPulse = [...snapPulse];
    let changed = false;

    for (let i = 0; i < total; i++) {
      if (!prev[i] && nextLocked[i]) {
        nextPulse[i] = Date.now();
        changed = true;
      }
    }

    prevLockedRef.current = nextLocked;
    setLocked(nextLocked);
    if (changed) setSnapPulse(nextPulse);

    if (!solved && isSolved(order)) {
      setSolved(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order, solved]);

  React.useEffect(() => {
    if (!solved || solvedOnceRef.current) return;
    solvedOnceRef.current = true;

    setRoundSolved("r5");
    serverSetRoundSolved("r5"); // fire-and-forget server sync
    onSolved?.();

    const count = 16;
    setSparks(
      Array.from({ length: count }, (_, i) => ({
        id: `${Date.now()}_${i}`,
        x: 15 + Math.random() * 70,
        y: 12 + Math.random() * 70,
      }))
    );

    if (sparkTimerRef.current) window.clearTimeout(sparkTimerRef.current);
    sparkTimerRef.current = window.setTimeout(() => setSparks([]), 900);

    setMerged(false);
    if (mergeTimerRef.current) window.clearTimeout(mergeTimerRef.current);
    mergeTimerRef.current = window.setTimeout(() => setMerged(true), 600);
  }, [solved, onSolved]);

  React.useEffect(() => {
    return () => {
      if (sparkTimerRef.current) window.clearTimeout(sparkTimerRef.current);
      if (mergeTimerRef.current) window.clearTimeout(mergeTimerRef.current);
    };
  }, []);

  function reset() {
    setSelected(null);
    setSolved(false);
    setMerged(false);
    solvedOnceRef.current = false;

    prevLockedRef.current = Array.from({ length: total }, () => false);
    setLocked(Array.from({ length: total }, () => false));
    setSparks([]);
    setOrder(shuffled(total));
  }

  function onTileClick(slotIndex: number) {
    if (solved) return;
    if (slotIndex < 0 || slotIndex >= total) return;

    if (selected === null) {
      setSelected(slotIndex);
      return;
    }

    if (selected === slotIndex) {
      setSelected(null);
      return;
    }

    setOrder((prev) => {
      const next = [...prev];
      [next[selected], next[slotIndex]] = [next[slotIndex], next[selected]];
      return next;
    });

    setSelected(null);
  }

  /* -------------------- COPY -------------------- */

  const title: string =
    t.title?.[safeLocale] ?? (isAr ? "الجولة ٥: رتّب الصورة" : "Round 5: Assemble the Image");

  const kicker: string = t.kicker?.[safeLocale] ?? (isAr ? "الجولة ٥" : "ROUND 5");

  const prompt: string =
    t.prompt?.[safeLocale] ??
    (isAr
      ? "اضغط على قطعتين لتبديل مكانهما. أكمل الصورة لتكشف وجهتك التالية."
      : "Tap two tiles to swap them. Complete the image to reveal your next destination.");

  const uiShowHint: string = isAr ? "إظهار التلميح" : "Show hint";
  const uiHideHint: string = isAr ? "إخفاء التلميح" : "Hide hint";
  const uiReset: string = t.ui?.reset?.[safeLocale] ?? (isAr ? "إعادة" : "Reset");
  const uiProgressLabel: string =
    t.ui?.progressLabel?.[safeLocale] ?? (isAr ? "القطع المثبّتة:" : "Locked pieces:");

  const success: string =
    t.success?.[safeLocale] ??
    (isAr ? "نعم! اكتملت الصورة بالكامل! ✨" : "Yes! You completed the image! ✨");

  const finalCTA: string =
    safeLocale === "en"
      ? "Continue towards the first circle in search of the area in the image!"
      : "تابع باتجاه الدائرة الأولى وابحث عن المكان الظاهر في الصورة!";

  const correctCount = locked.filter(Boolean).length;

  /* -------------------- STYLES -------------------- */

  const card =
    "rounded-3xl border border-black/10 " +
    "bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(250,247,242,0.94))] " +
    "shadow-[0_16px_50px_rgba(0,0,0,0.10)]";

  const btn =
    "rounded-2xl px-4 py-2 text-sm font-medium transition active:scale-[0.99] " +
    "border border-black/10 bg-white text-neutral-900 shadow-sm hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed";

  const btnOrange =
    "rounded-2xl px-4 py-2 text-sm font-semibold transition active:scale-[0.99] " +
    "border border-z-orange bg-z-orange-soft text-neutral-900 glow-z-orange";

  const shouldMerge = solved && merged;
  const gap = shouldMerge ? 0 : grid >= 4 ? 10 : 12;
  const pad = shouldMerge ? 0 : 14;

  return (
    <div dir={isAr ? "rtl" : "ltr"} className="mx-auto w-full max-w-5xl px-4 py-8 sm:py-10">
      <style>{`
        @keyframes zowar-snap {
          0%   { transform: scale(1); }
          45%  { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        @keyframes zowar-spark {
          0%   { transform: translateY(6px) scale(0.9); opacity: 0; }
          25%  { opacity: 1; }
          100% { transform: translateY(-18px) scale(1.08); opacity: 0; }
        }
      `}</style>

      <div className={`${card} p-5 sm:p-6`}>
        <div className="pointer-events-none absolute -top-6 left-[-10px] h-32 w-32 rounded-full bg-z-orange-soft blur-3xl opacity-40" />
        <div className="pointer-events-none absolute -bottom-8 right-[-10px] h-36 w-36 rounded-full bg-white blur-3xl opacity-30" />

        {/* Header */}
        <div className="relative flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-wider text-neutral-500">{kicker}</div>
            <h1 className="mt-1 text-2xl font-semibold text-neutral-950 sm:text-3xl">{title}</h1>
            <p className="mt-2 text-sm leading-relaxed text-neutral-700">{prompt}</p>
          </div>

          <div className="flex items-center gap-2 pt-2 sm:pt-0">
            <button className={btn} onClick={() => setShowHint((v) => !v)} disabled={solved}>
              {showHint ? uiHideHint : uiShowHint}
            </button>
            <button className={btn} onClick={reset}>
              {uiReset}
            </button>
          </div>
        </div>

        {showHint && !solved ? (
          <div className="mt-4 rounded-2xl border border-black/8 bg-[#fffaf4] p-4 text-sm text-neutral-700">
            {isAr
              ? "القطع الصحيحة تظهر بإطار أخضر، والقطع غير الصحيحة بإطار أحمر. بدّل بين قطعتين في كل مرة."
              : "Correct pieces show a green outline, and incorrect pieces show a red outline. Swap two pieces at a time."}
          </div>
        ) : null}

        {/* Board */}
        <div className="mt-6">
          <div className="relative mx-auto w-full max-w-[720px]">
            <div
              className={[
                "relative aspect-square overflow-hidden border border-black/10 bg-white",
                shouldMerge ? "rounded-3xl" : "rounded-[28px]",
              ].join(" ")}
              style={{ boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.04)" }}
            >
              {!shouldMerge ? (
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.20),rgba(255,255,255,0)),linear-gradient(0deg,rgba(0,0,0,0.06),rgba(0,0,0,0))]" />
              ) : null}

              <div
                className="absolute inset-0 grid transition-all duration-500 ease-out"
                style={{
                  padding: pad,
                  gap,
                  gridTemplateColumns: `repeat(${grid}, minmax(0, 1fr))`,
                  gridTemplateRows: `repeat(${grid}, minmax(0, 1fr))`,
                }}
              >
                {order.map((pieceId, slotIndex) => {
                  const isSelected = selected === slotIndex;
                  const isCorrect = pieceId === slotIndex;

                  const pieceRow = Math.floor(pieceId / grid);
                  const pieceCol = pieceId % grid;

                  const bgPosX = grid === 1 ? 0 : (pieceCol / (grid - 1)) * 100;
                  const bgPosY = grid === 1 ? 0 : (pieceRow / (grid - 1)) * 100;

                  const pulseKey = snapPulse[slotIndex];
                  const shouldPulse = Boolean(pulseKey) && isCorrect && !shouldMerge;

                  const showHintOverlay = showHint && !solved;
                  const hintRing = showHintOverlay
                    ? isCorrect
                      ? "ring-2 ring-emerald-400/80"
                      : "ring-2 ring-rose-400/70"
                    : "";

                  const hintTint = showHintOverlay
                    ? isCorrect
                      ? "bg-emerald-400/10"
                      : "bg-rose-400/10"
                    : "";

                  return (
                    <button
                      key={slotIndex}
                      type="button"
                      onClick={() => onTileClick(slotIndex)}
                      disabled={solved}
                      className={[
                        "group relative overflow-hidden transition-transform duration-150 ease-out focus:outline-none",
                        shouldMerge
                          ? "rounded-none border-0 bg-transparent shadow-none"
                          : "rounded-2xl border border-black/10 bg-white shadow-[0_8px_24px_rgba(0,0,0,0.10)]",
                        solved ? "cursor-default" : "cursor-pointer",
                        isSelected && !solved
                          ? "scale-[0.985] ring-2 ring-z-orange glow-z-orange"
                          : !solved
                          ? "hover:-translate-y-[1px]"
                          : "",
                        hintRing,
                      ].join(" ")}
                      style={{
                        animation: shouldPulse ? `zowar-snap 240ms ease-out` : undefined,
                      }}
                      aria-label={isAr ? `قطعة ${slotIndex + 1}` : `Tile ${slotIndex + 1}`}
                    >
                      <div
                        className="absolute inset-0"
                        style={{
                          backgroundImage: canShowImage ? `url(${imageSrc})` : undefined,
                          backgroundSize: `${grid * 100}% ${grid * 100}%`,
                          backgroundPosition: `${bgPosX}% ${bgPosY}%`,
                          opacity: solved ? 1 : 0.98,
                          transform: isSelected ? "scale(1.02)" : "scale(1)",
                          transition: "transform 160ms ease, opacity 300ms ease",
                        }}
                      />

                      {!shouldMerge ? (
                        <>
                          <div
                            className="pointer-events-none absolute inset-0"
                            style={{
                              boxShadow:
                                "inset 0 0 0 1px rgba(255,255,255,0.12), inset 0 1px 0 rgba(255,255,255,0.08)",
                            }}
                          />
                          {showHintOverlay ? (
                            <div className={`pointer-events-none absolute inset-0 ${hintTint}`} />
                          ) : null}
                          {isCorrect ? (
                            <div className="pointer-events-none absolute inset-0 bg-emerald-400/10" />
                          ) : null}
                        </>
                      ) : null}
                    </button>
                  );
                })}
              </div>

              {sparks.length ? (
                <div className="pointer-events-none absolute inset-0">
                  {sparks.map((s) => (
                    <span
                      key={s.id}
                      className="absolute block h-2.5 w-2.5 rounded-full"
                      style={{
                        left: `${s.x}%`,
                        top: `${s.y}%`,
                        background: "rgba(255,255,255,0.85)",
                        boxShadow:
                          "0 0 0 1px rgba(249,115,22,0.20), 0 10px 24px rgba(249,115,22,0.12)",
                        animation: "zowar-spark 820ms ease-out forwards",
                      }}
                    />
                  ))}
                </div>
              ) : null}

              {solved ? (
                <div className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center px-3">
                  <div className="rounded-2xl border border-emerald-200 bg-white/95 px-4 py-2 shadow-sm">
                    <div className="text-center text-sm font-semibold text-emerald-700">{success}</div>
                  </div>
                </div>
              ) : null}
            </div>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm text-neutral-700">
                {solved ? (
                  <span className="font-semibold text-emerald-700">{finalCTA}</span>
                ) : (
                  <span>
                    {uiProgressLabel} <span className="font-semibold">{correctCount}/{total}</span>
                  </span>
                )}
              </div>

              {solved ? <div className={`${btnOrange} cursor-default`}>{finalCTA}</div> : null}
            </div>

            {!canShowImage ? (
              <div className="mt-3 text-xs text-amber-700">
                {isAr ? "ملاحظة: لم يتم العثور على imageSrc في riddle5." : "Note: riddle5.imageSrc is missing."}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export { PuzzleR5 };