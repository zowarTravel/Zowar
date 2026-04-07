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

function IconImage({
  src,
  alt,
  size = 28,
  className = "",
}: {
  src: string;
  alt: string;
  size?: number;
  className?: string;
}) {
  return (
    <div
      className={`relative shrink-0 ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <Image src={src} alt={alt} fill sizes={`${size}px`} className="object-contain" />
    </div>
  );
}

export default function HomeClient() {
  /* -------------------- LOCALE -------------------- */
  const [locale, setLocale] = useState<Locale>("en");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith("ar")) setLocale("ar");
    else if (browserLang.startsWith("es")) setLocale("es");
  }, []);

  const t = useMemo(() => content[locale], [locale]);
  const isAr = locale === "ar";
  const fontClass = isAr ? tajawal.className : fredoka.className;

  function tr(en: string, ar: string, es: string): string {
    return locale === "ar" ? ar : locale === "es" ? es : en;
  }

  /* -------------------- KEEP LANG ACROSS PAGES -------------------- */
  const aboutHref = `/about?lang=${locale}`;
  const bookingHref = `/booking?lang=${locale}`;
  const portalHref = `/portal?lang=${locale}`;
  const collaborateHref = `/collaborate?lang=${locale}`;
  const faqHref = `/faq?lang=${locale}`;

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

  /* -------------------- LANGUAGE DROPDOWN -------------------- */
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (!langOpen) return;
      const el = langRef.current;
      if (!el) return;
      if (e.target instanceof Node && !el.contains(e.target)) setLangOpen(false);
    }
    window.addEventListener("mousedown", onDown);
    return () => window.removeEventListener("mousedown", onDown);
  }, [langOpen]);

  const langLabel = locale === "ar" ? "العربية" : locale === "es" ? "Español" : "English";

  /* -------------------- “FLASH ORANGE” (hover + click) -------------------- */
  const [flashMenu, setFlashMenu] = useState(0);

  function triggerFlash() {
    setFlashMenu((x) => x + 1);
  }

  /* -------------------- HERO BACKGROUND MEDIA -------------------- */
  const heroMedia = useMemo(
    () => [
      { src: "/images/street-food.jpg", alt: { en: "Amman street food", ar: "طعام شارع في عمّان", es: "Comida callejera de Amán" } },
      { src: "/images/spices.jpg", alt: { en: "Spices", ar: "بهارات", es: "Especias" } },
      { src: "/images/desserts.jpg", alt: { en: "Desserts", ar: "حلويات", es: "Postres" } },
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
          label: { en: "Cultural Immersion", ar: "تجربة ثقافية", es: "Inmersión Cultural" },
          flip: { en: "Local Delights", ar: "مذاقات محلية", es: "Delicias Locales" },
          title: { en: "Taste the Culture, Live the City", ar: "تذوّق الثقافة وعِش المدينة", es: "Prueba la Cultura, Vive la Ciudad" },
          body: {
            en: "Beyond food, ZOWAR is a journey through Amman’s stories—follow clues, meet local gems, and explore one stop at a time.",
            ar: "أكثر من مجرد طعام — زوّار رحلة داخل قصص عمّان. اتبع الإشارات واكتشف الأماكن المحلية خطوة بخطوة.",
            es: "Más que comida, ZOWAR es un viaje por las historias de Amán — sigue pistas, descubre joyas locales y explora parada a parada.",
          },
          imageSrc: "/images/about/cultural.jpg",
          imageAlt: { en: "Colorful streets of Amman", ar: "شوارع عمّان الملوّنة", es: "Las coloridas calles de Amán" },
          showCTA: false,
        },
        {
          key: "dietary" as const,
          label: { en: "Dietary Restrictions", ar: "قيود غذائية", es: "Restricciones Dietéticas" },
          flip: { en: "Tailored Experience", ar: "تجربة مخصّصة", es: "Experiencia Personalizada" },
          title: { en: "Made for Your Preferences", ar: "مصممة حسب تفضيلاتك", es: "Diseñada para Tus Preferencias" },
          body: {
            en: "Tell us your needs (vegetarian, allergies, etc.) and we’ll guide you to the best-fit stops for your group.",
            ar: "أخبرنا باحتياجاتك (نباتي، حساسية، وغيرها) وسنوجّهك لأفضل محطات تناسب مجموعتك.",
            es: "Cuéntanos tus necesidades (vegetariano, alergias, etc.) y te guiaremos a las paradas más adecuadas para tu grupo.",
          },
          imageSrc: "/images/about/dietary.jpg",
          imageAlt: { en: "A spread of food options", ar: "خيارات طعام متنوعة", es: "Una variedad de opciones gastronómicas" },
          showCTA: false,
        },
        {
          key: "moments" as const,
          label: { en: "Memorable Moments", ar: "لحظات لا تُنسى", es: "Momentos Memorables" },
          flip: { en: "Lasting Memories", ar: "ذكريات تدوم", es: "Recuerdos Duraderos" },
          title: { en: "Moments Worth Keeping", ar: "لحظات تستحق أن تُحفظ", es: "Momentos que Vale la Pena Guardar" },
          body: {
            en: "Each stop is a small story—photos, laughs, and a finale with a view. Perfect for couples, friends, and visitors.",
            ar: "كل محطة قصة صغيرة — صور وضحكات ونهاية بإطلالة. مثالية للأصدقاء والزوار.",
            es: "Cada parada es una pequeña historia — fotos, risas y un final con vistas. Perfecta para parejas, amigos y visitantes.",
          },
          imageSrc: "/images/about/moments.jpg",
          imageAlt: { en: "Friends enjoying a rooftop view", ar: "أصدقاء يستمتعون بإطلالة", es: "Amigos disfrutando de una vista desde una azotea" },
          showCTA: false,
        },
        {
          key: "booking" as const,
          label: { en: "Easy Booking", ar: "حجز سهل", es: "Reserva Fácil" },
          flip: { en: "Seamless Process", ar: "عملية سلسة", es: "Proceso Sin Complicaciones" },
          title: { en: "Book in Minutes", ar: "احجز خلال دقائق", es: "Reserva en Minutos" },
          body: {
            en: "Pick a date, checkout securely, and you’re set. After booking, your Puzzle Portal unlocks to guide you through the route. Your Zowar payment is made once at checkout, with no additional Zowar charges during the experience unless you choose optional extras outside the package.",
            ar: "اختر التاريخ، وادفع بأمان، وانطلق. بعد الحجز تُفتح بوابة الألغاز لتقودك في المسار. يتم دفع قيمة Zowar مرة واحدة فقط عند الحجز، ولا توجد أي دفعات إضافية لـ Zowar أثناء التجربة إلا إذا اخترت إضافات اختيارية خارج الباقة.",
            es: "Elige una fecha, paga de forma segura y listo. Tras reservar, tu Portal de Puzzles se desbloquea para guiarte por la ruta. El pago de Zowar se realiza una sola vez al reservar, sin cargos adicionales durante la experiencia salvo que elijas extras opcionales fuera del paquete.",
          },
          imageSrc: "/images/about/booking.jpg",
          imageAlt: { en: "Simple booking on a phone", ar: "حجز سهل عبر الهاتف", es: "Reserva sencilla desde el teléfono" },
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
      explore: { en: "Explore", ar: "اكتشف", es: "Explorar" },
      support: { en: "Support", ar: "الدعم", es: "Soporte" },
      connect: { en: "Connect", ar: "تواصل", es: "Conectar" },
      links: {
        about: { en: "About us", ar: "من نحن", es: "Sobre nosotros" },
        hunts: { en: "Our hunts", ar: "تجاربنا", es: "Nuestras rutas" },
        testimonials: { en: "Testimonials", ar: "آراء العملاء", es: "Testimonios" },
        faq: { en: "FAQ", ar: "الأسئلة الشائعة", es: "Preguntas Frecuentes" },
        contact: { en: "Contact", ar: "تواصل", es: "Contacto" },
        privacy: { en: "Privacy Policy", ar: "سياسة الخصوصية", es: "Política de Privacidad" },
        blog: { en: "Blog", ar: "المدونة", es: "Blog" },
        newsletter: { en: "Newsletter", ar: "النشرة البريدية", es: "Boletín" },
        partnerships: { en: "Partnerships", ar: "الشراكات", es: "Colaboraciones" },
      },
      rightTitle: { en: "Taste Amman!", ar: "تذوّق عمّان!", es: "¡Prueba Amán!" },
      terms: { en: "Terms of Service", ar: "شروط الخدمة", es: "Términos de Servicio" },
      copyright: { en: "COPYRIGHT ©", ar: "حقوق النشر ©", es: "Derechos de autor ©" },
    }),
    []
  );

  /* -------------------- MOBILE CTA (sticky) -------------------- */
  const stickyCtaHref = bookingHref;
  const stickyCtaLabel = tr("Book the Experience", "احجز التجربة", "Reserva la Experiencia");

  /* -------------------- PAGE BACKGROUND -------------------- */
  const pageBg =
    "min-h-screen text-neutral-900 bg-[radial-gradient(900px_600px_at_18%_24%,rgba(249,115,22,0.16),transparent_55%),radial-gradient(700px_500px_at_80%_30%,rgba(0,0,0,0.06),transparent_55%),linear-gradient(to_bottom,#ffffff,#f6f6f7)]";

  const howItWorksCards = [
    {
      iconSrc: "/images/Icons/Booking.png",
      iconAlt: tr("Booking icon", "أيقونة الحجز", "Icono de reserva"),
      n: "1",
      title: tr("Book", "احجز", "Reserva"),
      body: tr("Choose your date & unlock the portal", "اختر التاريخ وافتح البوابة", "Elige tu fecha y desbloquea el portal"),
      footer: tr("After booking, your Puzzle Portal unlocks.", "بعد الحجز ستظهر بوابة الألغاز.", "Tras reservar, tu Portal de Puzzles se desbloquea."),
    },
    {
      iconSrc: "/images/Icons/Puzzle.png",
      iconAlt: tr("Puzzle icon", "أيقونة اللغز", "Icono de puzzle"),
      n: "2",
      title: tr("Solve", "حلّ", "Resuelve"),
      body: tr("Follow clues through the city", "اتبع الإشارات عبر المدينة", "Sigue las pistas por la ciudad"),
      footer: tr("Hints are available if you get stuck.", "ستحصل على تلميحات عند الحاجة.", "Hay pistas disponibles si te quedas atascado."),
    },
    {
      iconSrc: "/images/Icons/Food.png",
      iconAlt: tr("Food icon", "أيقونة الطعام", "Icono de comida"),
      n: "3",
      title: tr("Taste", "تذوّق", "Prueba"),
      body: tr("Enjoy iconic bites along the way", "استمتع بقمات أيقونية", "Disfruta bocados icónicos a lo largo del camino"),
      footer: tr("Finish with a view + a final bite.", "النهاية بإطلالة + لقمة مميزة.", "Termina con unas vistas + un último bocado."),
    },
  ];

  const snapshotItems = [
    {
      iconSrc: "/images/Icons/Clock.png",
      iconAlt: tr("Clock icon", "أيقونة الوقت", "Icono de reloj"),
      label: tr("2–3 hrs", "٢–٣ ساعات", "2–3 hrs"),
    },
    {
      iconSrc: "/images/Icons/Walking.png",
      iconAlt: tr("Walking icon", "أيقونة المشي", "Icono de caminar"),
      label: tr("2–3 km", "٢–٣ كم", "2–3 km"),
    },
    {
      iconSrc: "/images/Icons/Puzzle.png",
      iconAlt: tr("Puzzle icon", "أيقونة اللغز", "Icono de puzzle"),
      label: tr("Easy–Medium", "سهل–متوسط", "Fácil–Medio"),
    },
    {
      iconSrc: "/images/Icons/Food.png",
      iconAlt: tr("Food icon", "أيقونة التذوّق", "Icono de comida"),
      label: tr("4–5 tastings", "٤–٥ تذوّقات", "4–5 degustaciones"),
    },
    {
      iconSrc: "/images/Icons/Shops.png",
      iconAlt: tr("Local partners icon", "أيقونة الشركاء المحليين", "Icono de socios locales"),
      label: tr("Local partner stops", "محطات شركاء محليين", "Paradas de socios locales"),
    },
    {
      iconSrc: "/images/Icons/Self-Guided.png",
      iconAlt: tr("Self-paced icon", "أيقونة التجربة الذاتية", "Icono de ritmo propio"),
      label: tr("Self-paced", "على وتيرتك", "A tu ritmo"),
    },
    {
      iconSrc: "/images/Icons/Puzzle.png",
      iconAlt: tr("Help icon", "أيقونة المساعدة", "Icono de ayuda"),
      label: tr("Help if needed", "مساعدة عند الحاجة", "Ayuda si es necesario"),
    },
  ];

  return (
    <main dir={isAr ? "rtl" : "ltr"} className={`${pageBg} ${fontClass}`}>
      {/* ==================== NAV ==================== */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="mx-auto max-w-7xl px-5">
          <nav className="mt-4 flex items-center justify-between rounded-2xl border border-black/10 bg-white/70 backdrop-blur-md px-4 py-3 text-neutral-900 shadow-sm">
            <a
              href={`/?lang=${locale}`}
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

            <div className="hidden md:flex items-center gap-8 text-sm">
              <a className="hover:z-orange transition" href="#home">
                {tr("Home", "الرئيسية", "Inicio")}
              </a>
              <a className="hover:z-orange transition" href={aboutHref}>
                {tr("About Zowar", "عن زوّار", "Sobre Zowar")}
              </a>
              <a className="hover:z-orange transition" href={bookingHref}>
                {tr("Book Now", "احجز الآن", "Reserva Ahora")}
              </a>
              <a className="hover:z-orange transition" href="#contact">
                {tr("Contact", "تواصل", "Contacto")}
              </a>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative" ref={langRef}>
                <button
                  type="button"
                  onClick={() => setLangOpen((s) => !s)}
                  className="flash-orange relative rounded-full border border-black/10 bg-white/80 px-4 py-3 text-xs sm:text-sm font-semibold"
                  aria-haspopup="listbox"
                  aria-expanded={langOpen}
                  aria-label="Switch language"
                >
                  <span className="inline-flex items-center gap-1">
                    {langLabel}
                    <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden="true" className="opacity-60">
                      <path fill="currentColor" d="M7 10l5 5 5-5H7Z" />
                    </svg>
                  </span>
                </button>

                {langOpen && (
                  <div
                    role="listbox"
                    className={[
                      "absolute z-50 mt-2 w-36 overflow-hidden rounded-2xl border border-black/10 bg-white/90 backdrop-blur-md shadow-xl text-neutral-900",
                      isAr ? "left-0" : "right-0",
                    ].join(" ")}
                  >
                    {(["en", "ar", "es"] as const).map((l) => (
                      <button
                        key={l}
                        role="option"
                        aria-selected={locale === l}
                        type="button"
                        onClick={() => { setLocale(l); setLangOpen(false); }}
                        className={[
                          "w-full px-4 py-3 text-left text-sm transition hover:bg-black/[0.03]",
                          locale === l ? "font-semibold z-orange" : "",
                        ].join(" ")}
                      >
                        {l === "en" ? "English" : l === "ar" ? "العربية" : "Español"}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="relative" ref={menuRef}>
                <button
                  type="button"
                  onMouseEnter={() => triggerFlash()}
                  onClick={() => {
                    triggerFlash();
                    setMenuOpen((s) => !s);
                  }}
                  className="flash-orange relative rounded-full border border-black/10 bg-white/80 px-4 py-3 text-xs sm:text-sm font-semibold"
                  data-flash={flashMenu}
                  aria-haspopup="menu"
                  aria-expanded={menuOpen}
                >
                  <span className="inline-flex items-center gap-2">
                    {tr("Menu", "القائمة", "Menú")}
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
                      {tr("Learn more", "اعرف أكثر", "Aprender Más")}
                    </a>

                    <a
                      role="menuitem"
                      href={aboutHref}
                      onClick={() => setMenuOpen(false)}
                      className="block px-4 py-4 text-sm hover:bg-black/[0.03] transition"
                    >
                      {tr("About Zowar", "عن زوّار", "Sobre Zowar")}
                    </a>

                    <a
                      role="menuitem"
                      href={bookingHref}
                      onClick={() => setMenuOpen(false)}
                      className="block px-4 py-4 text-sm hover:bg-black/[0.03] transition"
                    >
                      {tr("Book now", "احجز الآن", "Reserva ahora")}
                    </a>

                    <a
                      role="menuitem"
                      href={faqHref}
                      onClick={() => setMenuOpen(false)}
                      className="block px-4 py-4 text-sm hover:bg-black/[0.03] transition"
                    >
                      {tr("FAQ", "الأسئلة الشائعة", "Preguntas Frecuentes")}
                    </a>

                    <div className="h-px bg-black/10" />

                    <a
                      role="menuitem"
                      href={collaborateHref}
                      onClick={() => setMenuOpen(false)}
                      className="block px-4 py-4 text-sm hover:bg-black/[0.03] transition"
                    >
                      {tr("Collaborate with us", "تعاون معنا", "Colabora con nosotros")}
                    </a>

                    <a
                      role="menuitem"
                      href={portalHref}
                      onClick={() => setMenuOpen(false)}
                      className="block px-4 py-4 text-sm hover:bg-black/[0.03] transition"
                    >
                      {tr("Puzzle Portal 🔒", "بوابة الألغاز 🔒", "Portal de Puzzles 🔒")}
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
                alt={tr(m.alt.en, m.alt.ar, m.alt.es)}
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover"
              />
            </div>
          );
        })}

        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/35 to-black/70" />

        <div className="relative z-10 mx-auto flex min-h-[78vh] sm:min-h-[86vh] max-w-7xl items-center px-6 pt-24 pb-10">
          <div className="w-full text-center">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white drop-shadow-[0_6px_18px_rgba(0,0,0,0.45)]">
              {isAr ? (
                <span className="z-orange">حلّ. تذوّق. اكتشف</span>
              ) : locale === "es" ? (
                <>
                  <span className="z-orange">Resuelve.</span>{" "}
                  <span className="z-orange">Prueba.</span>{" "}
                  <span className="z-orange">Descubre</span> Amán
                </>
              ) : (
                <>
                  <span className="z-orange">Solve.</span>{" "}
                  <span className="z-orange">Taste.</span>{" "}
                  <span className="z-orange">Discover</span> Amman
                </>
              )}
            </h1>

            <p className="mx-auto mt-4 max-w-3xl text-sm sm:text-lg text-white/90">
              {tr(
                "A self-guided city experience where you solve puzzles, taste iconic bites, and discover Amman at your own pace.",
                "تجربة مدينة ذاتية الإرشاد حيث تحل الألغاز، وتتذوّق لقمات أيقونية، وتكتشف عمّان على وتيرتك.",
                "Una experiencia urbana autoguiada donde resuelves puzzles, pruebas bocados icónicos y descubres Amán a tu ritmo."
              )}
            </p>

            <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={bookingHref}
                className="inline-flex w-full sm:w-auto items-center justify-center rounded-full bg-z-orange text-neutral-950 px-10 py-4 text-sm font-extrabold tracking-wide transition hover:opacity-95"
              >
                {tr("Book the Experience", "احجز التجربة", "Reserva la Experiencia")}
              </a>

              <a
                href="#about"
                className="inline-flex w-full sm:w-auto items-center justify-center rounded-full border border-white/60 bg-white/10 px-10 py-4 text-sm font-bold tracking-wide text-white transition hover:bg-white/20 hover:border-white"
              >
                {tr("Learn More", "اعرف أكثر", "Aprender Más")}
              </a>
            </div>

            <span className="sr-only">Currency: {currency}</span>
          </div>
        </div>
      </section>

      {/* ==================== HOW IT WORKS ==================== */}
      <section className="bg-[#fff3e8] py-14 sm:py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-center text-3xl md:text-4xl font-bold">
            {tr("How It Works", "كيف تعمل التجربة", "Cómo Funciona")}
          </h2>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
            {howItWorksCards.map((c) => (
              <div
                key={c.n}
                className="rounded-3xl bg-white/95 border border-black/5 shadow-sm px-7 py-7 text-left transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <IconImage src={c.iconSrc} alt={c.iconAlt} size={34} />
                  <div className="z-orange font-extrabold text-2xl">{c.n}</div>
                </div>

                <div className="mt-4 font-bold text-lg">{c.title}</div>
                <div className="mt-2 text-sm text-neutral-600 leading-relaxed">{c.body}</div>

                <div className="mt-5 h-px bg-black/5" />
                <div className="mt-4 text-xs text-neutral-500">{c.footer}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== SNAPSHOT ROW ==================== */}
      <section className="py-10 sm:py-12 bg-transparent">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {snapshotItems.map((x) => (
              <div
                key={x.label}
                className="min-w-[150px] rounded-2xl bg-white/80 border border-black/5 px-6 py-4 text-center shadow-sm"
              >
                <div className="flex justify-center">
                  <IconImage src={x.iconSrc} alt={x.iconAlt} size={34} />
                </div>
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
            const labelText = tr(tab.label.en, tab.label.ar, tab.label.es);
            const flipText = tr(tab.flip.en, tab.flip.ar, tab.flip.es);

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
                alt={tr(activeAbout.imageAlt.en, activeAbout.imageAlt.ar, activeAbout.imageAlt.es)}
                className="w-full h-[280px] md:h-[360px] object-cover"
              />
            </div>

            <div className={isAr ? "text-right" : "text-left"}>
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/[0.03] border border-black/10">
                <span className="text-lg z-orange">◎</span>
              </div>

              <h3 className="text-2xl md:text-3xl font-medium">
                {tr(activeAbout.title.en, activeAbout.title.ar, activeAbout.title.es)}
              </h3>

              <p className="mt-4 text-neutral-600 leading-relaxed">
                {tr(activeAbout.body.en, activeAbout.body.ar, activeAbout.body.es)}
              </p>

              {activeAbout.showCTA ? (
                <div className="mt-8">
                  <a
                    href={bookingHref}
                    className="inline-flex items-center gap-3 rounded-full bg-z-orange text-neutral-950 px-6 py-3 text-sm font-extrabold hover:opacity-95 transition"
                  >
                    {tr("Book now", "احجز الآن", "Reserva ahora")}
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-black/10">
                      →
                    </span>
                  </a>

                  <p className="mt-3 text-xs text-neutral-500 leading-relaxed">
                    {tr(
                      "Note: Secure checkout. Your Zowar payment is made once at booking, and the Puzzle Portal unlocks after checkout. Any extra purchases during the experience are completely optional.",
                      "ملاحظة: الدفع آمن. يتم دفع قيمة Zowar مرة واحدة فقط عند الحجز، وتُفتح بوابة الألغاز بعد إتمام الدفع. أي مشتريات إضافية أثناء التجربة تكون اختيارية بالكامل.",
                      "Nota: Pago seguro. El pago de Zowar se realiza una sola vez al reservar, y el Portal de Puzzles se desbloquea tras el pago. Cualquier compra adicional durante la experiencia es completamente opcional."
                    )}
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
          <h3 className="text-2xl md:text-3xl font-bold">{tr("Contact", "تواصل معنا", "Contacto")}</h3>
          <p className="mt-3 text-neutral-600">
            {tr("Questions or special accommodations?", "هل لديك أسئلة أو ترتيبات خاصة؟", "¿Preguntas o necesidades especiales?")}
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <a
              href="mailto:hello@zowar.net"
              className="inline-flex items-center justify-center rounded-full bg-z-orange text-neutral-950 px-6 py-4 text-sm font-extrabold transition hover:opacity-95"
            >
              {tr("Email us", "راسلنا", "Escríbenos")}
            </a>

            <a
              href={bookingHref}
              className="inline-flex items-center justify-center rounded-full border border-z-orange px-6 py-4 text-sm font-semibold transition hover:bg-black/[0.03] z-orange"
            >
              {tr("Go to booking", "اذهب للحجز", "Ir a reservas")}
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
                    {tr(footer.explore.en, footer.explore.ar, footer.explore.es)}
                  </span>
                  <span className="h-[2px] w-12 bg-z-orange/70" />
                </div>
                <ul className="mt-4 space-y-3 text-sm">
                  <li>
                    <a className="hover:text-white transition z-orange" href={aboutHref}>
                      {tr(footer.links.about.en, footer.links.about.ar, footer.links.about.es)}
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-white transition z-orange" href={bookingHref}>
                      {tr(footer.links.hunts.en, footer.links.hunts.ar, footer.links.hunts.es)}
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-white/90 transition" href="#">
                      {tr(footer.links.testimonials.en, footer.links.testimonials.ar, footer.links.testimonials.es)}
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <div className="inline-flex items-center gap-2">
                  <span className="text-xs uppercase tracking-[0.22em] text-white/60">
                    {tr(footer.support.en, footer.support.ar, footer.support.es)}
                  </span>
                  <span className="h-[2px] w-12 bg-z-orange/70" />
                </div>
                <ul className="mt-4 space-y-3 text-sm">
                  <li>
                    <a className="hover:text-white/90 transition" href={faqHref}>
                      {tr(footer.links.faq.en, footer.links.faq.ar, footer.links.faq.es)}
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-white/90 transition" href="#contact">
                      {tr(footer.links.contact.en, footer.links.contact.ar, footer.links.contact.es)}
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-white/90 transition" href="#">
                      {tr(footer.links.privacy.en, footer.links.privacy.ar, footer.links.privacy.es)}
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <div className="inline-flex items-center gap-2">
                  <span className="text-xs uppercase tracking-[0.22em] text-white/60">
                    {tr(footer.connect.en, footer.connect.ar, footer.connect.es)}
                  </span>
                  <span className="h-[2px] w-12 bg-z-orange/70" />
                </div>
                <ul className="mt-4 space-y-3 text-sm">
                  <li>
                    <a className="hover:text-white/90 transition" href="#">
                      {tr(footer.links.blog.en, footer.links.blog.ar, footer.links.blog.es)}
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-white/90 transition" href="#">
                      {tr(footer.links.newsletter.en, footer.links.newsletter.ar, footer.links.newsletter.es)}
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-white/90 transition" href={collaborateHref}>
                      {tr(footer.links.partnerships.en, footer.links.partnerships.ar, footer.links.partnerships.es)}
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="md:col-span-4 flex md:justify-end">
              <div className="flex items-stretch gap-8">
                <div className="hidden md:block w-px bg-z-orange/35" />

                <div className={isAr ? "text-right" : "text-left"}>
                  <div className="text-sm font-semibold">{tr(footer.rightTitle.en, footer.rightTitle.ar, footer.rightTitle.es)}</div>

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
                      href="https://www.instagram.com/zowar.jo/"
                      target="_blank"
                      rel="noreferrer"
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
                    {tr(footer.copyright.en, footer.copyright.ar, footer.copyright.es)} {new Date().getFullYear()} ZOWAR.{" "}
                    {tr("ALL RIGHTS RESERVED.", "جميع الحقوق محفوظة.", "TODOS LOS DERECHOS RESERVADOS.")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-white/10 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-white/60">
            <span>{t.sections.footerCity}</span>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-white transition">
                {tr(footer.terms.en, footer.terms.ar, footer.terms.es)}
              </a>
              <span className="opacity-30">|</span>
              <a href="#" className="hover:text-white transition">
                {tr(footer.links.privacy.en, footer.links.privacy.ar, footer.links.privacy.es)}
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
    </main>
  );
}