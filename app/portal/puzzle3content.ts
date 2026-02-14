import type { Locale } from "./riddlecontent";

export const puzzle3 = {
  title: { en: "Puzzle 3 — Build the Phrase", ar: "اللغز ٣ — رتّب العبارة" },
  prompt: {
    en: "Tap the tiles in the correct order to form the phrase. No typing.",
    ar: "اضغط على البطاقات بالترتيب الصحيح لتكوين العبارة. بدون كتابة.",
  },
  hint: {
    en: "Think: what you should do next after Trinitae (and what you’ll eat).",
    ar: "فكّر: ما هي محطتك التالية بعد ترينيتي؟ وماذا ستأكل؟",
  },
  targetTokens: {
    en: ["NEXT", "STOP", "IS", "JABRI", "FOR", "KNAFEH"],
    ar: ["محطتك", "التالية", "جبري", "للكنافة"],
  },
  ui: {
    en: {
      yourBuild: "Your phrase",
      tiles: "Tiles",
      check: "Check",
      reset: "Reset",
      showHint: "Show hint",
      hideHint: "Hide hint",
      removeLast: "Remove last",
      solved: "Solved!",
      tryAgain: "Not quite — try again.",
      nextStep: "Head to Jabri for knafeh. (Open Maps and search “Jabri”.)",
    },
    ar: {
      yourBuild: "عبارتك",
      tiles: "البطاقات",
      check: "تحقق",
      reset: "إعادة",
      showHint: "إظهار التلميح",
      hideHint: "إخفاء التلميح",
      removeLast: "حذف آخر بطاقة",
      solved: "تم الحل!",
      tryAgain: "ليست صحيحة — جرّب مرة أخرى.",
      nextStep: "اذهب إلى جبري للكنافة. (افتح الخرائط وابحث عن “Jabri”.)",
    },
  },
} as const;

export function getPuzzle3(locale: Locale) {
  const safe: Locale = locale === "ar" ? "ar" : "en";
  return {
    title: puzzle3.title[safe],
    prompt: puzzle3.prompt[safe],
    hint: puzzle3.hint[safe],
    targetTokens: puzzle3.targetTokens[safe],
    ui: puzzle3.ui[safe],
  };
}
