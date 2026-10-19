// app/lib/experiences.ts
// Shared (client + server) definitions for each bookable Zowar experience.

export type ExperienceId = "rainbow" | "highlights" | "weibdeh";

export function normalizeExperience(x: unknown): ExperienceId {
  return x === "highlights" ? "highlights" : x === "weibdeh" ? "weibdeh" : "rainbow";
}

export function portalPathFor(experience: unknown): string {
  const exp = normalizeExperience(experience);
  if (exp === "highlights") return "/portal/highlights";
  if (exp === "weibdeh") return "/portal/weibdeh";
  return "/portal";
}

/**
 * Whether a booking for `booked` may open the portal for `portal`.
 * Highlights bookings only unlock Highlights; every other booking keeps
 * the access it had before Highlights existed.
 */
export function canAccessPortal(booked: unknown, portal: ExperienceId): boolean {
  if (normalizeExperience(booked) === "highlights") return portal === "highlights";
  return true;
}

/* ------------------------------------------------------------------ */
/* Pricing                                                             */
/* ------------------------------------------------------------------ */

export const PRICE_PER_PERSON_JOD: Record<ExperienceId, number> = {
  rainbow: 25,
  highlights: 14,
  weibdeh: 25,
};

const USD_CENTS_PER_JOD = 141;

/** Stripe unit amount in USD cents, after an optional fractional discount (0.5 = 50% off). */
export function unitAmountUsdCents(experience: ExperienceId, discount = 0): number {
  return Math.round(PRICE_PER_PERSON_JOD[experience] * (1 - discount) * USD_CENTS_PER_JOD);
}

/* ------------------------------------------------------------------ */
/* Display names                                                       */
/* ------------------------------------------------------------------ */

export const EXPERIENCE_NAME: Record<ExperienceId, { en: string; ar: string; es: string }> = {
  rainbow: {
    en: "Rainbow Street Experience",
    ar: "تجربة شارع الرينبو",
    es: "Experiencia Calle Rainbow",
  },
  highlights: {
    en: "Rainbow Street Highlights",
    ar: "أبرز محطات شارع الرينبو",
    es: "Lo Mejor de Calle Rainbow",
  },
  weibdeh: {
    en: "Al Weibdeh Experience",
    ar: "تجربة الويبدة",
    es: "Experiencia Al Weibdeh",
  },
};

/* ------------------------------------------------------------------ */
/* Finance                                                             */
/* ------------------------------------------------------------------ */

/** Partners visited on the Highlights route (Rumman, Tabrizi, Maisa). */
export const HIGHLIGHTS_PARTNER_IDS: readonly string[] = ["p_rumman", "p_trinitae", "p_maisa"];

export function partnerIncludedIn(experience: unknown, partnerId: string): boolean {
  if (normalizeExperience(experience) === "highlights") {
    return HIGHLIGHTS_PARTNER_IDS.includes(partnerId);
  }
  return true;
}
