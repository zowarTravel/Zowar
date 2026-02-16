"use client";

import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import type { Locale } from "./riddlecontent";
import { readProgress, type PortalProgress } from "./progress";

/* ------------------------------------------------------------------ */
/* Shared puzzle props                                                 */
/* ------------------------------------------------------------------ */

type PuzzleProps = {
  locale: Locale;
  onSolved?: () => void;
};

function LoadingCard({ locale }: { locale: Locale }) {
  const isAr = locale === "ar";
  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-8 text-center text-sm text-neutral-500">
      {isAr ? "جارٍ تحميل اللغز…" : "Loading puzzle…"}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Turbopack-safe resolver                                              */
/* ------------------------------------------------------------------ */

function resolveComponent(mod: any, fallbackName?: string) {
  const DD = mod?.default?.default;
  const D = mod?.default;
  const Named = fallbackName ? mod?.[fallbackName] : undefined;
  return DD ?? D ?? Named ?? mod;
}

/* ------------------------------------------------------------------ */
/* Dynamic imports (STATIC PATHS ONLY)                                  */
/* ------------------------------------------------------------------ */

const PuzzleR1 = dynamic(
  () => import("./puzzle_r1").then((m) => resolveComponent(m, "PuzzleR1")),
  { ssr: false, loading: () => <LoadingCard locale="en" /> }
) as React.ComponentType<PuzzleProps>;

const PuzzleR2 = dynamic(
  () => import("./puzzle_r2").then((m) => resolveComponent(m, "PuzzleR2")),
  { ssr: false, loading: () => <LoadingCard locale="en" /> }
) as React.ComponentType<PuzzleProps>;

const PuzzleR3 = dynamic(
  () => import("./puzzle_r3").then((m) => resolveComponent(m, "PuzzleR3")),
  { ssr: false, loading: () => <LoadingCard locale="en" /> }
) as React.ComponentType<PuzzleProps>;

const PuzzleR4 = dynamic(
  () => import("./puzzle_r4").then((m) => resolveComponent(m, "PuzzleR4")),
  { ssr: false, loading: () => <LoadingCard locale="en" /> }
) as React.ComponentType<PuzzleProps>;

const PuzzleR5 = dynamic(
  () => import("./puzzle_r5").then((m) => resolveComponent(m, "PuzzleR5")),
  { ssr: false, loading: () => <LoadingCard locale="en" /> }
) as React.ComponentType<PuzzleProps>;

/* ------------------------------------------------------------------ */
/* Portal flow                                                         */
/* ------------------------------------------------------------------ */

type Round = "r1" | "r2" | "r3" | "r4" | "r5";
const PROGRESS_KEY = "zowar_progress_v1";

export default function PortalFlow({ locale }: { locale: Locale }) {
  const safeLocale: Locale = locale === "ar" ? "ar" : "en";
  const isAr = safeLocale === "ar";
  const toggleHref = isAr ? "/portal?lang=en" : "/portal?lang=ar";

  const [progress, setProgress] = React.useState<PortalProgress>(() => ({
    r1: false,
    r2: false,
    r3: false,
    r4: false,
    r5: false,
  }));

  const [activeRound, setActiveRound] = React.useState<Round>("r1");

  const [showNextR1, setShowNextR1] = React.useState(false);
  const [showNextR2, setShowNextR2] = React.useState(false);
  const [showNextR3, setShowNextR3] = React.useState(false);
  const [showNextR4, setShowNextR4] = React.useState(false);

  const t1Ref = React.useRef<number | null>(null);
  const t2Ref = React.useRef<number | null>(null);
  const t3Ref = React.useRef<number | null>(null);
  const t4Ref = React.useRef<number | null>(null);

  React.useEffect(() => {
    setProgress(readProgress());
    return () => {
      if (t1Ref.current) window.clearTimeout(t1Ref.current);
      if (t2Ref.current) window.clearTimeout(t2Ref.current);
      if (t3Ref.current) window.clearTimeout(t3Ref.current);
      if (t4Ref.current) window.clearTimeout(t4Ref.current);
    };
  }, []);

  React.useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key === PROGRESS_KEY) setProgress(readProgress());
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  React.useEffect(() => setShowNextR1(progress.r1), [progress.r1]);
  React.useEffect(() => setShowNextR2(progress.r2), [progress.r2]);
  React.useEffect(() => setShowNextR3(progress.r3), [progress.r3]);
  React.useEffect(() => setShowNextR4(progress.r4), [progress.r4]);

  const onR1Solved = React.useCallback(() => {
    setProgress((p) => (p.r1 ? p : { ...p, r1: true }));
    setShowNextR1(false);
    if (t1Ref.current) window.clearTimeout(t1Ref.current);
    t1Ref.current = window.setTimeout(() => setShowNextR1(true), 750);
  }, []);

  const onR2Solved = React.useCallback(() => {
    setProgress((p) => (p.r2 ? p : { ...p, r2: true }));
    setShowNextR2(false);
    if (t2Ref.current) window.clearTimeout(t2Ref.current);
    t2Ref.current = window.setTimeout(() => setShowNextR2(true), 750);
  }, []);

  const onR3Solved = React.useCallback(() => {
    setProgress((p) => (p.r3 ? p : { ...p, r3: true }));
    setShowNextR3(false);
    if (t3Ref.current) window.clearTimeout(t3Ref.current);
    t3Ref.current = window.setTimeout(() => setShowNextR3(true), 750);
  }, []);

  const onR4Solved = React.useCallback(() => {
    setProgress((p) => (p.r4 ? p : { ...p, r4: true }));
    setShowNextR4(false);
    if (t4Ref.current) window.clearTimeout(t4Ref.current);
    t4Ref.current = window.setTimeout(() => setShowNextR4(true), 750);
  }, []);

  const onR5Solved = React.useCallback(() => {
    setProgress((p) => (p.r5 ? p : { ...p, r5: true }));
  }, []);

  const nextBtn =
    "group relative overflow-hidden rounded-2xl bg-neutral-900 px-5 py-3 text-sm font-semibold text-white transition hover:opacity-95";
  const shine =
    "pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full";

  const topBtn =
    "inline-flex h-11 items-center justify-center rounded-2xl border border-neutral-200 bg-white px-4 text-sm font-semibold text-neutral-900 shadow-sm hover:bg-neutral-50 active:scale-[0.99]";

  return (
    <div className="space-y-6">
      {/* Sticky top controls */}
      <div className="sticky top-0 z-20 -mx-4 border-b border-neutral-100 bg-white/85 px-4 pb-3 pt-2 backdrop-blur">
        <div className="flex items-center justify-between gap-3">
          <Link href="/" className={topBtn}>
            {isAr ? "الرئيسية" : "Home"}
          </Link>
          <Link href={toggleHref} className={topBtn}>
            {isAr ? "EN" : "AR"}
          </Link>
        </div>
      </div>

      {/* Progress header + manual round buttons */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-sm font-semibold">{isAr ? "التقدم" : "Progress"}</div>
            <div className="mt-1 text-sm text-neutral-600">
              {isAr
                ? "ابدأ من الجولة ١. افتح الجولات التالية بعد الحل."
                : "Start at Round 1. Unlock the next rounds as you solve."}
            </div>
          </div>

          <div className="flex gap-2 text-xs">
            <button
              type="button"
              onClick={() => setActiveRound("r1")}
              className={`rounded-full px-3 py-1 ${
                activeRound === "r1" ? "bg-neutral-900 text-white" : "bg-neutral-100 text-neutral-700"
              }`}
            >
              {isAr ? "١" : "R1"} {progress.r1 ? "✓" : "•"}
            </button>

            <button
              type="button"
              onClick={() => progress.r1 && setActiveRound("r2")}
              disabled={!progress.r1}
              className={`rounded-full px-3 py-1 ${
                !progress.r1
                  ? "cursor-not-allowed bg-neutral-100 text-neutral-400"
                  : activeRound === "r2"
                  ? "bg-neutral-900 text-white"
                  : "bg-neutral-100 text-neutral-700"
              }`}
            >
              {isAr ? "٢" : "R2"} {progress.r2 ? "✓" : "•"}
            </button>

            <button
              type="button"
              onClick={() => progress.r2 && setActiveRound("r3")}
              disabled={!progress.r2}
              className={`rounded-full px-3 py-1 ${
                !progress.r2
                  ? "cursor-not-allowed bg-neutral-100 text-neutral-400"
                  : activeRound === "r3"
                  ? "bg-neutral-900 text-white"
                  : "bg-neutral-100 text-neutral-700"
              }`}
            >
              {isAr ? "٣" : "R3"} {progress.r3 ? "✓" : "•"}
            </button>

            <button
              type="button"
              onClick={() => progress.r3 && setActiveRound("r4")}
              disabled={!progress.r3}
              className={`rounded-full px-3 py-1 ${
                !progress.r3
                  ? "cursor-not-allowed bg-neutral-100 text-neutral-400"
                  : activeRound === "r4"
                  ? "bg-neutral-900 text-white"
                  : "bg-neutral-100 text-neutral-700"
              }`}
            >
              {isAr ? "٤" : "R4"} {progress.r4 ? "✓" : "•"}
            </button>

            <button
              type="button"
              onClick={() => progress.r4 && setActiveRound("r5")}
              disabled={!progress.r4}
              className={`rounded-full px-3 py-1 ${
                !progress.r4
                  ? "cursor-not-allowed bg-neutral-100 text-neutral-400"
                  : activeRound === "r5"
                  ? "bg-neutral-900 text-white"
                  : "bg-neutral-100 text-neutral-700"
              }`}
            >
              {isAr ? "٥" : "R5"} {progress.r5 ? "✓" : "•"}
            </button>
          </div>
        </div>
      </div>

      {activeRound === "r1" && (
        <div>
          <PuzzleR1 locale={safeLocale} onSolved={onR1Solved} />
          {progress.r1 && showNextR1 && (
            <div className="mt-4">
              <button type="button" onClick={() => setActiveRound("r2")} className={nextBtn}>
                <span className="relative z-10">{isAr ? "التالي: الجولة ٢ →" : "Next puzzle: Round 2 →"}</span>
                <span className={shine} />
              </button>
            </div>
          )}
        </div>
      )}

      {activeRound === "r2" && (
        <div>
          {progress.r1 ? (
            <PuzzleR2 locale={safeLocale} onSolved={onR2Solved} />
          ) : (
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 text-sm text-neutral-600">
              {isAr ? "الجولة ٢ مقفلة." : "Round 2 is locked."}
            </div>
          )}
          {progress.r2 && showNextR2 && (
            <div className="mt-4">
              <button type="button" onClick={() => setActiveRound("r3")} className={nextBtn}>
                <span className="relative z-10">{isAr ? "التالي: الجولة ٣ →" : "Next puzzle: Round 3 →"}</span>
                <span className={shine} />
              </button>
            </div>
          )}
        </div>
      )}

      {activeRound === "r3" && (
        <div>
          {progress.r2 ? (
            <PuzzleR3 locale={safeLocale} onSolved={onR3Solved} />
          ) : (
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 text-sm text-neutral-600">
              {isAr ? "الجولة ٣ مقفلة." : "Round 3 is locked."}
            </div>
          )}
          {progress.r3 && showNextR3 && (
            <div className="mt-4">
              <button type="button" onClick={() => setActiveRound("r4")} className={nextBtn}>
                <span className="relative z-10">{isAr ? "التالي: الجولة ٤ →" : "Next puzzle: Round 4 →"}</span>
                <span className={shine} />
              </button>
            </div>
          )}
        </div>
      )}

      {activeRound === "r4" && (
        <div>
          {progress.r3 ? (
            <PuzzleR4 locale={safeLocale} onSolved={onR4Solved} />
          ) : (
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 text-sm text-neutral-600">
              {isAr ? "الجولة ٤ مقفلة." : "Round 4 is locked."}
            </div>
          )}
          {progress.r4 && showNextR4 && (
            <div className="mt-4">
              <button type="button" onClick={() => setActiveRound("r5")} className={nextBtn}>
                <span className="relative z-10">{isAr ? "التالي: الجولة ٥ →" : "Next puzzle: Round 5 →"}</span>
                <span className={shine} />
              </button>
            </div>
          )}
        </div>
      )}

      {activeRound === "r5" && (
        <div>
          {progress.r4 ? (
            <PuzzleR5 locale={safeLocale} onSolved={onR5Solved} />
          ) : (
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 text-sm text-neutral-600">
              {isAr ? "الجولة ٥ مقفلة." : "Round 5 is locked."}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
