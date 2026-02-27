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

  // ✅ keep lang across pages
  const aboutHref = `/about?lang=${isAr ? "ar" : "en"}`;
  const bookingHref = `/booking?lang=${isAr ? "ar" : "en"}`;
  const portalHref = `/portal?lang=${isAr ? "ar" : "en"}`;
  const collaborateHref = `/collaborate?lang=${isAr ? "ar" : "en"}`;

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

  /* -------------------- HERO BACKGROUND MEDIA -------------------- */
  const heroMedia = useMemo(
    () => [
      { src: "/images/street-food.jpg", alt: { en: "Amman street food", ar: "طعام شارع في عمّان" } },
      { src: "/images/spices.jpg", alt: { en: "Spices", ar: "بهارات" } },
      { src: "/images/desserts.jpg", alt: { en: "Desserts", ar: "حلويات" } },
    ],
    []
  );

  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setHeroIndex((i) => (i + 1) % heroMedia.length), 4500);
    return () => clearInterval(id);
  }, [heroMedia.length]);

  /* -------------------- ABOUT TABS -------------------- */
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
            ar: "كل محطة قصة صغيرة — صور وضحكات ونهاية بإطلالة. مثالية للأصدقاء والزوار.",
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
            className="block absolute inset-0 z-orange"
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

  /* -------------------- MOBILE CTA (sticky) -------------------- */
  const stickyCtaHref = bookingHref;
  const stickyCtaLabel = isAr ? "احجز التجربة" : "Book the Experience";

  // ✅ match booking/collaborate background tone
  const pageBg =
    "min-h-screen text-neutral-900 bg-[radial-gradient(900px_600px_at_18%_24%,rgba(249,115,22,0.16),transparent_55%),radial-gradient(700px_500px_at_80%_30%,rgba(0,0,0,0.06),transparent_55%),linear-gradient(to_bottom,#ffffff,#f6f6f7)]";

  return (
    <main dir={isAr ? "rtl" : "ltr"} className={`${pageBg} ${fontClass}`}>
      {/* ==================== NAV ==================== */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="mx-auto max-w-7xl px-5">
          <nav className="mt-4 flex items-center justify-between rounded-2xl border border-black/10 bg-white/70 backdrop-blur-md px-4 py-3 text-neutral-900 shadow-sm">
            {/* Logo -> home (hover anim like booking) */}
            <a
              href={isAr ? "/?lang=ar" : "/?lang=en"}
              className="group flex items-center gap-3 rounded-xl px-2 py-2 transition hover:bg-black/[0.03]"
              aria-label="Go to home"
            >
              <div className="relative h-10 w-10 md:h-11 md:w-11">
                <Image
                  src="/logo.png"
                  alt="ZOWAR logo"
                  fill
                  sizes="44px"
                  className="object-contain opacity-95 transition-transform duration-200 ease-out group-hover:opacity-100 group-hover:-translate-y-[2px] group-hover:rotate-[-1deg] group-hover:scale-[1.02]"
                />
              </div>
              <span className="hidden sm:inline text-sm font-semibold tracking-wide">ZOWAR</span>
            </a>

            {/* Center links (desktop) */}
            <div className="hidden md:flex items-center gap-8 text-sm">
              <a className="hover:z-orange transition" href="#home">
                {isAr ? "الرئيسية" : "Home"}
              </a>
              <a className="hover:z-orange transition" href="#about">
                {isAr ? "اعرف أكثر" : "Learn More"}
              </a>
              <a className="hover:z-orange transition" href={aboutHref}>
                {isAr ? "عن زوّار" : "About Zowar"}
              </a>
              <a className="hover:z-orange transition" href={bookingHref}>
                {isAr ? "احجز الآن" : "Book Now"}
              </a>
              <a className="hover:z-orange transition" href="#contact">
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
                className="flash-orange relative rounded-full border border-black/10 bg-white/80 px-4 py-3 text-xs sm:text-sm font-semibold"
                data-flash={flashLang}
                aria-label={locale === "en" ? "Switch to Arabic" : "Switch to English"}
              >
                <span>{locale === "en" ? t.toggle.ar : t.toggle.en}</span>
              </button>

              <div className="relative" ref={menuRef}>
                <button
                  type="button"
                  onMouseEnter={() => triggerFlash("menu")}
                  onClick={() => {
                    triggerFlash("menu");
                    setMenuOpen((s) => !s);
                  }}
                  className="flash-orange relative rounded-full border border-black/10 bg-white/80 px-4 py-3 text-xs sm:text-sm font-semibold"
                  data-flash={flashMenu}
                  aria-haspopup="menu"
                  aria-expanded={menuOpen}
                >
                  <span className="inline-flex items-center gap-2">
                    {isAr ? "القائمة" : "Menu"}
                    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" className="opacity-80">
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
                      "absolute z-50 mt-2 w-64 overflow-hidden rounded-2xl border border-black/10 bg-white/90 backdrop-blur-md shadow-xl text-neutral-900",
                      isAr ? "left-0" : "right-0",
                    ].join(" ")}
                  >
                    <a
                      role="menuitem"
                      href="#about"
                      onClick={() => setMenuOpen(false)}
                      className="block px-4 py-4 text-sm hover:bg-black/[0.03] transition"
                    >
                      {isAr ? "اعرف أكثر" : "Learn more"}
                    </a>

                    <a
                      role="menuitem"
                      href={aboutHref}
                      onClick={() => setMenuOpen(false)}
                      className="block px-4 py-4 text-sm hover:bg-black/[0.03] transition"
                    >
                      {isAr ? "عن زوّار" : "About Zowar"}
                    </a>

                    <a
                      role="menuitem"
                      href={bookingHref}
                      onClick={() => setMenuOpen(false)}
                      className="block px-4 py-4 text-sm hover:bg-black/[0.03] transition"
                    >
                      {isAr ? "احجز الآن" : "Book now"}
                    </a>

                    <div className="h-px bg-black/10" />

                    <a
                      role="menuitem"
                      href={collaborateHref}
                      onClick={() => setMenuOpen(false)}
                      className="block px-4 py-4 text-sm hover:bg-black/[0.03] transition"
                    >
                      {isAr ? "تعاون معنا" : "Collaborate with us"}
                    </a>
                    <a
                      role="menuitem"
                      href={portalHref}
                      onClick={() => setMenuOpen(false)}
                      className="block px-4 py-4 text-sm hover:bg-black/[0.03] transition"
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
      <section id="home" className="relative w-full overflow-hidden min-h-[78vh] sm:min-h-[86vh]">
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
        <div className="relative z-10 mx-auto flex min-h-[78vh] sm:min-h-[86vh] max-w-7xl items-center px-6 pt-24 pb-10">
          <div className="w-full text-center">
            {/* ✅ Premium partial-orange treatment using YOUR utilities (z-orange) */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white drop-shadow-[0_6px_18px_rgba(0,0,0,0.45)]">
              {isAr ? (
                <span className="z-orange">حلّ. تذوّق. اكتشف</span>
              ) : (
                <>
                  <span className="z-orange">Solve.</span>{" "}
                  <span className="z-orange">Taste.</span>{" "}
                  <span className="z-orange">Discover</span> Amman
                </>
              )}
            </h1>

            <p className="mx-auto mt-4 max-w-3xl text-sm sm:text-lg text-white/90">
              {isAr
                ? "تجربة مدينة ذاتية الإرشاد حيث تحل الألغاز، وتتذوّق لقمات أيقونية، وتكتشف عمّان على وتيرتك."
                : "A self-guided city experience where you solve puzzles, taste iconic bites, and discover Amman at your own pace."}
            </p>

            <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={bookingHref}
                className="inline-flex w-full sm:w-auto items-center justify-center rounded-full bg-z-orange text-neutral-950 px-10 py-4 text-sm font-extrabold tracking-wide transition hover:opacity-95"
              >
                {isAr ? "احجز التجربة" : "Book the Experience"}
              </a>

              <a
                href="#about"
                className="inline-flex w-full sm:w-auto items-center justify-center rounded-full border border-white/60 bg-white/10 px-10 py-4 text-sm font-bold tracking-wide text-white transition hover:bg-white/20 hover:border-white"
              >
                {isAr ? "اعرف أكثر" : "Learn More"}
              </a>
            </div>

            <span className="sr-only">Currency: {currency}</span>
          </div>
        </div>
      </section>

      {/* ==================== HOW IT WORKS ==================== */}
      <section className="bg-[#fff3e8] py-14 sm:py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-center text-3xl md:text-4xl font-bold">{isAr ? "كيف تعمل التجربة" : "How It Works"}</h2>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: "🎟️",
                n: "1",
                title: isAr ? "احجز" : "Book",
                body: isAr ? "اختر التاريخ وافتح البوابة" : "Choose your date & unlock the portal",
              },
              {
                icon: "🧩",
                n: "2",
                title: isAr ? "حلّ" : "Solve",
                body: isAr ? "اتبع الإشارات عبر المدينة" : "Follow clues through the city",
              },
              {
                icon: "🍢",
                n: "3",
                title: isAr ? "تذوّق" : "Taste",
                body: isAr ? "استمتع بقمات أيقونية" : "Enjoy iconic bites along the way",
              },
            ].map((c) => (
              <div
                key={c.n}
                className="rounded-3xl bg-white/95 border border-black/5 shadow-sm px-7 py-7 text-left transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <div className="text-2xl">{c.icon}</div>
                  {/* ✅ your utility */}
                  <div className="z-orange font-extrabold text-2xl">{c.n}</div>
                </div>
                <div className="mt-4 font-bold text-lg">{c.title}</div>
                <div className="mt-2 text-sm text-neutral-600 leading-relaxed">{c.body}</div>

                <div className="mt-5 h-px bg-black/5" />
                <div className="mt-4 text-xs text-neutral-500">
                  {c.n === "1"
                    ? isAr
                      ? "بعد الحجز ستظهر بوابة الألغاز."
                      : "After booking, your Puzzle Portal unlocks."
                    : c.n === "2"
                    ? isAr
                      ? "ستحصل على تلميحات عند الحاجة."
                      : "Hints are available if you get stuck."
                    : isAr
                    ? "النهاية بإطلالة + لقمة مميزة."
                    : "Finish with a view + a final bite."}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== SNAPSHOT ROW ==================== */}
      <section className="py-10 sm:py-12 bg-transparent">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-3">
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
                className="min-w-[150px] rounded-2xl bg-white/80 border border-black/5 px-6 py-4 text-center shadow-sm"
              >
                <div className="text-xl">{x.icon}</div>
                <div className="mt-2 text-xs font-semibold text-neutral-800">{x.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== LEARN MORE / ABOUT ==================== */}
      <section id="about" className="mt-14 lg:mt-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-neutral-700">
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
                    "absolute left-1/2 -bottom-[1px] h-[2px] rounded-full bg-z-orange transition-all",
                    active
                      ? "w-28 -translate-x-1/2 opacity-100"
                      : "w-16 -translate-x-1/2 opacity-40 group-hover:opacity-70",
                  ].join(" ")}
                />
              </button>
            );
          })}
        </div>

        <div className="mt-8 rounded-3xl border border-black/10 bg-white/80 backdrop-blur-xl p-8 md:p-10 shadow-[0_18px_60px_rgba(0,0,0,0.08)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="rounded-3xl overflow-hidden bg-neutral-100">
              <img
                src={activeAbout.imageSrc}
                alt={isAr ? activeAbout.imageAlt.ar : activeAbout.imageAlt.en}
                className="w-full h-[280px] md:h-[360px] object-cover"
              />
            </div>

            <div className={isAr ? "text-right" : "text-left"}>
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/[0.03] border border-black/10">
                <span className="text-lg z-orange">◎</span>
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
                    href={bookingHref}
                    className="inline-flex items-center gap-3 rounded-full bg-z-orange text-neutral-950 px-6 py-3 text-sm font-extrabold hover:opacity-95 transition"
                  >
                    {isAr ? "احجز الآن" : "Book now"}
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-black/10">
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
        <div className="rounded-3xl border border-black/10 bg-white/80 backdrop-blur-xl p-8 md:p-10 shadow-[0_18px_60px_rgba(0,0,0,0.08)]">
          <h3 className="text-2xl md:text-3xl font-bold">{isAr ? "تواصل معنا" : "Contact"}</h3>
          <p className="mt-3 text-neutral-600">
            {isAr ? "هل لديك أسئلة أو ترتيبات خاصة؟" : "Questions or special accommodations?"}
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <a
              href="mailto:hello@zowar.com"
              className="inline-flex items-center justify-center rounded-full bg-z-orange text-neutral-950 px-6 py-4 text-sm font-extrabold transition hover:opacity-95"
            >
              {isAr ? "راسلنا" : "Email us"}
            </a>

            <a
              href={bookingHref}
              className="inline-flex items-center justify-center rounded-full border border-z-orange px-6 py-4 text-sm font-semibold transition hover:bg-black/[0.03] z-orange"
            >
              {isAr ? "اذهب للحجز" : "Go to booking"}
            </a>
          </div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-6 py-14 pb-28 md:pb-14">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
            <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-10">
              <div>
                <div className="inline-flex items-center gap-2">
                  <span className="text-xs uppercase tracking-[0.22em] text-white/60">
                    {isAr ? footer.explore.ar : footer.explore.en}
                  </span>
                  <span className="h-[2px] w-12 bg-z-orange/70" />
                </div>
                <ul className="mt-4 space-y-3 text-sm">
                  <li>
                    <a className="hover:text-white transition z-orange" href={aboutHref}>
                      {isAr ? footer.links.about.ar : footer.links.about.en}
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-white transition z-orange" href={bookingHref}>
                      {isAr ? footer.links.hunts.ar : footer.links.hunts.en}
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-white/90 transition" href="#">
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
                  <span className="h-[2px] w-12 bg-z-orange/70" />
                </div>
                <ul className="mt-4 space-y-3 text-sm">
                  <li>
                    <a className="hover:text-white/90 transition" href="#">
                      {isAr ? footer.links.faq.ar : footer.links.faq.en}
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-white/90 transition" href="#contact">
                      {isAr ? footer.links.contact.ar : footer.links.contact.en}
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-white/90 transition" href="#">
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
                  <span className="h-[2px] w-12 bg-z-orange/70" />
                </div>
                <ul className="mt-4 space-y-3 text-sm">
                  <li>
                    <a className="hover:text-white/90 transition" href="#">
                      {isAr ? footer.links.blog.ar : footer.links.blog.en}
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-white/90 transition" href="#">
                      {isAr ? footer.links.newsletter.ar : footer.links.newsletter.en}
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-white/90 transition" href={collaborateHref}>
                      {isAr ? footer.links.partnerships.ar : footer.links.partnerships.en}
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="md:col-span-4 flex md:justify-end">
              <div className="flex items-stretch gap-8">
                <div className="hidden md:block w-px bg-z-orange/35" />

                <div className={isAr ? "text-right" : "text-left"}>
                  <div className="text-sm font-semibold">{isAr ? footer.rightTitle.ar : footer.rightTitle.en}</div>

                  <div className="mt-4 flex items-center gap-4">
                    <a
                      href="#"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 hover:border-z-orange hover:text-white transition"
                      aria-label="Facebook"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          fill="currentColor"
                          d="M13 22v-8h3l1-4h-4V7c0-1.1.3-2 2-2h2V1h-3c-3.4 0-5 2-5 5v4H8v4h3v8h2Z"
                        />
                      </svg>
                    </a>

                    <a
                      href="#"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 hover:border-z-orange hover:text-white transition"
                      aria-label="Instagram"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          fill="currentColor"
                          d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3Zm-5 4a4 4 0 1 1 0 8a4 4 0 0 1 0-8Zm0 2a2 2 0 1 0 0 4a2 2 0 0 0 0-4Zm5.2-.9a1.1 1.1 0 1 1-2.2 0a1.1 1.1 0 0 1 2.2 0Z"
                        />
                      </svg>
                    </a>

                    <a
                      href="#"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 hover:border-z-orange hover:text-white transition"
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
              <a href="#" className="hover:text-white transition">
                {isAr ? footer.terms.ar : footer.terms.en}
              </a>
              <span className="opacity-30">|</span>
              <a href="#" className="hover:text-white transition">
                {isAr ? footer.links.privacy.ar : footer.links.privacy.en}
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* ==================== STICKY MOBILE CTA ==================== */}
      <div className="fixed bottom-0 left-0 right-0 z-[60] md:hidden">
        <div className="mx-auto max-w-7xl px-5 pb-4">
          <div className="rounded-2xl border border-black/10 bg-white/70 backdrop-blur-md shadow-xl p-3">
            <a
              href={stickyCtaHref}
              className="inline-flex w-full items-center justify-center rounded-xl bg-z-orange text-neutral-950 py-4 text-sm font-extrabold tracking-wide transition active:scale-[0.99] hover:opacity-95"
              aria-label={stickyCtaLabel}
            >
              {stickyCtaLabel}
              <span className="ml-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-black/10">
                →
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* ==================== GLOBAL STYLES ==================== */}
      {/* ✅ REMOVE the old inline flash-orange CSS (it was overriding your globals + hiding orange with z-index:-1) */}
    </main>
  );
}