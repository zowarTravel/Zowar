"use client";

import React from "react";
import type { Locale } from "./riddlecontent";
import { setRoundSolved, serverSetRoundSolved } from "./progress";

type WordSpec = {
  num: number;
  answer: string;
  clue: { en: string; ar: string };
  crossIndex: number;
};

type RowState = "idle" | "correct" | "wrong";

const VIRTUAL_CENTER_COL = 12;

const MAGENTA_MAP_URL = "https://maps.app.goo.gl/k8J77ZhXpBVAgmHg9";

const CENTER_WORD_EN = "MAGENTA";
const WORDS_EN: WordSpec[] = [
  { num: 1, answer: "AMMAN",   crossIndex: 1, clue: { en: "Jordan's capital city",                    ar: "عاصمة الأردن" } },
  { num: 2, answer: "RAINBOW", crossIndex: 1, clue: { en: "Colourful arc in the sky after rain",       ar: "قوس ملوّن بعد المطر" } },
  { num: 3, answer: "FLAG",    crossIndex: 3, clue: { en: "Red, white, green and black with a star",   ar: "أحمر وأبيض وأخضر وأسود مع نجمة" } },
  { num: 4, answer: "OLIVE",   crossIndex: 4, clue: { en: "Small fruit pressed into the region's most used oil", ar: "ثمرة صغيرة تُعصر لتصنع أشهر زيوت المنطقة" } },
  { num: 5, answer: "LEMON",   crossIndex: 4, clue: { en: "Sour and yellow fruit",                      ar: "حامض وأصفر" } },
  { num: 6, answer: "FATTOUSH", crossIndex: 2, clue: { en: "Traditional Arab salad with fried crispy pitta bread", ar: "سلطة عربية بالخبز المحمّص" } },
  { num: 7, answer: "PETRA",   crossIndex: 4, clue: { en: "Ancient city carved into rose-red rock",    ar: "مدينة أثرية منحوتة في الصخر الوردي" } },
];

const CENTER_WORD_AR = "ماجنتا";
const WORDS_AR: WordSpec[] = [
  { num: 1, answer: "عمان",    crossIndex: 1, clue: { en: "Jordan's capital",                          ar: "عاصمة الأردن" } },
  { num: 2, answer: "ياسمين", crossIndex: 1, clue: { en: "A fragrant white flower",                   ar: "زهرة عطرة بيضاء" } },
  { num: 3, answer: "درج",    crossIndex: 2, clue: { en: "You'll climb many on this street",           ar: "ستصعد عليه كثيرًا في هذا الشارع" } },
  { num: 4, answer: "ليمون",  crossIndex: 4, clue: { en: "Sour yellow fruit",                         ar: "فاكهة صفراء حامضة" } },
  { num: 5, answer: "فتوش",   crossIndex: 1, clue: { en: "Arab salad with fried crispy pitta bread",   ar: "سلطة عربية بالخبز المحمّص" } },
  { num: 6, answer: "بتراء",  crossIndex: 3, clue: { en: "Ancient city carved into rose-red rock",    ar: "مدينة أثرية منحوتة في الصخر الوردي" } },
];

function keyFor(r: number, c: number) { return `${r}:${c}`; }
function isLatinLetter(ch: string) { return /^[A-Za-z]$/.test(ch); }
function isArabicLetter(ch: string) { return /^[؀-ۿ]$/.test(ch); }

function buildLayout(words: WordSpec[]) {
  const starts = words.map(w => VIRTUAL_CENTER_COL - w.crossIndex);
  let minC = Infinity, maxC = -Infinity;
  for (let r = 0; r < words.length; r++) {
    minC = Math.min(minC, starts[r]);
    maxC = Math.max(maxC, starts[r] + words[r].answer.length - 1);
  }
  const cells: Record<string, { kind: "input" | "center"; letterIndex: number }> = {};
  for (let r = 0; r < words.length; r++) {
    for (let i = 0; i < words[r].answer.length; i++) {
      cells[keyFor(r, starts[r] + i)] = {
        kind: i === words[r].crossIndex ? "center" : "input",
        letterIndex: i,
      };
    }
  }
  return { starts, minC, maxC, cols: maxC - minC + 1, cells, rows: words.length };
}

function getAmmanWeekday(routeDate?: string): string {
  const date = routeDate
    ? new Date(`${routeDate}T12:00:00+03:00`)
    : new Date();
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Amman",
    weekday: "long",
  }).format(date);
}

export default function PuzzleR1({ locale, onSolved, routeDate }: { locale: Locale; onSolved?: () => void; routeDate?: string }) {
  const safeLocale: Locale = locale === "ar" ? "ar" : "en";
  const isAr = safeLocale === "ar";

  const words = isAr ? WORDS_AR : WORDS_EN;
  const centerWord = isAr ? CENTER_WORD_AR : CENTER_WORD_EN;
  const layout = React.useMemo(() => buildLayout(words), [words]);
  const ROWS = layout.rows;

  const cardInputRefs = React.useRef<(HTMLInputElement | null)[]>([]);
  const solvedOnceRef = React.useRef(false);

  const [values, setValues] = React.useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    for (let r = 0; r < ROWS; r++) {
      const w = words[r];
      const s = layout.starts[r];
      for (let i = 0; i < w.answer.length; i++) init[keyFor(r, s + i)] = "";
    }
    return init;
  });

  const [rowState, setRowState] = React.useState<RowState[]>(
    Array.from({ length: ROWS }, () => "idle")
  );
  const [activeRow, setActiveRow] = React.useState(0);
  const [allSolved, setAllSolved] = React.useState(false);
  const [isTuesdayRoute, setIsTuesdayRoute] = React.useState(false);

  React.useEffect(() => {
    setIsTuesdayRoute(getAmmanWeekday(routeDate) === "Tuesday");
  }, [routeDate]);

  const normalizeChar = (ch: string) => isAr ? ch : ch.toUpperCase();

  // Focus first card input when active row changes
  React.useEffect(() => {
    const id = window.setTimeout(() => cardInputRefs.current[0]?.focus(), 80);
    return () => window.clearTimeout(id);
  }, [activeRow]);

  function triggerAllSolved() {
    if (solvedOnceRef.current) return;
    solvedOnceRef.current = true;
    setAllSolved(true);
    setRoundSolved("r1");
    serverSetRoundSolved("r1");
    onSolved?.();
  }

  function advanceRow(currentRow: number, states: RowState[]) {
    for (let j = currentRow + 1; j < ROWS; j++) {
      if (states[j] !== "correct") { setActiveRow(j); return; }
    }
    for (let j = 0; j < currentRow; j++) {
      if (states[j] !== "correct") { setActiveRow(j); return; }
    }
  }

  function handleCellInput(r: number, i: number, raw: string) {
    if (solvedOnceRef.current) return;
    if (rowState[r] === "correct") return;

    const w = words[r];
    const start = layout.starts[r];
    const ch = raw.slice(-1);
    if (ch && !(isAr ? isArabicLetter(ch) : isLatinLetter(ch))) return;
    const val = ch ? normalizeChar(ch) : "";

    const newVals = { ...values, [keyFor(r, start + i)]: val };
    setValues(newVals);

    if (rowState[r] === "wrong") {
      setRowState(prev => prev.map((s, idx) => idx === r ? "idle" : s));
      if (val && i < w.answer.length - 1) {
        window.setTimeout(() => cardInputRefs.current[i + 1]?.focus(), 10);
      }
      return;
    }

    if (val && i < w.answer.length - 1) {
      window.setTimeout(() => cardInputRefs.current[i + 1]?.focus(), 10);
    }

    const complete = w.answer.split("").every((_, idx) => (newVals[keyFor(r, start + idx)] ?? "") !== "");
    if (!complete) return;

    const correct = w.answer.split("").every((letter, idx) =>
      normalizeChar(newVals[keyFor(r, start + idx)]) === normalizeChar(letter)
    );

    const newStates = rowState.map((s, idx) => idx === r ? (correct ? "correct" : "wrong") : s) as RowState[];
    setRowState(newStates);

    if (!correct) return;

    const allDone = newStates.every(s => s === "correct");
    if (allDone) { window.setTimeout(triggerAllSolved, 350); return; }
    window.setTimeout(() => advanceRow(r, newStates), 500);
  }

  function handleKeyDown(r: number, i: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (rowState[r] === "correct") return;
    const start = layout.starts[r];
    if (e.key === "Backspace") {
      const cur = values[keyFor(r, start + i)] ?? "";
      if (cur) {
        const newVals = { ...values, [keyFor(r, start + i)]: "" };
        setValues(newVals);
        if (rowState[r] === "wrong") setRowState(prev => prev.map((s, idx) => idx === r ? "idle" : s));
      } else if (i > 0) {
        const newVals = { ...values, [keyFor(r, start + i - 1)]: "" };
        setValues(newVals);
        window.setTimeout(() => cardInputRefs.current[i - 1]?.focus(), 10);
      }
    }
  }

  function revealRow(r: number) {
    if (solvedOnceRef.current) return;
    const w = words[r];
    const start = layout.starts[r];
    const newVals = { ...values };
    for (let i = 0; i < w.answer.length; i++) {
      newVals[keyFor(r, start + i)] = normalizeChar(w.answer[i]);
    }
    setValues(newVals);
    const newStates = rowState.map((s, idx) => idx === r ? "correct" : s) as RowState[];
    setRowState(newStates);
    if (newStates.every(s => s === "correct")) { window.setTimeout(triggerAllSolved, 350); return; }
    window.setTimeout(() => advanceRow(r, newStates), 400);
  }

  function reset() {
    const cleared: Record<string, string> = {};
    for (let r = 0; r < ROWS; r++) {
      const w = words[r];
      const s = layout.starts[r];
      for (let i = 0; i < w.answer.length; i++) cleared[keyFor(r, s + i)] = "";
    }
    setValues(cleared);
    setRowState(Array.from({ length: ROWS }, () => "idle"));
    setActiveRow(0);
    setAllSolved(false);
    solvedOnceRef.current = false;
  }

  const activeWord = words[activeRow];
  const activeStart = layout.starts[activeRow];
  const solvedCount = rowState.filter(s => s === "correct").length;

  return (
    <div
      dir={isAr ? "rtl" : "ltr"}
      className="relative rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-6"
    >
      {/* ── Header ── */}
      <div className="mb-5">
        <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-z-orange bg-z-orange-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] z-orange">
          {isAr ? "الجولة ١ · الكلمة المخفية" : "Round 1 · Hidden Word"}
        </div>
        <h2 className="text-xl font-semibold text-neutral-950">
          {isAr ? "اكشف وجهتك الأولى" : "Decode your first stop"}
        </h2>
        <p className="mt-1 text-sm leading-6 text-neutral-600">
          {isAr
            ? "حلّ كل سؤال — الحروف البرتقالية تكشف اسم المكان الذي ستتوجّه إليه."
            : "Solve each clue — the orange letters reveal the name of where you're headed."}
        </p>
      </div>

      {/* ── Hidden word strip ── */}
      <div className="mb-5 flex items-center justify-center gap-1.5">
        {centerWord.split("").map((letter, i) => {
          const revealed = i < rowState.length && rowState[i] === "correct";
          return (
            <div
              key={i}
              className={[
                "flex h-10 w-10 items-center justify-center rounded-xl border-2 text-sm font-bold transition-all duration-500",
                revealed
                  ? "border-z-orange bg-z-orange text-white shadow-[0_0_16px_rgba(200,105,74,0.4)]"
                  : "border-neutral-200 bg-neutral-50 text-neutral-300",
              ].join(" ")}
            >
              {revealed ? letter : "·"}
            </div>
          );
        })}
      </div>

      {/* ── Compact display grid ── */}
      <div className="mb-5 rounded-2xl border border-neutral-100 bg-neutral-50 px-3 py-3">
        <div className="flex justify-center" style={{ direction: isAr ? "rtl" : "ltr" }}>
          <div
            className="inline-grid"
            style={{ gridTemplateColumns: `repeat(${layout.cols}, 22px)`, gap: "3px" }}
          >
            {Array.from({ length: ROWS }).flatMap((_, r) =>
              Array.from({ length: layout.cols }).map((__, cc) => {
                const globalC = layout.minC + cc;
                const cell = layout.cells[keyFor(r, globalC)];

                if (!cell) {
                  return <div key={`e-${r}-${cc}`} style={{ width: 22, height: 22 }} />;
                }

                const val = values[keyFor(r, globalC)] ?? "";
                const isCenter = cell.kind === "center";
                const isActive = r === activeRow;
                const isCorrect = rowState[r] === "correct";
                const isWrong = rowState[r] === "wrong";

                return (
                  <button
                    key={`g-${r}-${cc}`}
                    type="button"
                    onClick={() => setActiveRow(r)}
                    style={{ width: 22, height: 22 }}
                    className={[
                      "flex items-center justify-center rounded-[5px] text-[9px] font-bold transition-all duration-200",
                      isCenter && isCorrect ? "bg-z-orange text-white" :
                      isCenter ? "border border-z-orange/50 bg-z-orange/12 text-z-orange" :
                      isCorrect ? "bg-green-100 text-green-700" :
                      isWrong ? "bg-red-50 text-red-400" :
                      isActive ? "border border-z-orange/40 bg-white text-neutral-700 shadow-sm" :
                      "border border-neutral-200 bg-white text-neutral-500",
                    ].join(" ")}
                  >
                    {val}
                  </button>
                );
              })
            )}
          </div>
        </div>
        <p className="mt-2 text-center text-[10px] text-neutral-400">
          {isAr ? "اضغط على أي سطر للانتقال إليه" : "Tap any row to jump to it"}
        </p>
      </div>

      {/* ── Active clue card ── */}
      {!allSolved && (
        <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
          {/* Progress dots */}
          <div className="mb-3 flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-400">
              {isAr
                ? `${solvedCount} من ${ROWS} مكتملة`
                : `${solvedCount} of ${ROWS} solved`}
            </span>
            <div className="flex gap-1">
              {Array.from({ length: ROWS }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveRow(i)}
                  className={[
                    "h-1.5 rounded-full transition-all duration-300",
                    i === activeRow
                      ? "w-5 bg-z-orange"
                      : rowState[i] === "correct"
                      ? "w-1.5 bg-green-400"
                      : "w-1.5 bg-neutral-300",
                  ].join(" ")}
                />
              ))}
            </div>
          </div>

          {/* Clue text */}
          <p className="mb-4 text-base font-medium leading-6 text-neutral-900">
            <span className="mr-1.5 text-sm font-semibold text-z-orange">{activeWord.num}.</span>
            {isAr ? activeWord.clue.ar : activeWord.clue.en}
            <span className="ml-1.5 text-sm font-normal text-neutral-400">
              ({activeWord.answer.length})
            </span>
          </p>

          {/* Letter boxes */}
          <div
            className="mb-4 flex flex-wrap justify-center gap-2"
            style={{ direction: isAr ? "rtl" : "ltr" }}
          >
            {activeWord.answer.split("").map((_, i) => {
              const globalC = activeStart + i;
              const isCenter = activeWord.crossIndex === i;
              const val = values[keyFor(activeRow, globalC)] ?? "";
              const isCorrect = rowState[activeRow] === "correct";
              const isWrong = rowState[activeRow] === "wrong";

              return (
                <input
                  key={i}
                  ref={el => { cardInputRefs.current[i] = el; }}
                  value={val}
                  readOnly={isCorrect}
                  onChange={e => {
                    const raw = e.target.value;
                    if (!raw.slice(-1)) return;
                    handleCellInput(activeRow, i, raw);
                  }}
                  onKeyDown={e => handleKeyDown(activeRow, i, e)}
                  inputMode="text"
                  maxLength={2}
                  className={[
                    "h-12 w-12 rounded-xl border-2 text-center text-lg font-bold outline-none transition-all duration-200",
                    !isAr ? "uppercase" : "",
                    isCenter
                      ? isCorrect
                        ? "border-z-orange bg-z-orange text-white"
                        : "border-z-orange bg-z-orange/10 text-neutral-900 focus:ring-2 focus:ring-z-orange/25"
                      : isCorrect
                        ? "border-green-300 bg-green-50 text-green-700"
                        : isWrong && val
                          ? "border-red-300 bg-red-50 text-red-700"
                          : "border-neutral-300 bg-white text-neutral-900 focus:border-z-orange focus:ring-2 focus:ring-z-orange/20",
                  ].join(" ")}
                />
              );
            })}
          </div>

          {/* Status */}
          {rowState[activeRow] === "correct" && (
            <p className="mb-3 text-center text-sm font-medium text-green-700">
              ✓ {isAr ? "صحيح!" : "Correct!"}
              {solvedCount < ROWS && (
                <span className="font-normal text-neutral-500">
                  {" "}{isAr ? "— تابع الحل" : "— keep going"}
                </span>
              )}
            </p>
          )}
          {rowState[activeRow] === "wrong" && (
            <p className="mb-3 text-center text-sm font-medium text-red-600">
              {isAr ? "ليس هذا — حاول مرة أخرى" : "Not quite — try again"}
            </p>
          )}

          {/* Navigation */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveRow(r => (r - 1 + ROWS) % ROWS)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50 text-neutral-600 hover:bg-neutral-100"
            >
              {isAr ? "›" : "‹"}
            </button>
            <button
              type="button"
              onClick={() => revealRow(activeRow)}
              className="flex-1 rounded-xl border border-neutral-200 bg-neutral-50 py-2 text-xs font-semibold text-neutral-500 hover:bg-neutral-100"
            >
              {isAr ? "كشف الإجابة" : "Reveal"}
            </button>
            <button
              type="button"
              onClick={() => setActiveRow(r => (r + 1) % ROWS)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50 text-neutral-600 hover:bg-neutral-100"
            >
              {isAr ? "‹" : "›"}
            </button>
          </div>

          {/* Reset */}
          <button
            type="button"
            onClick={reset}
            className="mt-3 w-full text-center text-xs text-neutral-400 hover:text-neutral-600"
          >
            {isAr ? "إعادة الضبط" : "Reset all"}
          </button>
        </div>
      )}

      {/* ── All solved ── */}
      {allSolved && (
        <div className="space-y-4" style={{ animation: "r1FadeUp 420ms cubic-bezier(.22,1,.36,1) both" }}>
          <div className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-center">
            <p className="text-sm font-semibold text-green-800">
              {isAr ? "ممتاز! وجهتك الأولى هي:" : "All correct! Your first stop is:"}
            </p>
            <div className="mt-2 flex items-center justify-center gap-1.5">
              {centerWord.split("").map((letter, i) => (
                <span
                  key={i}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-amber-200 bg-gradient-to-b from-[#FFFCF6] to-[#FEF0D2] text-sm font-bold text-amber-900 shadow-sm"
                >
                  {letter}
                </span>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-50 p-5">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-z-orange">
              {isAr ? "محطتك التالية" : "Your next stop"}
            </div>
            <h3 className="mt-2 text-xl font-semibold text-neutral-950">
              <a
                href={MAGENTA_MAP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-z-orange underline-offset-2 hover:opacity-80"
              >
                {isAr ? "ماجنتا" : "Magenta"}
              </a>
            </h3>
            {isTuesdayRoute ? (
              <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-amber-700">
                  {isAr ? "ملاحظة ليوم الثلاثاء" : "A small Tuesday detour"}
                </p>
                <p className="mt-2 text-sm leading-6 text-amber-900">
                  {isAr
                    ? "ماجنتا مغلقة أيام الثلاثاء، لكن جولتك ما زالت تبدأ من هنا. توجّه إلى واجهة المقهى وابدأ من الخارج — لا حاجة للدخول. مشروب الترحيب بانتظارك في محطة لاحقة من الجولة."
                    : "Magenta takes Tuesdays off, but your route still begins here. Head to the storefront and begin from outside—there is no need to enter. Your welcome drink will be waiting for you later in the route."}
                </p>
              </div>
            ) : (
              <p className="mt-3 text-sm leading-7 text-neutral-700">
                {isAr
                  ? "بعيدًا عن صخب الشارع، تختبئ ماجنتا كجوهرة حيّة في قلب عمّان — واحدة من أكثر مقاهيها إلهامًا، تُعرف بالأعمال الفنية والخط العربي الإبداعي التي تُزيّن جدرانها، وبإطلالتها الساحرة على جبل عمّان. البداية المثالية لشحن روحك قبل المغامرة التي تنتظرك."
                  : "Tucked away from the chaos, Magenta is one of Amman's most vibrant cafes, known for its creative artwork and calligraphy that line the walls, and a stunning overlook of Jabal Amman. The perfect start to energise your adventure ahead."}
              </p>
            )}
          </div>

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
                : "Right next door — Jeld is an independent local store with a curated selection of locally made goods. Not part of the tour, but worth a look."}
            </p>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes r1FadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
