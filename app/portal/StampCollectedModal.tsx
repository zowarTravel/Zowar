"use client";

import React from "react";
import { RAINBOW_STAMPS, type StampId } from "./passport_data";

type Props = {
  stampId: StampId;
  locale?: "en" | "ar";
  onContinue: () => void;
};

export default function StampCollectedModal({
  stampId,
  locale = "en",
  onContinue,
}: Props) {
  const isAr = locale === "ar";
  const stamp = RAINBOW_STAMPS.find((s) => s.id === stampId);
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

              {/* Stamp image */}
              <div
                className="relative z-10 h-[128px] w-[128px] overflow-hidden rounded-2xl border border-amber-200/50 bg-white"
                style={{
                  boxShadow:
                    "0 10px 32px rgba(200,161,58,0.22), 0 2px 8px rgba(0,0,0,0.08)",
                  animation: "scm-stamp 600ms cubic-bezier(.22,1,.36,1) 140ms both",
                }}
              >
                <img
                  src={stamp.image}
                  alt={stamp.alt}
                  className="h-full w-full object-contain p-2.5"
                />
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
