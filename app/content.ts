export type Locale = "en" | "ar";

export const content = {
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
} as const;
