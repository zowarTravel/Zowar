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

export async function syncProgress(): Promise<PortalProgress> {
  try {
    const res = await fetch("/api/portal/progress");
    if (!res.ok) return readProgress();
    const server = (await res.json()) as PortalProgress;
    // Merge: local OR server (forward only)
    const local = readProgress();
    const merged: PortalProgress = {
      r1: local.r1 || server.r1,
      r2: local.r2 || server.r2,
      r3: local.r3 || server.r3,
      r4: local.r4 || server.r4,
      r5: local.r5 || server.r5,
    };
    // Write merged back to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem(KEY, JSON.stringify(merged));
    }
    return merged;
  } catch {
    return readProgress();
  }
}

export async function serverSetRoundSolved(round: keyof PortalProgress): Promise<void> {
  try {
    await fetch("/api/portal/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [round]: true }),
    });
  } catch {
    // silently ignore — local progress is already saved
  }
}
