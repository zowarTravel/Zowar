"use client";

import React from "react";
import type { Locale } from "./riddlecontent";
import { RAINBOW_STAMPS, type PassportStampMeta, type StampId } from "./passport_data";
import SubmitTestimonialModal from "./SubmitTestimonialModal";
import { FULL_STAMPED_STOPS, arDigits, stopOfTotal, type PortalRoute } from "./routes";
import {
  HolderNameField,
  NextAdventureCard,
  SavePassportButton,
  TripadvisorReviewLink,
  stampTap,
  useCompletionDate,
  usePassportHolder,
} from "./passport_keepsake";

/* Fixed subtle rotations — authentic passport feel */
const ROTATIONS = [-5, 4, -3, 5] as const;

/* Timing of the stamping sequence */
const FIRST_STAMP_MS = 500;
const STAMP_GAP_MS = 450;

/* Paper texture shared by both pages */
const PAPER = `
  repeating-linear-gradient(0deg, transparent, transparent 27px, rgba(200,161,58,0.06) 27px, rgba(200,161,58,0.06) 28px),
  linear-gradient(162deg, #FFFDF7 0%, #FCF1DA 100%)
`;

export default function HighlightsComplete({
  locale,
  route,
}: {
  locale: Locale;
  route: PortalRoute;
}) {
  const isAr = locale === "ar";
  const total = route.steps.length;

  const [collectedIds, setCollectedIds] = React.useState<StampId[]>([]);
  const [showTestimonialForm, setShowTestimonialForm] = React.useState(false);
  const [holder, saveHolder] = usePassportHolder();
  const visited = useCompletionDate("highlights", locale);

  React.useEffect(() => {
    setCollectedIds(route.passport.getCollected());
  }, [route]);

  const stamps = route.steps
    .map((step) => RAINBOW_STAMPS.find((s) => s.id === step.stamp))
    .filter((s): s is PassportStampMeta => !!s);

  /* Haptic tap as each stamp lands (phones that support it) */
  React.useEffect(() => {
    const timers = stamps.map((_, i) =>
      window.setTimeout(stampTap, FIRST_STAMP_MS + i * STAMP_GAP_MS + 220)
    );
    return () => timers.forEach((t) => window.clearTimeout(t));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sealDelay = FIRST_STAMP_MS + stamps.length * STAMP_GAP_MS + 150;
  const stopNames = stamps.map((s) => (isAr ? s.titleAr : s.title));
  const joinedNames = isAr
    ? stopNames.join("، ")
    : stopNames.length > 1
    ? `${stopNames.slice(0, -1).join(", ")} and ${stopNames[stopNames.length - 1]}`
    : stopNames[0] ?? "";
  const remaining = Math.max(0, FULL_STAMPED_STOPS - total);
  const routeName = isAr ? "أبرز محطات شارع الرينبو" : "Rainbow Street Highlights";

  return (
    <div dir={isAr ? "rtl" : "ltr"} className="w-full space-y-4">
      {showTestimonialForm && (
        <SubmitTestimonialModal
          locale={isAr ? "ar" : "en"}
          onClose={() => setShowTestimonialForm(false)}
        />
      )}
      <style>{`
        @keyframes hc-open {
          from { opacity:0; transform: perspective(1200px) rotateX(10deg) translateY(16px); }
          to   { opacity:1; transform: perspective(1200px) rotateX(0) translateY(0); }
        }
        @keyframes hc-stamp {
          0%   { opacity:0; transform: scale(1.7) rotate(var(--hc-rot)); filter: blur(4px); }
          55%  { opacity:1; transform: scale(0.92) rotate(var(--hc-rot)); filter: blur(0); }
          75%  { transform: scale(1.04) rotate(var(--hc-rot)); }
          100% { opacity:1; transform: scale(1) rotate(var(--hc-rot)); }
        }
        @keyframes hc-seal {
          0%   { opacity:0; transform: scale(1.6) rotate(-22deg); filter: blur(3px); }
          60%  { opacity:1; transform: scale(0.94) rotate(-10deg); filter: blur(0); }
          100% { opacity:1; transform: scale(1) rotate(-12deg); }
        }
        @keyframes hc-fade {
          from { opacity:0; transform: translateY(10px); }
          to   { opacity:1; transform: translateY(0); }
        }
      `}</style>

      {/* ═══════════════ Open passport ═══════════════ */}
      <div
        className="relative overflow-hidden rounded-[28px] border border-amber-900/15 bg-[#7A4A1C] p-2 shadow-[0_30px_70px_rgba(60,35,10,0.28)] sm:p-2.5"
        style={{ animation: "hc-open 520ms cubic-bezier(.22,1,.36,1) both" }}
      >
        <div className="grid overflow-hidden rounded-[22px] sm:grid-cols-2">
          {/* ── Holder page ── */}
          <div className="relative px-6 pb-6 pt-7" style={{ background: PAPER }}>
            {/* Emblem — Zowar logo, cropped to the arch and blended into the paper */}
            <div className="mx-auto h-24 w-24 overflow-hidden mix-blend-multiply">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.png"
                alt="Zowar"
                className="h-full w-full object-cover"
                style={{ objectPosition: "50% 58%", transform: "scale(1.3)", transformOrigin: "50% 58%" }}
                draggable={false}
              />
            </div>

            <div className="mt-4 text-center">
              <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-amber-700/80">
                {isAr ? "جواز سفر زوّار" : "Zowar Passport"}
              </div>
              <div className="mt-1.5 text-xl font-semibold tracking-tight text-amber-950">{routeName}</div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-amber-800/60">
                {isAr ? "عمّان · الأردن" : "Amman · Jordan"}
              </div>
            </div>

            <div className="mt-5 space-y-3 border-t border-dashed border-amber-700/25 pt-4">
              <div>
                <div className="text-[9px] font-bold uppercase tracking-[0.24em] text-amber-700/70">
                  {isAr ? "حامل الجواز" : "Holder"}
                </div>
                <div className="mt-1">
                  <HolderNameField locale={locale} name={holder} onSave={saveHolder} />
                </div>
              </div>
              <div className="flex gap-6">
                <div>
                  <div className="text-[9px] font-bold uppercase tracking-[0.24em] text-amber-700/70">
                    {isAr ? "تاريخ الزيارة" : "Visited"}
                  </div>
                  <div className="mt-1 text-sm font-semibold text-amber-950">{visited}</div>
                </div>
                <div>
                  <div className="text-[9px] font-bold uppercase tracking-[0.24em] text-amber-700/70">
                    {isAr ? "المحطات" : "Stops"}
                  </div>
                  <div className="mt-1 text-sm font-semibold text-amber-950">
                    {isAr ? `${arDigits(total)} / ${arDigits(total)}` : `${total} / ${total}`}
                  </div>
                </div>
              </div>
            </div>

            {/* Spine stitching — horizontal seam on mobile, vertical on desktop */}
            <div className="pointer-events-none absolute inset-x-6 bottom-0 border-b-2 border-dashed border-amber-800/20 sm:hidden" />
            <div className="pointer-events-none absolute inset-y-6 end-0 hidden border-e-2 border-dashed border-amber-800/20 sm:block" />
          </div>

          {/* ── Stamp page ── */}
          <div
            className="relative px-5 pb-6 pt-6"
            style={{
              background: PAPER,
              boxShadow: isAr
                ? "inset -18px 0 24px -20px rgba(90,55,15,0.35)"
                : "inset 18px 0 24px -20px rgba(90,55,15,0.35)",
            }}
          >
            <div className="mb-3 text-center text-[9px] font-bold uppercase tracking-[0.26em] text-amber-700/70">
              {isAr ? "الأختام" : "Visas & Entries"}
            </div>

            <div dir="ltr" className="grid grid-cols-2 gap-x-3 gap-y-2">
              {stamps.map((meta, i) => {
                const unlocked = collectedIds.includes(meta.id);
                return (
                  <div key={meta.id} className="flex flex-col items-center">
                    <div
                      className={["relative aspect-square w-full mix-blend-multiply", unlocked ? "" : "opacity-25"].join(" ")}
                      style={{
                        ["--hc-rot" as string]: `${ROTATIONS[i % ROTATIONS.length]}deg`,
                        animation: `hc-stamp 520ms cubic-bezier(.22,1,.36,1) ${FIRST_STAMP_MS + i * STAMP_GAP_MS}ms both`,
                      }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={meta.image}
                        alt={meta.alt}
                        className="h-full w-full object-contain"
                        style={meta.scale && meta.scale !== 1 ? { transform: `scale(${Math.min(meta.scale, 1.25)})` } : undefined}
                        draggable={false}
                      />
                    </div>
                    <div className="-mt-0.5 text-center" dir={isAr ? "rtl" : "ltr"}>
                      <div className="text-[8px] font-bold uppercase tracking-[0.2em] text-amber-800/55">
                        {stopOfTotal(i + 1, total, false)[locale]}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Completion seal */}
            <div
              className="pointer-events-none absolute bottom-5 end-4 flex h-28 w-28 flex-col items-center justify-center rounded-full border-[5px] border-emerald-600/80 bg-emerald-50/85 text-center text-emerald-800 shadow-[0_6px_24px_rgba(16,185,129,0.25)]"
              style={{ animation: `hc-seal 560ms cubic-bezier(.22,1,.36,1) ${sealDelay}ms both` }}
            >
              <div className="absolute inset-1.5 rounded-full border border-emerald-600/40" />
              <span className="text-[8px] font-bold uppercase tracking-[0.25em]">
                {isAr ? "مكتمل" : "Complete"}
              </span>
              <span className="mt-0.5 text-sm font-bold leading-tight">
                {isAr ? "الأبرز" : "Highlights"}
              </span>
              <span className="mt-0.5 text-[8px] font-semibold tracking-[0.2em]">ZOWAR</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Thank you + actions ── */}
      <div
        className="rounded-3xl border border-neutral-200 bg-white p-5"
        style={{ animation: `hc-fade 400ms ease-out ${sealDelay + 200}ms both` }}
      >
        <h3 className="text-xl font-semibold text-neutral-950">
          {isAr ? "أكملت أبرز محطات شارع الرينبو" : "You've completed Rainbow Street Highlights"}
        </h3>
        <p className="mt-2 text-sm leading-7 text-neutral-700">
          {isAr
            ? `شكراً لمشيك مع زوّار. ${arDigits(total)} محطات وشارع واحد — ${joinedNames}. خذ وقتك واستمتع بتذوّقك.`
            : `Thank you for walking with Zowar. ${total} stops, one street — ${joinedNames}. Take your time and enjoy your tasting.`}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <SavePassportButton
            locale={locale}
            options={() => ({
              locale,
              title: routeName,
              holder,
              dateLabel: visited,
              stamps,
              sealText: isAr ? "الأبرز" : "HIGHLIGHTS",
            })}
          />
          <a
            href={`https://wa.me/?text=${encodeURIComponent(
              isAr
                ? `أنهيت جولة أبرز محطات شارع الرينبو مع زوّار في عمّان 🗺️ — ${arDigits(total)} محطات و${arDigits(total)} طوابع. جرّب: zowar.net`
                : `I just finished Zowar's Rainbow Street Highlights in Amman 🗺️ — ${total} stops, ${total} stamps. Try it: zowar.net`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-2xl border border-[#25D366]/30 bg-[#25D366]/8 px-4 py-3 text-sm font-semibold text-[#128C4A] transition hover:bg-[#25D366]/15"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.123 1.532 5.856L.073 23.27a.75.75 0 00.916.916l5.415-1.459A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.713 9.713 0 01-4.952-1.354l-.355-.21-3.676.991.99-3.613-.228-.368A9.712 9.712 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
            </svg>
            {isAr ? "شارك" : "Share"}
          </a>
          <TripadvisorReviewLink locale={locale} />
          <button
            type="button"
            onClick={() => setShowTestimonialForm(true)}
            className="rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50"
          >
            {isAr ? "أضف تقييمك" : "Leave a review"}
          </button>
        </div>
      </div>

      {/* ── Next adventure: the full route ── */}
      {remaining > 0 && (
        <div style={{ animation: `hc-fade 400ms ease-out ${sealDelay + 320}ms both` }}>
          <NextAdventureCard
            eyebrow={isAr ? "جوازك فيه متّسع" : "Your passport has room"}
            title={
              isAr
                ? `${arDigits(remaining)} محطات أخرى بانتظارك`
                : `${remaining} more stops are waiting`
            }
            body={
              isAr
                ? `تجربة شارع الرينبو الكاملة تضم ${arDigits(FULL_STAMPED_STOPS)} محطات وختاماً على سطح مع حلوى وإطلالة على عمّان. عُد لتملأ بقية صفحات جوازك.`
                : `The full Rainbow Street experience has ${FULL_STAMPED_STOPS} stops and a rooftop finale with dessert and a view over Amman. Come back and fill the rest of your passport.`
            }
            cta={isAr ? "اكتشف التجربة الكاملة ←" : "See the full experience →"}
            href={`/booking?lang=${locale}`}
          />
        </div>
      )}

      {/* ── About the journey ── */}
      <div
        className="rounded-3xl border border-neutral-200 bg-white p-5"
        style={{ animation: `hc-fade 400ms ease-out ${sealDelay + 440}ms both` }}
      >
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-z-orange">
          {isAr ? "عن الرحلة" : "About the journey"}
        </div>
        <h3 className="mt-2 text-xl font-semibold text-neutral-950">
          {isAr ? "شارع الرينبو" : "Rainbow Street"}
        </h3>
        <p className="mt-3 text-sm leading-7 text-neutral-700">
          {isAr
            ? "شارع الرينبو أخذ اسمه من سينما الرينبو. مبانيه الحجرية من عشرينيات القرن الماضي — شُيِّدت لسياسيين وسفراء وأفراد من الأسرة الحاكمة. المحطات التي زرتها للتو جزء من ذلك التاريخ."
            : "Rainbow Street takes its name from the Rainbow Cinema. The stone buildings date to the 1920s — built for politicians, ambassadors, and royals. The stops you just visited sit inside that same history."}
        </p>
      </div>
    </div>
  );
}
