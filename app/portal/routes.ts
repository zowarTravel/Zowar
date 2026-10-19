"use client";

// app/portal/routes.ts
// Each Rainbow Street experience is an ordered list of existing puzzle rounds.
// Numbering, unlocking, progress and completion are derived from the route.

import {
  fullProgressStore,
  highlightsProgressStore,
  type ProgressStore,
  type RoundKey,
} from "./progress";
import {
  fullPassportStore,
  highlightsPassportStore,
  type PassportProgressStore,
} from "./passport_progress";
import type { StampId } from "./passport_data";
import type { Locale } from "./riddlecontent";

type Bi = { en: string; ar: string };

export type RouteId = "full" | "highlights";

export type RouteStep = {
  key: RoundKey;
  /** Stamp collected when this round is solved. The r7 finale has none. */
  stamp?: StampId;
  /** Number shown in the stepper circle. */
  num: number;
  /** Stepper tooltip. */
  title: Bi;
  /** Text of the Next button that leads to this step. */
  nextLabel?: Bi;
  /** Shown if this step is opened before the previous one is solved. */
  lockedLabel?: Bi;
};

export type PortalRoute = {
  id: RouteId;
  path: string;
  steps: readonly RouteStep[];
  progress: ProgressStore;
  passport: PassportProgressStore;
  /** Completion screen shown after the last step's stamp (none = last step is its own finale). */
  completion?: "highlights";
};

/* ------------------------------------------------------------------ */
/* Full Experience — labels kept exactly as they were                 */
/* ------------------------------------------------------------------ */

export const FULL_ROUTE: PortalRoute = {
  id: "full",
  path: "/portal",
  progress: fullProgressStore,
  passport: fullPassportStore,
  steps: [
    {
      key: "r1", stamp: "magenta", num: 1,
      title: { en: "Round 1", ar: "الجولة ١" },
    },
    {
      key: "r2", stamp: "rumman", num: 2,
      title: { en: "Round 2", ar: "الجولة ٢" },
      nextLabel: { en: "Next puzzle: Round 2 →", ar: "التالي: الجولة ٢ →" },
      lockedLabel: { en: "Round 2 is locked.", ar: "الجولة ٢ مقفلة." },
    },
    {
      key: "r3", stamp: "asma-kitchen", num: 3,
      title: { en: "Round 3", ar: "الجولة ٣" },
      nextLabel: { en: "Next puzzle: Round 3 →", ar: "التالي: الجولة ٣ →" },
      lockedLabel: { en: "Round 3 is locked.", ar: "الجولة ٣ مقفلة." },
    },
    {
      key: "r4", stamp: "trinitae", num: 4,
      title: { en: "Round 4", ar: "الجولة ٤" },
      nextLabel: { en: "Next puzzle: Round 4 →", ar: "التالي: الجولة ٤ →" },
      lockedLabel: { en: "Round 4 is locked.", ar: "الجولة ٤ مقفلة." },
    },
    {
      key: "r5", stamp: "falafel-al-quds", num: 5,
      title: { en: "Round 5", ar: "الجولة ٥" },
      nextLabel: { en: "Next puzzle: Round 5 →", ar: "التالي: الجولة ٥ →" },
      lockedLabel: { en: "Round 5 is locked.", ar: "الجولة ٥ مقفلة." },
    },
    {
      key: "r5b", stamp: "mlabbas", num: 6,
      title: { en: "Round 6", ar: "الجولة ٦" },
      nextLabel: { en: "Next puzzle: Round 6 →", ar: "التالي: الجولة ٦ →" },
      lockedLabel: { en: "Round 6 is locked.", ar: "الجولة ٦ مقفلة." },
    },
    {
      key: "r6", stamp: "flour-fire", num: 7,
      title: { en: "Round 7", ar: "الجولة ٧" },
      nextLabel: { en: "Next puzzle: Round 7 →", ar: "التالي: الجولة ٧ →" },
      lockedLabel: { en: "Round 7 is locked.", ar: "الجولة ٧ مقفلة." },
    },
    {
      key: "r7", num: 8,
      title: { en: "Final Stop", ar: "المحطة الأخيرة" },
      nextLabel: { en: "Final Stop →", ar: "التالي: المحطة الأخيرة →" },
      lockedLabel: { en: "Final Stop is locked.", ar: "المحطة الأخيرة مقفلة." },
    },
  ],
};

/* ------------------------------------------------------------------ */
/* Rainbow Street Highlights — Rumman → Tabrizi → Maisa (final)                */
/* ------------------------------------------------------------------ */

const AR_DIGITS = "٠١٢٣٤٥٦٧٨٩";
export function arDigits(n: number): string {
  return String(n).replace(/\d/g, (d) => AR_DIGITS[Number(d)]);
}

/** "Stop 2 of 3" / "Stop 3 of 3 — Final Stop" (and Arabic equivalents). */
export function stopOfTotal(num: number, total: number, markFinal = true): Bi {
  const final = markFinal && num === total;
  return {
    en: `Stop ${num} of ${total}${final ? " — Final Stop" : ""}`,
    ar: `المحطة ${arDigits(num)} من ${arDigits(total)}${final ? " — المحطة الأخيرة" : ""}`,
  };
}

function derivedSteps(defs: ReadonlyArray<{ key: RoundKey; stamp: StampId }>): RouteStep[] {
  const total = defs.length;
  return defs.map(({ key, stamp }, i) => {
    const label = stopOfTotal(i + 1, total);
    return {
      key,
      stamp,
      num: i + 1,
      title: label,
      nextLabel: { en: `Next: ${label.en} →`, ar: `التالي: ${label.ar} →` },
      lockedLabel: { en: `${label.en} is locked.`, ar: `${label.ar} مقفلة.` },
    };
  });
}

export const HIGHLIGHTS_ROUTE: PortalRoute = {
  id: "highlights",
  path: "/portal/highlights",
  progress: highlightsProgressStore,
  passport: highlightsPassportStore,
  completion: "highlights",
  steps: derivedSteps([
    { key: "r2", stamp: "rumman" },
    { key: "r4", stamp: "trinitae" },
    { key: "r5", stamp: "falafel-al-quds" },
  ]),
};

export function getRoute(id: RouteId): PortalRoute {
  return id === "highlights" ? HIGHLIGHTS_ROUTE : FULL_ROUTE;
}

/* ------------------------------------------------------------------ */
/* Derived helpers                                                    */
/* ------------------------------------------------------------------ */

export function stepIndex(route: PortalRoute, key: RoundKey): number {
  return route.steps.findIndex((s) => s.key === key);
}

/** Round that must be solved before `key` in this route (null for the first stop). */
export function previousRound(route: PortalRoute, key: RoundKey): RoundKey | null {
  const i = stepIndex(route, key);
  return i > 0 ? route.steps[i - 1].key : null;
}

/** Stamped stops in the Full Experience (the r7 finale has no stamp). */
export const FULL_STAMPED_STOPS = FULL_ROUTE.steps.filter((s) => s.stamp).length;

/** Display label for a stop in this route, e.g. "Stop 1 of 3". */
export function stopLabel(route: PortalRoute, key: RoundKey, locale: Locale): string {
  const i = stepIndex(route, key);
  return stopOfTotal(i + 1, route.steps.length)[locale];
}
