"use client";

import React from "react";
import type { Locale } from "./riddlecontent";
import { riddle4 } from "./riddlecontent";
import { setRoundSolved, serverSetRoundSolved, readProgress } from "./progress";

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */

type Props = {
  locale: Locale;
  onSolved?: () => void;
};

type CategoryKey = "SOAP_SCENTS" | "JORDAN_MEALS" | "AMMAN" | "DESERT";

type Tile = {
  id: string;
  category: CategoryKey;
  label: Record<Locale, string>;
};

/* ------------------------------------------------------------------ */
/* Data                                                               */
/* ------------------------------------------------------------------ */

const CATEGORY_LABELS: Record<CategoryKey, Record<Locale, string>> = {
  SOAP_SCENTS:   { en: "Scents of Jordan",       ar: "عطور الأردن"       },
  JORDAN_MEALS:  { en: "Jordanian meals",          ar: "أكلات أردنية"     },
  AMMAN:         { en: "Only in Amman",           ar: "في عمّان فقط"     },
  DESERT:        { en: "Jordan desert",           ar: "صحراء الأردن"     },
};

const CATEGORY_DOT: Record<CategoryKey, string> = {
  SOAP_SCENTS:   "bg-amber-500",
  JORDAN_MEALS:  "bg-purple-500",
  AMMAN:         "bg-emerald-500",
  DESERT:        "bg-rose-500",
};

const CATEGORY_PILL: Record<CategoryKey, string> = {
  SOAP_SCENTS:   "border-amber-200 bg-amber-50 text-amber-900",
  JORDAN_MEALS:  "border-purple-200 bg-purple-50 text-purple-900",
  AMMAN:         "border-emerald-200 bg-emerald-50 text-emerald-900",
  DESERT:        "border-rose-200 bg-rose-50 text-rose-900",
};

const TILES: readonly Tile[] = [
  // Interleaved so no category is visually stacked in the grid
  { id: "OLIVE_OIL",      category: "SOAP_SCENTS",   label: { en: "Olive oil",       ar: "زيت الزيتون"  } },
  { id: "MANSAF",          category: "JORDAN_MEALS",  label: { en: "Mansaf",          ar: "منسف"          } },
  { id: "GAS_TRUCK",      category: "AMMAN",         label: { en: "Gas truck",       ar: "شاحنة الغاز"  } },
  { id: "RED_SAND",       category: "DESERT",        label: { en: "Red sand",        ar: "رمال حمراء"   } },

  { id: "JASMINE",        category: "SOAP_SCENTS",   label: { en: "Jasmine",         ar: "ياسمين"        } },
  { id: "SHAWERMA",       category: "JORDAN_MEALS",  label: { en: "Shawerma",        ar: "شاورما"        } },
  { id: "YELLOW_TAXI",    category: "AMMAN",         label: { en: "Yellow taxi",     ar: "تاكسي أصفر"   } },
  { id: "STARRY_NIGHT",   category: "DESERT",        label: { en: "Starry night",    ar: "ليلة نجوم"    } },

  { id: "ORANGE_BLOSSOM", category: "SOAP_SCENTS",   label: { en: "Orange blossom",  ar: "زهر البرتقال" } },
  { id: "MANAKEESH",      category: "JORDAN_MEALS",  label: { en: "Manakeesh",       ar: "مناقيش"        } },
  { id: "WATER_TANKER",   category: "AMMAN",         label: { en: "Water tanker",    ar: "صهريج المياه" } },
  { id: "BEDOUIN_TENT",   category: "DESERT",        label: { en: "Bedouin tent",    ar: "خيمة بدوية"   } },

  { id: "ROSE_WATER",     category: "SOAP_SCENTS",   label: { en: "Rose water",      ar: "ماء الورد"    } },
  { id: "FALAFEL",        category: "JORDAN_MEALS",  label: { en: "Falafel",         ar: "فلافل"         } },
  { id: "ROUNDABOUT",     category: "AMMAN",         label: { en: "Roundabout",      ar: "دوّار"         } },
  { id: "CAMPFIRE",       category: "DESERT",        label: { en: "Campfire",        ar: "نار المخيّم"  } },
] as const;

const SOAPHOUSE_MAP_URL =
  "https://maps.google.com/?q=Trinitae,+Rainbow+Street,+Amman,+Jordan";

const HINTS: Record<Locale, readonly string[]> = {
  en: [
    "Think in themes, not geography. All 16 words connect to Jordan — your job is to find which specific theme each one belongs to.",
    "One group is scents and ingredients used in traditional Jordanian soap-making. They're not just things you find in Jordan — they're specifically what goes into the soap at your next stop.",
    "The Amman group is about the city's daily sounds and sights: the gas truck that drives through neighbourhoods, the yellow taxi, the water tanker, the roundabout. Things that are distinctly Amman.",
  ],
  ar: [
    "فكّر بمواضيع لا بجغرافية. الكلمات الستة عشر كلها مرتبطة بالأردن — مهمتك أن تكتشف الموضوع المشترك لكل مجموعة.",
    "إحدى المجموعات تضم عطور ومكوّنات صناعة الصابون التقليدي الأردني. ليست مجرد أشياء موجودة في الأردن — بل هي تحديداً ما يدخل في صنع الصابون الذي ستجده في محطتك القادمة.",
    "مجموعة عمّان تتعلق بأصوات ومشاهد المدينة اليومية: شاحنة الغاز التي تجوب الأحياء، التاكسي الأصفر، الصهريج، الدوّار — أشياء تميّز عمّان تحديداً.",
  ],
};

/* ------------------------------------------------------------------ */
/* Helpers                                                            */
/* ------------------------------------------------------------------ */

function getCategory(ids: string[]): CategoryKey | null {
  if (ids.length !== 4) return null;
  const tiles = TILES.filter((t) => ids.includes(t.id));
  if (tiles.length !== 4) return null;
  const cat = tiles[0].category;
  return tiles.every((t) => t.category === cat) ? cat : null;
}

function isOneAway(ids: string[]): boolean {
  if (ids.length !== 4) return false;
  const tiles = TILES.filter((t) => ids.includes(t.id));
  if (tiles.length !== 4) return false;
  const counts: Partial<Record<CategoryKey, number>> = {};
  for (const tile of tiles) counts[tile.category] = (counts[tile.category] ?? 0) + 1;
  const vals = Object.values(counts);
  return vals.length === 2 && (vals[0] === 3 || vals[1] === 3);
}

/* ------------------------------------------------------------------ */
/* Component                                                          */
/* ------------------------------------------------------------------ */

export function PuzzleR3({ locale, onSolved }: Props) {
  const safeLocale: Locale = locale === "ar" ? "ar" : "en";
  const isAr = safeLocale === "ar";
  const t = riddle4;

  const progress = React.useMemo(() => readProgress(), []);
  const locked = !progress.r2;

  const [selected, setSelected] = React.useState<string[]>([]);
  const [solvedCats, setSolvedCats] = React.useState<CategoryKey[]>([]);
  const [collapsingCat, setCollapsingCat] = React.useState<CategoryKey | null>(null);
  const [status, setStatus] = React.useState<"idle" | "correct" | "oneaway" | "wrong">("idle");
  const [nudge, setNudge] = React.useState(false);
  const [isSolved, setIsSolved] = React.useState(false);
  const [hintsRevealed, setHintsRevealed] = React.useState<0 | 1 | 2 | 3 | 4>(0);

  const solvedOnceRef = React.useRef(false);
  const timerRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    return () => { if (timerRef.current) window.clearTimeout(timerRef.current); };
  }, []);

  function finishOnce() {
    if (solvedOnceRef.current) return;
    solvedOnceRef.current = true;
    setRoundSolved("r4");
    serverSetRoundSolved("r4");
    onSolved?.();
  }

  React.useEffect(() => {
    if (solvedCats.length === 4 && !isSolved) {
      setIsSolved(true);
      if (timerRef.current) window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => finishOnce(), 350);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [solvedCats]);

  const remainingTiles = React.useMemo(() => {
    const solved = new Set(solvedCats);
    return TILES.filter((x) => !solved.has(x.category) && x.category !== collapsingCat);
  }, [solvedCats, collapsingCat]);

  const collapsingTiles = React.useMemo(
    () => (collapsingCat ? TILES.filter((x) => x.category === collapsingCat) : []),
    [collapsingCat]
  );

  function toggleTile(id: string) {
    if (isSolved || collapsingCat) return;
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
    window.setTimeout(() => setNudge(false), 280);
  }

  function submit() {
    if (isSolved || collapsingCat !== null) return;
    if (selected.length !== 4) return;

    const cat = getCategory(selected);

    if (cat && !solvedCats.includes(cat)) {
      setStatus("correct");
      setCollapsingCat(cat);
      setSelected([]);
      if (timerRef.current) window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => {
        setSolvedCats((cur) => [...cur, cat]);
        setCollapsingCat(null);
        setStatus("idle");
      }, 480);
      return;
    }

    if (isOneAway(selected)) {
      setStatus("oneaway");
      triggerNudge();
      if (timerRef.current) window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => setStatus("idle"), 2600);
      return;
    }

    setStatus("wrong");
    triggerNudge();
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setStatus("idle"), 1600);
  }

  /* ------------------------------------------------------------------ */
  /* Locked state                                                       */
  /* ------------------------------------------------------------------ */

  if (locked) {
    return (
      <div className="rounded-3xl border border-neutral-200 bg-white p-5">
        <h2 className="text-xl font-semibold">{isAr ? "الجولة ٤ مقفلة" : "Round 4 Locked"}</h2>
        <p className="mt-2 text-neutral-700">
          {isAr ? "حل الجولة ٢ أولاً لفتح هذه الجولة." : "Solve Round 2 first to unlock this puzzle."}
        </p>
      </div>
    );
  }

  /* ------------------------------------------------------------------ */
  /* Styles                                                             */
  /* ------------------------------------------------------------------ */

  const shell =
    "relative overflow-hidden rounded-3xl border border-black/10 " +
    "bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(250,247,242,0.94))] " +
    "p-5 sm:p-6 shadow-[0_16px_50px_rgba(0,0,0,0.10)]";

  const tileBase =
    "rounded-2xl border border-black/10 bg-white px-3 py-4 text-center text-sm font-semibold text-neutral-900 " +
    "shadow-sm transition duration-200 active:scale-[0.98] hover:scale-[1.01] hover:bg-neutral-50";

  const tileSelected = "border-z-orange bg-z-orange-soft ring-2 ring-z-orange/30 z-orange";

  const btn =
    "group relative overflow-hidden rounded-2xl bg-z-orange px-5 py-3 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-40";

  const ghostBtn =
    "rounded-2xl border border-black/10 bg-white px-5 py-3 text-sm font-semibold text-neutral-900 shadow-sm transition hover:bg-neutral-50";

  return (
    <section dir={isAr ? "rtl" : "ltr"} className="mx-auto w-full max-w-2xl">
      <div className={shell}>
        <div className="pointer-events-none absolute -top-6 left-[-10px] h-32 w-32 rounded-full bg-z-orange-soft blur-3xl opacity-40" />
        <div className="pointer-events-none absolute -bottom-8 right-[-10px] h-36 w-36 rounded-full bg-white blur-3xl opacity-30" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(255,255,255,0.45),rgba(255,255,255,0))]" />

        {/* Header */}
        <div className="relative flex flex-wrap items-start justify-between gap-3">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 rounded-full border border-z-orange bg-z-orange-soft px-3 py-1 text-xs font-semibold z-orange">
              <span className="opacity-80">{isAr ? "الجولة ٤" : "Round 4"}</span>
              <span className="h-3 w-px bg-neutral-300" />
              <span className="opacity-90">{isAr ? "ترابط المجموعات" : "Connections"}</span>
            </div>
            <h2 className="text-2xl font-semibold text-neutral-950">{t.title[safeLocale]}</h2>
            <p className="text-sm text-neutral-700">
              {isAr
                ? "اعثر على ٤ مجموعات من ٤ كلمات. اختر ٤ مربعات ثم اضغط إرسال."
                : "Find 4 groups of 4. Select exactly four tiles, then submit."}
            </p>
          </div>

          {/* Solved category pills */}
          <div className="flex flex-wrap gap-2">
            {solvedCats.map((k) => (
              <span
                key={k}
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold shadow-sm ${CATEGORY_PILL[k]}`}
              >
                <span className={`h-2 w-2 rounded-full ${CATEGORY_DOT[k]}`} />
                {CATEGORY_LABELS[k][safeLocale]}
              </span>
            ))}
          </div>
        </div>

        {/* Hints */}
        {!isSolved && (
          <div className="relative mt-4">
            <div className="flex flex-wrap gap-2">
              {hintsRevealed < 3 && (
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-2xl border border-z-orange bg-z-orange-soft px-4 py-2 text-sm font-semibold transition active:scale-[0.99] z-orange"
                  onClick={() => setHintsRevealed((p) => Math.min(p + 1, 3) as 0 | 1 | 2 | 3 | 4)}
                >
                  {hintsRevealed === 0
                    ? (isAr ? "أظهر تلميحاً" : "Show hint")
                    : (isAr ? "التلميح التالي" : "Next hint")}
                </button>
              )}
              {hintsRevealed === 3 && (
                <button
                  type="button"
                  className="rounded-2xl border border-amber-300 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-800 transition active:scale-[0.99] hover:bg-amber-100"
                  onClick={() => setHintsRevealed(4)}
                >
                  {isAr ? "كشف مجموعة" : "Solve a category"}
                </button>
              )}
              {hintsRevealed > 0 && (
                <button
                  type="button"
                  className="rounded-2xl border border-black/10 bg-white px-4 py-2 text-sm font-medium text-neutral-900 shadow-sm transition hover:bg-neutral-50"
                  onClick={() => setHintsRevealed(0)}
                >
                  {isAr ? "إخفاء التلميحات" : "Hide hints"}
                </button>
              )}
            </div>
            {hintsRevealed > 0 && (
              <div className="mt-3 grid gap-2">
                {HINTS[safeLocale].slice(0, Math.min(hintsRevealed, 3)).map((hint, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-black/8 bg-z-off-white p-3 text-sm leading-7 text-neutral-700"
                  >
                    <span className="mb-0.5 block text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-500">
                      {isAr ? "تلميح" : "Hint"} {idx + 1}
                    </span>
                    {hint}
                  </div>
                ))}
                {hintsRevealed === 4 && (
                  <div className="rounded-2xl border border-amber-200 bg-amber-50 p-3 text-sm leading-7 text-amber-900">
                    <span className="mb-0.5 block text-[10px] font-bold uppercase tracking-[0.18em] text-amber-600">
                      {isAr ? "مجموعة مكشوفة" : "Revealed group"}
                    </span>
                    {isAr
                      ? "المجموعة المُضاءة أدناه هي أكلات أردنية شعبية."
                      : "The highlighted tiles below are popular Jordanian meals."}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Puzzle area */}
        <div className="mt-6">
          {!isSolved ? (
            <div className="rounded-2xl border border-black/8 bg-white/85 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
              <div className="flex items-center justify-between gap-2">
                <div className="text-sm text-neutral-700">
                  {isAr ? "المحدد" : "Selected"}:{" "}
                  <span className="font-semibold text-neutral-950">{selected.length}/4</span>
                </div>
              </div>

              <div className={["mt-4", nudge ? "animate-[nudge_280ms_ease-in-out_1]" : ""].join(" ")}>
                {/* Collapsing group */}
                {collapsingTiles.length > 0 && (
                  <div className="mb-2 grid grid-cols-2 gap-2 sm:grid-cols-4 animate-[collapseOut_480ms_ease-in_forwards]">
                    {collapsingTiles.map((tile) => (
                      <div
                        key={tile.id}
                        className="rounded-2xl border border-emerald-300 bg-emerald-50 px-3 py-4 text-center text-sm font-semibold text-emerald-800"
                      >
                        {tile.label[safeLocale]}
                      </div>
                    ))}
                  </div>
                )}

                {/* Remaining tiles */}
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {remainingTiles.map((tile) => {
                    const isPicked = selected.includes(tile.id);
                    const isRevealed = hintsRevealed === 4 && tile.category === "JORDAN_MEALS";
                    return (
                      <button
                        key={tile.id}
                        type="button"
                        onClick={() => toggleTile(tile.id)}
                        className={[
                          tileBase,
                          isPicked ? tileSelected : "",
                          isRevealed && !isPicked ? "border-amber-300 bg-amber-50 text-amber-900 ring-2 ring-amber-200" : "",
                        ].join(" ")}
                        aria-pressed={isPicked}
                      >
                        {tile.label[safeLocale]}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Actions + feedback */}
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={submit}
                  disabled={selected.length !== 4 || !!collapsingCat}
                  className={btn}
                >
                  <span className="relative z-10">{isAr ? "إرسال" : "Submit"}</span>
                  <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                </button>

                <button
                  type="button"
                  onClick={() => { setSelected([]); setStatus("idle"); }}
                  className={ghostBtn}
                >
                  {isAr ? "مسح" : "Clear"}
                </button>

                <div className="ml-auto min-h-[24px] text-sm">
                  {status === "correct" && (
                    <span className="text-emerald-700">{t.ui.correct[safeLocale]}</span>
                  )}
                  {status === "oneaway" && (
                    <span className="font-medium text-amber-700">{t.ui.oneAway[safeLocale]}</span>
                  )}
                  {status === "wrong" && (
                    <span className="text-rose-700">{t.ui.tryAgain[safeLocale]}</span>
                  )}
                </div>
              </div>

              <style jsx>{`
                @keyframes nudge {
                  0%   { transform: translateX(0); }
                  20%  { transform: translateX(${isAr ? "10px" : "-10px"}); }
                  50%  { transform: translateX(${isAr ? "-8px" : "8px"}); }
                  80%  { transform: translateX(${isAr ? "5px" : "-5px"}); }
                  100% { transform: translateX(0); }
                }
                @keyframes collapseOut {
                  0%   { opacity: 1; transform: scale(1); }
                  60%  { opacity: 0.4; transform: scale(0.97); }
                  100% { opacity: 0; transform: scale(0.93); pointer-events: none; }
                }
              `}</style>
            </div>
          ) : (
            /* Solved state */
            <div className="relative overflow-hidden rounded-3xl border border-emerald-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(236,253,245,0.95))] p-6 shadow-[0_0_0_2px_rgba(16,185,129,0.10),0_24px_70px_rgba(16,185,129,0.10)]">
              <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_30%_20%,rgba(16,185,129,0.10),transparent_55%)]" />

              <div className="relative">
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs text-emerald-900">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  {t.ui.solved[safeLocale]}
                </div>

                <h3 className="mt-3 text-2xl font-semibold text-neutral-950">
                  {isAr
                    ? "جوهرتك التالية تنتظرك خارج المسار المطروق."
                    : "Your next hidden gem is off the beaten path."}
                </h3>

                <p className="mt-2 text-neutral-700">
                  {isAr ? (
                    <>
                      ابحث عن{" "}
                      <a
                        href={SOAPHOUSE_MAP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold underline decoration-z-orange underline-offset-2 z-orange hover:opacity-80"
                      >
                        دار الصابون
                      </a>{" "}
                      المختبئ قرب شارع الرينبو.
                    </>
                  ) : (
                    <>
                      Find the fragrant{" "}
                      <a
                        href={SOAPHOUSE_MAP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold underline decoration-z-orange underline-offset-2 z-orange hover:opacity-80"
                      >
                        soaphouse
                      </a>{" "}
                      tucked off Rainbow Street.
                    </>
                  )}
                </p>

                <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />

                {/* About section */}
                <div className="mt-5">
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-z-orange">
                    {t.aboutEyebrow[safeLocale]}
                  </div>
                  <h4 className="mt-2 text-xl font-semibold text-neutral-950">
                    {t.aboutTitle[safeLocale]}
                  </h4>
                  <div className="mt-3 space-y-3 text-sm leading-7 text-neutral-700">
                    <p>{t.aboutBody1[safeLocale]}</p>
                    <p>{t.aboutBody2[safeLocale]}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default PuzzleR3;
