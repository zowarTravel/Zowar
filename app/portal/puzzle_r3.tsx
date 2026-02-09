"use client";

import React from "react";
import type { Locale } from "./riddlecontent";
import { setRoundSolved } from "./progress";

type Tile = { id: string; text: string };

function shuffle<T>(arr: readonly T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Simple normalize (no external file needed) */
function normalizeAnswer(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/[^\p{L}\p{N}\s]/gu, ""); // letters/numbers/spaces (works for Arabic too)
}

const COPY = {
  en: {
    title: "Round 3: Build the Phrase",
    subtitle: "Drag the word bubbles into the solve line (or tap to add).",
    hint: "Think: what’s your next stop after Trinitae (and what you’ll eat).",
    targetTokens: ["NEXT", "STOP", "IS", "JABRI", "FOR", "KNAFEH"],
    ui: {
      solveLine: "Solve line",
      bubbleBank: "Word bank",
      check: "Check",
      reset: "Reset",
      showHint: "Show hint",
      hideHint: "Hide hint",
      removeLast: "Remove last",
      solved: "Solved!",
      tryAgain: "Not quite — try again.",
      nextStep: "Head to Jabri for knafeh. (Open Maps and search “Jabri”.)",
      dragHelp: "Tip: drag bubbles into the solve line.",
      emptySolve: "Drop bubbles here…",
    },
  },
  ar: {
    title: "الجولة ٣: رتّب العبارة",
    subtitle: "اسحب فقاعات الكلمات إلى سطر الحل (أو اضغط للإضافة).",
    hint: "فكّر: ما هي محطتك التالية بعد ترينيتي؟ وماذا ستأكل؟",
    targetTokens: ["محطتك", "التالية", "جبري", "للكنافة"],
    ui: {
      solveLine: "سطر الحل",
      bubbleBank: "بنك الكلمات",
      check: "تحقق",
      reset: "إعادة",
      showHint: "إظهار التلميح",
      hideHint: "إخفاء التلميح",
      removeLast: "حذف آخر كلمة",
      solved: "تم الحل!",
      tryAgain: "ليست صحيحة — جرّب مرة أخرى.",
      nextStep: "اذهب إلى جبري للكنافة. (افتح الخرائط وابحث عن “Jabri”.)",
      dragHelp: "نصيحة: اسحب الفقاعات إلى سطر الحل.",
      emptySolve: "اسحب الفقاعات هنا…",
    },
  },
} as const;

function Bubble({
  text,
  tone = "neutral",
  draggable,
  onClick,
  onDragStart,
  onDragEnd,
}: {
  text: string;
  tone?: "neutral" | "good" | "bad" | "solved";
  draggable?: boolean;
  onClick?: () => void;
  onDragStart?: (e: React.DragEvent) => void;
  onDragEnd?: (e: React.DragEvent) => void;
}) {
  const base =
    "select-none rounded-full px-3 py-2 text-sm font-medium transition active:scale-[0.98] " +
    "border backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.12)]";

  const toneClass =
    tone === "solved"
      ? "border-green-500/35 bg-green-500/15 text-green-50"
      : tone === "good"
      ? "border-green-500/30 bg-green-500/10 text-neutral-900"
      : tone === "bad"
      ? "border-red-500/30 bg-red-500/10 text-neutral-900"
      : "border-white/20 bg-white/10 text-neutral-900";

  return (
    <button
      type="button"
      draggable={draggable}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onClick={onClick}
      className={[base, toneClass, draggable ? "cursor-grab" : "cursor-pointer"].join(" ")}
    >
      {text}
    </button>
  );
}

export function PuzzleR3({
  locale,
  onSolved,
}: {
  locale: Locale;
  onSolved?: () => void;
}) {
  const safeLocale: Locale = locale === "ar" ? "ar" : "en";
  const isAr = safeLocale === "ar";
  const t = COPY[safeLocale];

  const solvedRef = React.useRef(false);

  const targetNorm = React.useMemo(
    () => t.targetTokens.map((x) => normalizeAnswer(x)),
    [t.targetTokens]
  );

  // Shuffle word bank once per locale mount
  const tiles = React.useMemo<Tile[]>(() => {
    const base: Tile[] = t.targetTokens.map((token, idx) => ({
      id: `${safeLocale}-${idx}-${token}`,
      text: token,
    }));
    return shuffle(base);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [safeLocale]);

  const [pickedIds, setPickedIds] = React.useState<string[]>([]);
  const [checked, setChecked] = React.useState(false);
  const [status, setStatus] = React.useState<"idle" | "wrong" | "correct">("idle");
  const [showHint, setShowHint] = React.useState(false);

  // For drag + drop highlighting
  const [dragOverSolve, setDragOverSolve] = React.useState(false);

  const pickedTiles = React.useMemo<Tile[]>(
    () =>
      pickedIds
        .map((id) => tiles.find((tile) => tile.id === id))
        .filter((x): x is Tile => Boolean(x)),
    [pickedIds, tiles]
  );

  const remainingTiles = React.useMemo<Tile[]>(() => {
    const picked = new Set(pickedIds);
    return tiles.filter((x) => !picked.has(x.id));
  }, [pickedIds, tiles]);

  const builtNorm = React.useMemo(
    () => pickedTiles.map((x) => normalizeAnswer(x.text)),
    [pickedTiles]
  );

  function resetAll() {
    setPickedIds([]);
    setChecked(false);
    setStatus("idle");
  }

  function removeLast() {
    setPickedIds((prev) => prev.slice(0, -1));
    setChecked(false);
    setStatus("idle");
  }

  function pick(id: string) {
    setPickedIds((prev) => {
      if (prev.includes(id)) return prev;
      return [...prev, id];
    });
    setChecked(false);
    setStatus("idle");
  }

  function unpick(id: string) {
    setPickedIds((prev) => prev.filter((x) => x !== id));
    setChecked(false);
    setStatus("idle");
  }

  function check() {
    setChecked(true);

    if (builtNorm.length !== targetNorm.length) {
      setStatus("wrong");
      return;
    }
    for (let i = 0; i < targetNorm.length; i++) {
      if (builtNorm[i] !== targetNorm[i]) {
        setStatus("wrong");
        return;
      }
    }

    setStatus("correct");

    if (!solvedRef.current) {
      solvedRef.current = true;
      setRoundSolved("r3");
      onSolved?.();
    }
  }

  // ---- Drag & Drop handlers ----
  function onDragStartTile(id: string) {
    return (e: React.DragEvent) => {
      e.dataTransfer.setData("text/plain", id);
      e.dataTransfer.effectAllowed = "move";
    };
  }

  function onDropToSolve(e: React.DragEvent) {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");
    if (!id) return;
    // only add if it is in the bank
    if (remainingTiles.some((x) => x.id === id)) pick(id);
    setDragOverSolve(false);
  }

  function onDragOverSolve(e: React.DragEvent) {
    e.preventDefault();
    setDragOverSolve(true);
  }

  function onDragLeaveSolve() {
    setDragOverSolve(false);
  }

  const cardGlow =
    status === "correct"
      ? "ring-2 ring-green-500/40 shadow-[0_0_60px_rgba(34,197,94,0.20)]"
      : status === "wrong"
      ? "ring-2 ring-red-500/25"
      : "ring-1 ring-white/10";

  const shake = status === "wrong" ? "animate-[zowarShake_260ms_ease-in-out_1]" : "";

  return (
    <div dir={isAr ? "rtl" : "ltr"} className="w-full">
      {/* Liquid glass background blobs (like Puzzle 2 vibe) */}
      <div className="relative mx-auto max-w-3xl">
        <div className="pointer-events-none absolute -top-10 left-[-30px] h-48 w-48 rounded-full bg-amber-200/35 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-10 right-[-30px] h-56 w-56 rounded-full bg-sky-200/35 blur-3xl" />

        <div
          className={[
            "relative overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-5 backdrop-blur-xl",
            "shadow-[0_20px_70px_rgba(0,0,0,0.12)]",
            cardGlow,
            shake,
          ].join(" ")}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-neutral-900">{t.title}</h2>
              <p className="mt-1 text-sm text-neutral-700">{t.subtitle}</p>
              <p className="mt-2 text-xs text-neutral-600">{t.ui.dragHelp}</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setShowHint((s) => !s)}
                className="rounded-xl border border-white/30 bg-white/10 px-3 py-2 text-sm text-neutral-900 hover:bg-white/15"
              >
                {showHint ? t.ui.hideHint : t.ui.showHint}
              </button>

              <button
                onClick={resetAll}
                className="rounded-xl border border-white/30 bg-white/10 px-3 py-2 text-sm text-neutral-900 hover:bg-white/15"
              >
                {t.ui.reset}
              </button>

              <button
                onClick={check}
                disabled={status === "correct"}
                className="rounded-xl bg-neutral-900 px-4 py-2 text-sm font-semibold text-white hover:opacity-95 disabled:opacity-40"
              >
                {t.ui.check}
              </button>
            </div>
          </div>

          {showHint && (
            <div className="mt-4 rounded-2xl border border-white/20 bg-white/10 p-3 text-sm text-neutral-800">
              {t.hint}
            </div>
          )}

          {/* Solve line */}
          <div className="mt-6">
            <div className="mb-2 text-sm font-semibold text-neutral-900">
              {t.ui.solveLine}
            </div>

            <div
              onDrop={onDropToSolve}
              onDragOver={onDragOverSolve}
              onDragLeave={onDragLeaveSolve}
              className={[
                "min-h-[74px] rounded-2xl border p-3 transition",
                dragOverSolve ? "border-neutral-900/50 bg-white/15" : "border-white/20 bg-white/10",
              ].join(" ")}
            >
              {pickedTiles.length === 0 ? (
                <span className="text-sm text-neutral-600">{t.ui.emptySolve}</span>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {pickedTiles.map((tile, idx) => {
                    const correctAtPos = checked && builtNorm[idx] === targetNorm[idx];
                    const wrongAtPos =
                      checked &&
                      idx < targetNorm.length &&
                      builtNorm[idx] !== targetNorm[idx];

                    const tone: "neutral" | "good" | "bad" | "solved" =
                      status === "correct"
                        ? "solved"
                        : correctAtPos
                        ? "good"
                        : wrongAtPos
                        ? "bad"
                        : "neutral";

                    const style: React.CSSProperties =
                      status === "correct" ? { animationDelay: `${idx * 90}ms` } : {};

                    return (
                      <span
                        key={`${tile.id}-picked`}
                        style={style}
                        className={status === "correct" ? "animate-[zowarPop_520ms_ease-out_1]" : ""}
                      >
                        <Bubble text={tile.text} tone={tone} onClick={() => unpick(tile.id)} />
                      </span>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              <button
                onClick={removeLast}
                disabled={pickedTiles.length === 0 || status === "correct"}
                className="rounded-xl border border-white/30 bg-white/10 px-3 py-2 text-sm text-neutral-900 hover:bg-white/15 disabled:opacity-40"
              >
                {t.ui.removeLast}
              </button>

              {/* Status text */}
              <div className="ml-auto text-sm">
                {status === "correct" ? (
                  <div className="rounded-2xl border border-green-500/25 bg-green-500/10 px-3 py-2 text-neutral-900">
                    <div className="font-semibold">{t.ui.solved}</div>
                    <div className="mt-1 text-sm text-neutral-800">{t.ui.nextStep}</div>
                  </div>
                ) : status === "wrong" ? (
                  <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-3 py-2 text-neutral-900">
                    {t.ui.tryAgain}
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          {/* Word bank */}
          <div className="mt-7">
            <div className="mb-2 text-sm font-semibold text-neutral-900">
              {t.ui.bubbleBank}
            </div>

            <div className="flex flex-wrap gap-2">
              {remainingTiles.map((tile) => (
                <Bubble
                  key={tile.id}
                  text={tile.text}
                  draggable={status !== "correct"}
                  onDragStart={onDragStartTile(tile.id)}
                  onClick={() => pick(tile.id)}
                />
              ))}
            </div>
          </div>

          {/* inline keyframes */}
          <style jsx>{`
            @keyframes zowarShake {
              0% {
                transform: translateX(0);
              }
              25% {
                transform: translateX(-6px);
              }
              50% {
                transform: translateX(6px);
              }
              75% {
                transform: translateX(-4px);
              }
              100% {
                transform: translateX(0);
              }
            }
            @keyframes zowarPop {
              0% {
                transform: translateY(2px) scale(0.98);
                filter: brightness(1);
              }
              45% {
                transform: translateY(-1px) scale(1.02);
                filter: brightness(1.08);
              }
              100% {
                transform: translateY(0) scale(1);
                filter: brightness(1);
              }
            }
          `}</style>
        </div>
      </div>
    </div>
  );
}

export default PuzzleR3;
