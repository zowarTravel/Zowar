import type { StampId } from "./passport_data";

export const PASSPORT_STORAGE_KEY = "zowar_passport_rainbow_v1";
export const HIGHLIGHTS_PASSPORT_STORAGE_KEY = "zowar_passport_highlights_v1";

type PassportStore = { collected: StampId[] };

export type PassportProgressStore = {
  getCollected: () => StampId[];
  has: (id: StampId) => boolean;
  collect: (id: StampId) => void;
  reset: () => void;
  count: () => number;
};

export function createPassportStore(storageKey: string): PassportProgressStore {
  function safeRead(): PassportStore {
    if (typeof window === "undefined") return { collected: [] };
    try {
      const raw = localStorage.getItem(storageKey);
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
      localStorage.setItem(storageKey, JSON.stringify(store));
    } catch {
      // storage quota or private-mode restriction
    }
  }

  return {
    getCollected: () => safeRead().collected,
    has: (id) => safeRead().collected.includes(id),
    collect: (id) => {
      const store = safeRead();
      if (store.collected.includes(id)) return;
      safeWrite({ collected: [...store.collected, id] });
    },
    reset: () => {
      if (typeof window === "undefined") return;
      localStorage.removeItem(storageKey);
    },
    count: () => safeRead().collected.length,
  };
}

export const fullPassportStore = createPassportStore(PASSPORT_STORAGE_KEY);
export const highlightsPassportStore = createPassportStore(HIGHLIGHTS_PASSPORT_STORAGE_KEY);

/* Full Experience API */
export const getCollectedStampIds = fullPassportStore.getCollected;
export const hasCollectedStamp = fullPassportStore.has;
export const collectStamp = fullPassportStore.collect;
export const resetPassportProgress = fullPassportStore.reset;
export const getPassportCompletionCount = fullPassportStore.count;
