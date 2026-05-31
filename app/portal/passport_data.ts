export type StampId =
  | "coffee"
  | "rumman"
  | "soap-house"
  | "falafel-al-quds"
  | "al-yasmeenah"
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
};

export const RAINBOW_STAMPS: readonly PassportStampMeta[] = [
  {
    id: "coffee",
    stop: 1,
    title: "Coffee Stop",
    titleAr: "محطة القهوة",
    subtitle: "The route begins",
    subtitleAr: "بداية المسار",
    hiddenLetter: "M",
    image: "/images/puzzles/r7/M.png",
    alt: "Coffee Stop passport stamp",
    roundKey: "r1",
  },
  {
    id: "rumman",
    stop: 2,
    title: "Rumman",
    titleAr: "رمان",
    subtitle: "Pomegranate clue",
    subtitleAr: "الرمانة الدليل",
    hiddenLetter: "I",
    image: "/images/puzzles/r7/I.png",
    alt: "Rumman passport stamp",
    roundKey: "r2",
  },
  {
    id: "soap-house",
    stop: 3,
    title: "Soap House",
    titleAr: "دار الصابون",
    subtitle: "Handmade local stop",
    subtitleAr: "محطة يدوية محلية",
    hiddenLetter: "J",
    image: "/images/puzzles/r7/J.png",
    alt: "Soap House passport stamp",
    roundKey: "r3",
  },
  {
    id: "falafel-al-quds",
    stop: 4,
    title: "Falafel Al Quds",
    titleAr: "فلافل القدس",
    subtitle: "A crispy classic",
    subtitleAr: "كلاسيك مقرمش",
    hiddenLetter: "A",
    image: "/images/puzzles/r7/A1.png",
    alt: "Falafel Al Quds passport stamp",
    roundKey: "r4",
  },
  {
    id: "al-yasmeenah",
    stop: 5,
    title: "Al Yasmeenah",
    titleAr: "الياسمينة",
    subtitle: "Knafeh stop",
    subtitleAr: "محطة الكنافة",
    hiddenLetter: "N",
    image: "/images/puzzles/r7/N.png",
    alt: "Al Yasmeenah passport stamp",
    roundKey: "r5",
  },
  {
    id: "flour-fire",
    stop: 6,
    title: "Flour & Fire",
    titleAr: "طحين ونار",
    subtitle: "Manakeesh stop",
    subtitleAr: "محطة المناقيش",
    hiddenLetter: "A",
    image: "/images/puzzles/r7/A2.png",
    alt: "Flour & Fire passport stamp",
    roundKey: "r6",
  },
];
