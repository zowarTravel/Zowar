// app/portal/riddlecontent.ts

export type Locale = "en" | "ar";

/* ------------------------------------------------------------------ */
/* RIDDLE 1 — POMEGRANATE (shown as Round 2 · Riddle)                 */
/* ------------------------------------------------------------------ */

export const riddle1 = {
  title: {
    en: "A Fruit of These Hills",
    ar: "ثمرة هذه التلال",
  },
  prompt: {
    en: `Red crown upon my head,\nA hundred jewels I guard in bed.\nInside are pearls, outside is leather,\nName this fruit, if you are clever.`,
    ar: `تاج أحمر فوق رأسي،\nأخفي مئة جوهرة في بطني.\nمن جوة لؤلؤ، ومن برة جلد،\nاحزر الفاكهة إن كنت ذكي.`,
  },
  hint: {
    en: "A fruit deeply tied to Jordan — you'll find it pressed into juice on nearly every street corner.",
    ar: "فاكهة مرتبطة بعمق بالأردن — ستجدها معصورة عصيراً في كل زاوية شارع تقريباً.",
  },
  hint2: {
    en: "Think of a fruit filled with jewel-like seeds.",
    ar: "فكّر بفاكهة مليئة ببذور تشبه الجواهر.",
  },
  answer: { en: "Pomegranate", ar: "رمان" },
  ui: {
    showHint: { en: "I need a clue", ar: "أحتاج تلميحاً" },
    hideHint: { en: "Hide clue", ar: "إخفاء التلميح" },
    showAnswer: { en: "Show answer", ar: "إظهار الإجابة" },
    hideAnswer: { en: "Hide answer", ar: "إخفاء الإجابة" },
    yourAnswer: { en: "Your answer", ar: "إجابتك" },
    placeholder: { en: "Type your answer...", ar: "اكتب إجابتك..." },
    check: { en: "Check", ar: "تحقق" },
    checking: { en: "Checking…", ar: "جارٍ التحقق…" },
    reset: { en: "Reset", ar: "إعادة" },
    lockedTitle: { en: "Round 2 Locked", ar: "الجولة ٢ مقفلة" },
    lockedBody: { en: "Solve Round 1 first to unlock this riddle.", ar: "حل الجولة ١ أولاً لفتح هذا اللغز." },
  },
  success: { en: "That's it! ✅", ar: "إجابة صحيحة! ✅" },
  closeEnough: { en: "Close enough ✅ — we'll count it!", ar: "قريبة جداً ✅ — مقبولة!" },
  tryAgain: { en: "Not quite — try again.", ar: "ليست صحيحة — حاول مرة أخرى." },
  aboutEyebrow: { en: "Your next stop", ar: "محطتك التالية" },
  aboutTitle: { en: "Ruman Collective", ar: "رمان كولكتيف" },
  aboutBody1: {
    en: "A collective of Jordanian designers and makers on Rainbow Street. Hand-printed textiles, ceramics, illustrated prints — made within a few streets of where you're standing.",
    ar: "مجمّع مصمّمين وحرفيين أردنيين على شارع الرينبو. منسوجات مطبوعة يدوياً وسيراميك ومطبوعات — كلها صُنعت على بعد خطوات من هنا.",
  },
  aboutBody2: {
    en: "Started as a shared studio. Now one of the better stops on this street.",
    ar: "بدأت مساحةً مشتركة للعمل. الآن إحدى محطات الشارع الأكثر قيمة.",
  },
} as const;

/* ------------------------------------------------------------------ */
/* RIDDLE 2 — MINI CROSSWORD (shown as Round 1)                       */
/* ------------------------------------------------------------------ */

export const riddle2 = {
  title: {
    en: "Mini Crossword",
    ar: "الكلمات المتقاطعة",
  },
  prompt: {
    en: "Fill every row. When all letters match, the center column reveals a hidden word.",
    ar: "أكمل كل سطر. عندما تتطابق كل الحروف، يكشف العمود الأوسط كلمةً مخفية.",
  },
  ui: {
    check: { en: "Check", ar: "تحقق" },
    reset: { en: "Reset", ar: "إعادة" },
    solved: { en: "Solved! ✅", ar: "تم الحل! ✅" },
    tryAgain: {
      en: "Not quite — keep going.",
      ar: "ليست صحيحة بعد — تابع المحاولة.",
    },
    lockedTitle: { en: "Round 1 Locked", ar: "الجولة ١ مقفلة" },
    lockedBody: {
      en: "Complete the previous step to unlock.",
      ar: "أكمل الخطوة السابقة للمتابعة.",
    },
  },
} as const;

/* ------------------------------------------------------------------ */
/* RIDDLE 4 — CONNECTIONS (shown as Round 3)                          */
/* ------------------------------------------------------------------ */

export const riddle4 = {
  title: {
    en: "Find the Hidden Groups",
    ar: "اعثر على المجموعات المخفية",
  },
  prompt: {
    en: "Four groups of four words. Select four tiles and submit.",
    ar: "أربع مجموعات من أربع كلمات. اختر أربعة مربعات وأرسل.",
  },
  ui: {
    chooseOne: { en: "Choose one", ar: "اختر خيارًا" },
    correct: { en: "Nice — group found.", ar: "ممتاز — تم العثور على مجموعة." },
    tryAgain: { en: "Try again.", ar: "جرّب مرة أخرى." },
    oneAway: { en: "So close — one tile is in the wrong group.", ar: "قريب جداً — مربع واحد في المجموعة الخطأ." },
    solved: { en: "Solved!", ar: "تم الحل!" },
  },
  finalInstruction: {
    en: "Your next stop is a little off the main drag.",
    ar: "جوهرتك التالية في طريق غير مطروق.",
  },
  aboutEyebrow: { en: "About this stop", ar: "عن هذه المحطة" },
  aboutTitle: { en: "Tabrizi", ar: "تبريزي" },
  aboutBody1: {
    en: "A handmade goods shop on Omar Bin Al-Khattab Street. Perfumes, soaps, natural incense, and ceramics — all made in their own workshop.",
    ar: "محل منتجات يدوية في شارع عمر بن الخطاب. عطور وصابون وبخور طبيعي وسيراميك — كلها تُصنع في مشغلهم الخاص.",
  },
  aboutBody2: {
    en: "The nicest smelling store in all of Amman is waiting for you!",
    ar: "أعطر محل في عمّان كلها بانتظارك!",
  },
} as const;

/* ------------------------------------------------------------------ */
/* RIDDLE 5 — IMAGE TILE PUZZLE                                       */
/* ------------------------------------------------------------------ */

export const riddle5 = {
  title: { en: "Round 3: Assemble the Image", ar: "الجولة ٣: رتّب الصورة" },
  kicker: { en: "Round 3", ar: "الجولة ٣" },
  prompt: {
    en: "Tap two tiles to swap them. Complete the image to reveal your next destination.",
    ar: "اضغط على قطعتين لتبديل مكانهما. عند اكتمال الصورة ستظهر وجهتك التالية.",
  },

  gridSize: 3,

  imageSrc: "/images/r5.jpg",

  ui: {
    showHint: { en: "Show hint", ar: "إظهار التلميح" },
    hideHint: { en: "Hide hint", ar: "إخفاء التلميح" },
    reset: { en: "Reset", ar: "إعادة" },
    progressLabel: { en: "Locked pieces:", ar: "القطع المثبّتة:" },
    previewLabel: { en: "Target", ar: "المرجع" },
  },

  success: { en: "Perfect — image complete!", ar: "رائع — اكتملت الصورة!" },

  endCopy: {
    en: "Your next stop is Asma Kitchen — a short walk from here.",
    ar: "محطتك التالية هي مطبخ أسمى — على بعد خطوات من هنا.",
  },

  finalInstruction: {
    en: "Make your way to Asma Kitchen.",
    ar: "توجّه إلى مطبخ أسمى.",
  },
} as const;
