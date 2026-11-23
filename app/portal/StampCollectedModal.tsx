"use client";

import React from "react";
import { RAINBOW_STAMPS, SUNRISE_PIECES, pieceStampSrc, type StampId } from "./passport_data";

type Props = {
  stampId: StampId;
  locale?: "en" | "ar";
  onContinue: () => void;
  /** Flip the stamp to show its piece of the r7 sunrise picture (Full Experience only). */
  showBack?: boolean;
};

/* The piece side lands first, then the stamp turns over to the stop's own artwork and stays */
const FLIP_DELAY_MS = 1900;

export default function StampCollectedModal({
  stampId,
  locale = "en",
  onContinue,
  showBack = false,
}: Props) {
  const isAr = locale === "ar";
  const stamp = RAINBOW_STAMPS.find((s) => s.id === stampId);
  const hasBack = showBack && stamp?.fragment !== undefined;
  const [flipped, setFlipped] = React.useState(hasBack);

  React.useEffect(() => {
    if (!hasBack) return;
    const t = window.setTimeout(() => setFlipped(false), FLIP_DELAY_MS);
    return () => window.clearTimeout(t);
  }, [hasBack]);

  if (!stamp) return null;

  return (
    <>
      <style>{`
        @keyframes scm-backdrop {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes scm-card {
          from { opacity: 0; transform: scale(0.95) translateY(14px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes scm-stamp {
          0%   { opacity: 0; transform: scale(1.45) rotate(-8deg); filter: blur(5px); }
          38%  { filter: blur(0); }
          54%  { transform: scale(0.94) rotate(0.8deg); }
          71%  { transform: scale(1.04) rotate(0deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        @keyframes scm-ink {
          0%   { opacity: 0.5; transform: scale(0.55); }
          100% { opacity: 0; transform: scale(2.6); }
        }
        @keyframes scm-text {
          from { opacity: 0; transform: translateY(9px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .scm-flip { perspective: 700px; }
        .scm-flip-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          -webkit-transform-style: preserve-3d;
          transition: transform 650ms cubic-bezier(.22,1,.36,1);
        }
        .scm-flip-inner.is-flipped { transform: rotateY(180deg); }
        .scm-face {
          position: absolute;
          inset: 0;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .scm-face-back { transform: rotateY(180deg); }
        @media (prefers-reduced-motion: reduce) {
          .scm-flip-inner { transition: none; }
        }
      `}</style>

      {/* Backdrop — click to dismiss */}
      <div
        className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center"
        style={{
          background: "rgba(18,13,8,0.72)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          animation: "scm-backdrop 260ms ease both",
        }}
        onClick={onContinue}
      >
        {/* Card */}
        <div
          role="dialog"
          aria-modal="true"
          dir={isAr ? "rtl" : "ltr"}
          className="relative w-full max-w-xs overflow-hidden rounded-3xl border border-amber-200/50 sm:max-w-sm"
          style={{
            background:
              "linear-gradient(158deg, #FFFEF9 0%, #FEF8EC 52%, #FDF0D5 100%)",
            boxShadow:
              "0 44px 90px rgba(0,0,0,0.34), 0 0 0 1px rgba(200,161,58,0.20), inset 0 1px 0 rgba(255,255,255,0.75)",
            animation: "scm-card 360ms cubic-bezier(.22,1,.36,1) 90ms both",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Corner flourishes */}
          <div className="pointer-events-none absolute left-4 top-4 font-serif text-base leading-none text-amber-200/55">
            ✦
          </div>
          <div className="pointer-events-none absolute right-4 top-4 font-serif text-base leading-none text-amber-200/55">
            ✦
          </div>

          <div className="p-6">
            {/* Stamp area */}
            <div className="relative flex items-center justify-center py-3">
              {/* Ink rings */}
              <div
                className="absolute h-40 w-40 rounded-full border-[3px] border-amber-300/30"
                style={{ animation: "scm-ink 720ms ease-out 310ms both" }}
              />
              <div
                className="absolute h-28 w-28 rounded-full border-2 border-amber-400/22"
                style={{ animation: "scm-ink 720ms ease-out 390ms both" }}
              />

              {/* Stamp image — turns over to its sunrise piece when it has one */}
              <div
                className="scm-flip relative z-10 h-[128px] w-[128px]"
                style={{ animation: "scm-stamp 600ms cubic-bezier(.22,1,.36,1) 140ms both" }}
              >
                <button
                  type="button"
                  disabled={!hasBack}
                  onClick={() => setFlipped((f) => !f)}
                  className={["scm-flip-inner block", flipped ? "is-flipped" : "", hasBack ? "cursor-pointer" : "cursor-default"].join(" ")}
                  style={{ touchAction: "manipulation" }}
                  aria-label={hasBack ? (isAr ? "اقلب الطابع" : "Flip the stamp") : undefined}
                >
                  <div
                    className="scm-face overflow-hidden rounded-2xl border border-amber-200/50 bg-white"
                    style={{ boxShadow: "0 10px 32px rgba(200,161,58,0.22), 0 2px 8px rgba(0,0,0,0.08)" }}
                  >
                    <img
                      src={stamp.image}
                      alt={stamp.alt}
                      className="h-full w-full object-contain p-2.5"
                    />
                  </div>
                  {hasBack && (
                    <div
                      className="scm-face scm-face-back overflow-hidden rounded-2xl border border-amber-200/50 bg-[#F7E8D5]"
                      style={{ boxShadow: "0 10px 32px rgba(200,161,58,0.22), 0 2px 8px rgba(0,0,0,0.08)" }}
                    >
                      <img
                        src={pieceStampSrc(stamp.fragment!)}
                        alt={isAr ? "قطعة من صورة" : "A piece of a picture"}
                        className="h-full w-full object-contain p-1.5"
                        draggable={false}
                      />
                    </div>
                  )}
                </button>
              </div>
            </div>

            {/* Text */}
            <div
              className="mt-3 text-center"
              style={{ animation: "scm-text 360ms ease-out 540ms both" }}
            >
              <div className="text-[11px] font-bold uppercase tracking-[0.26em] text-amber-600">
                {isAr ? "طابع مجموع" : "Stamp Collected"}
              </div>
              <div className="mt-2 text-xl font-semibold tracking-tight text-amber-950">
                {isAr ? stamp.titleAr : stamp.title}
              </div>
              <div className="mt-0.5 text-[13px] text-amber-700/80">
                {isAr ? stamp.subtitleAr : stamp.subtitle}
              </div>
              {hasBack && (
                <div
                  className="mt-3 text-[12px] leading-5 text-amber-900/75"
                  style={{ animation: "scm-text 360ms ease-out 600ms both" }}
                >
                  {isAr
                    ? "على ظهر هذا الطابع قطعة من صورة — واحدة من ست قطع. احتفظ بها، ستحتاجها في النهاية."
                    : `The back of this stamp holds one of ${SUNRISE_PIECES} pieces of a picture. Keep it — you'll need it at the end.`}
                </div>
              )}
              <div className="mt-3 text-[11px] text-amber-800/50">
                {isAr ? "تم تحديث جواز سفرك." : "Your passport has been updated."}
              </div>
            </div>

            {/* Divider */}
            <div className="my-5 h-px bg-gradient-to-r from-transparent via-amber-300/50 to-transparent" />

            {/* Continue */}
            <button
              type="button"
              onClick={onContinue}
              className="group relative w-full overflow-hidden rounded-2xl bg-z-orange px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-95 active:scale-[0.99]"
              style={{ animation: "scm-text 360ms ease-out 650ms both" }}
            >
              <span className="relative z-10">
                {isAr ? "المتابعة ←" : "Continue →"}
              </span>
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
