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
  r5b: boolean;
  r6: boolean;
  r7: boolean;
};

export type RoundKey = keyof PortalProgress;

const ALL_ROUNDS: readonly RoundKey[] = ["r1", "r2", "r3", "r4", "r5", "r5b", "r6", "r7"];

export type ProgressStore = {
  storageKey: string;
  read: () => PortalProgress;
  setSolved: (round: RoundKey) => void;
  clear: () => void;
  sync: () => Promise<PortalProgress>;
  serverSetSolved: (round: RoundKey) => Promise<void>;
};

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
    r5b: false,
    r6: false,
    r7: false,
  };
}

function safeParse(
  raw: string | null
): Partial<Record<RoundKey, unknown>> | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/* ------------------------------------------------------------------ */
/* Store factory                                                      */
/* ------------------------------------------------------------------ */

/**
 * A progress store persists only `rounds` under `storageKey` (localStorage)
 * and syncs them with `endpoint` (signed server cookie). Reads always return
 * the full PortalProgress shape; rounds outside the store are false.
 */
export function createProgressStore(
  storageKey: string,
  endpoint: string,
  rounds: readonly RoundKey[]
): ProgressStore {
  function pick(p: PortalProgress): Partial<PortalProgress> {
    const out: Partial<PortalProgress> = {};
    for (const k of rounds) out[k] = p[k];
    return out;
  }

  function read(): PortalProgress {
    // Always return a NEW object (prevents hydration issues)
    const base = freshDefault();

    if (typeof window === "undefined") {
      return base;
    }

    const parsed = safeParse(localStorage.getItem(storageKey));
    if (!parsed) return base;

    for (const k of rounds) base[k] = parsed[k] === true;
    return base;
  }

  function setSolved(round: RoundKey) {
    if (typeof window === "undefined") return;

    const cur = read();
    if (cur[round]) return;

    const next: PortalProgress = {
      ...cur,
      [round]: true,
    };

    localStorage.setItem(storageKey, JSON.stringify(pick(next)));
  }

  function clear() {
    if (typeof window === "undefined") return;
    localStorage.removeItem(storageKey);
  }

  async function sync(): Promise<PortalProgress> {
    try {
      const res = await fetch(endpoint);
      if (!res.ok) return read();
      const server = (await res.json()) as Partial<PortalProgress>;
      // Merge: local OR server (forward only)
      const local = read();
      const merged = freshDefault();
      for (const k of rounds) merged[k] = local[k] || server[k] === true;
      // Write merged back to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem(storageKey, JSON.stringify(pick(merged)));
      }
      return merged;
    } catch {
      return read();
    }
  }

  async function serverSetSolved(round: RoundKey): Promise<void> {
    try {
      await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [round]: true }),
      });
    } catch {
      // silently ignore — local progress is already saved
    }
  }

  return { storageKey, read, setSolved, clear, sync, serverSetSolved };
}

/* ------------------------------------------------------------------ */
/* Stores                                                             */
/* ------------------------------------------------------------------ */

export const fullProgressStore = createProgressStore(
  "zowar_progress_v1",
  "/api/portal/progress",
  ALL_ROUNDS
);

export const highlightsProgressStore = createProgressStore(
  "zowar_highlights_progress_v1",
  "/api/portal/highlights-progress",
  ["r2", "r4", "r5"]
);

/* ------------------------------------------------------------------ */
/* Public API (Full Experience)                                       */
/* ------------------------------------------------------------------ */

export const readProgress = fullProgressStore.read;
export const setRoundSolved = fullProgressStore.setSolved;
export const clearProgress = fullProgressStore.clear;
export const syncProgress = fullProgressStore.sync;
export const serverSetRoundSolved = fullProgressStore.serverSetSolved;
