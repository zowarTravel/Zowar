"use client";

import React from "react";
import { riddle2, type Locale } from "./riddlecontent";
import { readProgress, setRoundSolved } from "./progress";

type WordSpec = {
  num: number;
  answer: string;
  clue: { en: string; ar: string };
  crossIndex: number;
};

type RowState = "idle" | "correct" | "wrong";

const VIRTUAL_CENTER_COL = 12;

/** ---------- ENGLISH ---------- */
const CENTER_WORD_EN = "TRINITAE";
const WORDS_EN: WordSpec[] = [
  { num: 1, answer: "TOUM", crossIndex: 0, clue: { en: "Arabic garlic sauce", ar: "صلصة الثوم العربية" } },
  { num: 2, answer: "ROOFTOPS", crossIndex: 0, clue: { en: "Amman vibes are best experienced from", ar: "أفضل أجواء عمّان تُعاش من" } },
  { num: 3, answer: "RAINBOW", crossIndex: 2, clue: { en: "Colorful arcs after rain", ar: "ألوان تظهر بعد المطر" } },
  { num: 4, answer: "ADVENTURE", crossIndex: 4, clue: { en: "This whole walk-and-solve experience is an", ar: "هذه التجربة كلها تُعتبر" } },
  { num: 5, answer: "WADIRUM", crossIndex: 3, clue: { en: "Jordan’s famous desert destination", ar: "وجهة صحراوية مشهورة في الأردن" } },
  { num: 6, answer: "TOUR", crossIndex: 0, clue: { en: "A guided experience or route", ar: "جولة أو مسار مُنظّم" } },
  { num: 7, answer: "SHAWARMA", crossIndex: 2, clue: { en: "Famous Jordan street food", ar: "أكلة شارع مشهورة في الأردن" } },
  { num: 8, answer: "CAFE", crossIndex: 3, clue: { en: "Coffee place", ar: "مكان القهوة" } },
];

/** ---------- ARABIC ---------- */
const CENTER_WORD_AR = "ترينيتي";
const WORDS_AR: WordSpec[] = [
  { num: 1, answer: "توم", crossIndex: 0, clue: { en: "Garlic sauce (Arabic)", ar: "صلصة الثوم" } },
  { num: 2, answer: "أشاورما", crossIndex: 4, clue: { en: "Jordan street food (Arabic word)", ar: "أكلة شارع مشهورة" } },
  { num: 3, answer: "ياسمين", crossIndex: 4, clue: { en: "A fragrant flower", ar: "زهرة عطرة" } },
  { num: 4, answer: "صابون", crossIndex: 4, clue: { en: "Soap", ar: "يُستخدم للتنظيف" } },
  { num: 5, answer: "نشامي", crossIndex: 4, clue: { en: "Jordanian word for a brave/good person", ar: "لقب للأردني الشهم" } },
  { num: 6, answer: "التي", crossIndex: 2, clue: { en: "Arabic relative pronoun (fem.)", ar: "اسم موصول للمؤنث" } },
  { num: 7, answer: "واديرم", crossIndex: 3, clue: { en: "Jordan’s famous desert destination", ar: "وجهة صحراوية مشهورة" } },
];

type Cell = {
  r: number;
  c: number;
  kind: "input" | "center";
  rowIndex: number;
  letterIndex: number;
};

function keyFor(r: number, c: number) {
  return `${r}:${c}`;
}

function isLatinLetter(ch: string) {
  return /^[A-Za-z]$/.test(ch);
}
function isArabicLetter(ch: string) {
  return /^[\u0600-\u06FF]$/.test(ch);
}

function buildLayout(words: WordSpec[]) {
  const rows = words.length;
  const starts = words.map((w) => VIRTUAL_CENTER_COL - w.crossIndex);

  let minC = Infinity;
  let maxC = -Infinity;

  for (let r = 0; r < rows; r++) {
    const start = starts[r];
    const end = start + words[r].answer.length - 1;
    minC = Math.min(minC, start);
    maxC = Math.max(maxC, end);
  }

  const cols = maxC - minC + 1;

  const cells: Record<string, Cell> = {};
  for (let r = 0; r < rows; r++) {
    const w = words[r];
    const start = starts[r];
    for (let i = 0; i < w.answer.length; i++) {
      const globalC = start + i;
      cells[keyFor(r, globalC)] = {
        r,
        c: globalC,
        kind: i === w.crossIndex ? "center" : "input",
        rowIndex: r,
        letterIndex: i,
      };
    }
  }

  return { starts, minC, maxC, cols, cells, rows };
}

export default function PuzzleR2({
  locale,
  onSolved,
}: {
  locale: Locale;
  onSolved?: () => void;
}) {
  const safeLocale: Locale = locale === "ar" ? "ar" : "en";
  const isAr = safeLocale === "ar";
  const t = riddle2;

  const words = isAr ? WORDS_AR : WORDS_EN;
  const centerWord = isAr ? CENTER_WORD_AR : CENTER_WORD_EN;

  const layout = React.useMemo(() => buildLayout(words), [words]);
  const ROWS = layout.rows;

  const progress = React.useMemo(() => readProgress(), []);
  const locked = !progress.r1;

  const inputRefs = React.useRef<Record<string, HTMLInputElement | null>>({});
  const solvedOnceRef = React.useRef(false);

  const [showCluesMobile, setShowCluesMobile] = React.useState(false);
  const gridRef = React.useRef<HTMLDivElement | null>(null);

  // scroll container so labels move with horizontal scroll
  const scrollerRef = React.useRef<HTMLDivElement | null>(null);
  const overlayRef = React.useRef<HTMLDivElement | null>(null);

  // refs for first cells, so we can measure positions
  const startCellRefs = React.useRef<Record<number, HTMLDivElement | null>>({});

  // computed label positions
  const [labelPos, setLabelPos] = React.useState<
    { row: number; num: number; x: number; y: number }[]
  >([]);

  const [values, setValues] = React.useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    for (let r = 0; r < ROWS; r++) {
      const w = words[r];
      const start = layout.starts[r];
      for (let i = 0; i < w.answer.length; i++) init[keyFor(r, start + i)] = "";
    }
    return init;
  });

  const [checked, setChecked] = React.useState(false);
  const [rowState, setRowState] = React.useState<RowState[]>(
    Array.from({ length: ROWS }, () => "idle")
  );

  const [allSolved, setAllSolved] = React.useState(false);
  const [glowStep, setGlowStep] = React.useState(0);
  const [status, setStatus] = React.useState<"idle" | "correct" | "wrong">("idle");

  function normalizeChar(ch: string) {
    return isAr ? ch : ch.toUpperCase();
  }

  function setCell(rowIndex: number, globalC: number, next: string) {
    setValues((prev) => ({ ...prev, [keyFor(rowIndex, globalC)]: next }));
    setChecked(false);
    setRowState((s) => s.map(() => "idle"));
    if (!allSolved) setStatus("idle");
  }

  function focusNextInRow(rowIndex: number, currentGlobalC: number) {
    for (let c = currentGlobalC + 1; c <= layout.maxC; c++) {
      if (layout.cells[keyFor(rowIndex, c)]) {
        inputRefs.current[keyFor(rowIndex, c)]?.focus();
        return;
      }
    }
  }

  function focusPrevInRow(rowIndex: number, currentGlobalC: number) {
    for (let c = currentGlobalC - 1; c >= layout.minC; c--) {
      if (layout.cells[keyFor(rowIndex, c)]) {
        inputRefs.current[keyFor(rowIndex, c)]?.focus();
        return;
      }
    }
  }

  function isRowCorrect(r: number) {
    const w = words[r];
    const start = layout.starts[r];
    for (let i = 0; i < w.answer.length; i++) {
      const expected = normalizeChar(w.answer[i]);
      const v = normalizeChar(values[keyFor(r, start + i)] ?? "");
      if (!v || v !== expected) return false;
    }
    return true;
  }

  function solveRow(r: number, closeAfter = false) {
    if (allSolved) return;

    const w = words[r];
    const start = layout.starts[r];

    setValues((prev) => {
      const next = { ...prev };
      for (let i = 0; i < w.answer.length; i++) next[keyFor(r, start + i)] = normalizeChar(w.answer[i]);
      return next;
    });

    setChecked(false);
    setRowState((s) => s.map(() => "idle"));
    setStatus("idle");

    if (closeAfter) {
      setShowCluesMobile(false);
      window.setTimeout(() => {
        gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 60);
    }
  }

  function reset() {
    const cleared: Record<string, string> = {};
    for (let r = 0; r < ROWS; r++) {
      const w = words[r];
      const start = layout.starts[r];
      for (let i = 0; i < w.answer.length; i++) cleared[keyFor(r, start + i)] = "";
    }
    setValues(cleared);
    setChecked(false);
    setRowState(Array.from({ length: ROWS }, () => "idle"));
    setAllSolved(false);
    setGlowStep(0);
    setStatus("idle");
    solvedOnceRef.current = false;
  }

  function celebrate() {
    setGlowStep(0);
    for (let i = 1; i <= centerWord.length; i++) {
      window.setTimeout(() => setGlowStep(i), 120 * i);
    }
  }

  function check() {
    if (solvedOnceRef.current) return;

    setChecked(true);

    const states: RowState[] = words.map((_, r) => (isRowCorrect(r) ? "correct" : "wrong"));
    setRowState(states);

    const all = states.every((s) => s === "correct");
    if (!all) {
      setStatus("wrong");
      return;
    }

    setStatus("correct");
    setAllSolved(true);
    celebrate();

    solvedOnceRef.current = true;
    setRoundSolved("r2");
    onSolved?.();
  }

  function closeCluesAndReturnToGrid() {
    setShowCluesMobile(false);
    window.setTimeout(() => {
      gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }

  function focusRowStart(r: number) {
    const start = layout.starts[r];
    const k = keyFor(r, start);
    window.setTimeout(() => inputRefs.current[k]?.focus(), 80);
  }

  // ✅ Compute number label positions relative to overlay
  const recomputeLabels = React.useCallback(() => {
    const overlay = overlayRef.current;
    const scroller = scrollerRef.current;
    if (!overlay || !scroller) return;

    const overlayRect = overlay.getBoundingClientRect();
    const out: { row: number; num: number; x: number; y: number }[] = [];

    for (let r = 0; r < words.length; r++) {
      const el = startCellRefs.current[r];
      if (!el) continue;

      const cellRect = el.getBoundingClientRect();
      const cellSize = cellRect.width;

      // place number just outside the start cell (left for EN, right for AR)
      const gap = Math.max(5, Math.round(cellSize * 0.18));
      const x = isAr
        ? (cellRect.right - overlayRect.left) + gap
        : (cellRect.left - overlayRect.left) - gap;

      const y = (cellRect.top - overlayRect.top) + cellRect.height / 2;

      out.push({ row: r, num: words[r].num, x, y });
    }

    setLabelPos(out);
  }, [isAr, words]);

  // run after layout / resize / scroll
  React.useEffect(() => {
    recomputeLabels();
    const onResize = () => recomputeLabels();
    window.addEventListener("resize", onResize);

    const scroller = scrollerRef.current;
    if (scroller) {
      const onScroll = () => recomputeLabels();
      scroller.addEventListener("scroll", onScroll, { passive: true });
      return () => {
        window.removeEventListener("resize", onResize);
        scroller.removeEventListener("scroll", onScroll);
      };
    }

    return () => window.removeEventListener("resize", onResize);
  }, [recomputeLabels]);

  // also after first paint when refs are set
  React.useEffect(() => {
    const t = window.setTimeout(() => recomputeLabels(), 50);
    return () => window.clearTimeout(t);
  }, [recomputeLabels]);

  if (locked) {
    return (
      <div className="rounded-3xl border border-neutral-200 bg-white p-5">
        <h2 className="text-xl font-semibold">{t.ui.lockedTitle[safeLocale]}</h2>
        <p className="mt-2 text-neutral-700">{t.ui.lockedBody[safeLocale]}</p>
      </div>
    );
  }

  const cardGlow =
    status === "correct"
      ? "ring-2 ring-green-300 shadow-[0_0_0_6px_rgba(34,197,94,0.12)]"
      : status === "wrong"
      ? "ring-2 ring-red-200 shadow-[0_0_0_6px_rgba(239,68,68,0.08)]"
      : "ring-1 ring-neutral-200";

  return (
    <div
      className={[
        "overflow-x-hidden relative rounded-3xl bg-gradient-to-b from-neutral-50 to-white p-5 sm:p-6 shadow-sm transition-all pb-24 sm:pb-6",
        cardGlow,
      ].join(" ")}
    >
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-xl">
          <h2 className="text-xl font-semibold">{t.title[safeLocale]}</h2>
          <p className="mt-1 text-neutral-700">{t.prompt[safeLocale]}</p>
        </div>

        <div className="hidden sm:flex gap-2">
          <button
            onClick={check}
            className="rounded-2xl bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:opacity-90"
          >
            {t.ui.check[safeLocale]}
          </button>
          <button
            onClick={reset}
            className="rounded-2xl border border-neutral-300 bg-white px-4 py-2 text-sm font-medium hover:bg-neutral-50"
          >
            {t.ui.reset[safeLocale]}
          </button>
        </div>
      </div>

      {/* Status */}
      <div className="mt-4 space-y-3">
        {status === "correct" && (
          <div className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-green-800">
            {isAr ? "تم الحل! ✅" : "Solved! ✅"}
          </div>
        )}
        {status === "wrong" && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-red-800">
            {isAr ? "بعض الكلمات غير صحيحة — حاول مرة أخرى." : "Some words are wrong — try again."}
          </div>
        )}
      </div>

      {/* Mobile: clues button */}
      <div className="mt-4 sm:hidden">
        <button
          type="button"
          onClick={() => setShowCluesMobile(true)}
          className="w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-left text-sm font-semibold"
        >
          {isAr ? "عرض التلميحات" : "View clues"}
        </button>
      </div>

      {/* Grid */}
      <div className="mt-6 flex justify-center">
        <div className="w-full">
          <div
            ref={gridRef}
            className="rounded-3xl bg-[radial-gradient(circle_at_20%_10%,rgba(251,146,60,0.10),transparent_45%),radial-gradient(circle_at_80%_90%,rgba(59,130,246,0.08),transparent_45%)] p-4 sm:p-6"
          >
            {/* scroller contains overlay so labels move with scroll */}
            <div ref={scrollerRef} className="relative w-full overflow-x-auto">
              {/* overlay for numbers (NOT clipped by cell overflow rules) */}
              <div ref={overlayRef} className="pointer-events-none absolute inset-0 z-10">
                {labelPos.map((p) => (
                  <div
                    key={`lbl-${p.row}`}
                    className="absolute -translate-y-1/2 text-[10px] font-bold text-neutral-600"
                    style={{
                      left: p.x,
                      top: p.y,
                      // anchor to left side for ltr and right side for rtl
                      transform: `translate(${isAr ? "0%" : "-100%"}, -50%)`,
                    }}
                  >
                    {p.num}
                  </div>
                ))}
              </div>

              <div className="flex justify-center">
                <div
                  className="inline-grid"
                  style={{
                    ["--cell" as any]: "clamp(20px, 5.6vw, 32px)",
                    ["--gap" as any]: "clamp(4px, 0.95vw, 6px)",
                    gap: "var(--gap)",
                    gridTemplateColumns: `repeat(${layout.cols}, var(--cell))`,
                    direction: isAr ? "rtl" : "ltr",
                    padding: "2px 18px", // space for outside numbers
                  }}
                >
                  {Array.from({ length: ROWS }).flatMap((_, r) =>
                    Array.from({ length: layout.cols }).map((__, cc) => {
                      const globalC = layout.minC + cc;
                      const cell = layout.cells[keyFor(r, globalC)];

                      if (!cell)
                        return (
                          <div
                            key={`e-${r}-${globalC}`}
                            style={{ width: "var(--cell)", height: "var(--cell)" }}
                          />
                        );

                      const start = layout.starts[r];
                      const isStartCell = globalC === start;

                      const rowGood = checked && rowState[r] === "correct";
                      const rowBad = checked && rowState[r] === "wrong";

                      const isCenter = cell.kind === "center";
                      const shouldGlow = isCenter && allSolved && glowStep > r;

                      const baseBox = rowGood
                        ? "border-green-200 bg-green-50/60"
                        : rowBad
                        ? "border-red-200 bg-red-50/60"
                        : "border-neutral-300 bg-white";

                      const animateGlow = shouldGlow
                        ? "shadow-[0_0_0_6px_rgba(34,197,94,0.14)] ring-2 ring-green-300"
                        : "";

                      const k = keyFor(r, globalC);

                      const displayValue =
                        checked && isCenter && rowGood ? (centerWord[r] ?? "") : (values[k] ?? "");

                      const textTint =
                        checked && isCenter
                          ? rowGood
                            ? "text-green-700"
                            : rowBad
                            ? "text-red-600"
                            : "text-neutral-900"
                          : "text-neutral-900";

                      return (
                        <div
                          key={`cell-${r}-${globalC}`}
                          ref={(el) => {
                            if (isStartCell) startCellRefs.current[r] = el;
                          }}
                          className={[
                            "relative overflow-hidden rounded-2xl border transition-all duration-300",
                            baseBox,
                            animateGlow,
                          ].join(" ")}
                          style={{ width: "var(--cell)", height: "var(--cell)" }}
                        >
                          <input
                            ref={(el) => {
                              inputRefs.current[k] = el;
                            }}
                            value={displayValue}
                            onChange={(e) => {
                              if (solvedOnceRef.current) return;

                              const raw = e.target.value;
                              const last = raw.slice(-1);

                              if (!last) {
                                setCell(r, globalC, "");
                                return;
                              }

                              const ok = isAr ? isArabicLetter(last) : isLatinLetter(last);
                              if (!ok) return;

                              setCell(r, globalC, normalizeChar(last));
                              focusNextInRow(r, globalC);
                            }}
                            onKeyDown={(e) => {
                              if (solvedOnceRef.current) return;

                              if (e.key === "Backspace") {
                                const v = values[k] ?? "";
                                if (v) setCell(r, globalC, "");
                                else focusPrevInRow(r, globalC);
                              }
                              if (e.key === "Enter") check();
                            }}
                            inputMode="text"
                            maxLength={1}
                            className={[
                              "h-full w-full bg-transparent text-center font-extrabold outline-none focus:ring-2 focus:ring-neutral-900",
                              "text-[clamp(12px,3.6vw,16px)]",
                              !isAr ? "uppercase" : "",
                              textTint,
                            ].join(" ")}
                            aria-label={`cell ${r + 1}-${globalC + 1}`}
                          />
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>

            <div className="mt-4 text-center text-xs text-neutral-500">
              {isAr
                ? "اضغط تحقق لرؤية الكلمات الصحيحة والخاطئة."
                : "Press Check to see which words are right or wrong."}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile clues bottom sheet */}
      {showCluesMobile && (
        <div className="lg:hidden fixed inset-0 z-40">
          <button
            className="absolute inset-0 bg-black/30"
            aria-label={isAr ? "إغلاق" : "Close"}
            onClick={closeCluesAndReturnToGrid}
          />
          <div className="absolute bottom-0 left-0 right-0 max-h-[75vh] overflow-y-auto rounded-t-3xl bg-white p-5 shadow-xl">
            <div className="mb-3 flex items-center justify-between">
              <div className="text-sm font-semibold">{isAr ? "التلميحات" : "Clues"}</div>
              <button
                className="rounded-xl border border-neutral-200 px-3 py-2 text-sm font-semibold"
                onClick={closeCluesAndReturnToGrid}
              >
                {isAr ? "إغلاق" : "Close"}
              </button>
            </div>

            <div className="space-y-3">
              {words.map((w, idx) => (
                <div
                  key={w.num}
                  className="flex items-start justify-between gap-3 rounded-2xl border border-neutral-200 bg-neutral-50 px-3 py-2"
                >
                  <button
                    type="button"
                    onClick={() => {
                      closeCluesAndReturnToGrid();
                      focusRowStart(idx);
                    }}
                    className="min-w-0 text-left"
                  >
                    <div className="text-sm text-neutral-900">
                      <span className="font-semibold">{w.num}.</span>{" "}
                      {isAr ? w.clue.ar : w.clue.en}{" "}
                      <span className="text-neutral-500">({w.answer.length})</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => solveRow(idx, true)}
                    className="shrink-0 rounded-xl border border-neutral-300 bg-white px-3 py-2 text-xs font-semibold hover:bg-neutral-100"
                  >
                    {isAr ? "حل السطر" : "Solve row"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Sticky bottom action bar (mobile) */}
      <div className="sm:hidden">
        <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-neutral-200 bg-white/92 backdrop-blur">
          <div className="mx-auto max-w-3xl px-4 py-3">
            <div className="flex items-center gap-2">
              <button
                onClick={check}
                className="flex-1 rounded-2xl bg-neutral-900 px-4 py-3 text-sm font-semibold text-white hover:opacity-90"
              >
                {t.ui.check[safeLocale]}
              </button>

              <button
                onClick={reset}
                className="rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-sm font-semibold hover:bg-neutral-50"
              >
                {t.ui.reset[safeLocale]}
              </button>

              <button
                type="button"
                onClick={() => setShowCluesMobile(true)}
                className="rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-sm font-semibold hover:bg-neutral-50"
              >
                {isAr ? "تلميحات" : "Clues"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
