"use client";

import React from "react";

type Locale = "en" | "ar";

export default function PuzzleW4({
  locale,
}: {
  locale: Locale;
  onSolved?: () => void;
}) {
  const isAr = locale === "ar";

  return (
    <div dir={isAr ? "rtl" : "ltr"} className="w-full">
      <div className="relative mx-auto mt-8 max-w-2xl px-1 sm:px-0">
        <div className="pointer-events-none absolute -top-6 left-[-10px] h-32 w-32 rounded-full bg-z-orange-soft blur-3xl opacity-40" />

        <section className="relative overflow-hidden rounded-3xl border border-black/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(250,247,242,0.94))] p-5 sm:p-6 shadow-[0_16px_50px_rgba(0,0,0,0.10)] ring-1 ring-black/8">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(255,255,255,0.45),rgba(255,255,255,0))]" />

          <div className="relative">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-z-orange bg-z-orange-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] z-orange">
              {isAr ? "الجولة ٤ · قريباً" : "Round 4 · Coming Soon"}
            </div>

            <h2 className="text-2xl font-semibold tracking-tight text-neutral-950">
              {isAr ? "الويبدة – المحطة ٤" : "Al Weibdeh – Stop 4"}
            </h2>

            <p className="mt-3 text-sm leading-7 text-neutral-600">
              {isAr
                ? "هذا اللغز قيد الإعداد. ترقبوا تجربة لا تُنسى في حي الويبدة."
                : "This puzzle is being crafted. Check back soon for an unforgettable experience through Al Weibdeh neighbourhood."}
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
