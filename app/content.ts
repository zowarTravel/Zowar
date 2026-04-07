export type Locale = "en" | "ar" | "es";

export const content: Record<Locale, any> = {
  en: {
    nav: { home: "Homepage", booking: "Booking", contact: "Contact Us", cta: "Contact us →" },
    hero: {
      title: "Uncover Amman’s Hidden Flavors",
      badge: "Hunt!",
      body:
        "Embark on a self-guided culinary scavenger hunt through Amman. Solve puzzles, follow clues, and taste the city one stop at a time.",
      book: "Book Now",
      learn: "Learn More →",
    },
    props: [
      { title: "Self-Guided Adventure", body: "Explore at your own pace — no tour groups, no schedules." },
      { title: "Interactive Puzzles", body: "Solve bilingual games to unlock each food stop." },
      { title: "Authentic Local Food", body: "Handpicked spots loved by locals, not tourists." },
    ],
    sections: {
      bookingTitle: "Booking",
      bookingBody: "Next: we’ll connect Stripe checkout + date selection here.",
      contactTitle: "Contact",
      contactBody: "Next: we’ll add a real contact form + WhatsApp link.",
      footerCity: "Amman, Jordan",
    },
    toggle: { en: "EN", ar: "AR" },
  },

  ar: {
    nav: { home: "الرئيسية", booking: "الحجز", contact: "تواصل معنا", cta: "تواصل معنا ←" },
    hero: {
      title: "اكتشف نكهات عمّان الخفية",
      badge: "انطلق!",
      body:
        "مغامرة تذوّق ذاتية في عمّان على شكل لعبة ألغاز. حلّ التحديات واتبع التلميحات وتذوّق المدينة محطةً بعد محطة.",
      book: "احجز الآن",
      learn: "اعرف أكثر ←",
    },
    props: [
      { title: "مغامرة ذاتية", body: "استكشف على راحتك — بدون مجموعات أو جدول ثابت." },
      { title: "ألغاز تفاعلية", body: "ألعاب ثنائية اللغة تفتح لك المحطة التالية." },
      { title: "طعام محلي أصيل", body: "أماكن مختارة يحبها أهل البلد، وليست سياحية." },
    ],
    sections: {
      bookingTitle: "الحجز",
      bookingBody: "الخطوة التالية: ربط Stripe + اختيار التاريخ.",
      contactTitle: "تواصل",
      contactBody: "الخطوة التالية: نموذج تواصل + رابط واتساب.",
      footerCity: "عمّان، الأردن",
    },
    toggle: { en: "EN", ar: "AR" },
  },

  es: {
    nav: { home: "Inicio", booking: "Reserva", contact: "Contáctanos", cta: "Contáctanos →" },
    hero: {
      title: "Descubre los Sabores Ocultos de Amán",
      badge: "¡Explora!",
      body:
        "Embárcate en una búsqueda culinaria autoguiada por Amán. Resuelve puzzles, sigue pistas y prueba la ciudad parada a parada.",
      book: "Reserva Ahora",
      learn: "Aprender Más →",
    },
    props: [
      { title: "Aventura Autoguiada", body: "Explora a tu ritmo — sin grupos de turismo ni horarios fijos." },
      { title: "Puzzles Interactivos", body: "Resuelve juegos multilingüe para desbloquear cada parada gastronómica." },
      { title: "Comida Local Auténtica", body: "Lugares elegidos a mano que los locales adoran, no los turistas." },
    ],
    sections: {
      bookingTitle: "Reserva",
      bookingBody: "Siguiente: conectaremos Stripe checkout + selección de fecha aquí.",
      contactTitle: "Contacto",
      contactBody: "Siguiente: añadiremos un formulario de contacto real + enlace de WhatsApp.",
      footerCity: "Amán, Jordania",
    },
    toggle: { en: "EN", ar: "AR" },
  },
};
