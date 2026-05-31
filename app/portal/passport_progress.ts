import type { StampId } from "./passport_data";

export const PASSPORT_STORAGE_KEY = "zowar_passport_rainbow_v1";

type PassportStore = { collected: StampId[] };

function safeRead(): PassportStore {
  if (typeof window === "undefined") return { collected: [] };
  try {
    const raw = localStorage.getItem(PASSPORT_STORAGE_KEY);
    if (!raw) return { collected: [] };
    const parsed = JSON.parse(raw) as unknown;
    if (
      typeof parsed === "object" &&
      parsed !== null &&
      "collected" in parsed &&
      Array.isArray((parsed as Record<string, unknown>).collected)
    ) {
      return { collected: (parsed as { collected: StampId[] }).collected };
    }
  } catch {
    // fall through on malformed data
  }
  return { collected: [] };
}

function safeWrite(store: PassportStore): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(PASSPORT_STORAGE_KEY, JSON.stringify(store));
  } catch {
    // storage quota or private-mode restriction
  }
}

export function getCollectedStampIds(): StampId[] {
  return safeRead().collected;
}

export function hasCollectedStamp(id: StampId): boolean {
  return safeRead().collected.includes(id);
}

export function collectStamp(id: StampId): void {
  const store = safeRead();
  if (store.collected.includes(id)) return;
  safeWrite({ collected: [...store.collected, id] });
}

export function resetPassportProgress(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(PASSPORT_STORAGE_KEY);
}

export function getPassportCompletionCount(): number {
  return safeRead().collected.length;
}
