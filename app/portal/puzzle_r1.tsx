"use client";

import React from "react";
import { riddle2, type Locale } from "./riddlecontent";
import { setRoundSolved, serverSetRoundSolved } from "./progress";

type WordSpec = {
  num: number;
  answer: string;
  clue: { en: string; ar: string };
  crossIndex: number;
};

type RowState = "idle" | "correct" | "wrong";

const VIRTUAL_CENTER_COL = 12;

/** ---------- ENGLISH ---------- */
const CENTER_WORD_EN = "MAGENTA";
const WORDS_EN: WordSpec[] = [
  { num: 1, answer: "AMMAN",   crossIndex: 1, clue: { en: "Jordan's capital city",     ar: "عاصمة الأردن" } },
  { num: 2, answer: "RAINBOW", crossIndex: 1, clue: { en: "Colorful arc after rain",   ar: "قوس ملوّن بعد المطر" } },
  { num: 3, answer: "BEGIN",   crossIndex: 2, clue: { en: "The opposite of to end",      ar: "ما تفعله في هذه اللحظة"  } },
  { num: 4, answer: "STREET",  crossIndex: 3, clue: { en: "Cars drive on these",         ar: "تمشي فيه" } },
  { num: 5, answer: "LEMON",   crossIndex: 4, clue: { en: "Sour and yellow",            ar: "حامض وأصفر" } },
  { num: 6, answer: "TOUM",    crossIndex: 0, clue: { en: "Garlicky white sauce in Shawerma",       ar: "صلصةالشاورمة" } },
  { num: 7, answer: "CAFE",    crossIndex: 1, clue: { en: "Where you go for coffee",    ar: "مكان القهوة" } },
];

/** ---------- ARABIC ---------- */
const CENTER_WORD_AR = "ماجنتا";
const WORDS_AR: WordSpec[] = [
  { num: 1, answer: "عمان",    crossIndex: 1, clue: { en: "Jordan's capital",           ar: "عاصمة الأردن" } },
  { num: 2, answer: "ياسمين", crossIndex: 1, clue: { en: "A fragrant white flower",    ar: "زهرة عطرة بيضاء" } },
  { num: 3, answer: "درج",    crossIndex: 2, clue: { en: "You'll climb many on this street", ar: "ستصعد عليه كثيرًا في هذا الشارع" } },
  { num: 4, answer: "ليمون",  crossIndex: 4, clue: { en: "Sour yellow fruit",           ar: "فاكهة صفراء حامضة" } },
  { num: 5, answer: "توم",    crossIndex: 0, clue: { en: "Garlic sauce",                ar: "صلصةالشاورمة" } },
  { num: 6, answer: "شارع",   crossIndex: 1, clue: { en: "A road in the city",          ar: "طريق في المدينة" } },
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
  return /^[؀-ۿ]$/.test(ch);
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

export default function PuzzleR1({
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

  const inputRefs = React.useRef<Record<string, HTMLInputElement | null>>({});
  const solvedOnceRef = React.useRef(false);
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const solvedActionRef = React.useRef<HTMLDivElement | null>(null);

  const [showHint, setShowHint] = React.useState(false);
  const [showCluesMobile, setShowCluesMobile] = React.useState(false);
  const gridRef = React.useRef<HTMLDivElement | null>(null);

  const scrollerRef = React.useRef<HTMLDivElement | null>(null);
  const overlayRef = React.useRef<HTMLDivElement | null>(null);
  const startCellRefs = React.useRef<Record<number, HTMLDivElement | null>>({});

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
  const [scrollEdge, setScrollEdge] = React.useState({ left: false, right: false });

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
    setRoundSolved("r1");
    serverSetRoundSolved("r1");
    onSolved?.();

    window.setTimeout(() => {
      solvedActionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 220);
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

      const gap = Math.max(6, Math.round(cellSize * 0.2));
      const x = isAr
        ? cellRect.right - overlayRect.left + gap
        : cellRect.left - overlayRect.left - gap;

      const y = cellRect.top - overlayRect.top + cellRect.height / 2;

      out.push({ row: r, num: words[r].num, x, y });
    }

    setLabelPos(out);
  }, [isAr, words]);

  React.useEffect(() => {
    recomputeLabels();
    const onResize = () => recomputeLabels();
    window.addEventListener("resize", onResize);

    const scroller = scrollerRef.current;
    if (scroller) {
      const onScroll = () => {
        recomputeLabels();
        const el = scrollerRef.current;
        if (el) setScrollEdge({ left: el.scrollLeft > 8, right: el.scrollLeft < el.scrollWidth - el.clientWidth - 8 });
      };
      scroller.addEventListener("scroll", onScroll, { passive: true });
      return () => {
        window.removeEventListener("resize", onResize);
        scroller.removeEventListener("scroll", onScroll);
      };
    }

    return () => window.removeEventListener("resize", onResize);
  }, [recomputeLabels]);

  React.useEffect(() => {
    const t = window.setTimeout(() => recomputeLabels(), 50);
    return () => window.clearTimeout(t);
  }, [recomputeLabels]);

  React.useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const update = () =>
      setScrollEdge({ left: el.scrollLeft > 8, right: el.scrollWidth - el.clientWidth > 8 });
    update();
    const id = window.setTimeout(update, 200);
    return () => window.clearTimeout(id);
  }, []);

  const cardGlow =
    status === "correct"
      ? "ring-2 ring-green-300 shadow-[0_0_0_6px_rgba(34,197,94,0.12)]"
      : status === "wrong"
      ? "ring-2 ring-red-200 shadow-[0_0_0_6px_rgba(239,68,68,0.08)]"
      : "ring-1 ring-neutral-200";

  return (
    <div
      ref={rootRef}
      className={[
        "relative overflow-x-hidden rounded-3xl",
        "bg-[linear-gradient(180deg,#fafaf9_0%,#ffffff_100%)]",
        "p-5 pb-[calc(9.5rem+env(safe-area-inset-bottom))] shadow-sm transition-all sm:p-6 sm:pb-6",
        cardGlow,
      ].join(" ")}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-z-orange bg-z-orange-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] z-orange">
            {safeLocale === "ar" ? "الجولة ١ · كلمات متقاطعة" : "Round 1 · Crossword"}
          </div>
          <h2 className="text-xl font-semibold text-neutral-950">{t.title[safeLocale]}</h2>
          <p className="mt-1 text-neutral-700">{t.prompt[safeLocale]}</p>
        </div>

        <div className="flex flex-wrap gap-2 sm:justify-end">
          <button
            type="button"
            onClick={() => setShowHint((v) => !v)}
            className="rounded-2xl border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-50"
          >
            {showHint
              ? safeLocale === "en"
                ? "Hide hint"
                : "إخفاء التلميح"
              : safeLocale === "en"
              ? "Show hint"
              : "إظهار التلميح"}
          </button>

          <div className="hidden gap-2 sm:flex">
            <button
              onClick={check}
              className="rounded-2xl bg-z-orange px-4 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              {t.ui.check[safeLocale]}
            </button>
            <button
              onClick={reset}
              className="rounded-2xl border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-50"
            >
              {t.ui.reset[safeLocale]}
            </button>
          </div>
        </div>
      </div>

      {showHint && (
        <div className="mt-4 rounded-2xl border border-black/8 bg-z-off-white p-4 text-sm text-neutral-700">
          {safeLocale === "en"
            ? "Use the clues to complete each row. When a row is right, the crossing center letters reveal the hidden word."
            : "استخدم التلميحات لإكمال كل سطر. عندما يكون السطر صحيحًا، تكشف الحروف الوسطية عن الكلمة المخفية."}
        </div>
      )}

      <div className="mt-4 space-y-3">
        {status === "correct" && (
          <>
            <div className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-800">
              {isAr ? "أحسنت! الكلمة المخفية هي:" : "All correct! The hidden word is:"}
            </div>
            <div className="flex items-center justify-center gap-1.5">
              {(isAr ? ["م","ا","ج","ن","ت","ا"] : ["M","A","G","E","N","T","A"]).map((letter, i) => (
                <span
                  key={i}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-amber-200 bg-gradient-to-b from-[#FFFCF6] to-[#FEF0D2] text-sm font-bold text-amber-900 shadow-sm"
                >
                  {letter}
                </span>
              ))}
            </div>
          </>
        )}
        {status === "wrong" && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-red-800">
            {isAr ? "بعض الكلمات غير صحيحة — حاول مرة أخرى." : "Some words are wrong — try again."}
          </div>
        )}
      </div>

      <div className="mt-4 sm:hidden">
        <button
          type="button"
          onClick={() => setShowCluesMobile(true)}
          className="w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-left text-sm font-semibold text-neutral-900 shadow-sm"
        >
          {isAr ? "عرض التلميحات" : "View clues"}
        </button>
      </div>

      <div className="mt-6 flex justify-center">
        <div className="w-full">
          <div
            ref={gridRef}
            className="relative rounded-3xl border border-black/5 bg-[radial-gradient(circle_at_20%_10%,rgba(200,105,74,0.08),transparent_45%),radial-gradient(circle_at_80%_90%,rgba(59,130,246,0.06),transparent_45%),linear-gradient(180deg,rgba(255,255,255,0.96),rgba(255,255,255,0.90))] p-4 sm:p-6"
          >
            {scrollEdge.left && (
              <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-10 rounded-l-3xl bg-gradient-to-r from-white/90 to-transparent" />
            )}
            {scrollEdge.right && (
              <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-10 rounded-r-3xl bg-gradient-to-l from-white/90 to-transparent" />
            )}
            <div ref={scrollerRef} className="relative w-full overflow-x-auto">
              <div ref={overlayRef} className="pointer-events-none absolute inset-0 z-10">
                {labelPos.map((p) => (
                  <div
                    key={`lbl-${p.row}`}
                    className="absolute -translate-y-1/2 text-[11px] font-bold text-neutral-700"
                    style={{
                      left: p.x,
                      top: p.y,
                      transform: `translate(${isAr ? "0%" : "-100%"}, -50%)`,
                    }}
                  >
                    {p.num}
                  </div>
                ))}
              </div>

              <div className="flex justify-center" style={{ minWidth: "fit-content" }}>
                <div
                  className="inline-grid"
                  style={{
                    ["--cell" as any]: "clamp(26px, 7vw, 36px)",
                    ["--gap" as any]: "clamp(4px, 1vw, 6px)",
                    gap: "var(--gap)",
                    gridTemplateColumns: `repeat(${layout.cols}, var(--cell))`,
                    direction: isAr ? "rtl" : "ltr",
                    padding: "4px 22px",
                  }}
                >
                  {Array.from({ length: ROWS }).flatMap((_, r) =>
                    Array.from({ length: layout.cols }).map((__, cc) => {
                      const globalC = layout.minC + cc;
                      const cell = layout.cells[keyFor(r, globalC)];

                      if (!cell) {
                        return (
                          <div
                            key={`e-${r}-${globalC}`}
                            style={{ width: "var(--cell)", height: "var(--cell)" }}
                          />
                        );
                      }

                      const start = layout.starts[r];
                      const isStartCell = globalC === start;

                      const rowGood = checked && rowState[r] === "correct";
                      const rowBad = checked && rowState[r] === "wrong";

                      const isCenter = cell.kind === "center";
                      const shouldGlow = isCenter && allSolved && glowStep > r;

                      const baseBox = rowGood
                        ? "border-green-200 bg-green-50/70"
                        : rowBad
                        ? "border-red-200 bg-red-50/70"
                        : "border-neutral-300 bg-white";

                      const animateGlow = shouldGlow
                        ? "shadow-[0_0_0_6px_rgba(34,197,94,0.14)] ring-2 ring-green-300"
                        : "";

                      const k = keyFor(r, globalC);

                      const displayValue =
                        checked && isCenter && rowGood ? centerWord[r] ?? "" : values[k] ?? "";

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
                            "relative overflow-hidden rounded-xl border transition-all duration-300",
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
                              "text-[clamp(14px,3.8vw,18px)]",
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

      <div className="mt-6 hidden sm:block">
        <div className="mb-3 text-sm font-semibold text-neutral-950">
          {isAr ? "التلميحات" : "Clues"}
        </div>
        <div className="space-y-2">
          {words.map((w, idx) => (
            <div
              key={w.num}
              className="flex items-center justify-between gap-3 rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3"
            >
              <button
                type="button"
                onClick={() => focusRowStart(idx)}
                className="min-w-0 flex-1 text-left"
              >
                <span className="text-sm text-neutral-900">
                  <span className="font-semibold">{w.num}.</span>{" "}
                  {isAr ? w.clue.ar : w.clue.en}{" "}
                  <span className="text-neutral-400">({w.answer.length})</span>
                </span>
              </button>
              <button
                type="button"
                onClick={() => solveRow(idx)}
                className="shrink-0 rounded-xl border border-neutral-300 bg-white px-3 py-1.5 text-xs font-semibold text-neutral-900 hover:bg-neutral-100"
              >
                {isAr ? "حل السطر" : "Solve row"}
              </button>
            </div>
          ))}
        </div>
      </div>

      {allSolved && (
        <div className="mt-4 space-y-4 animate-[zowarFadeUp_420ms_cubic-bezier(.22,1,.36,1)_1]">
          {/* About Magenta */}
          <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-50 p-5">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-z-orange">
              {isAr ? "محطتك التالية" : "Your next stop"}
            </div>
            <h3 className="mt-2 text-xl font-semibold text-neutral-950">
              {isAr ? "ماجنتا" : "Magenta"}
            </h3>
            <div className="mt-3 space-y-3 text-sm leading-7 text-neutral-700">
              <p>
                {isAr
                  ? "بعيدًا عن الضجيج، تحتل ماجنتا مكانة مميزة كواحدة من أكثر المقاهي حيوية في عمّان — تُعرف بإبداعها وأعمالها الفنية وإطلالتها الهادئة على جبل عمّان."
                  : "Magenta sits off the main stretch, up above Jabal Amman. Good coffee, walls worth looking at, and a view that earns a slower pace."}
              </p>
              <p>
                {isAr
                  ? "الاسم كان التلميح. من هنا تبدأ رحلتك."
                  : "The name was the clue. This is where your adventure will begin."}
              </p>
            </div>
          </div>

          {/* Nearby tip: Jeld */}
          <div className="rounded-3xl border border-neutral-200 bg-white p-5">
            <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-neutral-400">
              {isAr ? "بالجوار" : "Nearby"}
            </div>
            <h4 className="mt-2 text-base font-semibold text-neutral-950">
              {isAr ? "جِلد" : "Jeld"}
              {!isAr && <span className="ml-1.5 font-normal text-neutral-400">(جِلد)</span>}
            </h4>
            <p className="mt-2 text-sm leading-6 text-neutral-600">
              {isAr
                ? "مباشرةً بجانبك — جِلد محل مستقل يحمل تشكيلة منتخبة من المنتجات المحلية. المكان أنيق وجدير بالاكتشاف."
                : "Right next door — Jeld is an independent local store with a carefully chosen selection of locally made goods. Not part of the tour, but the space is elegantly curated and worth discovering."}
            </p>
          </div>
        </div>
      )}

      {showCluesMobile && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            className="absolute inset-0 bg-black/30"
            aria-label={isAr ? "إغلاق" : "Close"}
            onClick={closeCluesAndReturnToGrid}
          />
          <div className="absolute bottom-0 left-0 right-0 max-h-[75vh] overflow-y-auto rounded-t-3xl bg-white p-5 shadow-xl">
            <div className="mb-3 flex items-center justify-between">
              <div className="text-sm font-semibold text-neutral-950">{isAr ? "التلميحات" : "Clues"}</div>
              <button
                className="rounded-xl border border-neutral-200 px-3 py-2 text-sm font-semibold text-neutral-900"
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
                    className="shrink-0 rounded-xl border border-neutral-300 bg-white px-3 py-2 text-xs font-semibold text-neutral-900 hover:bg-neutral-100"
                  >
                    {isAr ? "حل السطر" : "Solve row"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {!allSolved ? (
        <div className="sm:hidden">
          <div
            className="fixed bottom-0 left-0 right-0 z-30 border-t border-neutral-200 bg-white shadow-[0_-8px_24px_rgba(0,0,0,0.06)]"
            style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
          >
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
                  className="rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-sm font-semibold text-neutral-900 hover:bg-neutral-50"
                >
                  {t.ui.reset[safeLocale]}
                </button>

                <button
                  type="button"
                  onClick={() => setShowCluesMobile(true)}
                  className="rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-sm font-semibold text-neutral-900 hover:bg-neutral-50"
                >
                  {isAr ? "تلميحات" : "Clues"}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-[calc(2rem+env(safe-area-inset-bottom))] sm:hidden" />
      )}

      <style jsx>{`
        @keyframes zowarFadeUp {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
