"use client";

import React from "react";
import Image from "next/image";
import type { Locale } from "./riddlecontent";
import { setRoundSolved, serverSetRoundSolved } from "./progress";

/* ------------------------------------------------------------------ */
/* Constants                                                           */
/* ------------------------------------------------------------------ */

// Must stay "r5" — matches portal_flow ROUND_STAMP.r5 and zowar_progress_v1
const ROUND_KEY = "r5" as const;
const CORRECT_ANSWER = "MAISA";
const ANSWER_LENGTH = 5;
// 4 dots: Mango Stairs + Rainbow Street always visible, then 2 user-triggered phases
const TOTAL_PHASES = 4;

/* ------------------------------------------------------------------ */
/* Copy                                                                */
/* ------------------------------------------------------------------ */

const COPY = {
  en: {
    badge: "Round 5 · Visual Journey",
    title: "Allow your senses and sense of exploration to guide you to the next stop.",
    intro: "Leave Tabrizi and follow the route.",

    // Phase 0 — Mango Stairs (always visible, no CTA)
    p0Label: "Start here",
    p0Head:  "Climb the colorful steps",
    p0Body:  "Make your way up the painted staircase.",
    p0Hint:  "The bright painted staircase is just beside Tabrizi.",

    // Phase 1 — Rainbow Street sign (always visible, CTA reveals sensory)
    p1Label: "Rainbow Street",
    p1Head:  "Back on Rainbow? Turn right and keep walking.",
    p1Body:  "You're in Jabal Amman. Now find its name written high above the street.",
    // NOTE: clue references the Jabal Amman Hotel sign — update if landmark changes
    p1Hint:  "Look up as you walk. The name of this neighbourhood is mounted on the hotel building facade above street level — big letters, easy to miss if you're not looking up.",
    p1CTA:   "Found it",

    // Phase 2 — sensory
    p2Label:  "Getting closer",
    p2Line1:  "Found it? You're close.",
    p2Line2:  "Now let another sense take over.",
    p2Line3:  "Follow the smell of fries hitting hot oil.",
    p2Hint:   "Head away from First Circle, back toward Ruman Collective. The smell will reach you before you see the sign — just keep walking and trust your nose. Look for a sign that says Batata.",
    p2CTA:    "I can smell it",

    // Phase 3 — sign puzzle
    p3Label:  "Now look carefully",
    p3Clue1:  "One sign.",
    p3Clue2:  "Five letters. Four dots. On wood.",
    p3Q:      "What did you find?",
    p3Hint:   "Right next door from Batata, the wooden sign hangs at the entrance. The name of the place is your answer — type it letter by letter.",

    hintBtn:  "Need a hint?",
    wrongMsg: "Not quite — look again at the sign.",

    // Success
    successEyebrow: "Your next stop",
    successHead:    "You found Maisa Space",
    // NOTE: tasting description — update here seasonally
    successBody:    "Step inside for a surprise rotating tasting based on what is in season!",
    successInst:    "Go inside and show this screen.",

    aboutEyebrow: "About this stop",
    aboutTitle:   "Maisa Space",
    // NOTE: about copy — update here if Maisa's concept changes
    aboutBody:    "Maisa Space brings together homemade flavors, pantry staples, and seasonal produce inspired by the way food has long been prepared and preserved in Jordanian homes. What you find on the shelves can change with the season — from jams and pickles to other small-batch creations made from what's fresh. Don't forget to explore the boutique shop as well!",
  },
  ar: {
    badge: "الجولة ٥ · رحلة بصرية",
    title: "دع حواسك وروح الاستكشاف لديك تقودانك إلى المحطة التالية.",
    intro: "غادر تبريزي واتبع الطريق.",

    p0Label: "ابدأ من هنا",
    p0Head:  "اصعد الدرج الملوّن",
    p0Body:  "اصعد الدرج المرسوم.",
    p0Hint:  "الدرج الملوّن المرسوم موجود بجانب تبريزي مباشرة.",

    p1Label: "شارع الرينبو",
    p1Head:  "عُدت إلى الرينبو؟ انعطف يميناً وتابع المشي.",
    p1Body:  "أنت في جبل عمّان. الآن اعثر على اسمه مكتوباً فوق الشارع.",
    // NOTE: تلميح يشير إلى لافتة فندق جبل عمّان — عدّله إن تغيّر المعلم
    p1Hint:  "انظر إلى الأعلى وأنت تمشي. اسم هذا الحي مثبّت على واجهة مبنى الفندق فوق مستوى الشارع — حروف كبيرة، سهل إغفالها إن لم تنظر للأعلى.",
    p1CTA:   "وجدته",

    p2Label:  "تقترب أكثر",
    p2Line1:  "وجدته؟ أنت قريب.",
    p2Line2:  "الآن دع حاسة أخرى تتولّى الأمر.",
    p2Line3:  "اتبع رائحة البطاطا المقلية.",
    p2Hint:   "ابتعد عن الدوار الأول وعُد باتجاه رمان كولكتيف. الرائحة ستصلك قبل أن ترى اللافتة — فقط تابع المشي وثق بأنفك. ابحث عن لافتة مكتوب عليها Batata‏.",
    p2CTA:    "أشمّها",

    p3Label:  "الآن تمعّن جيداً",
    p3Clue1:  "لافتة واحدة.",
    p3Clue2:  "خمسة أحرف. أربع نقاط. على خشب.",
    p3Q:      "ماذا وجدت؟",
    p3Hint:   "مجاور مباشرةً لـ Batata‏، اللافتة الخشبية معلّقة عند المدخل. اسم المكان هو الإجابة — أدخله حرفاً حرفاً.",

    hintBtn:  "تحتاج إلى تلميح؟",
    wrongMsg: "ليست هذه — انظر إلى اللافتة مرة أخرى.",

    successEyebrow: "محطتك التالية",
    successHead:    "وجدت مساحة ميسا",
    // NOTE: وصف التذوّق — عدّله هنا موسمياً
    successBody:    "ادخل لتجربة تذوّق دوّارة مفاجئة تعتمد على ما هو في موسمه‏!",
    successInst:    "ادخل واعرض هذه الشاشة.",

    aboutEyebrow: "عن هذه المحطة",
    aboutTitle:   "ميسا سبيس",
    // NOTE: نص عن المحطة — عدّله هنا إن تغيّر مفهوم ميسا
    aboutBody:    "تجمع ميسا سبيس نكهات بيتية ومؤناً أساسية ومنتجات موسمية مستوحاة من طريقة تحضير الطعام وحفظه في البيوت الأردنية منذ أمد بعيد. ما تجده على الرفوف يتغيّر مع الموسم — من المربّيات والمخلّلات إلى إبداعات صغيرة الحجم مصنوعة مما هو طازج. ولا تنسَ استكشاف المتجر البوتيك أيضاً‏!",
  },
} as const;

/* ------------------------------------------------------------------ */
/* Hint box                                                            */
/* ------------------------------------------------------------------ */

function HintBox({ text, isAr }: { text: string; isAr: boolean }) {
  return (
    <div className="mt-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3.5">
      <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-amber-600">
        {isAr ? "تلميح" : "Hint"}
      </p>
      <p className="text-sm leading-6 text-amber-900">{text}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Hint toggle button                                                  */
/* ------------------------------------------------------------------ */

function HintToggle({ open, onToggle, label }: { open: boolean; onToggle: () => void; label: string }) {
  return (
    <button
      type="button"
      aria-expanded={open}
      onClick={onToggle}
      className="mt-4 inline-flex items-center gap-1.5 rounded-xl border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700 transition hover:bg-amber-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-z-orange"
    >
      <span aria-hidden="true">{open ? "↑" : "?"}</span>
      <span>{label}</span>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* CTA button                                                          */
/* ------------------------------------------------------------------ */

function StepCTA({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative mt-5 inline-flex items-center gap-2 overflow-hidden rounded-2xl bg-z-orange px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-95 active:scale-[0.98]"
    >
      <span className="relative z-10">{label}</span>
      <span className="relative z-10 transition-transform duration-200 group-hover:translate-x-0.5">→</span>
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export default function PuzzleR5({
  locale,
  onSolved,
}: {
  locale: Locale;
  onSolved?: () => void;
}) {
  const safeLocale: Locale = locale === "ar" ? "ar" : "en";
  const isAr = safeLocale === "ar";
  const t = COPY[safeLocale];

  const solvedRef  = React.useRef(false);
  const successRef = React.useRef<HTMLDivElement>(null);
  const inputRefs  = React.useRef<(HTMLInputElement | null)[]>([]);
  // phaseRefs[0]=stairs phaseRefs[1]=street phaseRefs[2]=sensory phaseRefs[3]=sign
  const phaseRefs  = React.useRef<(HTMLDivElement | null)[]>([null, null, null, null]);

  // Phases 0 and 1 are always visible on load. "phase" tracks which
  // user-triggered card is currently the furthest revealed.
  // 1 = street visible (initial), 2 = sensory revealed, 3 = sign revealed
  const [phase,   setPhase]   = React.useState(1);
  const [letters, setLetters] = React.useState<string[]>(Array(ANSWER_LENGTH).fill(""));
  const [status,  setStatus]  = React.useState<"idle" | "wrong" | "correct">("idle");
  const [solved,  setSolved]  = React.useState(false);

  const [showHint0, setShowHint0] = React.useState(false);
  const [showHint1, setShowHint1] = React.useState(false);
  const [showHint2, setShowHint2] = React.useState(false);
  const [showHint3, setShowHint3] = React.useState(false);
  const [showAnswer, setShowAnswer] = React.useState(false);

  function advanceTo(next: number) {
    setPhase(next);
    window.setTimeout(() => {
      phaseRefs.current[next]?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120);
  }

  function handleLetterChange(index: number, raw: string) {
    const char = raw.replace(/[^a-zA-Z؀-ۿ]/g, "").slice(-1).toUpperCase();
    const next = [...letters];
    next[index] = char;
    setLetters(next);
    setStatus("idle");
    if (char && index < ANSWER_LENGTH - 1) {
      window.setTimeout(() => inputRefs.current[index + 1]?.focus(), 0);
    }
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !letters[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "Enter") handleSubmit();
  }

  function handleSubmit() {
    if (solved) return;
    const answer = letters.join("").toUpperCase();
    if (answer === CORRECT_ANSWER) {
      setStatus("correct");
      setSolved(true);
      if (!solvedRef.current) {
        solvedRef.current = true;
        setRoundSolved(ROUND_KEY);
        serverSetRoundSolved(ROUND_KEY);
        onSolved?.();
      }
      window.setTimeout(() => {
        successRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 300);
    } else {
      setStatus("wrong");
    }
  }

  function handleReset() {
    setLetters(Array(ANSWER_LENGTH).fill(""));
    setStatus("idle");
    inputRefs.current[0]?.focus();
  }

  function revealAnswer() {
    const chars = CORRECT_ANSWER.split("");
    setLetters(chars);
    setStatus("correct");
    setSolved(true);
    if (!solvedRef.current) {
      solvedRef.current = true;
      setRoundSolved(ROUND_KEY);
      serverSetRoundSolved(ROUND_KEY);
      onSolved?.();
    }
    window.setTimeout(() => {
      successRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 300);
  }

  /* ---------------------------------------------------------------- */
  /* Render                                                            */
  /* ---------------------------------------------------------------- */

  return (
    <div dir={isAr ? "rtl" : "ltr"} className="w-full space-y-4">

      {/* ── Header ── */}
      <div className="rounded-3xl border border-neutral-200 bg-white p-5 sm:p-6">
        <div className="flex items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-z-orange bg-z-orange-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] z-orange">
            {t.badge}
          </div>
          {/* Progress dots — always LTR */}
          <div dir="ltr" className="flex items-center gap-1.5" aria-hidden="true">
            {Array.from({ length: TOTAL_PHASES }).map((_, i) => (
              <div
                key={i}
                className={[
                  "h-2 rounded-full transition-all duration-500",
                  i <= phase ? "w-6 bg-z-orange" : "w-2 bg-neutral-200",
                ].join(" ")}
              />
            ))}
          </div>
        </div>
        <h2 className="mt-3 text-xl font-semibold text-neutral-950">{t.title}</h2>
        <p className="mt-1 text-sm leading-6 text-neutral-600">{t.intro}</p>
      </div>

      {/* ── Phase 0: Mango Stairs — always visible, no CTA ── */}
      <div
        ref={el => { phaseRefs.current[0] = el; }}
        className="overflow-hidden rounded-3xl border border-neutral-200 bg-white"
      >
        <div className="relative aspect-[4/3] w-full bg-neutral-100">
          <Image
            src="/images/puzzles/Al%20Quds/Mango%20Stairs.JPG"
            alt={isAr ? "درج ملوّن مرسوم يؤدي إلى الأعلى" : "Colorfully painted staircase leading uphill."}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 700px"
            priority
          />
        </div>
        <div className="p-5">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.22em] text-z-orange">{t.p0Label}</p>
          <h3 className="text-base font-semibold text-neutral-950">{t.p0Head}</h3>
          <p className="mt-1 text-sm leading-6 text-neutral-600">{t.p0Body}</p>
          <HintToggle open={showHint0} onToggle={() => setShowHint0(v => !v)} label={t.hintBtn} />
          {showHint0 && <HintBox text={t.p0Hint} isAr={isAr} />}
        </div>
      </div>

      {/* ── Phase 1: Rainbow Street sign — always visible, CTA reveals sensory ── */}
      <div
        ref={el => { phaseRefs.current[1] = el; }}
        className="overflow-hidden rounded-3xl border border-neutral-200 bg-white"
      >
        <div className="relative aspect-[4/3] w-full bg-neutral-100">
          <Image
            src="/images/puzzles/Al%20Quds/Rainbowstreet.jpg"
            alt={isAr ? "لافتة شارع الرينبو" : "Rainbow Street sign."}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 700px"
          />
        </div>
        <div className="p-5">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.22em] text-z-orange">{t.p1Label}</p>
          <h3 className="text-base font-semibold text-neutral-950">{t.p1Head}</h3>
          <p className="mt-2 text-sm leading-6 text-neutral-600">{t.p1Body}</p>
          <HintToggle open={showHint1} onToggle={() => setShowHint1(v => !v)} label={t.hintBtn} />
          {showHint1 && <HintBox text={t.p1Hint} isAr={isAr} />}
          {phase === 1 && <StepCTA label={t.p1CTA} onClick={() => advanceTo(2)} />}
        </div>
      </div>

      {/* ── Phase 2: Sensory clue ── */}
      {phase >= 2 && (
        <div
          ref={el => { phaseRefs.current[2] = el; }}
          className="rounded-3xl border border-z-orange/15 bg-[linear-gradient(150deg,rgba(200,105,74,0.07)_0%,rgba(250,247,242,0.97)_60%)] p-6"
          style={{ animation: "r5FadeUp 420ms cubic-bezier(.22,1,.36,1) both" }}
        >
          <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.22em] text-z-orange">{t.p2Label}</p>

          <div className="space-y-4">
            <p className="text-xl font-semibold leading-snug text-neutral-950">{t.p2Line1}</p>
            <p className="text-sm leading-6 text-neutral-500">{t.p2Line2}</p>
            <p className="text-base font-medium leading-6 text-neutral-800">{t.p2Line3}</p>
          </div>

          <HintToggle open={showHint2} onToggle={() => setShowHint2(v => !v)} label={t.hintBtn} />
          {showHint2 && <HintBox text={t.p2Hint} isAr={isAr} />}
          {phase === 2 && <StepCTA label={t.p2CTA} onClick={() => advanceTo(3)} />}
        </div>
      )}

      {/* ── Phase 3: MAISA sign puzzle ── */}
      {phase >= 3 && (
        <div
          ref={el => { phaseRefs.current[3] = el; }}
          className="rounded-3xl border border-neutral-200 bg-white p-5"
          style={{ animation: "r5FadeUp 420ms cubic-bezier(.22,1,.36,1) both" }}
        >
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-z-orange">{t.p3Label}</p>

          <div className="space-y-2">
            <p className="text-sm font-medium text-neutral-900">{t.p3Clue1}</p>
            <p className="text-xl font-bold tracking-wide text-neutral-950">{t.p3Clue2}</p>
          </div>

          <HintToggle open={showHint3} onToggle={() => setShowHint3(v => !v)} label={t.hintBtn} />
          {showHint3 && (
            <>
              <HintBox text={t.p3Hint} isAr={isAr} />
              {!solved && (
                <button
                  type="button"
                  onClick={() => setShowAnswer(v => !v)}
                  className="mt-3 inline-flex items-center gap-1.5 rounded-xl border border-neutral-200 bg-white px-3 py-1.5 text-xs font-semibold text-neutral-500 transition hover:bg-neutral-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-z-orange"
                >
                  {showAnswer
                    ? (isAr ? "↑ إخفاء الإجابة" : "↑ Hide answer")
                    : (isAr ? "👁 أرني الإجابة" : "👁 Show answer")}
                </button>
              )}
              {showAnswer && !solved && (
                <div className="mt-2 flex items-center gap-3 rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3">
                  <span className="font-mono text-base font-bold tracking-[0.25em] text-neutral-800">
                    {CORRECT_ANSWER}
                  </span>
                  <button
                    type="button"
                    onClick={revealAnswer}
                    className="ml-auto rounded-xl bg-z-orange px-3 py-1.5 text-xs font-semibold text-white transition hover:opacity-90"
                  >
                    {isAr ? "حلّ التحدي" : "Solve for me"}
                  </button>
                </div>
              )}
            </>
          )}

          <p className="mt-5 text-sm font-medium text-neutral-900">{t.p3Q}</p>

          {/* 5-letter inputs — always LTR so English word reads left-to-right */}
          <div
            dir="ltr"
            className="mt-3 flex items-center gap-2"
            role="group"
            aria-label={isAr ? "أدخل الإجابة" : "Enter your answer"}
          >
            {Array.from({ length: ANSWER_LENGTH }).map((_, i) => (
              <input
                key={i}
                ref={el => { inputRefs.current[i] = el; }}
                type="text"
                maxLength={1}
                value={letters[i]}
                onChange={e => handleLetterChange(i, e.target.value)}
                onKeyDown={e => handleKeyDown(i, e)}
                disabled={solved}
                className={[
                  "h-12 w-12 rounded-2xl border-2 text-center text-lg font-bold uppercase transition",
                  "focus:outline-none focus:ring-4 focus:ring-[rgba(200,105,74,0.12)]",
                  status === "correct" && letters[i]
                    ? "border-green-400 bg-green-50 text-green-700"
                    : status === "wrong"
                    ? "border-red-300 bg-red-50 text-red-700"
                    : letters[i]
                    ? "border-z-orange/40 bg-z-orange-soft focus:border-z-orange text-neutral-900"
                    : "border-neutral-300 bg-white focus:border-z-orange text-neutral-900",
                  solved ? "cursor-not-allowed" : "",
                ].join(" ")}
                aria-label={isAr ? `الحرف ${i + 1}` : `Letter ${i + 1}`}
                inputMode="text"
                autoCapitalize="characters"
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
              />
            ))}
          </div>

          <div aria-live="polite" aria-atomic="true" className="mt-3 min-h-[2rem]">
            {status === "wrong" && (
              <p className="rounded-2xl border border-red-200 bg-red-50 px-3 py-2.5 text-sm font-medium text-red-700">
                {t.wrongMsg}
              </p>
            )}
          </div>

          {!solved && (
            <div className="mt-4 flex gap-3">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={letters.every(l => !l)}
                className="rounded-2xl bg-z-orange px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-95 disabled:opacity-50"
              >
                {isAr ? "تحقق" : "Submit"}
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="rounded-2xl border border-neutral-300 bg-white px-5 py-2.5 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50"
              >
                {isAr ? "إعادة" : "Reset"}
              </button>
            </div>
          )}
        </div>
      )}

      {/* ── Success ── */}
      {solved && (
        <div
          ref={successRef}
          className="space-y-4"
          style={{ animation: "r5FadeUp 420ms cubic-bezier(.22,1,.36,1) both" }}
        >
          <div className="rounded-3xl border border-z-orange/20 bg-z-orange-soft p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] z-orange">{t.successEyebrow}</p>
            <h3 className="mt-2 text-xl font-semibold text-neutral-950">{t.successHead}</h3>
            <p className="mt-2 text-sm leading-6 text-neutral-700">{t.successBody}</p>
            <div className="mt-3 rounded-2xl border border-z-orange/20 bg-white/70 px-3 py-2.5">
              <p className="text-sm font-medium text-neutral-800">{t.successInst}</p>
            </div>
          </div>

          <div className="rounded-3xl border border-neutral-200 bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] z-orange">{t.aboutEyebrow}</p>
            <h4 className="mt-2 text-lg font-semibold text-neutral-950">{t.aboutTitle}</h4>
            <p className="mt-2 text-sm leading-7 text-neutral-700">{t.aboutBody}</p>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes r5FadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
