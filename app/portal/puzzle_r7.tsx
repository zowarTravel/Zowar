"use client";

import React from "react";
import type { Locale } from "./riddlecontent";
import { setRoundSolved, serverSetRoundSolved, readProgress } from "./progress";
import { RAINBOW_STAMPS, SUNRISE_SRC, fragmentStyle, pieceStampSrc } from "./passport_data";
import SubmitTestimonialModal from "./SubmitTestimonialModal";
import {
  HolderNameField,
  NextAdventureCard,
  SavePassportButton,
  TripadvisorReviewLink,
  useCompletionDate,
  usePassportHolder,
} from "./passport_keepsake";


const SHAMS_MAP_URL = "https://maps.app.goo.gl/g8dZiE7EjXJjU77a7";

const CONFETTI_COLORS = [
  "#C8694A", "#F59E0B", "#10B981", "#8B5CF6", "#3B82F6", "#EC4899",
  "#F97316", "#14B8A6", "#A855F7", "#EF4444",
];

type Confetto = { id: number; x: number; color: string; delay: number; dur: number; rot: number };

/* Fixed subtle rotations — authentic passport feel */
const ROTATIONS = [-2.2, 1.6, -0.8, 2.4, -1.5, 1.1] as const;

/* Stamps that carry a piece of the sunrise picture, in collection order */
const PUZZLE_STAMPS = RAINBOW_STAMPS.filter((s) => s.fragment !== undefined);
const PIECES = PUZZLE_STAMPS.length;

/* The board starts in collection order; no stamp's piece starts in its own slot */
const START_ORDER = PUZZLE_STAMPS.map((_, i) => i);

const SOLVED_ORDER = PUZZLE_STAMPS
  .map((s, i) => [s.fragment!, i] as const)
  .sort((a, b) => a[0] - b[0])
  .map(([, i]) => i);

function isAssembled(order: readonly number[]): boolean {
  return order.every((stampIdx, slot) => PUZZLE_STAMPS[stampIdx].fragment === slot);
}

/* "شمس البلد" lettering, lifted from the lettered artwork, laid over the completed picture */
const LETTERING_SRC = "/images/puzzles/r7/shams-lettering.png";

/* The picture glows, the lettering inks in, then the celebration starts */
const INK_DELAY_MS = 500;
const INK_MS = 1600;
const CELEBRATE_DELAY_MS = INK_DELAY_MS + INK_MS + 150;

/* ------------------------------------------------------------------ */
/* Component                                                          */
/* ------------------------------------------------------------------ */

export default function PuzzleR7({
  locale,
  onSolved,
}: {
  locale: Locale;
  onSolved?: () => void;
}) {
  const safeLocale: Locale = locale === "ar" ? "ar" : "en";
  const isAr = safeLocale === "ar";

  const progress = React.useMemo(() => readProgress(), []);
  const locked = !progress.r6;

  /* Coming back after solving (e.g. to reopen directions) shows the finished page, not the puzzle */
  const alreadySolved = progress.r7;

  const [flipped, setFlipped] = React.useState<boolean[]>(() => Array(PIECES).fill(alreadySolved));
  const [order, setOrder] = React.useState<number[]>(alreadySolved ? SOLVED_ORDER : START_ORDER);
  const [selected, setSelected] = React.useState<number | null>(null);
  const [assembled, setAssembled] = React.useState(alreadySolved);
  const [status, setStatus] = React.useState<"idle" | "correct">(alreadySolved ? "correct" : "idle");
  const [showHint, setShowHint] = React.useState(false);
  const [showHint2, setShowHint2] = React.useState(false);
  const [showTestimonialForm, setShowTestimonialForm] = React.useState(false);
  const [confetti, setConfetti] = React.useState<Confetto[]>([]);
  const solvedRef = React.useRef(alreadySolved);
  const confettiTimer = React.useRef<number | null>(null);
  const celebrateTimer = React.useRef<number | null>(null);
  const [holder, saveHolder] = usePassportHolder();
  const visited = useCompletionDate("full", safeLocale, status === "correct");

  const allFlipped = flipped.every(Boolean);

  React.useEffect(() => {
    /* Fetch the lettering ahead of the reveal so the ink sweep never plays over a missing image */
    new Image().src = LETTERING_SRC;
    return () => {
      if (confettiTimer.current) window.clearTimeout(confettiTimer.current);
      if (celebrateTimer.current) window.clearTimeout(celebrateTimer.current);
    };
  }, []);

  function resetHints() {
    setShowHint(false);
    setShowHint2(false);
  }

  function toggleFlip(i: number) {
    setFlipped((f) => f.map((v, j) => (j === i ? !v : v)));
  }

  function applyOrder(next: number[]) {
    setOrder(next);
    setSelected(null);
    if (isAssembled(next)) {
      setAssembled(true);
      resetHints();
      if (celebrateTimer.current) window.clearTimeout(celebrateTimer.current);
      celebrateTimer.current = window.setTimeout(celebrate, CELEBRATE_DELAY_MS);
    }
  }

  function onPieceTap(slot: number) {
    if (assembled) return;
    if (selected === null) {
      setSelected(slot);
      return;
    }
    if (selected === slot) {
      setSelected(null);
      return;
    }
    const next = [...order];
    [next[selected], next[slot]] = [next[slot], next[selected]];
    applyOrder(next);
  }

  function solveBoard() {
    applyOrder(SOLVED_ORDER);
  }

  function celebrate() {
    if (solvedRef.current) return;
    solvedRef.current = true;
    setStatus("correct");
    setRoundSolved("r7");
    serverSetRoundSolved("r7");
    onSolved?.();
    setConfetti(
      Array.from({ length: 36 }, (_, i) => ({
        id: i,
        x: 3 + Math.random() * 94,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        delay: Math.round(Math.random() * 800),
        dur: 1000 + Math.round(Math.random() * 800),
        rot: Math.round(Math.random() * 540) * (Math.random() > 0.5 ? 1 : -1),
      }))
    );
    if (confettiTimer.current) window.clearTimeout(confettiTimer.current);
    confettiTimer.current = window.setTimeout(() => setConfetti([]), 2800);
  }

  /* ------------------------------------------------------------------ */
  /* Locked state                                                        */
  /* ------------------------------------------------------------------ */

  if (locked) {
    return (
      <div className="rounded-3xl border border-neutral-200 bg-white p-5">
        <h2 className="text-xl font-semibold">
          {isAr ? "المحطة الأخيرة مقفلة" : "Final Stop Locked"}
        </h2>
        <p className="mt-2 text-neutral-700">
          {isAr
            ? "أكمل الجولة ٧ أولاً لفتح المحطة الأخيرة."
            : "Complete Round 7 to unlock the final stop."}
        </p>
      </div>
    );
  }

  /* ------------------------------------------------------------------ */
  /* Render                                                              */
  /* ------------------------------------------------------------------ */

  const ringClass =
    status === "correct"
      ? "shadow-[0_0_0_2px_rgba(16,185,129,0.45),0_0_60px_rgba(16,185,129,0.14)]"
      : "shadow-[0_24px_60px_rgba(0,0,0,0.12)]";

  const hintBtn =
    "rounded-2xl border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-800 shadow-sm transition hover:bg-neutral-50";
  const linkBtn =
    "text-[12px] font-medium text-neutral-400 underline underline-offset-2 transition hover:text-neutral-600";
  const hintCard = "rounded-2xl border border-neutral-200 bg-white/80 p-4 text-sm text-neutral-800";

  /* Assembly hint ladder */
  const hints = {
    h1: isAr
      ? "ابحث عن الشمس — نصفاها يلتقيان في المنتصف. وزوايا الإطار المجدول تحدد الطرفين."
      : "Find the sun — its two halves meet in the middle. The corners of the braided border mark the two ends.",
    h2: isAr
      ? "القطع المظلّلة بالأخضر في مكانها الصحيح."
      : "Pieces with a green tint are already in the right place.",
  };

  const hintSection = (
    <div className="mt-4">
      <button
        type="button"
        onClick={() => { if (showHint) resetHints(); else setShowHint(true); }}
        className={hintBtn}
      >
        {showHint
          ? isAr ? "إخفاء التلميح" : "Hide hint"
          : isAr ? "أحتاج تلميحاً" : "I need a clue"}
      </button>

      {showHint && (
        <div className="mt-3 space-y-3">
          <div className={hintCard}>
            <div className="font-semibold text-neutral-950">{isAr ? "التلميح" : "Hint"}</div>
            <div className="mt-1 leading-7">{hints.h1}</div>
          </div>

          {!showHint2 ? (
            <button type="button" onClick={() => setShowHint2(true)} className={linkBtn}>
              {isAr ? "لا يزال غامضاً؟" : "Still stuck?"}
            </button>
          ) : (
            <>
              <div className={hintCard}>
                <div className="font-semibold text-neutral-950">{isAr ? "تلميح إضافي" : "Extra hint"}</div>
                <div className="mt-1 leading-7">{hints.h2}</div>
              </div>

              <button type="button" onClick={solveBoard} className={linkBtn}>
                {isAr ? "رتّب الصورة عنّي" : "Assemble it for me"}
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div dir={isAr ? "rtl" : "ltr"} className="w-full">
      {showTestimonialForm && (
        <SubmitTestimonialModal
          locale={isAr ? "ar" : "en"}
          onClose={() => setShowTestimonialForm(false)}
        />
      )}
      <style>{`
        @keyframes r7-float {
          0%   { opacity:1; transform: translateY(0) rotate(0deg) scale(1); }
          100% { opacity:0; transform: translateY(-110px) rotate(var(--r7-rot,180deg)) scale(0.5); }
        }
        @keyframes r7-pop {
          0%   { opacity:0; transform: translateY(14px) scale(0.93); }
          55%  { transform: translateY(-3px) scale(1.02); }
          100% { opacity:1; transform: translateY(0) scale(1); }
        }
        @keyframes r7-seal {
          0%   { opacity:0; transform: scale(1.5) rotate(-10deg); filter:blur(3px); }
          55%  { transform: scale(0.95) rotate(1.5deg); filter:blur(0); }
          100% { opacity:1; transform: scale(1) rotate(-6deg); }
        }
        @keyframes r7-fade {
          from { opacity:0; transform: translateY(10px); }
          to   { opacity:1; transform: translateY(0); }
        }
        @keyframes r7-line {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @keyframes r7-sunrise {
          0%   { opacity:0.6; transform: scale(0.97); box-shadow: 0 0 0 0 rgba(245,158,11,0); }
          45%  { opacity:1; transform: scale(1.015); box-shadow: 0 0 0 6px rgba(245,158,11,0.35), 0 0 60px rgba(245,158,11,0.35); }
          100% { opacity:1; transform: scale(1); box-shadow: 0 0 0 1px rgba(120,72,30,0.15), 0 12px 32px rgba(120,72,30,0.18); }
        }
        /* Soft-edged mask sweeps right to left, the way Arabic is written */
        @keyframes r7-ink-sweep {
          from { -webkit-mask-position: 0% 0; mask-position: 0% 0; }
          to   { -webkit-mask-position: 100% 0; mask-position: 100% 0; }
        }
        .r7-ink {
          /* parchment halo lifts the letters off the clouds and rays behind them */
          filter: drop-shadow(0 0 1.5px #F7E8D5) drop-shadow(0 0 3px #F7E8D5);
          -webkit-mask-image: linear-gradient(to right, transparent 0%, transparent 47%, #000 53%, #000 100%);
          mask-image: linear-gradient(to right, transparent 0%, transparent 47%, #000 53%, #000 100%);
          -webkit-mask-size: 250% 100%;
          mask-size: 250% 100%;
          -webkit-mask-repeat: no-repeat;
          mask-repeat: no-repeat;
          animation: r7-ink-sweep ${INK_MS}ms cubic-bezier(.45,.05,.35,1) ${INK_DELAY_MS}ms both;
        }
        .r7-flip { perspective: 900px; }
        .r7-flip-inner {
          position: relative;
          transform-style: preserve-3d;
          -webkit-transform-style: preserve-3d;
          transition: transform 520ms cubic-bezier(.22,1,.36,1);
        }
        .r7-flip-inner.is-flipped { transform: rotateY(180deg); }
        .r7-face {
          position: absolute;
          inset: 0;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .r7-face-back { transform: rotateY(180deg); }
        @media (prefers-reduced-motion: reduce) {
          .r7-flip-inner { transition: none; }
          .r7-ink { animation: none; -webkit-mask-image: none; mask-image: none; }
        }
      `}</style>

      <div className="relative mx-auto mt-8 max-w-2xl px-1 sm:px-0">

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* PASSPORT PAGE                                               */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <div
          className={[
            "relative overflow-hidden rounded-2xl border border-neutral-300/70 transition-shadow duration-700",
            ringClass,
          ].join(" ")}
          style={{
            /* Passport security paper — fine crosshatch over clean white */
            background: `
              repeating-linear-gradient(
                28deg,
                transparent 0px, transparent 12px,
                rgba(50,80,160,0.030) 12px, rgba(50,80,160,0.030) 13px
              ),
              repeating-linear-gradient(
                -28deg,
                transparent 0px, transparent 12px,
                rgba(50,80,160,0.024) 12px, rgba(50,80,160,0.024) 13px
              ),
              #F4F5F3
            `,
            boxShadow: status === "correct"
              ? "inset 0 0 0 4px rgba(0,0,0,0.03), 0 0 0 2px rgba(16,185,129,0.45), 0 0 60px rgba(16,185,129,0.14)"
              : "inset 0 0 0 4px rgba(0,0,0,0.03), 0 20px 50px rgba(0,0,0,0.10)",
          }}
        >
          {/* Confetti */}
          {confetti.length > 0 && (
            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
              {confetti.map((c) => (
                <span
                  key={c.id}
                  className="absolute block h-2 w-2 rounded-[2px]"
                  style={{
                    left: `${c.x}%`,
                    bottom: "15%",
                    background: c.color,
                    ["--r7-rot" as string]: `${c.rot}deg`,
                    animation: `r7-float ${c.dur}ms ease-out ${c.delay}ms both`,
                  }}
                />
              ))}
            </div>
          )}

          {/* Faint circular watermark — like a passport emblem */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.05]">
            <div className="flex h-72 w-72 items-center justify-center rounded-full border-[14px] border-slate-600">
              <div className="h-48 w-48 rounded-full border-[8px] border-slate-600">
                <div className="flex h-full w-full items-center justify-center rounded-full border-[3px] border-slate-600" />
              </div>
            </div>
          </div>

          {/* ── Passport header ── */}
          <div className="relative border-b border-neutral-300/60 px-6 pb-5 pt-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-[9px] font-bold uppercase tracking-[0.32em] text-slate-500/80">
                  {isAr ? "جواز سفر زوّار" : "Zowar Travel Passport"}
                </div>
                <div className="mt-0.5 text-[10px] uppercase tracking-[0.18em] text-slate-400/80">
                  {isAr ? "زار حامله" : "The Holder Has Visited"}
                </div>
                <div className="mt-1.5 text-xl font-semibold tracking-tight text-slate-800">
                  {isAr ? "شارع الرينبو" : "Rainbow Street"}
                </div>
                <div className="text-[11px] uppercase tracking-[0.16em] text-slate-500/70">
                  {isAr ? "عمّان · الأردن" : "Amman · Jordan"}
                </div>
                {status === "correct" && (holder || visited) && (
                  <div className="mt-2 text-[11px] text-slate-600" style={{ animation: "r7-fade 350ms ease-out 400ms both" }}>
                    {holder && <span className="font-semibold text-slate-800">{holder}</span>}
                    {holder && visited && <span className="mx-1.5 text-slate-400">·</span>}
                    {visited && <span>{visited}</span>}
                  </div>
                )}
              </div>

              {/* Stamp count ring — the finale only opens once every stop is solved */}
              <div className="flex shrink-0 flex-col items-center gap-1 pt-0.5">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-slate-300 bg-white text-sm font-bold text-slate-700">
                  {PIECES}<span className="text-[10px] font-normal text-slate-400">/{PIECES}</span>
                </div>
                <div className="text-[8px] font-bold uppercase tracking-[0.2em] text-slate-400/70">
                  {isAr ? "طوابع" : "Stamps"}
                </div>
              </div>
            </div>

            {/* Round badge — keep Zowar brand orange */}
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-z-orange bg-z-orange-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] z-orange">
              {isAr ? "الجولة ٨ · المحطة الأخيرة" : "Round 8 · Final Stop"}
            </div>
          </div>

          {/* ── Stamps zone ── */}
          <div className="relative px-8 pb-8 pt-5 sm:px-10">
            <div className="mb-5 flex items-center gap-3">
              <div className="h-px flex-1 bg-neutral-300/50" />
              <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400/80">
                <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 7h10l-3-3M16 13H6l3 3" />
                </svg>
                {isAr ? "اضغط لقلب الطابع" : "Tap to flip"}
              </div>
              <div className="h-px flex-1 bg-neutral-300/50" />
            </div>

            <div dir="ltr" className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {PUZZLE_STAMPS.map((stamp, i) => {
                const rotation = ROTATIONS[i] ?? 0;
                const isFlipped = flipped[i];

                return (
                  <div key={stamp.id} className="flex flex-col items-center gap-2">
                    <button
                      type="button"
                      onClick={() => toggleFlip(i)}
                      className="r7-flip group relative w-full transition-transform duration-200 hover:z-10 hover:scale-[1.05]"
                      style={{ transform: `rotate(${rotation}deg)`, touchAction: "manipulation" }}
                      aria-pressed={isFlipped}
                      aria-label={
                        isAr
                          ? `${stamp.titleAr} — ${isFlipped ? "اقلب للوجه" : "اقلب لرؤية القطعة"}`
                          : `${stamp.title} — ${isFlipped ? "flip to front" : "flip to see the piece"}`
                      }
                    >
                      <div className={["r7-flip-inner aspect-square w-full", isFlipped ? "is-flipped" : ""].join(" ")}>
                        {/* Front — the original stamp artwork */}
                        <div className="r7-face">
                          <img
                            src={stamp.image}
                            alt={stamp.alt}
                            className="h-full w-full object-contain mix-blend-multiply drop-shadow-sm"
                            style={stamp.scale && stamp.scale !== 1 ? { transform: `scale(${stamp.scale})` } : undefined}
                            draggable={false}
                          />
                        </div>

                        {/* Back — this stamp's piece, drawn as its own perforated stamp */}
                        <div className="r7-face r7-face-back overflow-hidden rounded-xl border border-[#e6d3b5] bg-[#F7E8D5] shadow-sm">
                          <img
                            src={pieceStampSrc(stamp.fragment!)}
                            alt={isAr ? "قطعة من صورة" : "A piece of a picture"}
                            className="h-full w-full object-contain p-1.5"
                            draggable={false}
                          />
                        </div>
                      </div>
                    </button>

                    <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                      {isAr ? stamp.titleAr : stamp.title}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* SOLVED: completion seal pressed over the stamps */}
            {status === "correct" && (
              <div
                className="pointer-events-none absolute inset-0 flex items-center justify-center"
                style={{ animation: "r7-seal 580ms cubic-bezier(.22,1,.36,1) 200ms both" }}
              >
                <div className="flex flex-col items-center rounded-full border-[5px] border-emerald-500 bg-emerald-50/95 px-10 py-7 text-center shadow-[0_8px_40px_rgba(16,185,129,0.28),inset_0_1px_0_rgba(255,255,255,0.8)]"
                  style={{ transform: "rotate(-6deg)" }}
                >
                  <svg viewBox="0 0 24 24" className="h-8 w-8 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4.5 12.5l5 5L19.5 7" />
                  </svg>
                  <div className="mt-2 text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-600">
                    {isAr ? "مكتمل" : "Completed"}
                  </div>
                  <div className="mt-0.5 text-2xl font-bold tracking-tight text-emerald-900">
                    {isAr ? "شمس البلد" : "Shams El Balad"}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ── Section rule ── */}
          <div className="mx-6 border-t border-neutral-300/60" />

          {/* ── Assembly puzzle ── */}
          <div className="px-6 py-5">
            {!assembled && (
              <>
                <p className="text-sm leading-7 text-neutral-800">
                  {isAr
                    ? "على ظهر كل طابع قطعة من صورة. اقلب الطوابع الستة، ثم رتّب القطع لتكتشف وجهتك الأخيرة."
                    : "Each stamp hides a piece of a picture on its back. Flip all six, then put the pieces in order to find your final destination."}
                </p>

                {!allFlipped ? (
                  <button
                    type="button"
                    onClick={() => setFlipped(Array(PIECES).fill(true))}
                    className="mt-4 rounded-2xl bg-z-orange px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-95"
                  >
                    {isAr ? "اقلب كل الطوابع" : "Flip all stamps"}
                  </button>
                ) : (
                  <>
                    <div className="mt-4 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
                      {isAr ? "اضغط على قطعتين لتبديلهما" : "Tap two pieces to swap them"}
                    </div>

                    <div dir="ltr" className="mt-3 grid grid-cols-6 gap-1">
                      {order.map((stampIdx, slot) => {
                        const fragment = PUZZLE_STAMPS[stampIdx].fragment!;
                        const isSelected = selected === slot;
                        const inPlace = fragment === slot;
                        return (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => onPieceTap(slot)}
                            className={[
                              "relative overflow-hidden rounded-md border border-[#d9c7a6] shadow-[0_4px_12px_rgba(90,55,20,0.15)] transition-transform duration-150 active:scale-[0.96] focus:outline-none",
                              isSelected ? "-translate-y-1" : "",
                            ].join(" ")}
                            style={{ aspectRatio: "1 / 2", touchAction: "manipulation", ...fragmentStyle(fragment) }}
                            aria-label={isAr ? `قطعة ${slot + 1}` : `Piece ${slot + 1}`}
                            aria-pressed={isSelected}
                          >
                            {isSelected && (
                              <span
                                className="pointer-events-none absolute inset-0 rounded-md"
                                style={{ boxShadow: "inset 0 0 0 3px #C8694A", background: "rgba(200,105,74,0.12)" }}
                              />
                            )}
                            {showHint2 && inPlace && !isSelected && (
                              <span className="pointer-events-none absolute inset-0 rounded-md bg-emerald-400/20 ring-2 ring-inset ring-emerald-400/80" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    <div className="mt-4">
                      <button
                        type="button"
                        onClick={() => { setOrder(START_ORDER); setSelected(null); }}
                        className="rounded-2xl border border-neutral-300 bg-white px-5 py-3 text-sm font-medium text-neutral-900 transition hover:bg-neutral-50"
                      >
                        {isAr ? "إعادة" : "Reset"}
                      </button>
                    </div>

                    {hintSection}
                  </>
                )}
              </>
            )}

            {assembled && (
              <>
                {/* The complete picture — the master image itself, so there are no seams —
                    then "شمس البلد" inks itself across the sky, right to left */}
                <div
                  className="relative overflow-hidden rounded-lg"
                  style={{ aspectRatio: "3 / 1", animation: "r7-sunrise 1100ms cubic-bezier(.22,1,.36,1) both" }}
                >
                  <img
                    src={SUNRISE_SRC}
                    alt={isAr ? "شمس تشرق فوق مباني عمّان القديمة، وفوقها «شمس البلد»" : "A golden sun rising over the old buildings of Amman, with “Shams El Balad” written across the sky in Arabic"}
                    className="block h-full w-full"
                    draggable={false}
                  />
                  <img
                    src={LETTERING_SRC}
                    alt=""
                    aria-hidden="true"
                    className="r7-ink pointer-events-none absolute inset-0 h-full w-full"
                    draggable={false}
                  />
                </div>
              </>
            )}
          </div>

          {/* ── Celebration (post-solve) ── */}
          {status === "correct" && (
            <div
              className="px-6 pb-5 animate-[r7-pop_560ms_cubic-bezier(.22,1,.36,1)_1]"
            >
              {/* Answer reveal */}
              <div
                className="flex flex-col items-center gap-1 text-center"
                style={{ animation: "r7-fade 350ms ease-out 500ms both" }}
              >
                <p className="mb-2 text-base font-semibold italic leading-7 text-neutral-900">
                  {isAr ? "طلعت الشمس عالبلد… وهي اللي جابتك لهون." : "The sun rises over the city — and it has led you here."}
                </p>
                <div className="text-2xl font-bold tracking-tight text-amber-900">Shams El Balad</div>
                <div className="text-2xl font-bold text-amber-900" dir="rtl">شمس البلد</div>
              </div>

              {/* Divider */}
              <div
                className="mt-5 h-px origin-left bg-gradient-to-r from-emerald-300/60 via-z-orange/30 to-transparent"
                style={{ animation: "r7-line 600ms ease-out 600ms both" }}
              />

              {/* Success copy */}
              <div
                className="mt-5 text-sm leading-7 text-neutral-700"
                style={{ animation: "r7-fade 400ms ease-out 680ms both" }}
              >
                <p className="mb-1 font-semibold text-neutral-900">
                  {isAr ? "صحيح — شمس البلد هي محطتك الأخيرة." : "Correct — Shams El Balad is your final stop."}
                </p>
                <p>
                  {isAr
                    ? "شكراً لمشيك مع زوّار. تتبّعت الألغاز عبر الطعام والواجهات والإطلالات والتفاصيل الصغيرة، وجمعت المدينة قطعةً قطعة. الآن الجلوس، والحلو، والاستراحة — كل ذلك لك."
                    : "Thank you for walking with Zowar. Seven stops, one street, a lot of ground covered. The last table, and something sweet, are yours now."}
                </p>
                <a
                  href={SHAMS_MAP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 flex items-center gap-2 rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-50"
                >
                  <span>📍</span>
                  <span>{isAr ? "خذني إلى شمس البلد" : "Take me to Shams El Balad"}</span>
                </a>
              </div>

              {/* ── Passport holder ── */}
              <div
                className="mt-5 rounded-2xl border border-neutral-200 bg-white p-4"
                style={{ animation: "r7-fade 400ms ease-out 720ms both" }}
              >
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="text-[9px] font-bold uppercase tracking-[0.24em] text-slate-500">
                      {isAr ? "حامل الجواز" : "Passport holder"}
                    </div>
                    <div className="mt-1">
                      <HolderNameField locale={safeLocale} name={holder} onSave={saveHolder} tone="slate" />
                    </div>
                  </div>
                  <div>
                    <div className="text-[9px] font-bold uppercase tracking-[0.24em] text-slate-500">
                      {isAr ? "تاريخ الزيارة" : "Visited"}
                    </div>
                    <div className="mt-1 text-sm font-semibold text-slate-800">{visited}</div>
                  </div>
                </div>
                <div className="mt-4">
                  <SavePassportButton
                    locale={safeLocale}
                    options={() => ({
                      locale: safeLocale,
                      title: isAr ? "شارع الرينبو" : "Rainbow Street",
                      holder,
                      dateLabel: visited,
                      stamps: PUZZLE_STAMPS,
                      sealText: isAr ? "شمس البلد" : "SHAMS EL BALAD",
                    })}
                  />
                </div>
              </div>

              {/* ── Share + review CTA ── */}
              <div
                className="mt-3 flex flex-col gap-3 rounded-2xl border border-neutral-200 bg-white p-4 sm:flex-row sm:items-center"
                style={{ animation: "r7-fade 400ms ease-out 750ms both" }}
              >
                <div className="flex-1">
                  <div className="text-sm font-semibold text-neutral-900">
                    {isAr ? "أعجبتك الجولة؟" : "Enjoyed the walk?"}
                  </div>
                  <div className="mt-0.5 text-xs text-neutral-500">
                    {isAr ? "شارك صديقاً أو أخبرنا عن تجربتك." : "Send it to a friend, or tell us about your experience."}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(
                      isAr
                        ? "حليت لغز زوّار على شارع الرينبو في عمّان 🗺️ — ٧ محطات وطابع في كل محطة وصورة مخفية تنتظر من يركّبها. جرّب: zowar.net"
                        : "I just solved the Zowar puzzle trail on Rainbow Street, Amman 🗺️ — 7 stops, 6 stamps, and one hidden picture to piece together. Try it: zowar.net"
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-xl border border-[#25D366]/30 bg-[#25D366]/8 px-3.5 py-2 text-xs font-semibold text-[#128C4A] transition hover:bg-[#25D366]/15"
                  >
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.123 1.532 5.856L.073 23.27a.75.75 0 00.916.916l5.415-1.459A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.713 9.713 0 01-4.952-1.354l-.355-.21-3.676.991.99-3.613-.228-.368A9.712 9.712 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
                    </svg>
                    {isAr ? "شارك" : "Share"}
                  </a>
                  <TripadvisorReviewLink locale={safeLocale} className="rounded-xl px-3.5 py-2 text-xs" />
                  <button
                    type="button"
                    onClick={() => setShowTestimonialForm(true)}
                    className="rounded-xl border border-neutral-200 bg-white px-3.5 py-2 text-xs font-semibold text-neutral-700 transition hover:bg-neutral-50"
                  >
                    {isAr ? "أضف تقييمك" : "Leave a review"}
                  </button>
                </div>
              </div>

              {/* ── Next adventure ── */}
              <div className="mt-3" style={{ animation: "r7-fade 400ms ease-out 790ms both" }}>
                <NextAdventureCard
                  eyebrow={isAr ? "الختم التالي في جوازك" : "Next stamp in your passport"}
                  title={isAr ? "تجربة الويبدة — قريباً" : "Al Weibdeh — coming soon"}
                  body={
                    isAr
                      ? "مغامرة طعام وألغاز جديدة عبر أحد أقدم أحياء عمّان. تابعنا لتكون أول من يعرف موعد الإطلاق."
                      : "A new food and puzzle adventure through one of Amman's oldest neighbourhoods. Follow us to be first to know when it launches."
                  }
                  cta={isAr ? "تابع @zowar.jo" : "Follow @zowar.jo"}
                  href="https://www.instagram.com/zowar.jo"
                  external
                />
              </div>

              {/* About sections */}
              <div
                className="mt-5 space-y-3"
                style={{ animation: "r7-fade 400ms ease-out 820ms both" }}
              >
                <div className="rounded-3xl border border-neutral-200 bg-white p-5">
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-z-orange">
                    {isAr ? "عن المحطة الأخيرة" : "About this stop"}
                  </div>
                  <h3 className="mt-2 text-xl font-semibold text-neutral-950">
                    {isAr ? "شمس البلد" : "Shams El Balad"}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-neutral-700">
                    {isAr
                      ? "الشمس قادتك إلى هنا. جمعت المدينة طابعاً طابعاً وقطعةً قطعة — والآن تهدأ الخطى، ويستقرّ اليوم في آخر فصوله وأحلاها."
                      : "The sun led you here. You gathered the city stamp by stamp, piece by piece — now the walking slows, and the day settles into its last, sweetest chapter."}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-neutral-700">
                    {isAr
                      ? "بدأت شمس البلد كمحل ورد صغير يهتم بالتصميم والاستدامة، ثم صارت مقهى، ومع السنين أصبحت من أحب مطابخ شارع الرينبو. أطباقها أردنية بيتية قلّما تجدها خارج بيوت العائلات، محضّرة بمكوّنات عضوية موسمية من مزارعين ومنتجين محليين. تطلّ شرفتها عبر الوادي على جبل القلعة والقصر الأموي، وهي مُدرجة في قائمة World's 50 Best Discovery."
                      : "Shams El Balad began as a small flower shop with an eye for design and sustainability, became a café, and grew over the years into one of Rainbow Street's best-loved kitchens. It serves Jordanian home dishes you rarely find outside family kitchens, made with organic, seasonal ingredients from local farmers and producers. Its terrace looks across the valley to the Citadel and the Umayyad Palace, and it's listed on the World's 50 Best Discovery."}
                  </p>
                  <div className="mt-4 rounded-2xl border border-z-orange/30 bg-z-orange-soft px-4 py-3.5">
                    <div className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-z-orange">
                      {isAr ? "في هذه المحطة" : "At this stop"}
                    </div>
                    <p className="text-sm font-medium leading-6 text-neutral-800">
                      {isAr
                        ? "أخبر المضيف أنك مع زوّار. بعد يوم من الشوارع والأدراج والحكايات، تستحق هذه اللحظة: زاوية دافئة، وصحبة طيبة، وختام حلو ينتظرك ليُكمل الحكاية."
                        : "Let the host know you're with Zowar. After a day of streets, stairs and stories, you've earned this: a cozy corner, good company, and a sweet finish waiting to round it all off."}
                    </p>
                  </div>
                </div>

                <div className="rounded-3xl border border-neutral-200 bg-white p-5">
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-z-orange">
                    {isAr ? "عن الرحلة" : "About the journey"}
                  </div>
                  <h3 className="mt-2 text-xl font-semibold text-neutral-950">
                    {isAr ? "شارع الرينبو" : "Rainbow Street"}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-neutral-700">
                    {isAr
                      ? "شارع الرينبو أخذ اسمه من سينما الرينبو. مبانيه الحجرية من عشرينيات القرن الماضي — شُيِّدت لسياسيين وسفراء وأفراد من الأسرة الحاكمة. المحطات التي زرتها للتو جزء من ذلك التاريخ."
                      : "Rainbow Street takes its name from the Rainbow Cinema. The stone buildings date to the 1920s — built for politicians, ambassadors, and royals. The stops you just visited sit inside that same history."}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ── Passport footer ── */}
          <div className="border-t border-neutral-200 px-6 py-3 text-center">
            <span className="text-[9px] font-bold uppercase tracking-[0.28em] text-neutral-400/70">
              {isAr ? "مقتنيات زوّار الرسمية" : "Official Zowar Collectible"}
            </span>
          </div>

        </div>
        {/* end passport page */}

      </div>
    </div>
  );
}
