"use client";

import React from "react";
import { riddle2, type Locale } from "./riddlecontent";
import { readProgress, setRoundSolved } from "./progress";

type WordSpec = {
  num: number;
  answer: string; // EN: write normal; code uppercases per-cell
  clue: { en: string; ar: string };
  crossIndex: number; // index in answer that intersects center column
};

type RowState = "idle" | "correct" | "wrong";

const VIRTUAL_CENTER_COL = 12;

/** ---------- ENGLISH (matches your TRINITAE sketch exactly) ---------- */
const CENTER_WORD_EN = "TRINITAE"; // 8 rows
const WORDS_EN: WordSpec[] = [
  { num: 1, answer: "TOUM", crossIndex: 0, clue: { en: "Arabic garlic sauce", ar: "صلصة الثوم العربية" } }, // T
  { num: 2, answer: "ROOFTOPS", crossIndex: 0, clue: { en: "Amman vibes are best experienced from", ar: "أفضل أجواء عمّان تُعاش من" } }, // R
  { num: 3, answer: "RAINBOW", crossIndex: 2, clue: { en: "Colorful arcs after rain", ar: "ألوان تظهر بعد المطر" } }, // I (RAI...)
  { num: 4, answer: "ADVENTURE", crossIndex: 4, clue: { en: "This whole walk-and-solve experience is an", ar: "هذه التجربة كلها تُعتبر" } }, // N (ADVE N ...)
  { num: 5, answer: "WADIRUM", crossIndex: 3, clue: { en: "Jordan’s famous desert destination", ar: "وجهة صحراوية مشهورة في الأردن" } }, // I (WAD I ...)
  { num: 6, answer: "TOUR", crossIndex: 0, clue: { en: "A guided experience or route", ar: "جولة أو مسار مُنظّم" } }, // T
  { num: 7, answer: "SHAWARMA", crossIndex: 2, clue: { en: "Famous Jordan street food", ar: "أكلة شارع مشهورة في الأردن" } }, // A (SHA...)
  { num: 8, answer: "CAFE", crossIndex: 3, clue: { en: "Coffee place", ar: "مكان القهوة" } }, // E (CAF E)
];

/** ---------- ARABIC (based on your 2nd sketch) ---------- */
/**
 * Vertical word: ترينيتي (7 letters) – DOES NOT need to be the first letter of each word.
 * Rows are built so each row crosses the correct vertical letter.
 */
const CENTER_WORD_AR = "ترينيتي";
const WORDS_AR: WordSpec[] = [
  // ت
  { num: 1, answer: "توم", crossIndex: 0, clue: { en: "Garlic sauce (Arabic)", ar: "صلصة الثوم" } },
  // ر (in أشاورما at index 4)
  { num: 2, answer: "أشاورما", crossIndex: 4, clue: { en: "Jordan street food (Arabic word)", ar: "أكلة شارع مشهورة" } },
  // ي (use the SECOND ي in ياسمين at index 4)
  { num: 3, answer: "ياسمين", crossIndex: 4, clue: { en: "A fragrant flower", ar: "زهرة عطرة" } },
  // ن (last letter in صابون)
  { num: 4, answer: "صابون", crossIndex: 4, clue: { en: "Soap", ar: "يُستخدم للتنظيف" } },
  // ي (last letter in نشامي)
  { num: 5, answer: "نشامي", crossIndex: 4, clue: { en: "Jordanian word for a brave/good person", ar: "لقب للأردني الشهم" } },
  // ت (in التي at index 2)
  { num: 6, answer: "التي", crossIndex: 2, clue: { en: "Arabic relative pronoun (fem.)", ar: "اسم موصول للمؤنث" } },
  // ي (in واديرم at index 3)
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

  minC -= 2;
  maxC += 2;

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

  // store ALL cells including center cells (so user can type the crossing letter)
  const [values, setValues] = React.useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    for (let r = 0; r < ROWS; r++) {
      const w = words[r];
      const start = layout.starts[r];
      for (let i = 0; i < w.answer.length; i++) {
        init[keyFor(r, start + i)] = "";
      }
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
      const cell = layout.cells[keyFor(rowIndex, c)];
      if (cell) {
        inputRefs.current[keyFor(rowIndex, c)]?.focus();
        return;
      }
    }
  }

  function focusPrevInRow(rowIndex: number, currentGlobalC: number) {
    for (let c = currentGlobalC - 1; c >= layout.minC; c--) {
      const cell = layout.cells[keyFor(rowIndex, c)];
      if (cell) {
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

  function solveRow(r: number) {
    if (allSolved) return;
    const w = words[r];
    const start = layout.starts[r];

    setValues((prev) => {
      const next = { ...prev };
      for (let i = 0; i < w.answer.length; i++) {
        next[keyFor(r, start + i)] = normalizeChar(w.answer[i]);
      }
      return next;
    });

    setChecked(false);
    setRowState((s) => s.map(() => "idle"));
    setStatus("idle");
  }

  function reset() {
    const cleared: Record<string, string> = {};
    for (let r = 0; r < ROWS; r++) {
      const w = words[r];
      const start = layout.starts[r];
      for (let i = 0; i < w.answer.length; i++) {
        cleared[keyFor(r, start + i)] = "";
      }
    }
    setValues(cleared);
    setChecked(false);
    setRowState(Array.from({ length: ROWS }, () => "idle"));
    setAllSolved(false);
    setGlowStep(0);
    setStatus("idle");
    solvedOnceRef.current = false;

    for (let c = layout.minC; c <= layout.maxC; c++) {
      if (layout.cells[keyFor(0, c)]) {
        inputRefs.current[keyFor(0, c)]?.focus();
        break;
      }
    }
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
    <div className={["rounded-3xl bg-gradient-to-b from-neutral-50 to-white p-6 shadow-sm transition-all", cardGlow].join(" ")}>
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-xl">
          <h2 className="text-xl font-semibold">{t.title[safeLocale]}</h2>
          <p className="mt-1 text-neutral-700">{t.prompt[safeLocale]}</p>
        </div>

        <div className="flex gap-2">
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

      {/* Layout */}
      <div className="mt-8 grid gap-10 lg:grid-cols-[auto,420px] lg:items-start">
        {/* Grid */}
        <div className="flex justify-center lg:justify-start">
          <div className="rounded-3xl bg-[radial-gradient(circle_at_20%_10%,rgba(251,146,60,0.10),transparent_45%),radial-gradient(circle_at_80%_90%,rgba(59,130,246,0.08),transparent_45%)] p-6">
            <div
              className="grid gap-2"
              style={{
                gridTemplateColumns: `repeat(${layout.cols}, 46px)`,
                direction: isAr ? "rtl" : "ltr",
              }}
            >
              {Array.from({ length: ROWS }).flatMap((_, r) =>
                Array.from({ length: layout.cols }).map((__, cc) => {
                  const globalC = layout.minC + cc;
                  const cell = layout.cells[keyFor(r, globalC)];

                  if (!cell) return <div key={`e-${r}-${globalC}`} className="h-[46px] w-[46px]" />;

                  const w = words[r];
                  const start = layout.starts[r];
                  const isStartCell = globalC === start;

                  const rowGood = checked && rowState[r] === "correct";
                  const rowBad = checked && rowState[r] === "wrong";

                  const isCenter = cell.kind === "center";
                  const shouldGlow = isCenter && allSolved && glowStep > r;

                  const baseBox =
                    rowGood ? "border-green-200 bg-green-50/60"
                    : rowBad ? "border-red-200 bg-red-50/60"
                    : "border-neutral-300 bg-white";

                  const animateGlow = shouldGlow
                    ? "shadow-[0_0_0_6px_rgba(34,197,94,0.14)] ring-2 ring-green-300"
                    : "";

                  const k = keyFor(r, globalC);

                  // IMPORTANT: center word is hidden until Check.
                  // After Check, if row is correct, we *display* the revealed letter (centerWord[r]).
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
                      className={[
                        "relative h-[46px] w-[46px] overflow-hidden rounded-2xl border transition-all duration-300",
                        baseBox,
                        animateGlow,
                      ].join(" ")}
                    >
                      {isStartCell && (
                        <div className="pointer-events-none absolute left-1 top-1 text-[10px] font-semibold text-neutral-600">
                          {w.num}
                        </div>
                      )}

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
                          "h-full w-full bg-transparent text-center text-lg font-extrabold outline-none focus:ring-2 focus:ring-neutral-900",
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

            <div className="mt-4 text-center text-xs text-neutral-500">
              {isAr ? "اضغط تحقق لرؤية الكلمات الصحيحة والخاطئة." : "Press Check to see which words are right or wrong."}
            </div>
          </div>
        </div>

        {/* Clues */}
        <div className="space-y-6">
          <div className="rounded-3xl bg-white p-5 ring-1 ring-neutral-200">
            <h3 className="text-sm font-semibold text-neutral-900">{isAr ? "أفقي" : "Across"}</h3>

            <div className="mt-4 space-y-3">
              {words.map((w, idx) => (
                <div
                  key={w.num}
                  className="flex items-start justify-between gap-4 rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3"
                >
                  <div className="min-w-0">
                    <div className="text-sm text-neutral-900">
                      <span className="font-semibold">{w.num}.</span>{" "}
                      {isAr ? w.clue.ar : w.clue.en}{" "}
                      <span className="text-neutral-500">({w.answer.length})</span>
                    </div>
                    <div className="mt-1 text-xs text-neutral-500">
                      {checked
                        ? rowState[idx] === "correct"
                          ? isAr
                            ? "صحيح ✅"
                            : "Correct ✅"
                          : isAr
                          ? "غير صحيح ❌"
                          : "Wrong ❌"
                        : isAr
                        ? "اكتب ثم اضغط تحقق"
                        : "Type, then press Check"}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => solveRow(idx)}
                    className="shrink-0 rounded-xl border border-neutral-300 bg-white px-3 py-2 text-xs font-semibold hover:bg-neutral-100"
                  >
                    {isAr ? "حل السطر" : "Solve row"}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-white p-5 ring-1 ring-neutral-200">
            <h3 className="text-sm font-semibold text-neutral-900">{isAr ? "عمود الاسم" : "Name column"}</h3>
            <p className="mt-2 text-sm text-neutral-700">
              {isAr
                ? "بعد الضغط على «تحقق»، حرف العمود الأوسط يصير أخضر إذا كان السطر صحيح وأحمر إذا كان خاطئ."
                : "After pressing Check, the middle column turns green for correct rows and red for wrong rows."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
