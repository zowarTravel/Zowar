"use client";

import React from "react";
import { RAINBOW_STAMPS, type StampId, type PassportStampMeta } from "./passport_data";
import PassportStamp from "./PassportStamp";

type Props = {
  collectedIds: StampId[];
  locale?: "en" | "ar";
};

/* Subtle fixed rotations — consistent across renders, authentic passport feel */
const STAMP_ROTATIONS = [-1.8, 1.2, -0.9, 2.0, -1.4, 1.0] as const;

export default function PassportPanel({ collectedIds, locale = "en" }: Props) {
  const isAr = locale === "ar";
  const count = collectedIds.length;
  const [zoomed, setZoomed] = React.useState<PassportStampMeta | null>(null);

  /* Close zoom on Escape */
  React.useEffect(() => {
    if (!zoomed) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setZoomed(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [zoomed]);

  return (
    <>
      <style>{`
        @keyframes pp-backdrop {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes pp-zoom-img {
          from { opacity: 0; transform: scale(0.86); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes pp-zoom-text {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* ── Zoom overlay ── */}
      {zoomed && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-5 p-6"
          style={{
            background: "rgba(10,6,2,0.90)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            animation: "pp-backdrop 220ms ease both",
          }}
          onClick={() => setZoomed(null)}
        >
          {/* Large stamp image */}
          <img
            src={zoomed.image}
            alt={zoomed.alt}
            className="max-h-[72vh] max-w-full rounded-3xl object-contain"
            style={{
              boxShadow: "0 48px 96px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.06)",
              animation: "pp-zoom-img 340ms cubic-bezier(.22,1,.36,1) both",
            }}
            onClick={(e) => e.stopPropagation()}
            draggable={false}
          />

          {/* Caption */}
          <div
            className="text-center"
            style={{ animation: "pp-zoom-text 300ms ease-out 120ms both" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/40">
              {isAr ? `محطة ${zoomed.stop}` : `Stop ${zoomed.stop}`}
            </div>
            <div className="mt-1 text-base font-semibold text-white/80">
              {isAr ? zoomed.titleAr : zoomed.title}
            </div>
          </div>

          {/* Close */}
          <button
            type="button"
            onClick={() => setZoomed(null)}
            className="rounded-full border border-white/15 bg-white/8 px-6 py-2.5 text-sm font-medium text-white/60 backdrop-blur transition hover:bg-white/15 hover:text-white/90"
            style={{ animation: "pp-zoom-text 300ms ease-out 180ms both" }}
          >
            {isAr ? "إغلاق" : "Close"}
          </button>
        </div>
      )}

      {/* ── Passport page ── */}
      <div
        dir={isAr ? "rtl" : "ltr"}
        className="overflow-hidden rounded-3xl border border-amber-200/55"
        style={{
          background: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 28px,
              rgba(200,161,58,0.035) 28px,
              rgba(200,161,58,0.035) 29px
            ),
            linear-gradient(162deg, #FFFEF9 0%, #FEF6E3 100%)
          `,
          boxShadow: "0 4px 28px rgba(200,161,58,0.09), 0 1px 0 rgba(200,161,58,0.12) inset",
        }}
      >
        {/* Passport header */}
        <div className="flex items-center justify-between border-b border-amber-200/45 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100">
              <svg
                viewBox="0 0 20 20"
                className="h-4 w-4 text-amber-700"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
              >
                <rect x="3.5" y="2.5" width="13" height="15" rx="1.5" />
                <path d="M6.5 6.5h7M6.5 9.5h4" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-amber-700/65">
                {isAr ? "جواز السفر" : "Passport"}
              </div>
              <div className="text-[11px] text-amber-900/50">
                {isAr ? "شارع الرينبو · عمّان" : "Rainbow Street · Amman"}
              </div>
            </div>
          </div>
          <div className="rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-semibold text-amber-700">
            {count} / 6
          </div>
        </div>

        {/* Stamp grid */}
        <div className="px-5 pb-5 pt-4">
          <p className="mb-4 text-center text-[11px] text-amber-800/50">
            {isAr
              ? "اضغط على أي طابع لفحصه عن قرب"
              : "Tap any stamp to examine it closely"}
          </p>

          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3">
            {RAINBOW_STAMPS.map((stamp, i) => {
              const unlocked = collectedIds.includes(stamp.id);
              const rotation = STAMP_ROTATIONS[i] ?? 0;

              return (
                <button
                  key={stamp.id}
                  type="button"
                  disabled={!unlocked}
                  onClick={() => unlocked && setZoomed(stamp)}
                  className={[
                    "group flex flex-col items-center rounded-2xl border p-2 transition-all duration-200",
                    unlocked
                      ? "cursor-zoom-in border-amber-200/70 bg-white/55 hover:scale-[1.04] hover:border-amber-300 hover:shadow-[0_8px_28px_rgba(200,161,58,0.20)]"
                      : "cursor-default border-neutral-200 bg-neutral-50/55",
                  ].join(" ")}
                  style={{
                    transform: unlocked ? `rotate(${rotation}deg)` : undefined,
                  }}
                >
                  <PassportStamp stamp={stamp} unlocked={unlocked} locale={locale} />

                  {/* Stop label */}
                  <div className="mt-1.5 w-full truncate text-center">
                    {unlocked ? (
                      <span className="text-[10px] font-medium text-amber-900/65">
                        {isAr ? stamp.titleAr : stamp.title}
                      </span>
                    ) : (
                      <span className="text-[9px] font-medium text-neutral-300">
                        {isAr ? "مقفل" : "Locked"}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-amber-200/35 px-5 py-3 text-center">
          <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-amber-700/40">
            {isAr ? "مقتنيات زوّار الرسمية" : "Official Zowar Collectible"}
          </span>
        </div>
      </div>
    </>
  );
}
