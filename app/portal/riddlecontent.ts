// app/portal/riddlecontent.ts

export type Locale = "en" | "ar";

/* ------------------------------------------------------------------ */
/* RIDDLE 1                                                           */
/* ------------------------------------------------------------------ */

export const riddle1 = {
  title: { en: "Riddle 1", ar: "اللغز ١" },
  prompt: {
    en: `Red crown upon my head,\nA hundred jewels I guard in bed.\nInside are pearls, outside is leather,\nName this fruit, if you are clever.`,
    ar: `تاج أحمر فوق رأسي،\nأخفي مئة جوهرة في بطني.\nمن جوة لؤلؤ، ومن برة جلد،\nاحزر الفاكهة إن كنت ذكي.`,
  },
  hint: {
    en: "Think of a fruit filled with jewel-like seeds.",
    ar: "فكّر بفاكهة مليئة ببذور تشبه الجواهر.",
  },
  answer: { en: "Pomegranate", ar: "رمان" },
  // Note: acceptedAnswers intentionally NOT here — validation is server-side only
  ui: {
    showHint: { en: "Show hint", ar: "إظهار التلميح" },
    hideHint: { en: "Hide hint", ar: "إخفاء التلميح" },
    showAnswer: { en: "Show answer", ar: "إظهار الإجابة" },
    hideAnswer: { en: "Hide answer", ar: "إخفاء الإجابة" },
    yourAnswer: { en: "Your answer", ar: "إجابتك" },
    placeholder: { en: "Type your answer...", ar: "اكتب إجابتك..." },
    check: { en: "Check", ar: "تحقق" },
    checking: { en: "Checking…", ar: "جارٍ التحقق…" },
    reset: { en: "Reset", ar: "إعادة" },
  },
  success: { en: "Correct ✅", ar: "إجابة صحيحة ✅" },
  closeEnough: { en: "Close enough ✅ (we'll count it!)", ar: "قريبة جدًا ✅ (مقبولة!)" },
  tryAgain: { en: "Not quite — try again.", ar: "ليست صحيحة — حاول مرة أخرى." },
} as const;

/* ------------------------------------------------------------------ */
/* RIDDLE 2 — MINI CROSSWORD                                          */
/* ------------------------------------------------------------------ */

export const riddle2 = {
  title: {
    en: "Round 2: Mini Crossword",
    ar: "الجولة ٢: كلمات متقاطعة صغيرة",
  },
  prompt: {
    en: "Fill the crossword. When all letters match, you unlock the next step.",
    ar: "املأ الكلمات المتقاطعة. عندما تتطابق كل الحروف، ستفتح الخطوة التالية.",
  },
  ui: {
    check: { en: "Check", ar: "تحقق" },
    reset: { en: "Reset", ar: "إعادة" },
    solved: { en: "Solved! ✅", ar: "تم الحل! ✅" },
    tryAgain: {
      en: "Not quite—keep going.",
      ar: "ليست صحيحة بعد—تابع المحاولة.",
    },
    lockedTitle: { en: "Round 2 Locked", ar: "الجولة ٢ مقفلة" },
    lockedBody: {
      en: "Solve Round 1 first to unlock the crossword.",
      ar: "حل الجولة ١ أولاً لفتح الكلمات المتقاطعة.",
    },
  },
} as const;

/* ------------------------------------------------------------------ */
/* RIDDLE 4 — WORD ASSOCIATION (Breakfast / Falafel Stop)              */
/* ------------------------------------------------------------------ */

export const riddle4 = {
  title: {
    en: "Round 4: Word Association",
    ar: "الجولة ٤: ترابط الكلمات",
  },
  prompt: {
    en: "Choose the strongest association to build the chain.",
    ar: "اختر أقوى ترابط لبناء السلسلة.",
  },
  ui: {
    chooseOne: { en: "Choose one", ar: "اختر خيارًا" },
    correct: { en: "Nice — that’s it.", ar: "ممتاز — هذا صحيح." },
    tryAgain: { en: "Try again.", ar: "جرّب مرة أخرى." },
    solved: { en: "Solved!", ar: "تم الحل!" },
  },
  finalInstruction: {
    en: "Head to Al Quds Falafel for your next stop.",
    ar: "اتجه إلى فلافل القدس لتكون محطتك التالية.",
  },
  /**
   * Prompt → correct association ID
   * Labels are localized inside the puzzle component
   */
  steps: [
    { promptId: "MORNING", correctId: "BREAKFAST" },
    { promptId: "BREAKFAST", correctId: "FALAFEL" },
    { promptId: "FALAFEL", correctId: "AL_QUDS" },
  ],
} as const;

/* ------------------------------------------------------------------ */
/* RIDDLE 5 — IMAGE TILE PUZZLE (Jigsaw-style)                          */
/* ------------------------------------------------------------------ */

export const riddle5 = {
  title: { en: "Round 5: Assemble the Image", ar: "الجولة ٥: رتّب الصورة" },
  kicker: { en: "Round 5", ar: "الجولة ٥" },
  prompt: {
    en: "Tap two tiles to swap them. Complete the image to reveal your next destination.",
    ar: "اضغط على قطعتين لتبديل مكانهما. عند اكتمال الصورة ستظهر وجهتك التالية.",
  },

  // Grid size: 3 => 3x3 tiles (you can set 4 for harder)
  gridSize: 3,

  /**
   * IMPORTANT: Put the image in /public and reference it like:
   * "/portal/r5.jpg" or "/images/r5.jpg"
   * (Do NOT use an external URL yet—keep it stable.)
   */
  imageSrc: "/images/r5.jpg",

  ui: {
    showHint: { en: "Show hint", ar: "إظهار التلميح" },
    hideHint: { en: "Hide hint", ar: "إخفاء التلميح" },
    reset: { en: "Reset", ar: "إعادة" },
    progressLabel: { en: "Locked pieces:", ar: "القطع المثبّتة:" },
  },

  success: { en: "Nice — image completed.", ar: "رائع — اكتملت الصورة." },

  /**
   * End Copy (IMPORTANT)
   * Must match your spec:
   * "Time to claim your Arabic breakfast at Al Quds Falafel."
   */
  endCopy: {
    en: "Time to claim your Arabic breakfast at Al Quds Falafel.",
    ar: "حان وقت فطورك العربي في فلافل القدس.",
  },

  /**
   * Keep exports static. If you want this to mirror riddle4.finalInstruction,
   * copy the text here rather than referencing riddle4 dynamically.
   */
  finalInstruction: {
    en: "Head to Al Quds Falafel for your next stop.",
    ar: "اتجه إلى فلافل القدس لتكون محطتك التالية.",
  },
} as const;

