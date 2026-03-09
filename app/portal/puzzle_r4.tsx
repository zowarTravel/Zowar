"use client";

import React from "react";
import type { Locale } from "./riddlecontent";
import { riddle4 } from "./riddlecontent";
import { setRoundSolved } from "./progress";

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */

type Props = {
  locale: Locale;
  onSolved?: () => void;
};

type CategoryKey = "BREAKFAST" | "FAUNA" | "DESERT" | "AMMAN";

type Tile = {
  id: string;
  category: CategoryKey;
  label: Record<Locale, string>;
};

const CATEGORY_LABELS: Record<CategoryKey, Record<Locale, string>> = {
  BREAKFAST: {
    en: "Traditional Arabic breakfast items",
    ar: "أصناف فطور عربي تقليدي",
  },
  FAUNA: {
    en: "Local fauna",
    ar: "حيوانات/كائنات محلية",
  },
  DESERT: {
    en: "Desert trip (Wadi Rum vibes)",
    ar: "رحلة صحراء (أجواء وادي رم)",
  },
  AMMAN: {
    en: "Amman city vibes",
    ar: "أجواء عمّان",
  },
};

const HINTS: Record<Locale, string[]> = {
  en: [
    "There are 4 groups of 4. Tap tiles to select them.",
    "Think: food items, animals, desert imagery, and city life.",
    "If you're stuck, try grouping the most obvious 2 first.",
  ],
  ar: [
    "هناك ٤ مجموعات (كل مجموعة ٤ كلمات). اضغط للاختيار.",
    "فكّر: أطعمة، حيوانات، أجواء الصحراء، وأجواء المدينة.",
    "إذا علِقت، ابدأ بأوضح مجموعتين ثم أكمل الباقي.",
  ],
};

const TILES: readonly Tile[] = [
  { id: "CAMEL", category: "FAUNA", label: { en: "Camel", ar: "جمل" } },
  { id: "FUUL", category: "BREAKFAST", label: { en: "Fuul", ar: "فول" } },
  { id: "RED_SAND", category: "DESERT", label: { en: "Red sand", ar: "رمل أحمر" } },
  { id: "YELLOW_TAXI", category: "AMMAN", label: { en: "Yellow taxi", ar: "تاكسي أصفر" } },

  { id: "LABNEH", category: "BREAKFAST", label: { en: "Labneh", ar: "لبنة" } },
  { id: "GECKO", category: "FAUNA", label: { en: "Gecko", ar: "وزغة" } },
  { id: "JEEP", category: "DESERT", label: { en: "4 Wheel Drive", ar: "سيارة دفع رباعي" } },
  { id: "TRAFFIC", category: "AMMAN", label: { en: "Traffic", ar: "زحمة" } },

  { id: "STARS", category: "DESERT", label: { en: "Starry night", ar: "سماء مليئة بالنجوم" } },
  { id: "HUMMUS", category: "BREAKFAST", label: { en: "Hummus", ar: "حمّص" } },
  { id: "EAGLE", category: "FAUNA", label: { en: "Falcon", ar: "نسر" } },
  { id: "GAS_TRUCKS", category: "AMMAN", label: { en: "Gas trucks", ar: "سيارات الغاز" } },

  { id: "CANYON", category: "DESERT", label: { en: "Canyon", ar: "وادي/خنق" } },
  { id: "FALAFEL", category: "BREAKFAST", label: { en: "Falafel", ar: "فلافل" } },
  { id: "FOX", category: "FAUNA", label: { en: "Desert fox", ar: "ثعلب" } },
  { id: "CAFE", category: "AMMAN", label: { en: "Cafés", ar: "كافيهات" } },
] as const;

/* ------------------------------------------------------------------ */
/* Helpers                                                            */
/* ------------------------------------------------------------------ */

function getCategoryIfValidSelection(ids: string[]): CategoryKey | null {
  if (ids.length !== 4) return null;
  const tiles = TILES.filter((t) => ids.includes(t.id));
  if (tiles.length !== 4) return null;
  const cat = tiles[0].category;
  return tiles.every((t) => t.category === cat) ? cat : null;
}

/* ------------------------------------------------------------------ */
/* Component                                                          */
/* ------------------------------------------------------------------ */

export function PuzzleR4({ locale, onSolved }: Props) {
  const safeLocale: Locale = locale === "ar" ? "ar" : "en";
  const isAr = safeLocale === "ar";
  const t = riddle4;

  const [selected, setSelected] = React.useState<string[]>([]);
  const [solvedCats, setSolvedCats] = React.useState<CategoryKey[]>([]);
  const [status, setStatus] = React.useState<"idle" | "correct" | "wrong">("idle");
  const [isSolved, setIsSolved] = React.useState(false);

  const [showHint, setShowHint] = React.useState(false);
  const [nudge, setNudge] = React.useState(false);

  const solvedOnceRef = React.useRef(false);
  const timerRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  function finishOnce() {
    if (solvedOnceRef.current) return;
    solvedOnceRef.current = true;
    setRoundSolved("r4");
    onSolved?.();
  }

  const remainingTiles = React.useMemo(() => {
    const solved = new Set(solvedCats);
    return TILES.filter((x) => !solved.has(x.category));
  }, [solvedCats]);

  function toggleTile(id: string) {
    if (isSolved) return;
    setStatus("idle");

    setSelected((cur) => {
      if (cur.includes(id)) return cur.filter((x) => x !== id);
      if (cur.length >= 4) return cur;
      return [...cur, id];
    });
  }

  function triggerNudge() {
    setNudge(false);
    window.requestAnimationFrame(() => setNudge(true));
    window.setTimeout(() => setNudge(false), 220);
  }

  function submit() {
    if (isSolved) return;
    if (selected.length !== 4) return;

    const cat = getCategoryIfValidSelection(selected);

    if (!cat || solvedCats.includes(cat)) {
      setStatus("wrong");
      triggerNudge();
      if (timerRef.current) window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => setStatus("idle"), 520);
      return;
    }

    setStatus("correct");
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      setSolvedCats((cur) => [...cur, cat]);
      setSelected([]);
      setStatus("idle");
    }, 380);
  }

  React.useEffect(() => {
    if (solvedCats.length === 4 && !isSolved) {
      setIsSolved(true);
      if (timerRef.current) window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => finishOnce(), 350);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [solvedCats]);

  const shell =
    "relative overflow-hidden rounded-3xl border border-black/10 " +
    "bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(250,247,242,0.94))] " +
    "p-5 sm:p-6 shadow-[0_16px_50px_rgba(0,0,0,0.10)]";

  const headerPill =
    "inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1 text-xs text-neutral-700 shadow-sm";

  const tileBase =
    "rounded-2xl border border-black/10 bg-white px-3 py-4 text-sm font-semibold text-neutral-900 " +
    "shadow-sm transition duration-200 active:scale-[0.98] hover:scale-[1.01] hover:bg-neutral-50";

  const tileSelected =
    "border-z-orange bg-z-orange-soft ring-2 ring-offset-0 border-z-orange glow-z-orange z-orange";

  const solvedPill =
    "inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-900 shadow-sm";

  const btn =
    "group relative overflow-hidden rounded-2xl bg-neutral-900 px-5 py-3 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-40";

  const ghostBtn =
    "rounded-2xl border border-black/10 bg-white px-5 py-3 text-sm font-semibold text-neutral-900 shadow-sm transition hover:bg-neutral-50";

  return (
    <section dir={isAr ? "rtl" : "ltr"} className="mx-auto w-full max-w-2xl">
      <div className={shell}>
        <div className="pointer-events-none absolute -top-6 left-[-10px] h-32 w-32 rounded-full bg-z-orange-soft blur-3xl opacity-40" />
        <div className="pointer-events-none absolute -bottom-8 right-[-10px] h-36 w-36 rounded-full bg-white blur-3xl opacity-30" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(255,255,255,0.45),rgba(255,255,255,0))]" />

        <div className="relative flex flex-wrap items-start justify-between gap-3">
          <div className="space-y-1">
            <div className={headerPill}>
              <span className="opacity-80">{safeLocale === "en" ? "Round 4" : "الجولة ٤"}</span>
              <span className="h-3 w-px bg-neutral-300" />
              <span className="opacity-90">{safeLocale === "en" ? "Connections" : "ترابط المجموعات"}</span>
            </div>

            <h2 className="text-2xl font-semibold text-neutral-950">{t.title[safeLocale]}</h2>
            <p className="text-sm text-neutral-700">
              {safeLocale === "en"
                ? "Find 4 groups of 4. Select exactly four tiles, then submit."
                : "اعثر على ٤ مجموعات (كل مجموعة ٤ كلمات). اختر ٤ مربعات ثم اضغط إرسال."}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-2 pt-1">
            {solvedCats.map((k) => (
              <span key={k} className={solvedPill}>
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                {CATEGORY_LABELS[k][safeLocale]}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6">
          {!isSolved ? (
            <div className="rounded-2xl border border-black/8 bg-white/85 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="text-sm text-neutral-700">
                  {safeLocale === "en" ? "Selected" : "المحدد"}:{" "}
                  <span className="font-semibold text-neutral-950">{selected.length}/4</span>
                </div>

                <button
                  type="button"
                  onClick={() => setShowHint((v) => !v)}
                  className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-semibold text-neutral-800 shadow-sm transition hover:bg-neutral-50"
                >
                  {showHint
                    ? safeLocale === "en"
                      ? "Hide hint"
                      : "إخفاء التلميح"
                    : safeLocale === "en"
                    ? "Hint"
                    : "تلميح"}
                </button>
              </div>

              {showHint && (
                <div className="mt-3 rounded-2xl border border-black/8 bg-[#fffaf4] p-3 text-sm text-neutral-700">
                  <ul className="list-disc space-y-1 pl-5">
                    {HINTS[safeLocale].map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className={["mt-4", nudge ? "animate-[nudge_220ms_ease-in-out_1]" : ""].join(" ")}>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {remainingTiles.map((tile) => {
                    const isPicked = selected.includes(tile.id);
                    return (
                      <button
                        key={tile.id}
                        type="button"
                        onClick={() => toggleTile(tile.id)}
                        className={[tileBase, isPicked ? tileSelected : ""].join(" ")}
                        aria-pressed={isPicked}
                      >
                        {tile.label[safeLocale]}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <button type="button" onClick={submit} disabled={selected.length !== 4} className={btn}>
                  <span className="relative z-10">{safeLocale === "en" ? "Submit" : "إرسال"}</span>
                  <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSelected([]);
                    setStatus("idle");
                  }}
                  className={ghostBtn}
                >
                  {safeLocale === "en" ? "Clear" : "مسح"}
                </button>

                <div className="ml-auto min-h-[24px] text-sm">
                  {status === "correct" && (
                    <span className="text-emerald-700">
                      {safeLocale === "en" ? "Nice — group found." : "ممتاز — تم العثور على مجموعة."}
                    </span>
                  )}
                  {status === "wrong" && (
                    <span className="text-rose-700">
                      {t.ui.tryAgain?.[safeLocale] ?? (safeLocale === "en" ? "Try again." : "جرّب مرة أخرى.")}
                    </span>
                  )}
                </div>
              </div>

              <style jsx>{`
                @keyframes nudge {
                  0% {
                    transform: translateX(0);
                  }
                  20% {
                    transform: translateX(${isAr ? "10px" : "-10px"});
                  }
                  40% {
                    transform: translateX(${isAr ? "-10px" : "10px"});
                  }
                  60% {
                    transform: translateX(${isAr ? "8px" : "-8px"});
                  }
                  80% {
                    transform: translateX(${isAr ? "-6px" : "6px"});
                  }
                  100% {
                    transform: translateX(0);
                  }
                }
              `}</style>
            </div>
          ) : (
            <div className="relative overflow-hidden rounded-3xl border border-emerald-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(236,253,245,0.95))] p-6 shadow-[0_0_0_2px_rgba(16,185,129,0.10),0_24px_70px_rgba(16,185,129,0.10)]">
              <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_30%_20%,rgba(16,185,129,0.10),transparent_55%)]" />

              <div className="relative">
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs text-emerald-900">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  {t.ui.solved?.[safeLocale] ?? (safeLocale === "en" ? "Solved!" : "تم الحل!")}
                </div>

                <h3 className="mt-3 text-2xl font-semibold text-neutral-950">
                  {safeLocale === "en"
                    ? "Time to claim your Arabic breakfast at Al Quds Falafel."
                    : "حان وقت الفطور العربي في فلافل القدس."}
                </h3>

                <p className="mt-2 text-neutral-700">{t.finalInstruction[safeLocale]}</p>

                <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
                <div className="mt-4 text-sm text-neutral-600">
                  {safeLocale === "en"
                    ? "Show this screen if you need to confirm your next stop."
                    : "اعرض هذه الشاشة إذا احتجت لتأكيد محطتك التالية."}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default PuzzleR4;