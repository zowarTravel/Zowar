"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { content, Locale } from "./content";
import Image from "next/image";
import { Fredoka, Tajawal } from "next/font/google";

type Currency = "USD" | "JOD";
type AboutTabKey = "cultural" | "dietary" | "moments" | "booking";

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export default function Home() {
  /* -------------------- LOCALE -------------------- */
  const [locale, setLocale] = useState<Locale>("en");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith("ar")) setLocale("ar");
  }, []);

  const t = useMemo(() => content[locale], [locale]);
  const isAr = locale === "ar";
  const fontClass = isAr ? tajawal.className : fredoka.className;

  /* -------------------- PRICING DISPLAY ONLY -------------------- */
  const DEFAULT_CURRENCY: Currency = "USD";
  const [currency] = useState<Currency>(DEFAULT_CURRENCY);

  /* -------------------- MENU DROPDOWN -------------------- */
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (!menuOpen) return;
      const el = menuRef.current;
      if (!el) return;
      if (e.target instanceof Node && !el.contains(e.target)) setMenuOpen(false);
    }
    window.addEventListener("mousedown", onDown);
    return () => window.removeEventListener("mousedown", onDown);
  }, [menuOpen]);

  /* -------------------- “FLASH ORANGE” (hover + click) -------------------- */
  const [flashMenu, setFlashMenu] = useState(0);
  const [flashLang, setFlashLang] = useState(0);

  function triggerFlash(which: "menu" | "lang") {
    if (which === "menu") setFlashMenu((x) => x + 1);
    if (which === "lang") setFlashLang((x) => x + 1);
  }

  /* -------------------- HERO BACKGROUND MEDIA (uses your existing files) -------------------- */
  const heroMedia = useMemo(
    () => [
      {
        src: "/images/street-food.jpg",
        alt: { en: "Amman street food", ar: "طعام شارع في عمّان" },
      },
      { src: "/images/spices.jpg", alt: { en: "Spices", ar: "بهارات" } },
      { src: "/images/desserts.jpg", alt: { en: "Desserts", ar: "حلويات" } },
    ],
    []
  );

  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setHeroIndex((i) => (i + 1) % heroMedia.length);
    }, 4500);
    return () => clearInterval(id);
  }, [heroMedia.length]);

  /* -------------------- ABOUT TABS (animated flip labels + unique images) -------------------- */
  const aboutTabs = useMemo(
    () =>
      [
        {
          key: "cultural" as const,
          label: { en: "Cultural Immersion", ar: "تجربة ثقافية" },
          flip: { en: "Local Delights", ar: "مذاقات محلية" },
          title: { en: "Taste the Culture, Live the City", ar: "تذوّق الثقافة وعِش المدينة" },
          body: {
            en: "Beyond food, ZOWAR is a journey through Amman’s stories—follow clues, meet local gems, and explore one stop at a time.",
            ar: "أكثر من مجرد طعام — زوّار رحلة داخل قصص عمّان. اتبع الإشارات واكتشف الأماكن المحلية خطوة بخطوة.",
          },
          imageSrc: "/images/about/cultural.jpg",
          imageAlt: { en: "Colorful streets of Amman", ar: "شوارع عمّان الملوّنة" },
          showCTA: false,
        },
        {
          key: "dietary" as const,
          label: { en: "Dietary Restrictions", ar: "قيود غذائية" },
          flip: { en: "Tailored Experience", ar: "تجربة مخصّصة" },
          title: { en: "Made for Your Preferences", ar: "مصممة حسب تفضيلاتك" },
          body: {
            en: "Tell us your needs (vegetarian, allergies, etc.) and we’ll guide you to the best-fit stops for your group.",
            ar: "أخبرنا باحتياجاتك (نباتي، حساسية، وغيرها) وسنوجّهك لأفضل محطات تناسب مجموعتك.",
          },
          imageSrc: "/images/about/dietary.jpg",
          imageAlt: { en: "A spread of food options", ar: "خيارات طعام متنوعة" },
          showCTA: false,
        },
        {
          key: "moments" as const,
          label: { en: "Memorable Moments", ar: "لحظات لا تُنسى" },
          flip: { en: "Lasting Memories", ar: "ذكريات تدوم" },
          title: { en: "Moments Worth Keeping", ar: "لحظات تستحق أن تُحفظ" },
          body: {
            en: "Each stop is a small story—photos, laughs, and a finale with a view. Perfect for couples, friends, and visitors.",
            ar: "كل محطة قصة صغيرة — صور وضحكات ونهاية بإطلالة. مثالية للأصدقاء والزوار والثنائيات.",
          },
          imageSrc: "/images/about/moments.jpg",
          imageAlt: { en: "Friends enjoying a rooftop view", ar: "أصدقاء يستمتعون بإطلالة" },
          showCTA: false,
        },
        {
          key: "booking" as const,
          label: { en: "Easy Booking", ar: "حجز سهل" },
          flip: { en: "Seamless Process", ar: "عملية سلسة" },
          title: { en: "Book in Minutes", ar: "احجز خلال دقائق" },
          body: {
            en: "Pick a date, checkout securely, and you’re set. After booking, your Puzzle Portal unlocks to guide you through the route.",
            ar: "اختر التاريخ، ادفع بأمان، وانطلق. بعد الحجز تُفتح بوابة الألغاز لتقودك في المسار.",
          },
          imageSrc: "/images/about/booking.jpg",
          imageAlt: { en: "Simple booking on a phone", ar: "حجز سهل عبر الهاتف" },
          showCTA: true,
        },
      ] as const,
    []
  );

  const [activeAboutKey, setActiveAboutKey] = useState<AboutTabKey>("cultural");
  const activeAbout = aboutTabs.find((x) => x.key === activeAboutKey) ?? aboutTabs[0];

  function TabLabel({
    label,
    flip,
    active,
  }: {
    label: string;
    flip: string;
    active: boolean;
  }) {
    return (
      <span className="relative inline-block h-[1.3em] leading-none perspective-[900px]">
        <span
          className="relative inline-block"
          style={{
            transformStyle: "preserve-3d",
            transition: "transform 500ms ease",
            transform: active ? "rotateX(180deg)" : "rotateX(0deg)",
          }}
        >
          <span className="block" style={{ backfaceVisibility: "hidden" }}>
            {label}
          </span>
          <span
            className="block absolute inset-0 text-orange-500"
            style={{ transform: "rotateX(180deg)", backfaceVisibility: "hidden" }}
          >
            {flip}
          </span>
        </span>
      </span>
    );
  }

  /* -------------------- FOOTER TEXT -------------------- */
  const footer = useMemo(
    () => ({
      explore: { en: "Explore", ar: "اكتشف" },
      support: { en: "Support", ar: "الدعم" },
      connect: { en: "Connect", ar: "تواصل" },
      links: {
        about: { en: "About us", ar: "من نحن" },
        hunts: { en: "Our hunts", ar: "تجاربنا" },
        testimonials: { en: "Testimonials", ar: "آراء العملاء" },
        faq: { en: "FAQ", ar: "الأسئلة الشائعة" },
        contact: { en: "Contact", ar: "تواصل" },
        privacy: { en: "Privacy Policy", ar: "سياسة الخصوصية" },
        blog: { en: "Blog", ar: "المدونة" },
        newsletter: { en: "Newsletter", ar: "النشرة البريدية" },
        partnerships: { en: "Partnerships", ar: "الشراكات" },
      },
      rightTitle: { en: "Taste Amman!", ar: "تذوّق عمّان!" },
      terms: { en: "Terms of Service", ar: "شروط الخدمة" },
      copyright: { en: "COPYRIGHT ©", ar: "حقوق النشر ©" },
    }),
    []
  );

  return (
    <main
      dir={isAr ? "rtl" : "ltr"}
      className={`min-h-screen bg-white text-neutral-900 ${fontClass}`}
    >
      {/* ==================== NAV ==================== */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="mx-auto max-w-7xl px-5">
          <nav className="mt-4 flex items-center justify-between rounded-2xl border border-white/10 bg-black/25 backdrop-blur-md px-4 py-3 text-white shadow-sm">
            {/* Logo */}
            <a
              href="#home"
              className="group flex items-center gap-3 rounded-xl px-2 py-1 transition hover:bg-white/10"
            >
              <div className="relative h-10 w-10 md:h-11 md:w-11">
                <Image
                  src="/logo.png"
                  alt="ZOWAR logo"
                  fill
                  sizes="44px"
                  className="object-contain transition-transform duration-500 ease-out group-hover:scale-[1.06] group-hover:-translate-y-[1px]"
                />
              </div>
              <span className="hidden sm:inline text-sm font-semibold tracking-wide">
                ZOWAR
              </span>
            </a>

            {/* Center links (desktop) */}
            <div className="hidden md:flex items-center gap-8 text-sm">
              <a className="hover:text-orange-300 transition" href="#home">
                {isAr ? "الرئيسية" : "Home"}
              </a>
              <a className="hover:text-orange-300 transition" href="#about">
                {isAr ? "اعرف أكثر" : "Learn More"}
              </a>
              <a className="hover:text-orange-300 transition" href="/booking">
                {isAr ? "احجز الآن" : "Book Now"}
              </a>
              <a className="hover:text-orange-300 transition" href="#contact">
                {isAr ? "تواصل" : "Contact"}
              </a>
            </div>

            {/* Right controls */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onMouseEnter={() => triggerFlash("lang")}
                onClick={() => {
                  triggerFlash("lang");
                  setLocale(locale === "en" ? "ar" : "en");
                }}
                className="flash-orange relative overflow-hidden rounded-full border border-white/25 px-3 py-2 text-xs sm:text-sm font-semibold"
                data-flash={flashLang}
              >
                {locale === "en" ? t.toggle.ar : t.toggle.en}
              </button>

              <div className="relative" ref={menuRef}>
                <button
                  type="button"
                  onMouseEnter={() => triggerFlash("menu")}
                  onClick={() => {
                    triggerFlash("menu");
                    setMenuOpen((s) => !s);
                  }}
                  className="flash-orange relative overflow-hidden rounded-full border border-white/25 px-3 py-2 text-xs sm:text-sm font-semibold"
                  data-flash={flashMenu}
                  aria-haspopup="menu"
                  aria-expanded={menuOpen}
                >
                  <span className="inline-flex items-center gap-2">
                    {isAr ? "القائمة" : "Menu"}
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      className="opacity-90"
                    >
                      <path
                        fill="currentColor"
                        d="M4 7h16v2H4V7Zm0 8h16v2H4v-2Zm0-4h16v2H4v-2Z"
                      />
                    </svg>
                  </span>
                </button>

                {menuOpen ? (
                  <div
                    role="menu"
                    className={[
                      "absolute z-50 mt-2 w-60 overflow-hidden rounded-2xl border border-white/10 bg-black/70 backdrop-blur-md shadow-xl text-white",
                      isAr ? "left-0" : "right-0",
                    ].join(" ")}
                  >
                    <a
                      role="menuitem"
                      href="#about"
                      onClick={() => setMenuOpen(false)}
                      className="block px-4 py-3 text-sm hover:bg-white/10 transition"
                    >
                      {isAr ? "اعرف أكثر" : "Learn more"}
                    </a>
                    <a
                      role="menuitem"
                      href="/booking"
                      onClick={() => setMenuOpen(false)}
                      className="block px-4 py-3 text-sm hover:bg-white/10 transition"
                    >
                      {isAr ? "احجز الآن" : "Book now"}
                    </a>
                    <div className="h-px bg-white/10" />
                    <a
                      role="menuitem"
                      href="/collaborate"
                      onClick={() => setMenuOpen(false)}
                      className="block px-4 py-3 text-sm hover:bg-white/10 transition"
                    >
                      {isAr ? "تعاون معنا" : "Collaborate with us"}
                    </a>
                    <a
                      role="menuitem"
                      href="/portal"
                      onClick={() => setMenuOpen(false)}
                      className="block px-4 py-3 text-sm hover:bg-white/10 transition"
                    >
                      {isAr ? "بوابة الألغاز 🔒" : "Puzzle Portal 🔒"}
                    </a>
                  </div>
                ) : null}
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* ==================== HERO ==================== */}
      <section id="home" className="relative min-h-[92vh] w-full overflow-hidden">
        {/* Background crossfade */}
        {heroMedia.map((m, i) => {
          const active = i === heroIndex;
          return (
            <div
              key={m.src}
              className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                active ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={m.src}
                alt={isAr ? m.alt.ar : m.alt.en}
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover"
              />
            </div>
          );
        })}

        {/* Overlays for readability */}
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/35 to-black/70" />

        {/* Content */}
        <div className="relative z-10 mx-auto flex min-h-[92vh] max-w-7xl items-center px-6 pt-28 pb-16">
          <div className="w-full text-center">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-orange-300 drop-shadow-[0_6px_18px_rgba(0,0,0,0.45)]">
              {isAr ? "حلّ. تذوّق. اكتشف عمّان" : "Solve. Taste. Discover Amman"}
            </h1>

            <p className="mx-auto mt-5 max-w-3xl text-base sm:text-lg text-white/90">
              {isAr
                ? "تجربة مدينة ذاتية الإرشاد حيث تحل الألغاز، وتتذوّق لقمات أيقونية، وتكتشف عمّان على وتيرتك."
                : "A self-guided city experience where you solve puzzles, taste iconic bites, and discover Amman at your own pace."}
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/booking"
                className="inline-flex items-center justify-center rounded-full bg-orange-300 text-black px-10 py-4 text-sm font-bold tracking-wide transition hover:bg-orange-200"
              >
                {isAr ? "احجز التجربة" : "Book the Experience"}
              </a>

              <a
                href="#about"
                className="inline-flex items-center justify-center rounded-full border border-white/60 bg-white/10 px-10 py-4 text-sm font-bold tracking-wide text-white transition hover:bg-white/20 hover:border-white"
              >
                {isAr ? "اعرف أكثر" : "Learn More"}
              </a>
            </div>

            <p className="mt-6 text-xs text-white/70">
              Payment currency currently:{" "}
              <span className="font-semibold text-white">{currency}</span>.{" "}
              {currency === "USD"
                ? "Once Stripe supports JOD on your account, we’ll switch to JOD."
                : null}
            </p>
          </div>
        </div>
      </section>

      {/* ==================== INSERT: HOW IT WORKS + SNAPSHOT ROW (from your image) ==================== */}
      <section className="bg-[#fff3e8] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-center text-3xl md:text-4xl font-bold">
            {isAr ? "كيف تعمل التجربة" : "How It Works"}
          </h2>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                n: "1",
                title: isAr ? "احجز" : "Book",
                body: isAr ? "اختر التاريخ وافتح البوابة" : "Choose your date & unlock the portal",
              },
              {
                n: "2",
                title: isAr ? "حلّ" : "Solve",
                body: isAr ? "اتبع الإشارات عبر المدينة" : "Follow clues through the city",
              },
              {
                n: "3",
                title: isAr ? "تذوّق" : "Taste",
                body: isAr ? "استمتع بقمات أيقونية" : "Enjoy iconic bites along the way",
              },
            ].map((c) => (
              <div
                key={c.n}
                className="rounded-3xl bg-white/90 border border-black/5 shadow-sm px-8 py-7 text-center transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="text-orange-500 font-extrabold text-3xl">{c.n}</div>
                <div className="mt-3 font-bold">{c.title}</div>
                <div className="mt-2 text-sm text-neutral-600">{c.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Snapshot tiles row (adds Local partner stops next to 4–5 tastings) */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-4">
            {[
              { icon: "⏱️", label: isAr ? "٢–٣ ساعات" : "2–3 hrs" },
              { icon: "🚶", label: isAr ? "٢–٣ كم" : "2–3 km" },
              { icon: "🧩", label: isAr ? "سهل–متوسط" : "Easy–Medium" },
              { icon: "🍴", label: isAr ? "٤–٥ تذوّقات" : "4–5 tastings" },
              { icon: "🏪", label: isAr ? "محطات شركاء محليين" : "Local partner stops" },
              { icon: "🗺️", label: isAr ? "على وتيرتك" : "Self-paced" },
              { icon: "💬", label: isAr ? "مساعدة عند الحاجة" : "Help if needed" },
            ].map((x) => (
              <div
                key={x.label}
                className="min-w-[140px] rounded-2xl bg-neutral-100 px-6 py-4 text-center"
              >
                <div className="text-xl">{x.icon}</div>
                <div className="mt-2 text-xs font-semibold text-neutral-800">{x.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== LEARN MORE / ABOUT (animated tab section) ==================== */}
      <section id="about" className="mt-16 lg:mt-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center justify-center gap-10 text-sm text-neutral-700">
          {aboutTabs.map((tab) => {
            const active = tab.key === activeAboutKey;
            const labelText = isAr ? tab.label.ar : tab.label.en;
            const flipText = isAr ? tab.flip.ar : tab.flip.en;

            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveAboutKey(tab.key)}
                className={[
                  "group relative pb-3 transition select-none font-semibold",
                  "whitespace-nowrap",
                  active ? "text-neutral-900" : "hover:text-neutral-900",
                ].join(" ")}
              >
                <TabLabel label={labelText} flip={flipText} active={active} />
                <span
                  className={[
                    "absolute left-1/2 -bottom-[1px] h-[2px] rounded-full bg-orange-500 transition-all",
                    active
                      ? "w-28 -translate-x-1/2 opacity-100"
                      : "w-16 -translate-x-1/2 opacity-40 group-hover:opacity-70",
                  ].join(" ")}
                />
              </button>
            );
          })}
        </div>

        <div className="mt-8 rounded-3xl border border-neutral-200 bg-white p-8 md:p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="rounded-3xl overflow-hidden bg-neutral-100">
              <img
                src={activeAbout.imageSrc}
                alt={isAr ? activeAbout.imageAlt.ar : activeAbout.imageAlt.en}
                className="w-full h-[280px] md:h-[360px] object-cover"
              />
            </div>

            <div className={isAr ? "text-right" : "text-left"}>
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100">
                <span className="text-lg">◎</span>
              </div>

              <h3 className="text-2xl md:text-3xl font-medium">
                {isAr ? activeAbout.title.ar : activeAbout.title.en}
              </h3>

              <p className="mt-4 text-neutral-600 leading-relaxed">
                {isAr ? activeAbout.body.ar : activeAbout.body.en}
              </p>

              {activeAbout.showCTA ? (
                <div className="mt-8">
                  <a
                    href="/booking"
                    className="inline-flex items-center gap-3 rounded-full bg-orange-500 text-white px-6 py-3 text-sm font-medium hover:opacity-90 transition"
                  >
                    {isAr ? "احجز الآن" : "Book now"}
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-white/25">
                      →
                    </span>
                  </a>

                  <p className="mt-3 text-xs text-neutral-500">
                    {isAr
                      ? "ملاحظة: الدفع آمن وبوابة الألغاز تُفتح بعد إتمام الحجز."
                      : "Note: Secure checkout. Puzzle Portal unlocks after booking."}
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== CONTACT ==================== */}
      <section id="contact" className="px-6 max-w-7xl mx-auto py-16">
        <div className="rounded-3xl border border-neutral-200 bg-white p-8 md:p-10 shadow-sm">
          <h3 className="text-2xl md:text-3xl font-bold">
            {isAr ? "تواصل معنا" : "Contact"}
          </h3>
          <p className="mt-3 text-neutral-600">
            {isAr ? "هل لديك أسئلة أو ترتيبات خاصة؟" : "Questions or special accommodations?"}
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <a
              href="mailto:hello@zowar.com"
              className="inline-flex items-center justify-center rounded-full bg-orange-500 text-white px-6 py-3 text-sm font-semibold transition hover:bg-orange-400"
            >
              {isAr ? "راسلنا" : "Email us"}
            </a>

            <a
              href="/booking"
              className="inline-flex items-center justify-center rounded-full border border-orange-500 text-orange-500 px-6 py-3 text-sm font-semibold transition hover:bg-orange-50"
            >
              {isAr ? "اذهب للحجز" : "Go to booking"}
            </a>
          </div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
            <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-10">
              <div>
                <div className="inline-flex items-center gap-2">
                  <span className="text-xs uppercase tracking-[0.22em] text-white/60">
                    {isAr ? footer.explore.ar : footer.explore.en}
                  </span>
                  <span className="h-[2px] w-12 bg-orange-400/70" />
                </div>
                <ul className="mt-4 space-y-3 text-sm">
                  <li>
                    <a className="hover:text-orange-300 transition" href="#about">
                      {isAr ? footer.links.about.ar : footer.links.about.en}
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-orange-300 transition" href="/booking">
                      {isAr ? footer.links.hunts.ar : footer.links.hunts.en}
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-orange-300 transition" href="#">
                      {isAr ? footer.links.testimonials.ar : footer.links.testimonials.en}
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <div className="inline-flex items-center gap-2">
                  <span className="text-xs uppercase tracking-[0.22em] text-white/60">
                    {isAr ? footer.support.ar : footer.support.en}
                  </span>
                  <span className="h-[2px] w-12 bg-orange-400/70" />
                </div>
                <ul className="mt-4 space-y-3 text-sm">
                  <li>
                    <a className="hover:text-orange-300 transition" href="#">
                      {isAr ? footer.links.faq.ar : footer.links.faq.en}
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-orange-300 transition" href="#contact">
                      {isAr ? footer.links.contact.ar : footer.links.contact.en}
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-orange-300 transition" href="#">
                      {isAr ? footer.links.privacy.ar : footer.links.privacy.en}
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <div className="inline-flex items-center gap-2">
                  <span className="text-xs uppercase tracking-[0.22em] text-white/60">
                    {isAr ? footer.connect.ar : footer.connect.en}
                  </span>
                  <span className="h-[2px] w-12 bg-orange-400/70" />
                </div>
                <ul className="mt-4 space-y-3 text-sm">
                  <li>
                    <a className="hover:text-orange-300 transition" href="#">
                      {isAr ? footer.links.blog.ar : footer.links.blog.en}
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-orange-300 transition" href="#">
                      {isAr ? footer.links.newsletter.ar : footer.links.newsletter.en}
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-orange-300 transition" href="/collaborate">
                      {isAr ? footer.links.partnerships.ar : footer.links.partnerships.en}
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right with orange vertical line + socials */}
            <div className="md:col-span-4 flex md:justify-end">
              <div className="flex items-stretch gap-8">
                <div className="hidden md:block w-px bg-orange-400/35" />

                <div className={isAr ? "text-right" : "text-left"}>
                  <div className="text-sm font-semibold">
                    {isAr ? footer.rightTitle.ar : footer.rightTitle.en}
                  </div>

                  <div className="mt-4 flex items-center gap-4">
                    {/* Facebook */}
                    <a
                      href="#"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 hover:border-orange-300 hover:text-orange-300 transition"
                      aria-label="Facebook"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          fill="currentColor"
                          d="M13 22v-8h3l1-4h-4V7c0-1.1.3-2 2-2h2V1h-3c-3.4 0-5 2-5 5v4H8v4h3v8h2Z"
                        />
                      </svg>
                    </a>

                    {/* Instagram */}
                    <a
                      href="#"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 hover:border-orange-300 hover:text-orange-300 transition"
                      aria-label="Instagram"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          fill="currentColor"
                          d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3Zm-5 4a4 4 0 1 1 0 8a4 4 0 0 1 0-8Zm0 2a2 2 0 1 0 0 4a2 2 0 0 0 0-4Zm5.2-.9a1.1 1.1 0 1 1-2.2 0a1.1 1.1 0 0 1 2.2 0Z"
                        />
                      </svg>
                    </a>

                    {/* TikTok */}
                    <a
                      href="#"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 hover:border-orange-300 hover:text-orange-300 transition"
                      aria-label="TikTok"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          fill="currentColor"
                          d="M14 3c.7 2.4 2.3 4 4.7 4.4V10c-1.9-.1-3.4-.8-4.7-2v7.1c0 3.1-2.5 5.6-5.6 5.6S3 18.2 3 15.1s2.5-5.6 5.6-5.6c.4 0 .8 0 1.1.1v3.1c-.3-.1-.7-.2-1.1-.2-1.4 0-2.6 1.2-2.6 2.6s1.2 2.6 2.6 2.6 2.6-1.2 2.6-2.6V3h2Z"
                        />
                      </svg>
                    </a>
                  </div>

                  <p className="mt-6 text-xs text-white/60">
                    {footer.copyright.en} {new Date().getFullYear()} ZOWAR.{" "}
                    {isAr ? "جميع الحقوق محفوظة." : "ALL RIGHTS RESERVED."}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-white/10 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-white/60">
            <span>{t.sections.footerCity}</span>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-orange-300 transition">
                {isAr ? footer.terms.ar : footer.terms.en}
              </a>
              <span className="opacity-30">|</span>
              <a href="#" className="hover:text-orange-300 transition">
                {isAr ? footer.links.privacy.ar : footer.links.privacy.en}
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* ==================== GLOBAL STYLES ==================== */}
      <style jsx global>{`
        /* Flash orange effect used by Menu + Language buttons */
        .flash-orange {
          transition: color 220ms ease, border-color 220ms ease;
        }
        .flash-orange::before {
          content: "";
          position: absolute;
          inset: 0;
          background: rgba(249, 115, 22, 0.95);
          opacity: 0;
          transform: scale(0.98);
          transition: opacity 220ms ease, transform 220ms ease;
          z-index: -1;
        }
        .flash-orange:hover {
          border-color: rgba(251, 146, 60, 0.95);
          color: #111;
        }
        .flash-orange:hover::before {
          opacity: 1;
          transform: scale(1);
        }
        .flash-orange[data-flash] {
          position: relative;
          z-index: 0;
        }
        .flash-orange[data-flash]::after {
          content: "";
          position: absolute;
          inset: -2px;
          border-radius: 9999px;
          background: rgba(249, 115, 22, 0.25);
          opacity: 0;
          pointer-events: none;
        }
        .flash-orange[data-flash][data-flash]::after {
          animation: orangePulse 520ms ease-out;
        }
        @keyframes orangePulse {
          0% {
            opacity: 0;
            transform: scale(0.98);
          }
          35% {
            opacity: 1;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(1.02);
          }
        }
      `}</style>
    </main>
  );
}