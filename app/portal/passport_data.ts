import type { CSSProperties } from "react";

export type StampId =
  | "magenta"
  | "asma-kitchen"
  | "rumman"
  | "trinitae"
  | "falafel-al-quds"
  | "mlabbas"
  | "flour-fire";

export type PassportStampMeta = {
  readonly id: StampId;
  readonly stop: number;
  readonly title: string;
  readonly titleAr: string;
  readonly subtitle: string;
  readonly subtitleAr: string;
  /** Slot (0–5, left to right) of this stamp's piece of the r7 sunrise picture. None = not part of the finale. */
  readonly fragment?: number;
  readonly image: string;
  readonly alt: string;
  readonly roundKey: "r1" | "r2" | "r3" | "r4" | "r5" | "r5b" | "r6";
  /** Visual scale applied to the stamp image inside its cell. Default 1. */
  readonly scale?: number;
};

export const RAINBOW_STAMPS: readonly PassportStampMeta[] = [
  {
    id: "magenta",
    stop: 1,
    title: "Magenta",
    titleAr: "ماجنتا",
    subtitle: "The route begins",
    subtitleAr: "بداية المسار",
    fragment: 2,
    image: "/images/puzzles/r7/M.png",
    alt: "Magenta passport stamp",
    roundKey: "r1",
    scale: 1,
  },
  {
    id: "rumman",
    stop: 2,
    title: "Rumman Collective",
    titleAr: "رمان كولكتيف",
    subtitle: "Jordanian makers",
    subtitleAr: "صنّاع أردنيون",
    fragment: 4,
    image: "/images/puzzles/r7/I.png",
    alt: "Rumman Collective passport stamp",
    roundKey: "r2",
    scale: 1,
  },
  {
    id: "asma-kitchen",
    stop: 3,
    title: "Asma Kitchen",
    titleAr: "مطبخ أسمى",
    subtitle: "Hummus & mutabbal",
    subtitleAr: "حمص ومتبّل",
    fragment: 0,
    image: "/images/puzzles/r7/J.png",
    alt: "Asma Kitchen passport stamp",
    roundKey: "r3",
    scale: 1,
  },
  {
    id: "trinitae",
    stop: 4,
    title: "Tabrizi",
    titleAr: "تبريزي",
    subtitle: "Discovery stop",
    subtitleAr: "محطة اكتشاف",
    fragment: 5,
    image: "/images/puzzles/r7/A1.png",
    alt: "Tabrizi passport stamp",
    roundKey: "r4",
    scale: 1,
  },
  {
    id: "falafel-al-quds",
    stop: 5,
    title: "Maisa Space",
    titleAr: "مساحة ميسا",
    subtitle: "Homemade flavors",
    subtitleAr: "نكهات بيتية",
    fragment: 1,
    image: "/images/puzzles/r7/N.png",
    alt: "Maisa Space passport stamp",
    roundKey: "r5",
    scale: 1.55,
  },
  {
    id: "mlabbas",
    stop: 6,
    title: "Mlabbas",
    titleAr: "ملبّس",
    subtitle: "The camel that never leaves",
    subtitleAr: "الجمل الذي لا يغادر",
    fragment: 3,
    image: "/images/puzzles/r7/A2.png",
    alt: "Mlabbas passport stamp",
    roundKey: "r5b",
    scale: 1,
  },
  {
    id: "flour-fire",
    stop: 7,
    title: "The Overlook",
    titleAr: "الإطلالة",
    subtitle: "Downtown Amman view",
    subtitleAr: "إطلالة على وسط البلد",
    image: "/images/puzzles/r7/Rainbow Street.png",
    alt: "Rainbow Street passport stamp",
    roundKey: "r6",
    scale: 1,
  },
];

/* ------------------------------------------------------------------ */
/* r7 sunrise picture — one master image, cut into equal vertical strips */
/* ------------------------------------------------------------------ */

export const SUNRISE_SRC = "/images/puzzles/r7/shams-sunrise.jpg";
export const SUNRISE_PIECES = RAINBOW_STAMPS.filter((s) => s.fragment !== undefined).length;

/** The same piece drawn as its own perforated stamp (Reference B) — the back of a collected stamp. */
export function pieceStampSrc(fragment: number): string {
  return `/images/puzzles/r7/pieces/piece-${fragment + 1}.jpg`;
}

/** Background styles that show one strip of the master image, positioned deterministically. */
export function fragmentStyle(fragment: number): CSSProperties {
  return {
    backgroundImage: `url("${SUNRISE_SRC}")`,
    backgroundSize: `${SUNRISE_PIECES * 100}% 100%`,
    backgroundPosition: `${(fragment / (SUNRISE_PIECES - 1)) * 100}% 0%`,
    backgroundRepeat: "no-repeat",
  };
}
