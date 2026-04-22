"use client";

import React from "react";
import type { Locale } from "./riddlecontent";
import { setRoundSolved, serverSetRoundSolved } from "./progress";

type Tile = { id: string; text: string };

function shuffle<T>(arr: readonly T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function normalizeAnswer(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/[^\p{L}\p{N}\s]/gu, "");
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
    "select-none rounded-full px-4 py-2.5 text-sm font-semibold transition active:scale-[0.98] " +
    "border shadow-sm";

  const toneClass =
    tone === "solved"
      ? "border-green-200 bg-green-50 text-green-800"
      : tone === "good"
      ? "border-green-200 bg-green-50 text-neutral-900"
      : tone === "bad"
      ? "border-red-200 bg-red-50 text-neutral-900"
      : "border-black/10 bg-white text-neutral-900 hover:bg-neutral-50";

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

  const tiles = React.useMemo<Tile[]>(() => {
    const base: Tile[] = t.targetTokens.map((token, idx) => ({
      id: `${safeLocale}-${idx}-${token}`,
      text: token,
    }));
    return shuffle(base);
  }, [safeLocale, t.targetTokens]);

  const [pickedIds, setPickedIds] = React.useState<string[]>([]);
  const [checked, setChecked] = React.useState(false);
  const [status, setStatus] = React.useState<"idle" | "wrong" | "correct">("idle");
  const [showHint, setShowHint] = React.useState(false);
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
      serverSetRoundSolved("r3"); // fire-and-forget server sync
      onSolved?.();
    }
  }

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
      ? "ring-2 ring-green-300 shadow-[0_0_40px_rgba(34,197,94,0.12)]"
      : status === "wrong"
      ? "ring-2 ring-red-200 shadow-[0_0_0_4px_rgba(239,68,68,0.06)]"
      : "ring-1 ring-black/8";

  const shake = status === "wrong" ? "animate-[zowarShake_260ms_ease-in-out_1]" : "";

  return (
    <div dir={isAr ? "rtl" : "ltr"} className="w-full">
      <div className="relative mx-auto max-w-3xl px-1 sm:px-0">
        <div className="pointer-events-none absolute -top-6 left-[-10px] h-32 w-32 rounded-full bg-z-orange-soft blur-3xl opacity-40" />
        <div className="pointer-events-none absolute -bottom-8 right-[-10px] h-36 w-36 rounded-full bg-white blur-3xl opacity-30" />

        <div
          className={[
            "relative overflow-hidden rounded-3xl border border-black/10",
            "bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(250,247,242,0.94))]",
            "p-5 sm:p-6",
            "shadow-[0_16px_50px_rgba(0,0,0,0.10)]",
            cardGlow,
            shake,
          ].join(" ")}
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(255,255,255,0.45),rgba(255,255,255,0))]" />

          <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-z-orange bg-z-orange-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] z-orange">
                {isAr ? "الجولة ٣ · ابنِ الجملة" : "Round 3 · Build the Phrase"}
              </div>
              <h2 className="text-2xl font-semibold tracking-tight text-neutral-950">{t.title}</h2>
              <p className="mt-1 text-sm text-neutral-700">{t.subtitle}</p>
              <p className="mt-2 text-xs text-neutral-500">{t.ui.dragHelp}</p>
            </div>

            <div className="flex flex-wrap gap-2 sm:justify-end">
              <button
                onClick={() => setShowHint((s) => !s)}
                className="rounded-2xl border border-black/10 bg-white px-4 py-2 text-sm font-medium text-neutral-900 shadow-sm transition hover:bg-neutral-50"
              >
                {showHint ? t.ui.hideHint : t.ui.showHint}
              </button>

              <button
                onClick={resetAll}
                className="rounded-2xl border border-black/10 bg-white px-4 py-2 text-sm font-medium text-neutral-900 shadow-sm transition hover:bg-neutral-50"
              >
                {t.ui.reset}
              </button>

              <button
                onClick={check}
                disabled={status === "correct"}
                className="rounded-2xl bg-z-orange px-5 py-2 text-sm font-semibold text-white transition hover:opacity-95 disabled:opacity-40"
              >
                {t.ui.check}
              </button>
            </div>
          </div>

          {showHint && (
            <div className="relative mt-4 rounded-2xl border border-black/8 bg-[#fffaf4] p-4 text-sm text-neutral-800">
              {t.hint}
            </div>
          )}

          <div className="mt-6">
            <div className="mb-2 text-sm font-semibold text-neutral-950">{t.ui.solveLine}</div>

            <div
              onDrop={onDropToSolve}
              onDragOver={onDragOverSolve}
              onDragLeave={onDragLeaveSolve}
              className={[
                "min-h-[84px] rounded-2xl border p-3 sm:p-4 transition",
                dragOverSolve
                  ? "border-z-orange bg-orange-50"
                  : "border-black/10 bg-white/85",
              ].join(" ")}
            >
              {pickedTiles.length === 0 ? (
                <span className="text-sm text-neutral-500">{t.ui.emptySolve}</span>
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

            <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <button
                onClick={removeLast}
                disabled={pickedTiles.length === 0 || status === "correct"}
                className="w-full rounded-2xl border border-black/10 bg-white px-4 py-2 text-sm font-medium text-neutral-900 shadow-sm transition hover:bg-neutral-50 disabled:opacity-40 sm:w-auto"
              >
                {t.ui.removeLast}
              </button>

              <div className="text-sm sm:max-w-md">
                {status === "correct" ? (
                  <div className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-neutral-900">
                    <div className="font-semibold text-green-800">{t.ui.solved}</div>
                    <div className="mt-1 text-sm text-neutral-700">{t.ui.nextStep}</div>
                  </div>
                ) : status === "wrong" ? (
                  <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-neutral-900">
                    {t.ui.tryAgain}
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <div className="mt-7">
            <div className="mb-2 text-sm font-semibold text-neutral-950">{t.ui.bubbleBank}</div>

            <div className="flex flex-wrap gap-2.5">
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
                filter: brightness(1.04);
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