"use client";

import React from "react";
import type { Locale } from "./riddlecontent";
import { setRoundSolved, serverSetRoundSolved } from "./progress";

const ROUND_KEY = "r6" as const;

type Pair = { a: string; b: string };

const PAIRS: Record<"en" | "ar", Pair[]> = {
  en: [
    { a: "Dead",    b: "Sea"    },
    { a: "Salt",    b: "Pepper" },
    { a: "Rainbow", b: "Street" },
    { a: "Mint",    b: "Tea"    },
    { a: "Flour",   b: "Fire"   },
  ],
  ar: [
    { a: "ميت",   b: "بحر"   },
    { a: "ملح",   b: "فلفل"  },
    { a: "رينبو", b: "شارع"  },
    { a: "نعناع", b: "شاي"   },
    { a: "دقيق",  b: "نار"   },
  ],
};

const CONTENT = {
  en: {
    kicker: "Round 6 · Word Match",
    title: "Find the Pair",
    subtitle:
      "Match each word with its partner. The last pair reveals your next stop.",
    successTitle: "You got it!",
    successBody: "Flour & Fire — a wood-fire bakery on Rainbow Street.",
    aboutEyebrow: "Your next stop",
    aboutTitle: "Flour & Fire",
    aboutBody:
      "Head inside and order manakeesh from the wood-fire oven. Za'atar is the classic — warm, aromatic, and the kind of thing you'll think about long after the walk is done.",
    storyEyebrow: "About this stop",
    storyTitle: "Flour & Fire",
    storyBody1:
      "Flour & Fire is an artisan bakery on Rainbow Street. The manakeesh comes out of a wood-fire oven, and it fits perfectly into the neighbourhood's rhythm of walking, sharing, and stopping for something fresh.",
    storyBody2:
      "Za'atar holds a special place across Jordan and the Levant — warm, aromatic, and deeply familiar. A simple stop that becomes part of the city's daily ritual.",
  },
  ar: {
    kicker: "الجولة ٦ · مطابقة الكلمات",
    title: "اعثر على الزوج",
    subtitle:
      "طابق كل كلمة مع شريكتها. الزوج الأخير يكشف محطتك التالية.",
    successTitle: "أجدت!",
    successBody: "فلور آند فاير — مخبزة بفرن حطب على شارع الرينبو.",
    aboutEyebrow: "محطتك التالية",
    aboutTitle: "فلور آند فاير",
    aboutBody:
      "ادخل واطلب مناقيش من فرن الحطب. الزعتر هو الكلاسيكي — دافئ وعطِر، ومن النوع الذي لن تنساه بعد انتهاء المشوار.",
    storyEyebrow: "عن هذه المحطة",
    storyTitle: "فلور آند فاير",
    storyBody1:
      "فلور آند فاير مخبزة حرفية على شارع الرينبو. المناقيش تخرج من فرن الحطب، وتنسجم مع إيقاع الحي القائم على المشي والمشاركة والتوقف لشيء طازج.",
    storyBody2:
      "الزعتر يحمل مكانة خاصة في الأردن وبلاد الشام — دافئ وعطِر ومألوف. وقفة بسيطة تتحول إلى جزء من طقوس المدينة اليومية.",
  },
} as const;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

type Line = { key: string; x1: number; y1: number; x2: number; y2: number };
type Props = { locale: Locale; onSolved?: () => void };

export default function PuzzleR6({ locale, onSolved }: Props) {
  const safeLocale: Locale = locale === "ar" ? "ar" : "en";
  const isAr = safeLocale === "ar";
  const t = CONTENT[safeLocale];
  const pairs = PAIRS[safeLocale];

  const [colA] = React.useState(() => shuffle(pairs.map((p) => p.a)));
  const [colB] = React.useState(() => shuffle(pairs.map((p) => p.b)));

  const [selected, setSelected] = React.useState<{ word: string; col: "a" | "b" } | null>(null);
  const [matched, setMatched] = React.useState<Map<string, string>>(new Map());
  const [wrongFlash, setWrongFlash] = React.useState<[string, string] | null>(null);
  const [solved, setSolved] = React.useState(false);
  const solvedRef = React.useRef(false);

  const containerRef = React.useRef<HTMLDivElement>(null);
  const tileRefs = React.useRef(new Map<string, HTMLDivElement>());
  const [lines, setLines] = React.useState<Line[]>([]);

  function isWordMatched(word: string): boolean {
    for (const [a, b] of matched) {
      if (a === word || b === word) return true;
    }
    return false;
  }

  function isWrongWord(word: string): boolean {
    return wrongFlash !== null && (wrongFlash[0] === word || wrongFlash[1] === word);
  }

  function handleClick(word: string, col: "a" | "b") {
    if (solved || isWordMatched(word)) return;

    if (!selected) {
      setSelected({ word, col });
      return;
    }

    if (selected.col === col) {
      setSelected({ word, col });
      return;
    }

    const aWord = col === "b" ? selected.word : word;
    const bWord = col === "b" ? word : selected.word;
    const isMatch = pairs.some((p) => p.a === aWord && p.b === bWord);

    if (isMatch) {
      const next = new Map(matched);
      next.set(aWord, bWord);
      setMatched(next);
      setSelected(null);

      if (next.size === pairs.length) {
        setTimeout(() => {
          setSolved(true);
          if (!solvedRef.current) {
            solvedRef.current = true;
            setRoundSolved(ROUND_KEY);
            void serverSetRoundSolved(ROUND_KEY);
            onSolved?.();
          }
        }, 600);
      }
    } else {
      setWrongFlash([aWord, bWord]);
      setSelected(null);
      setTimeout(() => setWrongFlash(null), 500);
    }
  }

  // Recompute dotted-line positions after each match
  React.useEffect(() => {
    if (!containerRef.current || matched.size === 0) return;
    const cr = containerRef.current.getBoundingClientRect();
    const next: Line[] = [];

    for (const [aWord, bWord] of matched) {
      const aEl = tileRefs.current.get(`a-${aWord}`);
      const bEl = tileRefs.current.get(`b-${bWord}`);
      if (!aEl || !bEl) continue;
      const ar = aEl.getBoundingClientRect();
      const br = bEl.getBoundingClientRect();
      next.push({
        key: `${aWord}-${bWord}`,
        // In RTL the columns are flipped, so connect the inner edges
        x1: isAr ? ar.left - cr.left : ar.right - cr.left,
        y1: ar.top + ar.height / 2 - cr.top,
        x2: isAr ? br.right - cr.left : br.left - cr.left,
        y2: br.top + br.height / 2 - cr.top,
      });
    }

    setLines(next);
  }, [matched, isAr]);

  function tileClass(word: string, col: "a" | "b"): string {
    const base =
      "rounded-2xl border px-4 py-3 text-sm font-medium text-center transition-all duration-150 select-none";
    if (isWordMatched(word))
      return `${base} cursor-default border-emerald-200 bg-emerald-50 text-emerald-700`;
    if (isWrongWord(word))
      return `${base} cursor-pointer border-red-300 bg-red-50 text-red-600`;
    if (selected?.word === word && selected?.col === col)
      return `${base} cursor-pointer border-z-orange bg-z-orange-soft z-orange font-semibold`;
    return `${base} cursor-pointer border-black/10 bg-white text-neutral-800 hover:border-z-orange/40 active:scale-[0.98]`;
  }

  const card =
    "rounded-3xl border border-black/10 " +
    "bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(250,247,242,0.94))] " +
    "shadow-[0_16px_50px_rgba(0,0,0,0.10)]";

  return (
    <div dir={isAr ? "rtl" : "ltr"} className="mx-auto w-full max-w-5xl px-4 py-8 sm:py-10">
      <style>{`
        @keyframes r6-fade-up {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes r6-line-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>

      <div className={`${card} relative p-5 sm:p-6`}>
        <div className="pointer-events-none absolute -top-6 left-[-10px] h-32 w-32 rounded-full bg-z-orange-soft blur-3xl opacity-40" />

        <div className="relative">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-z-orange bg-z-orange-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] z-orange">
            {t.kicker}
          </div>
          <h1 className="text-2xl font-semibold text-neutral-950 sm:text-3xl">{t.title}</h1>
          <p className="mt-2 text-sm leading-relaxed text-neutral-700">{t.subtitle}</p>
        </div>

        {/* Matching grid */}
        <div className="relative mt-6" ref={containerRef}>
          {/* Dotted lines overlay */}
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
            aria-hidden="true"
          >
            {lines.map((line) => (
              <line
                key={line.key}
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                stroke="#C8694A"
                strokeWidth="2"
                strokeDasharray="5 4"
                strokeLinecap="round"
                opacity="0.55"
                style={{ animation: "r6-line-in 0.3s ease-out" }}
              />
            ))}
          </svg>

          <div className="grid grid-cols-2 gap-4">
            {/* Column A */}
            <div className="flex flex-col gap-2">
              {colA.map((word) => (
                <div
                  key={word}
                  ref={(el) => { if (el) tileRefs.current.set(`a-${word}`, el); }}
                  onClick={() => handleClick(word, "a")}
                  className={tileClass(word, "a")}
                >
                  {word}
                </div>
              ))}
            </div>

            {/* Column B */}
            <div className="flex flex-col gap-2">
              {colB.map((word) => (
                <div
                  key={word}
                  ref={(el) => { if (el) tileRefs.current.set(`b-${word}`, el); }}
                  onClick={() => handleClick(word, "b")}
                  className={tileClass(word, "b")}
                >
                  {word}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Success cards */}
        {solved && (
          <>
            <div
              className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3"
              style={{ animation: "r6-fade-up .22s ease-out" }}
            >
              <div className="text-sm font-semibold text-emerald-800">{t.successTitle}</div>
              <div className="mt-1 text-sm leading-6 text-emerald-700">{t.successBody}</div>
            </div>

            <div
              className="mt-4 rounded-3xl border border-black/8 bg-z-off-white p-4 sm:p-5"
              style={{ animation: "r6-fade-up .28s ease-out" }}
            >
              <div className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-neutral-500">
                {t.aboutEyebrow}
              </div>
              <h3 className="text-lg font-semibold text-neutral-950">{t.aboutTitle}</h3>
              <div className="mt-2 text-sm leading-7 text-neutral-700">
                <p>{t.aboutBody}</p>
              </div>
            </div>

            <div
              className="mt-3 rounded-3xl border border-z-orange/20 bg-[linear-gradient(160deg,rgba(200,105,74,0.06),rgba(250,247,242,0.80))] p-4 sm:p-5"
              style={{ animation: "r6-fade-up .34s ease-out" }}
            >
              <div className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-z-orange/70">
                {t.storyEyebrow}
              </div>
              <h3 className="text-lg font-semibold text-neutral-950">{t.storyTitle}</h3>
              <div className="mt-2 space-y-3 text-sm leading-7 text-neutral-700">
                <p>{t.storyBody1}</p>
                <p>{t.storyBody2}</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
