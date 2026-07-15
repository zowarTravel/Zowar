"use client";

import React from "react";
import type { Locale } from "./riddlecontent";
import { setRoundSolved, serverSetRoundSolved, readProgress } from "./progress";
import { getCollectedStampIds } from "./passport_progress";
import { RAINBOW_STAMPS, type StampId, type PassportStampMeta } from "./passport_data";
import SubmitTestimonialModal from "./SubmitTestimonialModal";

function normalizeAnswer(input: string): string {
  return input.trim().toLowerCase().replace(/\s+/g, " ").replace(/[^\p{L}\p{N}\s]/gu, "");
}

const ACCEPTED_EN = ["mijana", "mijana rooftop"].map(normalizeAnswer);
const ACCEPTED_AR = ["ميجانا", "mijana", "mijana rooftop"].map(normalizeAnswer);

const CONFETTI_COLORS = [
  "#C8694A", "#F59E0B", "#10B981", "#8B5CF6", "#3B82F6", "#EC4899",
  "#F97316", "#14B8A6", "#A855F7", "#EF4444",
];

type Confetto = { id: number; x: number; color: string; delay: number; dur: number; rot: number };

/* Fixed subtle rotations — authentic passport feel */
const ROTATIONS = [-2.2, 1.6, -0.8, 2.4, -1.5, 1.1] as const;

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

  const [collectedIds, setCollectedIds] = React.useState<StampId[]>([]);
  const [zoomed, setZoomed] = React.useState<PassportStampMeta | null>(null);
  const [answer, setAnswer] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "correct" | "wrong">("idle");
  const [showHint, setShowHint] = React.useState(false);
  const [showHint2, setShowHint2] = React.useState(false);
  const [showReveal, setShowReveal] = React.useState(false);
  const [showTestimonialForm, setShowTestimonialForm] = React.useState(false);
  const [confetti, setConfetti] = React.useState<Confetto[]>([]);
  const solvedRef = React.useRef(false);
  const confettiTimer = React.useRef<number | null>(null);

  React.useEffect(() => {
    setCollectedIds(getCollectedStampIds());
    return () => { if (confettiTimer.current) window.clearTimeout(confettiTimer.current); };
  }, []);

  /* Close zoom on Escape */
  React.useEffect(() => {
    if (!zoomed) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setZoomed(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [zoomed]);

  function handleCheck() {
    if (solvedRef.current) return;
    const norm = normalizeAnswer(answer);
    if (!norm) return;
    const accepted = isAr ? ACCEPTED_AR : ACCEPTED_EN;
    if (accepted.includes(norm)) {
      setStatus("correct");
      if (!solvedRef.current) {
        solvedRef.current = true;
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
    } else {
      setStatus("wrong");
    }
  }

  function handleReset() {
    setAnswer("");
    setStatus("idle");
    setShowHint(false);
    setShowHint2(false);
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
            ? "أكمل الجولة ٦ أولاً لفتح المحطة الأخيرة."
            : "Complete Round 6 to unlock the final stop."}
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
      : status === "wrong"
      ? "shadow-[0_0_0_2px_rgba(239,68,68,0.30),0_24px_60px_rgba(0,0,0,0.12)]"
      : "shadow-[0_24px_60px_rgba(0,0,0,0.12)]";

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
        @keyframes r7-zoom-backdrop {
          from { opacity:0; }
          to   { opacity:1; }
        }
        @keyframes r7-zoom-img {
          from { opacity:0; transform: scale(0.86); }
          to   { opacity:1; transform: scale(1); }
        }
        @keyframes r7-zoom-text {
          from { opacity:0; transform: translateY(8px); }
          to   { opacity:1; transform: translateY(0); }
        }
      `}</style>

      {/* ── Zoom overlay ── */}
      {zoomed && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6"
          style={{
            background: "rgba(8,10,14,0.82)",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            animation: "r7-zoom-backdrop 220ms ease both",
          }}
          onClick={() => setZoomed(null)}
        >
          {/* Paper card */}
          <div
            className="relative flex w-full max-w-sm flex-col items-center overflow-hidden rounded-2xl border border-neutral-300/70"
            style={{
              background: `
                repeating-linear-gradient(28deg, transparent, transparent 18px, rgba(50,80,160,0.025) 18px, rgba(50,80,160,0.025) 19px),
                repeating-linear-gradient(-28deg, transparent, transparent 18px, rgba(50,80,160,0.025) 18px, rgba(50,80,160,0.025) 19px),
                #F7F8F6
              `,
              boxShadow: "0 40px 80px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.06), inset 0 0 0 4px rgba(0,0,0,0.025)",
              animation: "r7-zoom-img 340ms cubic-bezier(.22,1,.36,1) both",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top strip — official document typography */}
            <div className="w-full border-b border-neutral-300/60 px-5 py-3 text-center">
              <div className="text-[8px] font-bold uppercase tracking-[0.30em] text-slate-400">
                {isAr ? "جواز السفر · زوّار" : "Zowar Travel · Passport"}
              </div>
            </div>

            {/* Stamp image — generous padding so PNG sits on the paper */}
            <div className="flex w-full items-center justify-center px-10 py-8">
              <img
                src={zoomed.image}
                alt={zoomed.alt}
                className="max-h-[52vh] w-full object-contain"
                style={{ filter: "drop-shadow(0 6px 18px rgba(0,0,0,0.18))" }}
                draggable={false}
              />
            </div>

            {/* Bottom caption */}
            <div
              className="w-full border-t border-neutral-300/60 px-5 py-3 text-center"
              style={{ animation: "r7-zoom-text 300ms ease-out 110ms both" }}
            >
              <div className="text-[9px] font-bold uppercase tracking-[0.26em] text-slate-400">
                {isAr ? `محطة ${zoomed.stop}` : `Stop ${zoomed.stop}`}
              </div>
              <div className="mt-0.5 text-sm font-semibold tracking-tight text-slate-700">
                {isAr ? zoomed.titleAr : zoomed.title}
              </div>
            </div>
          </div>

          {/* Close button — outside the card */}
          <button
            type="button"
            onClick={() => setZoomed(null)}
            className="mt-5 rounded-full border border-white/15 bg-white/8 px-6 py-2.5 text-sm font-medium text-white/55 transition hover:bg-white/15 hover:text-white/85"
            style={{ animation: "r7-zoom-text 300ms ease-out 200ms both" }}
          >
            {isAr ? "إغلاق" : "Close"}
          </button>
        </div>
      )}

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
              </div>

              {/* Stamp count ring */}
              <div className="flex shrink-0 flex-col items-center gap-1 pt-0.5">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-slate-300 bg-white text-sm font-bold text-slate-700">
                  {collectedIds.length}<span className="text-[10px] font-normal text-slate-400">/6</span>
                </div>
                <div className="text-[8px] font-bold uppercase tracking-[0.2em] text-slate-400/70">
                  {isAr ? "طوابع" : "Stamps"}
                </div>
              </div>
            </div>

            {/* Round badge — keep Zowar brand orange */}
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-z-orange bg-z-orange-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] z-orange">
              {isAr ? "الجولة ٧ · المحطة الأخيرة" : "Round 7 · Final Stop"}
            </div>
          </div>

          {/* ── Stamps zone ── */}
          <div className="relative px-8 pb-8 pt-5 sm:px-10">
            <p className="mb-5 text-center text-[11px] font-medium tracking-wide text-slate-400/80">
              {isAr
                ? "اضغط على أي طابع لفحصه عن قرب"
                : "Tap any stamp to examine it closely"}
            </p>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {RAINBOW_STAMPS.map((stamp, i) => {
                const unlocked = collectedIds.includes(stamp.id);
                const rotation = ROTATIONS[i] ?? 0;

                return (
                  <button
                    key={stamp.id}
                    type="button"
                    disabled={!unlocked}
                    onClick={() => unlocked && setZoomed(stamp)}
                    className={[
                      "group relative transition-all duration-200",
                      unlocked
                        ? "cursor-zoom-in hover:scale-[1.07] hover:z-10"
                        : "cursor-default opacity-30",
                    ].join(" ")}
                    style={{ transform: `rotate(${unlocked ? rotation : 0}deg)` }}
                  >
                    {unlocked ? (
                      /* Stamp image sits directly on parchment */
                      <div className="relative aspect-square w-full">
                        <img
                          src={stamp.image}
                          alt={stamp.alt}
                          className="h-full w-full object-contain drop-shadow-sm"
                          draggable={false}
                        />
                        {/* Zoom hint on hover */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-150 group-hover:bg-black/10">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black/50 opacity-0 backdrop-blur-sm transition-opacity duration-150 group-hover:opacity-100">
                            <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="2">
                              <circle cx="8.5" cy="8.5" r="5" />
                              <path d="M12.5 12.5L16 16" strokeLinecap="round" />
                              <path d="M8.5 6.5v4M6.5 8.5h4" strokeLinecap="round" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* Locked placeholder */
                      <div className="flex aspect-square w-full flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed border-neutral-300/40">
                        <svg viewBox="0 0 20 20" className="h-4 w-4 text-neutral-300" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <rect x="3.5" y="9" width="13" height="9" rx="1.5" />
                          <path d="M7 9V6.5a3 3 0 016 0V9" strokeLinecap="round" />
                        </svg>
                        <span className="text-[9px] font-semibold uppercase tracking-wider text-neutral-300">
                          {isAr ? `محطة ${stamp.stop}` : `Stop ${stamp.stop}`}
                        </span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* SOLVED: completion seal pressed over the stamps */}
            {status === "correct" && (
              <div
                className="absolute inset-0 flex items-center justify-center"
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
                    {isAr ? "ميجانا" : "Mijana"}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ── Section rule ── */}
          <div className="mx-6 border-t border-neutral-300/60" />

          {/* ── Puzzle form (pre-solve) ── */}
          {status !== "correct" && (
            <div className="px-6 py-5">
              <p className="text-sm leading-7 text-neutral-800">
                {isAr
                  ? "جمعت المدينة في أجزاء. داخل كل طابع حرفٌ مخفي — اعثر عليها بالترتيب واتبعها نحو المكان الذي يجسّد روح هذا الشارع."
                  : "You have collected the city in pieces. Each stamp holds one hidden letter — find them in order and follow them to the place that embodies the character of this street."}
              </p>

              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => { setShowHint((v) => { if (v) setShowHint2(false); return !v; }); }}
                  className="rounded-2xl border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-800 shadow-sm transition hover:bg-neutral-50"
                >
                  {showHint
                    ? isAr ? "إخفاء التلميح" : "Hide hint"
                    : isAr ? "أحتاج تلميحاً" : "I need a clue"}
                </button>
              </div>

              {showHint && (
                <div className="mt-3 space-y-3">
                  <div className="rounded-2xl border border-neutral-200 bg-white/80 p-4 text-sm text-neutral-800">
                    <div className="font-semibold text-neutral-950">{isAr ? "التلميح" : "Hint"}</div>
                    <div className="mt-1 leading-7">
                      {isAr
                        ? <>كل طابع يخفي <strong>حرفاً واحداً</strong> داخله — اضغط عليه وتفحّصه جيداً، ثم أدخل الحروف المخفية واحداً تلو الآخر ليتكشّف لك اسم وجهتك الأخيرة.</>
                        : <>Each stamp is hiding <strong>one letter</strong> within it. Tap and examine each stamp closely, enter the hidden letters one by one to reveal the name of your final destination.</>}
                    </div>
                  </div>

                  {!showHint2 ? (
                    <button
                      type="button"
                      onClick={() => setShowHint2(true)}
                      className="text-[12px] font-medium text-neutral-400 underline underline-offset-2 transition hover:text-neutral-600"
                    >
                      {isAr ? "لا يزال غامضاً؟" : "Still stuck?"}
                    </button>
                  ) : (
                    <>
                      <div className="rounded-2xl border border-neutral-200 bg-white/80 p-4 text-sm text-neutral-800">
                        <div className="font-semibold text-neutral-950">{isAr ? "تلميح إضافي" : "Extra hint"}</div>
                        <div className="mt-1 leading-7">
                          {isAr
                            ? "الوجهة مكوّنة من ستة أحرف. مطعم شهير على سطح يطلّ على شارع الرينبو، معروف بزيناته المميزة وواحدة من أجمل الإطلالات في عمّان."
                            : "The destination is six letters. A popular rooftop restaurant overlooking Rainbow Street, known for its unique decorations and one of the best views in Amman."}
                        </div>
                      </div>

                      {!showReveal ? (
                        <button
                          type="button"
                          onClick={() => setShowReveal(true)}
                          className="text-[12px] font-medium text-neutral-400 underline underline-offset-2 transition hover:text-neutral-600"
                        >
                          {isAr ? "الكشف عن الإجابة" : "Reveal answer"}
                        </button>
                      ) : (
                        <div className="rounded-2xl border border-neutral-200 bg-white/80 p-4 text-sm text-neutral-800">
                          <div className="font-semibold text-neutral-950">{isAr ? "الإجابة" : "Reveal answer"}</div>
                          <div className="mt-1 leading-7">
                            {isAr
                              ? "اكتب 'ميجانا' في حقل النص أدناه واستمتع بوجهتك النهائية المريحة!"
                              : "Enter 'Mijana' in the text box below and enjoy your relaxing final destination!"}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}

              <div className="mt-5">
                <label className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
                  {isAr ? "الوجهة" : "Destination"}
                </label>
                <input
                  value={answer}
                  onChange={(e) => { setAnswer(e.target.value); setStatus("idle"); }}
                  onKeyDown={(e) => e.key === "Enter" && handleCheck()}
                  placeholder={isAr ? "اكتب اسم الوجهة الأخيرة" : "Type the final destination"}
                  className="mt-2 w-full rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-base text-neutral-950 outline-none placeholder:text-neutral-400 focus:border-z-orange focus:ring-4 focus:ring-[rgba(200,105,74,0.12)]"
                />
                <div className="mt-3 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={handleCheck}
                    disabled={!answer.trim()}
                    className="rounded-2xl bg-z-orange px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-95 disabled:opacity-50"
                  >
                    {isAr ? "تحقق" : "Check"}
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="rounded-2xl border border-neutral-300 bg-white px-5 py-3 text-sm font-medium text-neutral-900 transition hover:bg-neutral-50"
                  >
                    {isAr ? "إعادة" : "Reset"}
                  </button>
                </div>
              </div>

              {status === "wrong" && (
                <div className="mt-4 rounded-2xl border border-red-400/25 bg-red-50/80 p-3 text-sm text-neutral-900">
                  {isAr
                    ? "ليست هذه — تفحّص الطوابع وابحث عن الحروف بالترتيب."
                    : "Not quite — examine the stamps and find the hidden letters in order."}
                </div>
              )}
            </div>
          )}

          {/* ── Celebration (post-solve) ── */}
          {status === "correct" && (
            <div
              className="px-6 py-5 animate-[r7-pop_560ms_cubic-bezier(.22,1,.36,1)_1]"
            >
              {/* Answer reveal */}
              <div
                className="flex items-center justify-center gap-1.5"
                style={{ animation: "r7-fade 350ms ease-out 500ms both" }}
              >
                {["M", "I", "J", "A", "N", "A"].map((letter, i) => (
                  <span
                    key={i}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-amber-200 bg-gradient-to-b from-[#FFFCF6] to-[#FEF0D2] text-base font-bold text-amber-900 shadow-sm"
                  >
                    {letter}
                  </span>
                ))}
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
                  {isAr ? "صحيح — ميجانا هي محطتك الأخيرة." : "Correct — Mijana is your final stop."}
                </p>
                <p>
                  {isAr
                    ? "شكراً لمشيك مع زوّار. تتبّعت الألغاز عبر الطعام والواجهات والإطلالات والتفاصيل الصغيرة، وجمعت المدينة قطعةً قطعة. الآن الجلوس، والمنظر، واللقيمات — كل ذلك لك."
                    : "Thank you for walking with Zowar. Seven stops, one street, a lot of ground covered. The seat and the view up top are yours now."}
                </p>
              </div>

              {/* ── Share + review CTA ── */}
              <div
                className="mt-5 flex flex-col gap-3 rounded-2xl border border-neutral-200 bg-white p-4 sm:flex-row sm:items-center"
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
                        ? "حليت لغز زوّار على شارع الرينبو في عمّان 🗺️ — ٧ محطات وطابع في كل محطة وكلمة مخفية تنتظرك. جرّب: zowar.jo"
                        : "I just solved the Zowar puzzle trail on Rainbow Street, Amman 🗺️ — 7 stops, 6 stamps, and one hidden word to find. Try it: zowar.jo"
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
                  <button
                    type="button"
                    onClick={() => setShowTestimonialForm(true)}
                    className="rounded-xl border border-neutral-200 bg-white px-3.5 py-2 text-xs font-semibold text-neutral-700 transition hover:bg-neutral-50"
                  >
                    {isAr ? "أضف تقييمك" : "Leave a review"}
                  </button>
                </div>
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
                    {isAr ? "ميجانا" : "Mijana"}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-neutral-700">
                    {isAr
                      ? "ميجانا هي النهاية التي كان هذا المسار يبني باتجاهها: مكان لتبطئ الخطى، تجلس فوق حركة الشارع، وتنظر إلى المدينة من زاوية جديدة. بعد تتبع الألغاز بين الطعام والواجهات والإطلالات والتفاصيل الصغيرة، تتحول هذه المحطة الأخيرة إلى لحظة راحة مستحقة."
                      : "Mijana sits up above Rainbow Street and gives you somewhere to land after a lot of walking. Get a table, order something, and take in the view. You've earned it."}
                  </p>
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
                      ? "حصل شارع الرينبو على اسمه من سينما الرينبو التي جعلت هذا التل ملتقىً للأهالي لأجيال. المباني الحجرية التي رافقتك طوال الطريق شُيِّدت في عشرينيات القرن الماضي لنخبة عمّان من سياسيين وسفراء وأفراد من الأسرة الحاكمة. مشروع إحياء في ٢٠٠٦ أعاد إليه ممشاه وإطلالاته. المحطات التي تتبّعتها للتو هي خريطة لذلك التاريخ المتراكم — الشارع ذاته، حقب مختلفة، كلها لا تزال هنا."
                      : "Rainbow Street takes its name from the Rainbow Cinema, a neighbourhood theatre that made this hill a meeting point for generations. The stone buildings you walked past were built in the 1920s for Amman's politicians, ambassadors, and royals. A 2006 project brought the walkways and overlooks back. The stops you just visited sit inside that history: one street, different eras, all still here."}
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
