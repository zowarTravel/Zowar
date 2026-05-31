// Add real testimonials here as they come in from the review form.
// The section is invisible on the landing page when this array is empty.
// Format: copy the submitted text verbatim — don't polish or rewrite it.

export type TravelerType = "couple" | "friends" | "solo" | "local" | "tourist";

export type Testimonial = {
  id: string;
  displayName: string;
  travelerType: TravelerType;
  month: string;
  city?: string;
  country?: string;
  route: "Rainbow Street" | "Weibdeh";
  text: string;
  textAr?: string;
  rating: 5;
};

export const TESTIMONIALS: Testimonial[] = [
  // Paste real reviews here, e.g.:
  // {
  //   id: "1",
  //   displayName: "Sarah",
  //   travelerType: "couple",
  //   month: "June 2026",
  //   city: "Dubai",
  //   country: "UAE",
  //   route: "Rainbow Street",
  //   text: "...",
  //   rating: 5,
  // },
];

// Only set these once you have real numbers to back them up.
// Both default to 0 — pills are hidden when value is 0.
export const SOCIAL_PROOF = {
  guestsHosted: 0,
  citiesRepresented: 0,
};

export const TRAVELER_TYPE_LABELS: Record<
  TravelerType,
  { en: string; ar: string; es: string }
> = {
  couple: { en: "Couple", ar: "ثنائي", es: "Pareja" },
  friends: { en: "Group of friends", ar: "مجموعة أصدقاء", es: "Grupo de amigos" },
  solo: { en: "Solo traveler", ar: "مسافر منفرد", es: "Viajero solo" },
  local: { en: "Local", ar: "من عمّان", es: "Local" },
  tourist: { en: "Visitor", ar: "زائر", es: "Visitante" },
};
