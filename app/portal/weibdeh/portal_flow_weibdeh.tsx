"use client";

import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
  readWeibdehProgress,
  syncWeibdehProgress,
  type WeibdehProgress,
} from "./progress_weibdeh";

type Locale = "en" | "ar";
type Round = "w1" | "w2" | "w3" | "w4" | "w5" | "w6" | "w7";
const PROGRESS_KEY = "zowar_weibdeh_v1";

type PuzzleProps = { locale: Locale; onSolved?: () => void };

function LoadingCard({ locale }: { locale: Locale }) {
  const isAr = locale === "ar";
  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-8 text-center text-sm text-neutral-500">
      {isAr ? "جارٍ تحميل اللغز…" : "Loading puzzle…"}
    </div>
  );
}

function resolveComponent(mod: any, fallbackName?: string) {
  const DD = mod?.default?.default;
  const D = mod?.default;
  const Named = fallbackName ? mod?.[fallbackName] : undefined;
  return DD ?? D ?? Named ?? mod;
}

const PuzzleW1 = dynamic(
  () => import("./puzzle_w1").then((m) => resolveComponent(m, "PuzzleW1")),
  { ssr: false, loading: () => <LoadingCard locale="en" /> }
) as React.ComponentType<PuzzleProps>;

const PuzzleW2 = dynamic(
  () => import("./puzzle_w2").then((m) => resolveComponent(m, "PuzzleW2")),
  { ssr: false, loading: () => <LoadingCard locale="en" /> }
) as React.ComponentType<PuzzleProps>;

const PuzzleW3 = dynamic(
  () => import("./puzzle_w3").then((m) => resolveComponent(m, "PuzzleW3")),
  { ssr: false, loading: () => <LoadingCard locale="en" /> }
) as React.ComponentType<PuzzleProps>;

const PuzzleW4 = dynamic(
  () => import("./puzzle_w4").then((m) => resolveComponent(m, "PuzzleW4")),
  { ssr: false, loading: () => <LoadingCard locale="en" /> }
) as React.ComponentType<PuzzleProps>;

const PuzzleW5 = dynamic(
  () => import("./puzzle_w5").then((m) => resolveComponent(m, "PuzzleW5")),
  { ssr: false, loading: () => <LoadingCard locale="en" /> }
) as React.ComponentType<PuzzleProps>;

const PuzzleW6 = dynamic(
  () => import("./puzzle_w6").then((m) => resolveComponent(m, "PuzzleW6")),
  { ssr: false, loading: () => <LoadingCard locale="en" /> }
) as React.ComponentType<PuzzleProps>;

const PuzzleW7 = dynamic(
  () => import("./puzzle_w7").then((m) => resolveComponent(m, "PuzzleW7")),
  { ssr: false, loading: () => <LoadingCard locale="en" /> }
) as React.ComponentType<PuzzleProps>;

export default function PortalFlowWeibdeh({ locale }: { locale: string }) {
  const safeLocale: Locale = locale === "ar" ? "ar" : "en";
  const isAr = safeLocale === "ar";
  const toggleHref = isAr ? "/portal/weibdeh?lang=en" : "/portal/weibdeh?lang=ar";

  const [progress, setProgress] = React.useState<WeibdehProgress>(() => ({
    w1: false, w2: false, w3: false, w4: false, w5: false, w6: false, w7: false,
  }));

  const [activeRound, setActiveRound] = React.useState<Round>("w1");

  const [showNext1, setShowNext1] = React.useState(false);
  const [showNext2, setShowNext2] = React.useState(false);
  const [showNext3, setShowNext3] = React.useState(false);
  const [showNext4, setShowNext4] = React.useState(false);
  const [showNext5, setShowNext5] = React.useState(false);
  const [showNext6, setShowNext6] = React.useState(false);

  const t1Ref = React.useRef<number | null>(null);
  const t2Ref = React.useRef<number | null>(null);
  const t3Ref = React.useRef<number | null>(null);
  const t4Ref = React.useRef<number | null>(null);
  const t5Ref = React.useRef<number | null>(null);
  const t6Ref = React.useRef<number | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    syncWeibdehProgress().then((p) => { if (!cancelled) setProgress(p); });
    return () => {
      cancelled = true;
      [t1Ref, t2Ref, t3Ref, t4Ref, t5Ref, t6Ref].forEach((r) => {
        if (r.current) window.clearTimeout(r.current);
      });
    };
  }, []);

  React.useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key === PROGRESS_KEY) setProgress(readWeibdehProgress());
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  React.useEffect(() => setShowNext1(progress.w1), [progress.w1]);
  React.useEffect(() => setShowNext2(progress.w2), [progress.w2]);
  React.useEffect(() => setShowNext3(progress.w3), [progress.w3]);
  React.useEffect(() => setShowNext4(progress.w4), [progress.w4]);
  React.useEffect(() => setShowNext5(progress.w5), [progress.w5]);
  React.useEffect(() => setShowNext6(progress.w6), [progress.w6]);

  function makeSolver(
    key: keyof WeibdehProgress,
    setShow: (v: boolean) => void,
    timerRef: React.MutableRefObject<number | null>,
    next: Round
  ) {
    return () => {
      setProgress((p) => (p[key] ? p : { ...p, [key]: true }));
      setShow(false);
      if (timerRef.current) window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => setShow(true), 750);
      void next;
    };
  }

  const onW1Solved = makeSolver("w1", setShowNext1, t1Ref, "w2");
  const onW2Solved = makeSolver("w2", setShowNext2, t2Ref, "w3");
  const onW3Solved = makeSolver("w3", setShowNext3, t3Ref, "w4");
  const onW4Solved = makeSolver("w4", setShowNext4, t4Ref, "w5");
  const onW5Solved = makeSolver("w5", setShowNext5, t5Ref, "w6");
  const onW6Solved = makeSolver("w6", setShowNext6, t6Ref, "w7");
  const onW7Solved = React.useCallback(() => {
    setProgress((p) => (p.w7 ? p : { ...p, w7: true }));
  }, []);

  const nextBtn =
    "group relative overflow-hidden rounded-2xl bg-z-orange px-5 py-3 text-sm font-semibold text-white transition hover:opacity-95";
  const shine =
    "pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full";
  const topBtn =
    "inline-flex h-11 items-center justify-center rounded-2xl border border-neutral-200 bg-white px-4 text-sm font-semibold text-neutral-900 shadow-sm hover:bg-neutral-50 active:scale-[0.99]";
  const locked =
    "rounded-2xl border border-neutral-200 bg-white p-6 text-sm text-neutral-600";

  const roundLabels = isAr
    ? ["١", "٢", "٣", "٤", "٥", "٦", "٧"]
    : ["W1", "W2", "W3", "W4", "W5", "W6", "W7"];
  const rounds: Round[] = ["w1", "w2", "w3", "w4", "w5", "w6", "w7"];
  const prereqs: (keyof WeibdehProgress | null)[] = [null, "w1", "w2", "w3", "w4", "w5", "w6"];

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

      {/* Progress header */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-sm font-semibold">{isAr ? "التقدم" : "Progress"}</div>
            <div className="mt-1 text-sm text-neutral-600">
              {isAr
                ? "تجربة الويبدة · ٧ محطات"
                : "Al Weibdeh Experience · 7 stops"}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 text-xs">
            {rounds.map((r, i) => {
              const prereq = prereqs[i];
              const unlocked = prereq === null || progress[prereq];
              const solved = progress[r];
              return (
                <button
                  key={r}
                  type="button"
                  onClick={() => unlocked && setActiveRound(r)}
                  disabled={!unlocked}
                  className={`rounded-full px-3 py-1 ${
                    !unlocked
                      ? "cursor-not-allowed bg-neutral-100 text-neutral-400"
                      : activeRound === r
                      ? "bg-z-orange text-white"
                      : "bg-neutral-100 text-neutral-700"
                  }`}
                >
                  {roundLabels[i]} {solved ? "✓" : "•"}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Round sections */}
      {activeRound === "w1" && (
        <div>
          <PuzzleW1 locale={safeLocale} onSolved={onW1Solved} />
          {progress.w1 && showNext1 && (
            <div className="mt-4">
              <button type="button" onClick={() => setActiveRound("w2")} className={nextBtn}>
                <span className="relative z-10">{isAr ? "التالي: الجولة ٢ →" : "Next puzzle: Stop 2 →"}</span>
                <span className={shine} />
              </button>
            </div>
          )}
        </div>
      )}

      {activeRound === "w2" && (
        <div>
          {progress.w1 ? <PuzzleW2 locale={safeLocale} onSolved={onW2Solved} /> : <div className={locked}>{isAr ? "الجولة ٢ مقفلة." : "Stop 2 is locked."}</div>}
          {progress.w2 && showNext2 && (
            <div className="mt-4">
              <button type="button" onClick={() => setActiveRound("w3")} className={nextBtn}>
                <span className="relative z-10">{isAr ? "التالي: الجولة ٣ →" : "Next puzzle: Stop 3 →"}</span>
                <span className={shine} />
              </button>
            </div>
          )}
        </div>
      )}

      {activeRound === "w3" && (
        <div>
          {progress.w2 ? <PuzzleW3 locale={safeLocale} onSolved={onW3Solved} /> : <div className={locked}>{isAr ? "الجولة ٣ مقفلة." : "Stop 3 is locked."}</div>}
          {progress.w3 && showNext3 && (
            <div className="mt-4">
              <button type="button" onClick={() => setActiveRound("w4")} className={nextBtn}>
                <span className="relative z-10">{isAr ? "التالي: الجولة ٤ →" : "Next puzzle: Stop 4 →"}</span>
                <span className={shine} />
              </button>
            </div>
          )}
        </div>
      )}

      {activeRound === "w4" && (
        <div>
          {progress.w3 ? <PuzzleW4 locale={safeLocale} onSolved={onW4Solved} /> : <div className={locked}>{isAr ? "الجولة ٤ مقفلة." : "Stop 4 is locked."}</div>}
          {progress.w4 && showNext4 && (
            <div className="mt-4">
              <button type="button" onClick={() => setActiveRound("w5")} className={nextBtn}>
                <span className="relative z-10">{isAr ? "التالي: الجولة ٥ →" : "Next puzzle: Stop 5 →"}</span>
                <span className={shine} />
              </button>
            </div>
          )}
        </div>
      )}

      {activeRound === "w5" && (
        <div>
          {progress.w4 ? <PuzzleW5 locale={safeLocale} onSolved={onW5Solved} /> : <div className={locked}>{isAr ? "الجولة ٥ مقفلة." : "Stop 5 is locked."}</div>}
          {progress.w5 && showNext5 && (
            <div className="mt-4">
              <button type="button" onClick={() => setActiveRound("w6")} className={nextBtn}>
                <span className="relative z-10">{isAr ? "التالي: الجولة ٦ →" : "Next puzzle: Stop 6 →"}</span>
                <span className={shine} />
              </button>
            </div>
          )}
        </div>
      )}

      {activeRound === "w6" && (
        <div>
          {progress.w5 ? <PuzzleW6 locale={safeLocale} onSolved={onW6Solved} /> : <div className={locked}>{isAr ? "الجولة ٦ مقفلة." : "Stop 6 is locked."}</div>}
          {progress.w6 && showNext6 && (
            <div className="mt-4">
              <button type="button" onClick={() => setActiveRound("w7")} className={nextBtn}>
                <span className="relative z-10">{isAr ? "التالي: الجولة ٧ →" : "Next puzzle: Stop 7 →"}</span>
                <span className={shine} />
              </button>
            </div>
          )}
        </div>
      )}

      {activeRound === "w7" && (
        <div>
          {progress.w6 ? <PuzzleW7 locale={safeLocale} onSolved={onW7Solved} /> : <div className={locked}>{isAr ? "الجولة ٧ مقفلة." : "Stop 7 is locked."}</div>}
        </div>
      )}
    </div>
  );
}
