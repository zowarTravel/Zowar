"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type Locale = "en" | "ar" | "es";

interface LangDropdownProps {
  locale: Locale;
  /** Base path for URL-based navigation (e.g. "/about"). Navigates to {basePath}?lang={l} */
  basePath: string;
  /** Whether the page is RTL — positions the dropdown on the correct side */
  isRtl?: boolean;
  /** Extra class names for the trigger button */
  buttonClassName?: string;
}

export default function LangDropdown({
  locale,
  basePath,
  isRtl,
  buttonClassName = "rounded-xl border border-black/10 bg-white px-3 py-2 text-sm font-semibold hover:bg-black/[0.03]",
}: LangDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (!open) return;
      if (e.target instanceof Node && !ref.current?.contains(e.target)) setOpen(false);
    }
    window.addEventListener("mousedown", onDown);
    return () => window.removeEventListener("mousedown", onDown);
  }, [open]);

  const label = locale === "ar" ? "العربية" : locale === "es" ? "Español" : "English";

  function select(l: Locale) {
    router.push(`${basePath}?lang=${l}`);
    setOpen(false);
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((s) => !s)}
        className={buttonClassName}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Switch language"
      >
        <span className="inline-flex items-center gap-1">
          {label}
          <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden="true" className="opacity-60">
            <path fill="currentColor" d="M7 10l5 5 5-5H7Z" />
          </svg>
        </span>
      </button>

      {open && (
        <div
          role="listbox"
          className={[
            "absolute z-50 mt-2 w-36 overflow-hidden rounded-2xl border border-black/10 bg-white/90 backdrop-blur-md shadow-xl text-neutral-900",
            isRtl ? "left-0" : "right-0",
          ].join(" ")}
        >
          {(["en", "ar", "es"] as const).map((l) => (
            <button
              key={l}
              role="option"
              aria-selected={locale === l}
              type="button"
              onClick={() => select(l)}
              className={[
                "w-full px-4 py-3 text-left text-sm transition hover:bg-black/[0.03]",
                locale === l ? "font-semibold text-[#ff8936]" : "",
              ].join(" ")}
            >
              {l === "en" ? "English" : l === "ar" ? "العربية" : "Español"}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
