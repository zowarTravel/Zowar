"use client";

import React from "react";
import { setRoundSolved } from "./progress";
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
  x: number; // %
  y: number; // %
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

  // locked[i] === true means slot i currently contains correct piece
  const [locked, setLocked] = React.useState<boolean[]>(() =>
    Array.from({ length: total }, () => false)
  );

  // snap pulse when a tile becomes newly correct
  const prevLockedRef = React.useRef<boolean[]>(Array.from({ length: total }, () => false));
  const [snapPulse, setSnapPulse] = React.useState<number[]>(() =>
    Array.from({ length: total }, () => 0)
  );

  // Hint mode: show green/red feedback for correct/incorrect tiles
  const [showHint, setShowHint] = React.useState(false);

  const [solved, setSolved] = React.useState(false);

  // mergeAfterSolve: keeps glass tiles for a moment before collapsing into seamless image
  const [merged, setMerged] = React.useState(false);
  const mergeTimerRef = React.useRef<number | null>(null);

  // subtle sparks on solve
  const [sparks, setSparks] = React.useState<Spark[]>([]);
  const sparkTimerRef = React.useRef<number | null>(null);

  const solvedOnceRef = React.useRef(false);

  /* -------------------- EFFECTS -------------------- */

  // Update locked + snap pulses
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

  // Fire solved once + sparks + schedule merge
  React.useEffect(() => {
    if (!solved || solvedOnceRef.current) return;
    solvedOnceRef.current = true;

    setRoundSolved("r5");
    onSolved?.();

    // sparks
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

    // merge after 600ms
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
    t.success?.[safeLocale] ?? (isAr ? "نعم! اكتملت الصورة بالكامل! ✨" : "Yes! You completed the image! ✨");

  const finalCTA: string =
    safeLocale === "en"
      ? "Continue towards the first circle in search of the area in the image!"
      : "تابع باتجاه الدائرة الأولى وابحث عن المكان الظاهر في الصورة!";

  const correctCount = locked.filter(Boolean).length;

  /* -------------------- STYLES -------------------- */

  const card =
    "rounded-3xl border border-white/15 bg-white/10 backdrop-blur-xl shadow-[0_20px_80px_rgba(0,0,0,0.25)]";
  const orangeGlow =
    "shadow-[0_0_0_1px_rgba(255,137,54,0.28),0_20px_60px_rgba(255,137,54,0.10)]";

  const btn =
    "rounded-2xl px-4 py-2 text-sm font-medium transition active:scale-[0.99] border border-white/15 bg-white/10 hover:bg-white/15 disabled:opacity-50 disabled:cursor-not-allowed";
  const btnOrange =
    "rounded-2xl px-4 py-2 text-sm font-semibold transition active:scale-[0.99] border border-white/15 bg-[#ff8936]/20 hover:bg-[#ff8936]/25";

  // While solving: tiles have gap + rounded frames.
  // After merge: gap collapses to 0 and corners/borders disappear -> seamless.
  const shouldMerge = solved && merged;
  const gap = shouldMerge ? 0 : grid >= 4 ? 10 : 12;
  const pad = shouldMerge ? 0 : 14;

  return (
    <div dir={isAr ? "rtl" : "ltr"} className="mx-auto w-full max-w-5xl px-4 py-10">
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

      <div className={`${card} ${orangeGlow} p-5 sm:p-6`}>
        {/* Header */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-wider opacity-80">{kicker}</div>
            <h1 className="mt-1 text-2xl sm:text-3xl font-semibold">{title}</h1>
            <p className="mt-2 text-sm opacity-90 leading-relaxed">{prompt}</p>
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

        {/* Board */}
        <div className="mt-6">
          <div className="relative mx-auto w-full max-w-[720px]">
            <div
              className={[
                "relative aspect-square overflow-hidden border border-white/15",
                shouldMerge ? "rounded-3xl bg-black/10" : "rounded-[28px] bg-black/20",
              ].join(" ")}
              style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06)" }}
            >
              {/* Soft sheen */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/20" />

              {/* Grid */}
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

                  // Hint overlays: correct -> green, incorrect -> red
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
                          : "rounded-2xl border border-white/20 bg-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.25)]",
                        solved ? "cursor-default" : "cursor-pointer",
                        isSelected && !solved ? "ring-2 ring-[#ff8936] scale-[0.985]" : !solved ? "hover:-translate-y-[1px]" : "",
                        hintRing,
                      ].join(" ")}
                      style={{
                        animation: shouldPulse ? `zowar-snap 240ms ease-out` : undefined,
                      }}
                      aria-label={isAr ? `قطعة ${slotIndex + 1}` : `Tile ${slotIndex + 1}`}
                    >
                      {/* Image crop */}
                      <div
                        className="absolute inset-0"
                        style={{
                          backgroundImage: canShowImage ? `url(${imageSrc})` : undefined,
                          backgroundSize: `${grid * 100}% ${grid * 100}%`,
                          backgroundPosition: `${bgPosX}% ${bgPosY}%`,
                          opacity: solved ? 1 : 0.96,
                          transform: isSelected ? "scale(1.02)" : "scale(1.0)",
                          transition: "transform 160ms ease, opacity 300ms ease",
                        }}
                      />

                      {/* Liquid glass layers (disabled after merge for seamless image) */}
                      {!shouldMerge ? (
                        <>
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/18 via-transparent to-black/20" />
                          <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-white/5" />
                          <div
                            className="pointer-events-none absolute inset-0"
                            style={{
                              boxShadow:
                                "inset 0 0 0 1px rgba(255,255,255,0.10), inset 0 1px 0 rgba(255,255,255,0.08)",
                            }}
                          />
                          {/* Hint tint always visible */}
                          {showHintOverlay ? <div className={`pointer-events-none absolute inset-0 ${hintTint}`} /> : null}
                          {/* Correct tint (subtle) */}
                          {isCorrect ? <div className="pointer-events-none absolute inset-0 bg-emerald-400/10" /> : null}
                          {/* tiny playful sparkle on hover */}
                          <div className="pointer-events-none absolute -right-6 -top-6 h-14 w-14 rounded-full bg-white/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        </>
                      ) : null}
                    </button>
                  );
                })}
              </div>

              {/* Subtle spark confetti on solve */}
              {sparks.length ? (
                <div className="pointer-events-none absolute inset-0">
                  {sparks.map((s) => (
                    <span
                      key={s.id}
                      className="absolute block h-2.5 w-2.5 rounded-full"
                      style={{
                        left: `${s.x}%`,
                        top: `${s.y}%`,
                        background: "rgba(255,255,255,0.75)",
                        boxShadow:
                          "0 0 0 1px rgba(255,137,54,0.25), 0 10px 24px rgba(255,137,54,0.12)",
                        animation: "zowar-spark 820ms ease-out forwards",
                      }}
                    />
                  ))}
                </div>
              ) : null}

              {/* Solved overlay label */}
              {solved ? (
                <div className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center">
                  <div className="rounded-2xl border border-white/20 bg-black/30 px-4 py-2 backdrop-blur-xl">
                    <div className="text-center">
                      <div className="text-sm font-semibold text-emerald-200">{success}</div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>

            {/* Status row */}
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm opacity-90">
                {solved ? (
                  <span className="font-semibold text-emerald-300">{finalCTA}</span>
                ) : (
                  <span>
                    {uiProgressLabel}{" "}
                    <span className="font-semibold">
                      {correctCount}/{total}
                    </span>
                  </span>
                )}
              </div>

              {solved ? <div className={`${btnOrange} cursor-default`}>{finalCTA}</div> : null}
            </div>

            {!canShowImage ? (
              <div className="mt-3 text-xs text-amber-200/90">
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
