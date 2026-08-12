export type StampId =
  | "magenta"
  | "asma-kitchen"
  | "rumman"
  | "trinitae"
  | "falafel-al-quds"
  | "flour-fire";

export type PassportStampMeta = {
  readonly id: StampId;
  readonly stop: number;
  readonly title: string;
  readonly titleAr: string;
  readonly subtitle: string;
  readonly subtitleAr: string;
  readonly hiddenLetter: string;
  readonly image: string;
  readonly alt: string;
  readonly roundKey: "r1" | "r2" | "r3" | "r4" | "r5" | "r6";
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
    hiddenLetter: "M",
    image: "/images/puzzles/r7/M.png",
    alt: "Magenta passport stamp",
    roundKey: "r1",
    scale: 1,
  },
  {
    id: "asma-kitchen",
    stop: 2,
    title: "Asma Kitchen",
    titleAr: "مطبخ أسمى",
    subtitle: "Hummus & mutabbal",
    subtitleAr: "حمص ومتبّل",
    hiddenLetter: "I",
    image: "/images/puzzles/r7/I.png",
    alt: "Asma Kitchen passport stamp",
    roundKey: "r2",
    scale: 1,
  },
  {
    id: "rumman",
    stop: 3,
    title: "Rumman Collective",
    titleAr: "رمان كولكتيف",
    subtitle: "Jordanian makers",
    subtitleAr: "صنّاع أردنيون",
    hiddenLetter: "J",
    image: "/images/puzzles/r7/J.png",
    alt: "Rumman Collective passport stamp",
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
    hiddenLetter: "A",
    image: "/images/puzzles/r7/A1.png",
    alt: "Tabrizi passport stamp",
    roundKey: "r4",
    scale: 1,
  },
  {
    id: "falafel-al-quds",
    stop: 5,
    title: "Falafel Al Quds",
    titleAr: "فلافل القدس",
    subtitle: "A crispy classic",
    subtitleAr: "كلاسيك مقرمش",
    hiddenLetter: "N",
    image: "/images/puzzles/r7/N.png",
    alt: "Falafel Al Quds passport stamp",
    roundKey: "r5",
    scale: 1,
  },
  {
    id: "flour-fire",
    stop: 6,
    title: "The Overlook",
    titleAr: "الإطلالة",
    subtitle: "Downtown Amman view",
    subtitleAr: "إطلالة على وسط البلد",
    hiddenLetter: "A",
    image: "/images/puzzles/r7/A2.png",
    alt: "Monument overlook passport stamp",
    roundKey: "r6",
    scale: 1,
  },
];
