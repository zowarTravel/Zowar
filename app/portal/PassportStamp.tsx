"use client";

import type { PassportStampMeta } from "./passport_data";

type Props = {
  stamp: PassportStampMeta;
  unlocked: boolean;
  locale?: "en" | "ar";
};

export default function PassportStamp({ stamp, unlocked, locale = "en" }: Props) {
  const isAr = locale === "ar";

  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-xl">
      {unlocked ? (
        <img
          src={stamp.image}
          alt={stamp.alt}
          className="h-full w-full object-contain p-1"
          draggable={false}
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed border-neutral-200 bg-neutral-100/50">
          <svg
            viewBox="0 0 20 20"
            className="h-4 w-4 text-neutral-300"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <rect x="3.5" y="9" width="13" height="9" rx="1.5" />
            <path d="M7 9V6.5a3 3 0 016 0V9" strokeLinecap="round" />
          </svg>
          <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-neutral-300">
            {isAr ? `محطة ${stamp.stop}` : `Stop ${stamp.stop}`}
          </span>
        </div>
      )}
    </div>
  );
}
