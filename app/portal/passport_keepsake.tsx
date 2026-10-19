"use client";

// app/portal/passport_keepsake.tsx
// Shared finale pieces for both routes: holder name, visit date,
// "Save my passport" story image, and the next-adventure card.

import React from "react";
import type { Locale } from "./riddlecontent";
import type { PassportStampMeta } from "./passport_data";

const HOLDER_KEY = "zowar_passport_holder_v1";

function safeGet(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSet(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    // private mode / storage blocked — keepsake still works for this visit
  }
}

/* ------------------------------------------------------------------ */
/* Holder name + visit date                                           */
/* ------------------------------------------------------------------ */

export function usePassportHolder(): [string, (name: string) => void] {
  const [name, setName] = React.useState("");
  React.useEffect(() => {
    setName(safeGet(HOLDER_KEY) ?? "");
  }, []);
  const save = React.useCallback((next: string) => {
    const clean = next.trim().slice(0, 40);
    setName(clean);
    safeSet(HOLDER_KEY, clean);
  }, []);
  return [name, save];
}

/** Date the route was first completed on this device (recorded once `completed` is true). */
export function useCompletionDate(routeKey: string, locale: Locale, completed = true): string {
  const [label, setLabel] = React.useState("");
  React.useEffect(() => {
    if (!completed) return;
    const key = `zowar_completed_${routeKey}_v1`;
    let iso = safeGet(key);
    if (!iso) {
      iso = new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Amman" });
      safeSet(key, iso);
    }
    setLabel(
      new Date(`${iso}T12:00:00Z`).toLocaleDateString(locale === "ar" ? "ar-JO" : "en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "UTC",
      })
    );
  }, [routeKey, locale, completed]);
  return label;
}

export function HolderNameField({
  locale,
  name,
  onSave,
  tone = "amber",
}: {
  locale: Locale;
  name: string;
  onSave: (name: string) => void;
  tone?: "amber" | "slate";
}) {
  const isAr = locale === "ar";
  const [editing, setEditing] = React.useState(false);
  const [draft, setDraft] = React.useState("");

  const valueClass = tone === "amber" ? "text-amber-950" : "text-slate-800";

  if (name && !editing) {
    return (
      <button
        type="button"
        onClick={() => { setDraft(name); setEditing(true); }}
        className={`text-start text-lg font-semibold tracking-tight ${valueClass} underline decoration-dotted decoration-1 underline-offset-4 hover:opacity-80`}
        aria-label={isAr ? "تعديل الاسم" : "Edit name"}
      >
        {name}
      </button>
    );
  }

  return (
    <form
      className="flex items-center gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        if (!draft.trim()) return;
        onSave(draft);
        setEditing(false);
      }}
    >
      <input
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        placeholder={isAr ? "اكتب اسمك" : "Add your name"}
        maxLength={40}
        className="min-w-0 flex-1 rounded-xl border border-amber-300/70 bg-white/80 px-3 py-2 text-sm text-neutral-900 outline-none placeholder:text-neutral-400 focus:border-z-orange focus:ring-4 focus:ring-[rgba(200,105,74,0.12)]"
      />
      <button
        type="submit"
        disabled={!draft.trim()}
        className="shrink-0 rounded-xl bg-z-orange px-3 py-2 text-xs font-semibold text-white transition hover:opacity-95 disabled:opacity-40"
      >
        {isAr ? "حفظ" : "Save"}
      </button>
    </form>
  );
}

/* ------------------------------------------------------------------ */
/* Small touches                                                      */
/* ------------------------------------------------------------------ */

/** Short haptic tap where supported (Android); silently ignored elsewhere. */
export function stampTap(): void {
  try {
    navigator.vibrate?.(35);
  } catch {
    // unsupported
  }
}

/* ------------------------------------------------------------------ */
/* "Save my passport" — story-sized image                             */
/* ------------------------------------------------------------------ */

export type PassportImageOptions = {
  locale: Locale;
  title: string;
  holder: string;
  dateLabel: string;
  stamps: ReadonlyArray<PassportStampMeta>;
  sealText: string;
};

function loadImage(src: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = encodeURI(src);
  });
}

const ROTATIONS = [-4, 3, -2, 4, -3, 2, -1];

async function drawPassport(o: PassportImageOptions): Promise<HTMLCanvasElement> {
  const W = 1080;
  const H = 1920;
  const isAr = o.locale === "ar";
  const serif = "Georgia, 'Times New Roman', serif";
  const sans = isAr ? "Tahoma, Arial, sans-serif" : "'Helvetica Neue', Arial, sans-serif";

  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;
  ctx.direction = isAr ? "rtl" : "ltr";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Paper
  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, "#FFFDF7");
  bg.addColorStop(1, "#FBEFD6");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = "rgba(200,161,58,0.07)";
  ctx.lineWidth = 2;
  for (let y = 0; y < H; y += 38) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(W, y);
    ctx.stroke();
  }

  // Double frame
  ctx.strokeStyle = "rgba(160,118,40,0.45)";
  ctx.lineWidth = 4;
  ctx.strokeRect(48, 48, W - 96, H - 96);
  ctx.lineWidth = 1.5;
  ctx.strokeRect(66, 66, W - 132, H - 132);

  // Header
  ctx.fillStyle = "#8A5A14";
  ctx.font = `700 46px ${sans}`;
  ctx.fillText(isAr ? "جواز سفر زوّار" : "Z O W A R   P A S S P O R T", W / 2, 180);
  ctx.fillStyle = "#3B2A12";
  ctx.font = `600 78px ${isAr ? sans : serif}`;
  ctx.fillText(o.title, W / 2, 300);
  ctx.fillStyle = "#A07A3A";
  ctx.font = `500 32px ${sans}`;
  ctx.fillText(isAr ? "عمّان · الأردن" : "Amman · Jordan", W / 2, 375);

  // Holder + date
  ctx.strokeStyle = "rgba(160,118,40,0.30)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(140, 450);
  ctx.lineTo(W - 140, 450);
  ctx.stroke();

  const cols = isAr ? [W - 300, 300] : [300, W - 300];
  ctx.fillStyle = "#A07A3A";
  ctx.font = `700 24px ${sans}`;
  ctx.fillText(isAr ? "حامل الجواز" : "H O L D E R", cols[0], 510);
  ctx.fillText(isAr ? "تاريخ الزيارة" : "V I S I T E D", cols[1], 510);
  ctx.fillStyle = "#3B2A12";
  ctx.font = `600 44px ${isAr ? sans : serif}`;
  ctx.fillText(o.holder || (isAr ? "مستكشف زوّار" : "Zowar Explorer"), cols[0], 570);
  ctx.fillText(o.dateLabel, cols[1], 570);

  ctx.beginPath();
  ctx.moveTo(140, 640);
  ctx.lineTo(W - 140, 640);
  ctx.stroke();

  // Stamps — multiply blends white image backgrounds into the paper
  const imgs = await Promise.all(o.stamps.map((s) => loadImage(s.image)));
  const n = o.stamps.length;
  const size = n <= 4 ? 400 : 330;
  const gap = n <= 4 ? 60 : 50;
  const rows = Math.ceil(n / 2);
  const gridTop = n <= 4 ? 720 : 690;

  ctx.save();
  ctx.globalCompositeOperation = "multiply";
  o.stamps.forEach((stamp, i) => {
    const img = imgs[i];
    if (!img) return;
    const row = Math.floor(i / 2);
    const inRow = row === rows - 1 && n % 2 === 1 ? 1 : 2;
    const col = inRow === 1 ? 0.5 : i % 2;
    const cx = W / 2 + (col - 0.5) * (size + gap);
    const cy = gridTop + size / 2 + row * (size + gap);
    const scale = stamp.scale ?? 1;
    const s = size * Math.min(scale, 1.25);
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate((ROTATIONS[i % ROTATIONS.length] * Math.PI) / 180);
    const ratio = Math.min(s / img.width, s / img.height);
    ctx.drawImage(img, (-img.width * ratio) / 2, (-img.height * ratio) / 2, img.width * ratio, img.height * ratio);
    ctx.restore();
  });
  ctx.restore();

  // Completion seal
  ctx.save();
  ctx.translate(W - 250, H - 380);
  ctx.rotate((-12 * Math.PI) / 180);
  ctx.strokeStyle = "rgba(16,128,86,0.85)";
  ctx.fillStyle = "rgba(236,253,245,0.85)";
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.arc(0, 0, 150, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(0, 0, 126, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = "rgba(16,110,74,0.95)";
  ctx.font = `700 26px ${sans}`;
  ctx.fillText(isAr ? "مكتمل" : "C O M P L E T E", 0, -40);
  ctx.font = `700 ${o.sealText.length > 10 ? 34 : 44}px ${isAr ? sans : serif}`;
  ctx.fillText(o.sealText, 0, 18);
  ctx.font = `600 22px ${sans}`;
  ctx.fillText("ZOWAR", 0, 70);
  ctx.restore();

  // Footer
  ctx.fillStyle = "#8A5A14";
  ctx.font = `700 40px ${sans}`;
  ctx.fillText("zowar.net", W / 2, H - 170);
  ctx.fillStyle = "#A07A3A";
  ctx.font = `500 26px ${sans}`;
  ctx.fillText(
    isAr ? "جولات طعام وألغاز ذاتية الإرشاد في عمّان" : "Self-guided food & puzzle walks in Amman",
    W / 2,
    H - 120
  );

  return canvas;
}

/** Shares the image on phones (Instagram, WhatsApp…) or downloads it elsewhere. */
export async function savePassportImage(o: PassportImageOptions): Promise<void> {
  const canvas = await drawPassport(o);
  const blob: Blob | null = await new Promise((r) => canvas.toBlob(r, "image/png"));
  if (!blob) return;
  const file = new File([blob], "zowar-passport.png", { type: "image/png" });

  const nav = navigator as Navigator & { canShare?: (data: ShareData) => boolean };
  if (nav.canShare?.({ files: [file] })) {
    try {
      await nav.share({ files: [file], title: o.title });
      return;
    } catch (err) {
      if ((err as { name?: string })?.name === "AbortError") return;
      // fall through to download
    }
  }

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "zowar-passport.png";
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 2000);
}

export function SavePassportButton({
  locale,
  options,
}: {
  locale: Locale;
  options: () => PassportImageOptions;
}) {
  const isAr = locale === "ar";
  const [busy, setBusy] = React.useState(false);
  return (
    <button
      type="button"
      disabled={busy}
      onClick={async () => {
        setBusy(true);
        try {
          await savePassportImage(options());
        } finally {
          setBusy(false);
        }
      }}
      className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-2xl bg-z-orange px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-95 active:scale-[0.99] disabled:opacity-60"
    >
      <svg viewBox="0 0 20 20" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 3v9M6.5 8.5 10 12l3.5-3.5M4 14.5v1A1.5 1.5 0 0 0 5.5 17h9a1.5 1.5 0 0 0 1.5-1.5v-1" />
      </svg>
      <span className="relative z-10">
        {busy ? (isAr ? "جارٍ التحضير…" : "Preparing…") : isAr ? "احفظ جوازك" : "Save my passport"}
      </span>
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Reviews                                                            */
/* ------------------------------------------------------------------ */

/* Zowar's Tripadvisor "write a review" page (from the Tripadvisor review widget) */
export const TRIPADVISOR_REVIEW_URL =
  "https://www.tripadvisor.com/UserReview-g293986-d34706600-Zowar-Amman_Amman_Governorate.html?m=62975";

export function TripadvisorReviewLink({
  locale,
  className = "rounded-2xl px-4 py-3 text-sm",
}: {
  locale: Locale;
  className?: string;
}) {
  return (
    <a
      href={TRIPADVISOR_REVIEW_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1.5 border border-[#00AF87]/30 bg-[#34E0A1]/10 font-semibold text-[#00704F] transition hover:bg-[#34E0A1]/20 ${className}`}
    >
      {/* Owl eyes */}
      <svg viewBox="0 0 24 16" className="h-3.5 w-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="6.5" cy="8.5" r="5" />
        <circle cx="17.5" cy="8.5" r="5" />
        <circle cx="6.5" cy="8.5" r="1.6" fill="currentColor" stroke="none" />
        <circle cx="17.5" cy="8.5" r="1.6" fill="currentColor" stroke="none" />
      </svg>
      {locale === "ar" ? "قيّمنا على Tripadvisor" : "Review on Tripadvisor"}
    </a>
  );
}

/* ------------------------------------------------------------------ */
/* Next adventure                                                     */
/* ------------------------------------------------------------------ */

export function NextAdventureCard({
  eyebrow,
  title,
  body,
  cta,
  href,
  external = false,
}: {
  eyebrow: string;
  title: string;
  body: string;
  cta: string;
  href: string;
  external?: boolean;
}) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-[rgba(200,105,74,0.25)] bg-[linear-gradient(135deg,#FFF8F0,#FBE9DC)] p-5">
      <div className="pointer-events-none absolute -end-6 -top-6 h-28 w-28 rounded-full border-[6px] border-dashed border-[rgba(200,105,74,0.15)]" />
      <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-z-orange">{eyebrow}</div>
      <h3 className="mt-2 text-lg font-semibold text-neutral-950">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-neutral-700">{body}</p>
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="mt-4 inline-flex items-center gap-1.5 rounded-xl border border-z-orange bg-white px-4 py-2 text-sm font-semibold text-z-orange transition hover:bg-z-orange-soft"
      >
        {cta}
      </a>
    </div>
  );
}
