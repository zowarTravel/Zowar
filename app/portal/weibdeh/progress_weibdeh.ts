"use client";

export type WeibdehProgress = {
  w1: boolean;
  w2: boolean;
  w3: boolean;
  w4: boolean;
  w5: boolean;
  w6: boolean;
  w7: boolean;
};

const KEY = "zowar_weibdeh_v1";

function freshDefault(): WeibdehProgress {
  return { w1: false, w2: false, w3: false, w4: false, w5: false, w6: false, w7: false };
}

function safeParse(raw: string | null): Partial<Record<keyof WeibdehProgress, unknown>> | null {
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
}

export function readWeibdehProgress(): WeibdehProgress {
  const base = freshDefault();
  if (typeof window === "undefined") return base;
  const parsed = safeParse(localStorage.getItem(KEY));
  if (!parsed) return base;
  return {
    w1: parsed.w1 === true,
    w2: parsed.w2 === true,
    w3: parsed.w3 === true,
    w4: parsed.w4 === true,
    w5: parsed.w5 === true,
    w6: parsed.w6 === true,
    w7: parsed.w7 === true,
  };
}

export function setWeibdehRoundSolved(round: keyof WeibdehProgress) {
  if (typeof window === "undefined") return;
  const cur = readWeibdehProgress();
  if (cur[round]) return;
  localStorage.setItem(KEY, JSON.stringify({ ...cur, [round]: true }));
}

export function clearWeibdehProgress() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
}

export async function syncWeibdehProgress(): Promise<WeibdehProgress> {
  try {
    const res = await fetch("/api/portal/weibdeh-progress");
    if (!res.ok) return readWeibdehProgress();
    const server = (await res.json()) as WeibdehProgress;
    const local = readWeibdehProgress();
    const merged: WeibdehProgress = {
      w1: local.w1 || server.w1,
      w2: local.w2 || server.w2,
      w3: local.w3 || server.w3,
      w4: local.w4 || server.w4,
      w5: local.w5 || server.w5,
      w6: local.w6 || server.w6,
      w7: local.w7 || (server.w7 ?? false),
    };
    if (typeof window !== "undefined") localStorage.setItem(KEY, JSON.stringify(merged));
    return merged;
  } catch {
    return readWeibdehProgress();
  }
}

export async function serverSetWeibdehRoundSolved(round: keyof WeibdehProgress): Promise<void> {
  try {
    await fetch("/api/portal/weibdeh-progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [round]: true }),
    });
  } catch {
    // silently ignore — local progress already saved
  }
}
