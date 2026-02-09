"use client";

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */

export type PortalProgress = {
  r1: boolean;
  r2: boolean;
  r3: boolean;
  r4: boolean;
  r5: boolean;
};

const KEY = "zowar_progress_v1";

/* ------------------------------------------------------------------ */
/* Helpers                                                            */
/* ------------------------------------------------------------------ */

function freshDefault(): PortalProgress {
  return {
    r1: false,
    r2: false,
    r3: false,
    r4: false,
    r5: false,
  };
}

function safeParse(
  raw: string | null
): Partial<Record<keyof PortalProgress, unknown>> | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/* ------------------------------------------------------------------ */
/* Public API                                                         */
/* ------------------------------------------------------------------ */

export function readProgress(): PortalProgress {
  // Always return a NEW object (prevents hydration issues)
  const base = freshDefault();

  if (typeof window === "undefined") {
    return base;
  }

  const parsed = safeParse(localStorage.getItem(KEY));
  if (!parsed) return base;

  return {
    r1: parsed.r1 === true,
    r2: parsed.r2 === true,
    r3: parsed.r3 === true,
    r4: parsed.r4 === true,
    r5: parsed.r5 === true,
  };
}

export function setRoundSolved(round: keyof PortalProgress) {
  if (typeof window === "undefined") return;

  const cur = readProgress();
  if (cur[round]) return;

  const next: PortalProgress = {
    ...cur,
    [round]: true,
  };

  localStorage.setItem(KEY, JSON.stringify(next));
}

export function clearProgress() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
}
