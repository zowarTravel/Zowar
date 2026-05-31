"use client";

import { TESTIMONIALS, SOCIAL_PROOF, TRAVELER_TYPE_LABELS, type Testimonial } from "../testimonials_data";

type Locale = "en" | "ar" | "es";

function tr(locale: Locale, en: string, ar: string, es: string): string {
  return locale === "ar" ? ar : locale === "es" ? es : en;
}

function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 12 12"
          className={`h-3 w-3 ${i < count ? "text-amber-400" : "text-neutral-200"}`}
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M6 .5l1.4 2.9 3.1.4-2.3 2.2.6 3.1L6 7.7 3.2 9.1l.6-3.1L1.5 3.8l3.1-.4z" />
        </svg>
      ))}
    </div>
  );
}

function attribution(t: Testimonial, locale: Locale): string {
  const typeLabel = TRAVELER_TYPE_LABELS[t.travelerType][locale];
  const parts: string[] = [t.displayName, typeLabel];
  if (t.city && t.country) parts.push(`${t.city}, ${t.country}`);
  else if (t.country) parts.push(t.country);
  parts.push(t.month);
  return parts.join(" · ");
}

function TestimonialCard({ t, locale }: { t: Testimonial; locale: Locale }) {
  const text = locale === "ar" && t.textAr ? t.textAr : t.text;
  return (
    <div className="flex flex-col rounded-3xl border border-black/[0.07] bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
      <Stars count={t.rating} />
      <p className="mt-4 flex-1 text-sm leading-7 text-neutral-700">"{text}"</p>
      <p className="mt-5 border-t border-black/[0.06] pt-4 text-[11px] font-medium text-neutral-400">
        {attribution(t, locale)}
      </p>
    </div>
  );
}

export default function TestimonialsSection({ locale = "en" }: { locale?: Locale }) {
  if (TESTIMONIALS.length === 0) return null;

  const isAr = locale === "ar";
  const showGuestsHosted = SOCIAL_PROOF.guestsHosted > 0;
  const showCities = SOCIAL_PROOF.citiesRepresented > 0;
  const showProofBar = showGuestsHosted || showCities;

  return (
    <section
      id="testimonials"
      dir={isAr ? "rtl" : "ltr"}
      className="px-6 max-w-7xl mx-auto py-16"
      aria-label={tr(locale, "Traveler reviews", "تقييمات المسافرين", "Opiniones de viajeros")}
    >
      {/* Header */}
      <div className={`mb-10 ${isAr ? "text-right" : "text-left"}`}>
        <div className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-z-orange">
          {tr(locale, "Travelers say", "ما قاله المسافرون", "Viajeros dicen")}
        </div>
        <h2 className="text-2xl font-semibold text-neutral-900 md:text-3xl">
          {tr(locale, "Voices from the street", "أصوات من الشارع", "Voces de la calle")}
        </h2>
      </div>

      {/* Social proof pills — only when numbers are real */}
      {showProofBar && (
        <div className="mb-10 flex flex-wrap gap-2">
          {showGuestsHosted && (
            <span className="rounded-full border border-black/8 bg-white px-4 py-2 text-sm font-medium text-neutral-700 shadow-sm">
              {tr(locale,
                `${SOCIAL_PROOF.guestsHosted}+ guests hosted`,
                `أكثر من ${SOCIAL_PROOF.guestsHosted} ضيف`,
                `${SOCIAL_PROOF.guestsHosted}+ viajeros`
              )}
            </span>
          )}
          {showCities && (
            <span className="rounded-full border border-black/8 bg-white px-4 py-2 text-sm font-medium text-neutral-700 shadow-sm">
              {tr(locale,
                `From ${SOCIAL_PROOF.citiesRepresented}+ cities`,
                `من أكثر من ${SOCIAL_PROOF.citiesRepresented} مدينة`,
                `De ${SOCIAL_PROOF.citiesRepresented}+ ciudades`
              )}
            </span>
          )}
        </div>
      )}

      {/* Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {TESTIMONIALS.map((t) => (
          <TestimonialCard key={t.id} t={t} locale={locale} />
        ))}
      </div>

      {/* Bottom link */}
      <p className="mt-8 text-center text-sm text-neutral-500">
        {tr(locale, "Finished the route? ", "أكملت الجولة؟ ", "¿Terminaste la ruta? ")}
        <a
          href="/portal"
          className="font-semibold text-z-orange underline underline-offset-2 hover:opacity-80 transition"
        >
          {tr(locale, "Share your experience →", "شارك تجربتك ←", "Comparte tu experiencia →")}
        </a>
      </p>
    </section>
  );
}
