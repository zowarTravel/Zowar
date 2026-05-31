"use client";

import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import type { Locale } from "./riddlecontent";
import { readProgress, syncProgress, type PortalProgress } from "./progress";
import { collectStamp } from "./passport_progress";
import type { StampId } from "./passport_data";
import StampCollectedModal from "./StampCollectedModal";

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

const PuzzleR6 = dynamic(
  () => import("./puzzle_r6").then((m) => resolveComponent(m, "PuzzleR6")),
  { ssr: false, loading: () => <LoadingCard locale="en" /> }
) as React.ComponentType<PuzzleProps>;

const PuzzleR7 = dynamic(
  () => import("./puzzle_r7").then((m) => resolveComponent(m, "PuzzleR7")),
  { ssr: false, loading: () => <LoadingCard locale="en" /> }
) as React.ComponentType<PuzzleProps>;

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

type Round = "r1" | "r2" | "r3" | "r4" | "r5" | "r6" | "r7";
const PROGRESS_KEY = "zowar_progress_v1";

const ROUND_STAMP: Record<"r1" | "r2" | "r3" | "r4" | "r5" | "r6", StampId> = {
  r1: "coffee",
  r2: "rumman",
  r3: "soap-house",
  r4: "falafel-al-quds",
  r5: "al-yasmeenah",
  r6: "flour-fire",
};

const ROUNDS: ReadonlyArray<{
  key: Round;
  num: number;
  titleEn: string;
  titleAr: string;
}> = [
  { key: "r1", num: 1, titleEn: "Round 1", titleAr: "الجولة ١" },
  { key: "r2", num: 2, titleEn: "Round 2", titleAr: "الجولة ٢" },
  { key: "r3", num: 3, titleEn: "Round 3", titleAr: "الجولة ٣" },
  { key: "r4", num: 4, titleEn: "Round 4", titleAr: "الجولة ٤" },
  { key: "r5", num: 5, titleEn: "Round 5", titleAr: "الجولة ٥" },
  { key: "r6", num: 6, titleEn: "Round 6", titleAr: "الجولة ٦" },
  { key: "r7", num: 7, titleEn: "Final Stop", titleAr: "المحطة الأخيرة" },
];

type StampModal = {
  stampId: StampId;
  onContinue: () => void;
};

/* ------------------------------------------------------------------ */
/* Portal flow                                                         */
/* ------------------------------------------------------------------ */

export default function PortalFlow({ locale }: { locale: Locale }) {
  const safeLocale: Locale = locale === "ar" ? "ar" : "en";
  const isAr = safeLocale === "ar";
  const toggleHref = isAr ? "/portal?lang=en" : "/portal?lang=ar";

  /* ── Progress state (declared before derived values) ── */
  const [progress, setProgress] = React.useState<PortalProgress>(() => ({
    r1: false,
    r2: false,
    r3: false,
    r4: false,
    r5: false,
    r6: false,
    r7: false,
  }));

  const completedCount = ROUNDS.filter(({ key }) => progress[key]).length;

  const [activeRound, setActiveRound] = React.useState<Round>("r1");
  const [stampModal, setStampModal] = React.useState<StampModal | null>(null);

  /* Next-button visibility — shown immediately on load if already solved,
     or after the stamp modal is dismissed on a fresh solve. */
  const [showNextR1, setShowNextR1] = React.useState(false);
  const [showNextR2, setShowNextR2] = React.useState(false);
  const [showNextR3, setShowNextR3] = React.useState(false);
  const [showNextR4, setShowNextR4] = React.useState(false);
  const [showNextR5, setShowNextR5] = React.useState(false);
  const [showNextR6, setShowNextR6] = React.useState(false);

  /* ── Sync progress on mount & show next-buttons for already-solved rounds ── */
  React.useEffect(() => {
    let cancelled = false;

    syncProgress().then((p) => {
      if (cancelled) return;
      setProgress(p);

      /* Auto-collect stamps for any rounds solved before this feature landed */
      if (p.r1) { collectStamp(ROUND_STAMP.r1); setShowNextR1(true); }
      if (p.r2) { collectStamp(ROUND_STAMP.r2); setShowNextR2(true); }
      if (p.r3) { collectStamp(ROUND_STAMP.r3); setShowNextR3(true); }
      if (p.r4) { collectStamp(ROUND_STAMP.r4); setShowNextR4(true); }
      if (p.r5) { collectStamp(ROUND_STAMP.r5); setShowNextR5(true); }
      if (p.r6) { collectStamp(ROUND_STAMP.r6); setShowNextR6(true); }
    });

    return () => { cancelled = true; };
  }, []);

  /* ── Cross-tab sync ── */
  React.useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key === PROGRESS_KEY) setProgress(readProgress());
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  /* ── Solve callbacks — collect stamp, open modal, reveal Next on Continue ── */

  function makeSolveHandler(
    round: "r1" | "r2" | "r3" | "r4" | "r5" | "r6",
    setShowNext: React.Dispatch<React.SetStateAction<boolean>>
  ) {
    return () => {
      setProgress((p) => (p[round] ? p : { ...p, [round]: true }));
      collectStamp(ROUND_STAMP[round]);
      setStampModal({
        stampId: ROUND_STAMP[round],
        onContinue: () => {
          setStampModal(null);
          setShowNext(true);
        },
      });
    };
  }

  const onR1Solved = React.useCallback(
    makeSolveHandler("r1", setShowNextR1),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const onR2Solved = React.useCallback(
    makeSolveHandler("r2", setShowNextR2),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const onR3Solved = React.useCallback(
    makeSolveHandler("r3", setShowNextR3),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const onR4Solved = React.useCallback(
    makeSolveHandler("r4", setShowNextR4),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const onR5Solved = React.useCallback(
    makeSolveHandler("r5", setShowNextR5),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const onR6Solved = React.useCallback(
    makeSolveHandler("r6", setShowNextR6),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const onR7Solved = React.useCallback(() => {
    setProgress((p) => (p.r7 ? p : { ...p, r7: true }));
  }, []);

  /* ── Shared button styles ── */
  const nextBtn =
    "group relative overflow-hidden rounded-2xl bg-z-orange px-5 py-3 text-sm font-semibold text-white transition hover:opacity-95";
  const shine =
    "pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full";
  const topBtn =
    "inline-flex h-11 items-center justify-center rounded-2xl border border-neutral-200 bg-white px-4 text-sm font-semibold text-neutral-900 shadow-sm hover:bg-neutral-50 active:scale-[0.99]";

  /* ------------------------------------------------------------------ */
  /* Render                                                              */
  /* ------------------------------------------------------------------ */

  return (
    <div className="space-y-6">
      {/* Stamp reward modal — rendered at portal level as a fixed overlay */}
      {stampModal && (
        <StampCollectedModal
          stampId={stampModal.stampId}
          locale={safeLocale}
          onContinue={stampModal.onContinue}
        />
      )}

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

      {/* Progress stepper */}
      <div className="rounded-2xl border border-neutral-200 bg-white px-4 pt-4 pb-5">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-sm font-semibold text-neutral-900">
            {isAr ? "التقدم" : "Progress"}
          </span>
          <span className="text-xs text-neutral-400">
            {completedCount} / 7 {isAr ? "مكتملة" : "complete"}
          </span>
        </div>

        <div className="relative flex items-center justify-between">
          <div className="absolute inset-x-[18px] top-1/2 -translate-y-1/2 h-0.5 rounded-full bg-neutral-200" />
          {completedCount > 0 && (
            <div
              className="absolute left-[18px] top-1/2 -translate-y-1/2 h-0.5 rounded-full bg-z-orange transition-all duration-500"
              style={{ width: `calc(${((completedCount - 1) / 6) * 100}% * (1 - 36px / 100%))` }}
            />
          )}

          {ROUNDS.map(({ key, num, titleEn, titleAr }, idx) => {
            const done = progress[key];
            const active = activeRound === key;
            const unlocked = idx === 0 || progress[`r${idx}` as keyof PortalProgress];

            return (
              <button
                key={key}
                type="button"
                title={isAr ? titleAr : titleEn}
                onClick={() => { if (unlocked) setActiveRound(key); }}
                disabled={!unlocked}
                className={[
                  "relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold transition-all duration-200",
                  active
                    ? "scale-110 border-z-orange bg-z-orange text-white shadow-[0_0_0_4px_rgba(200,105,74,0.18)]"
                    : done
                    ? "border-z-orange bg-z-orange-soft z-orange"
                    : unlocked
                    ? "border-neutral-300 bg-white text-neutral-600 hover:border-z-orange hover:text-z-orange"
                    : "cursor-not-allowed border-neutral-200 bg-neutral-50 text-neutral-300",
                ].join(" ")}
              >
                {done && !active ? (
                  <svg
                    viewBox="0 0 12 12"
                    className="h-3.5 w-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1.5 6.5l3 3 6-6" />
                  </svg>
                ) : (
                  num
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Round panels ── */}

      {activeRound === "r1" && (
        <div>
          <PuzzleR1 locale={safeLocale} onSolved={onR1Solved} />
          {progress.r1 && showNextR1 && (
            <div className="mt-4">
              <button type="button" onClick={() => setActiveRound("r2")} className={nextBtn}>
                <span className="relative z-10">
                  {isAr ? "التالي: الجولة ٢ →" : "Next puzzle: Round 2 →"}
                </span>
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
                <span className="relative z-10">
                  {isAr ? "التالي: الجولة ٣ →" : "Next puzzle: Round 3 →"}
                </span>
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
                <span className="relative z-10">
                  {isAr ? "التالي: الجولة ٤ →" : "Next puzzle: Round 4 →"}
                </span>
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
                <span className="relative z-10">
                  {isAr ? "التالي: الجولة ٥ →" : "Next puzzle: Round 5 →"}
                </span>
                <span className={shine} />
              </button>
            </div>
          )}
        </div>
      )}

      {activeRound === "r5" && (
        <div>
          {progress.r4 ? (
            <PuzzleR6 locale={safeLocale} onSolved={onR5Solved} />
          ) : (
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 text-sm text-neutral-600">
              {isAr ? "الجولة ٥ مقفلة." : "Round 5 is locked."}
            </div>
          )}
          {progress.r5 && showNextR5 && (
            <div className="mt-4">
              <button type="button" onClick={() => setActiveRound("r6")} className={nextBtn}>
                <span className="relative z-10">
                  {isAr ? "التالي: الجولة ٦ →" : "Next puzzle: Round 6 →"}
                </span>
                <span className={shine} />
              </button>
            </div>
          )}
        </div>
      )}

      {activeRound === "r6" && (
        <div>
          {progress.r5 ? (
            <PuzzleR5 locale={safeLocale} onSolved={onR6Solved} />
          ) : (
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 text-sm text-neutral-600">
              {isAr ? "الجولة ٦ مقفلة." : "Round 6 is locked."}
            </div>
          )}
          {progress.r6 && showNextR6 && (
            <div className="mt-4">
              <button type="button" onClick={() => setActiveRound("r7")} className={nextBtn}>
                <span className="relative z-10">
                  {isAr ? "التالي: المحطة الأخيرة →" : "Final Stop →"}
                </span>
                <span className={shine} />
              </button>
            </div>
          )}
        </div>
      )}

      {activeRound === "r7" && (
        <div>
          {progress.r6 ? (
            <PuzzleR7 locale={safeLocale} onSolved={onR7Solved} />
          ) : (
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 text-sm text-neutral-600">
              {isAr ? "المحطة الأخيرة مقفلة." : "Final Stop is locked."}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
