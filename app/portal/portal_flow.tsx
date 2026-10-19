"use client";

import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import type { Locale } from "./riddlecontent";
import type { PortalProgress, RoundKey } from "./progress";
import type { StampId } from "./passport_data";
import StampCollectedModal from "./StampCollectedModal";
import HighlightsComplete from "./HighlightsComplete";
import { ExperienceProvider } from "./experience_context";
import { getRoute, type RouteId } from "./routes";

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

const PuzzleR5b = dynamic(
  () => import("./puzzle_r5b").then((m) => resolveComponent(m, "PuzzleR5b")),
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

const PUZZLES: Record<RoundKey, React.ComponentType<PuzzleProps>> = {
  r1: PuzzleR1,
  r2: PuzzleR2,
  r3: PuzzleR3,
  r4: PuzzleR4,
  r5: PuzzleR5,
  r5b: PuzzleR5b,
  r6: PuzzleR6,
  r7: PuzzleR7,
};

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

type StampModal = {
  stampId: StampId;
  onContinue: () => void;
};

type ShowNext = Record<RoundKey, boolean>;

const NO_NEXT: ShowNext = {
  r1: false, r2: false, r3: false, r4: false,
  r5: false, r5b: false, r6: false, r7: false,
};

/* ------------------------------------------------------------------ */
/* Portal flow                                                         */
/* ------------------------------------------------------------------ */

export default function PortalFlow({
  locale,
  routeId = "full",
}: {
  locale: Locale;
  routeId?: RouteId;
}) {
  const route = getRoute(routeId);
  const steps = route.steps;
  const safeLocale: Locale = locale === "ar" ? "ar" : "en";
  const isAr = safeLocale === "ar";
  const toggleHref = isAr ? `${route.path}?lang=en` : `${route.path}?lang=ar`;

  /* ── Progress state (declared before derived values) ── */
  const [progress, setProgress] = React.useState<PortalProgress>(() => ({
    r1: false,
    r2: false,
    r3: false,
    r4: false,
    r5: false,
    r5b: false,
    r6: false,
    r7: false,
  }));

  const completedCount = steps.filter(({ key }) => progress[key]).length;

  const [activeRound, setActiveRound] = React.useState<RoundKey>(steps[0].key);
  const [stampModal, setStampModal] = React.useState<StampModal | null>(null);

  /* Next-button visibility — shown immediately on load if already solved,
     or after the stamp modal is dismissed on a fresh solve. */
  const [showNext, setShowNext] = React.useState<ShowNext>(NO_NEXT);

  /* ── Sync progress on mount & show next-buttons for already-solved rounds ── */
  React.useEffect(() => {
    let cancelled = false;

    route.progress.sync().then((p) => {
      if (cancelled) return;
      setProgress(p);

      /* Auto-collect stamps for any rounds solved before this feature landed.
         A completion screen stays hidden until the final puzzle is confirmed again. */
      const finalKey = steps[steps.length - 1].key;
      const shown: ShowNext = { ...NO_NEXT };
      for (const { key, stamp } of steps) {
        if (stamp && p[key]) {
          route.passport.collect(stamp);
          if (!(route.completion && key === finalKey)) shown[key] = true;
        }
      }
      setShowNext(shown);
    });

    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Cross-tab sync ── */
  React.useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key === route.progress.storageKey) setProgress(route.progress.read());
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [route]);

  /* ── Solve callbacks — collect stamp, open modal, reveal Next on Continue ── */
  const solveHandlers = React.useMemo(() => {
    const handlers: Partial<Record<RoundKey, () => void>> = {};
    for (const { key, stamp } of route.steps) {
      handlers[key] = () => {
        setProgress((p) => (p[key] ? p : { ...p, [key]: true }));
        if (!stamp) return;
        route.passport.collect(stamp);
        setStampModal({
          stampId: stamp,
          onContinue: () => {
            setStampModal(null);
            setShowNext((s) => ({ ...s, [key]: true }));
          },
        });
      };
    }
    return handlers;
  }, [route]);

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
    <ExperienceProvider route={route}>
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
            {completedCount} / {steps.length} {isAr ? "مكتملة" : "complete"}
          </span>
        </div>

        <div className="relative flex items-center justify-between">
          <div className="absolute inset-x-[18px] top-1/2 -translate-y-1/2 h-0.5 rounded-full bg-neutral-200" />
          {completedCount > 0 && (
            <div
              className="absolute left-[18px] top-1/2 -translate-y-1/2 h-0.5 rounded-full bg-z-orange transition-all duration-500"
              style={{ width: `calc(${((completedCount - 1) / (steps.length - 1)) * 100}% * (1 - 36px / 100%))` }}
            />
          )}

          {steps.map(({ key, num, title }, idx) => {
            const done = progress[key];
            const active = activeRound === key;
            const unlocked = idx === 0 || progress[steps[idx - 1].key];

            return (
              <button
                key={key}
                type="button"
                title={title[safeLocale]}
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

      {steps.map((step, idx) => {
        if (activeRound !== step.key) return null;

        const Puzzle = PUZZLES[step.key];
        const prev = idx > 0 ? steps[idx - 1] : null;
        const next = steps[idx + 1];
        const unlocked = !prev || progress[prev.key];
        const revealed = progress[step.key] && showNext[step.key];

        return (
          <div key={step.key}>
            {unlocked ? (
              <Puzzle locale={safeLocale} onSolved={solveHandlers[step.key]} />
            ) : (
              <div className="rounded-2xl border border-neutral-200 bg-white p-6 text-sm text-neutral-600">
                {step.lockedLabel?.[safeLocale]}
              </div>
            )}
            {next && revealed && (
              <div className="mt-4">
                <button type="button" onClick={() => setActiveRound(next.key)} className={nextBtn}>
                  <span className="relative z-10">
                    {next.nextLabel?.[safeLocale]}
                  </span>
                  <span className={shine} />
                </button>
              </div>
            )}
            {!next && revealed && route.completion === "highlights" && (
              <div className="mt-6">
                <HighlightsComplete locale={safeLocale} route={route} />
              </div>
            )}
          </div>
        );
      })}
    </div>
    </ExperienceProvider>
  );
}
