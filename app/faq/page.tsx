import type { Metadata } from "next";
import Link from "next/link";
import { Fredoka, Tajawal } from "next/font/google";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about Zowar's food puzzle walks in Amman — booking, routes, dietary needs, and more.",
  alternates: {
    canonical: "https://zowar.jo/faq",
    languages: {
      en: "https://zowar.jo/faq?lang=en",
      ar: "https://zowar.jo/faq?lang=ar",
      es: "https://zowar.jo/faq?lang=es",
    },
  },
  openGraph: {
    title: "FAQ | Zowar",
    description:
      "Answers to common questions about Zowar's food puzzle walks in Amman.",
    url: "https://zowar.jo/faq",
    images: [{ url: "/og-default.jpg", width: 1200, height: 630 }],
  },
};

type Locale = "en" | "ar" | "es";
type SearchParams = Promise<{ lang?: string }>;

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

type FAQItem = {
  question: string;
  answer: string;
};

type FAQSection = {
  category: string;
  items: FAQItem[];
};

const content: Record<
  Locale,
  {
    nav: {
      home: string;
      booking: string;
      about: string;
      contact: string;
      faq: string;
      menu: string;
      langToggle: string;
    };
    hero: {
      badge: string;
      title: string;
      body: string;
      bookCta: string;
      homeCta: string;
    };
    trustCards: { title: string; body: string }[];
    sections: FAQSection[];
    support: {
      title: string;
      body: string;
      bookingCta: string;
      contactCta: string;
    };
    footer: {
      explore: string;
      support: string;
      connect: string;
      about: string;
      hunts: string;
      faq: string;
      contact: string;
      privacy: string;
      partnerships: string;
      rightTitle: string;
      terms: string;
      copyright: string;
      rights: string;
      city: string;
    };
  }
> = {
  en: {
    nav: {
      home: "Home",
      booking: "Book Now",
      about: "About Zowar",
      contact: "Contact",
      faq: "FAQ",
      menu: "Menu",
      langToggle: "العربية",
    },
    hero: {
      badge: "Frequently Asked Questions",
      title: "Book with confidence",
      body:
        "Everything here is designed to answer the questions that usually stop someone from booking — from payment and legitimacy to what the experience actually feels like.",
      bookCta: "Book the Experience",
      homeCta: "Back to Home",
    },
    trustCards: [
      {
        title: "One payment",
        body:
          "Your Zowar payment is made once at checkout. You do not pay Zowar again during the experience.",
      },
      {
        title: "No surprise charges",
        body:
          "Extra spending only happens if you choose optional purchases outside the package at a stop.",
      },
      {
        title: "Secure checkout",
        body:
          "Checkout is handled securely so guests can book with more confidence.",
      },
    ],
    sections: [
      {
        category: "About Zowar",
        items: [
          {
            question: "What is Zowar?",
            answer:
              "Zowar is a self-guided food and puzzle experience through Amman. Using your phone, you follow clues, solve simple challenges, and discover curated local stops along the way.",
          },
          {
            question: "Is Zowar a tour or a game?",
            answer:
              "It is a mix of both. Zowar combines the feeling of a walking city experience with the fun of a puzzle-based adventure.",
          },
          {
            question: "Who is Zowar for?",
            answer:
              "Zowar is designed for tourists, locals, couples, friends, and small groups looking for a memorable way to explore Amman.",
          },
          {
            question: "Do I need to know Amman well to participate?",
            answer:
              "No. The experience is designed for both first-time visitors and locals. You do not need prior knowledge of the city.",
          },
          {
            question: "Is Zowar available in English and Arabic?",
            answer:
              "Yes. Zowar is designed to be accessible in both English and Arabic.",
          },
        ],
      },
      {
        category: "Booking & Payment",
        items: [
          {
            question: "How do I book?",
            answer:
              "Choose your date on the booking page and complete checkout. After booking, you will receive the information needed to begin your experience.",
          },
          {
            question: "Is checkout secure?",
            answer:
              "Yes. Zowar uses a secure checkout flow so your payment information is handled safely during booking.",
          },
          {
            question: "Will I have extra charges later?",
            answer:
              "Only if you choose them. If you decide to buy extra food, drinks, or other items outside what is included in your package, those purchases are separate and optional.",
          },
          {
            question: "Can I reschedule my booking?",
            answer:
              "If your plans change, contact Zowar as early as possible and we will do our best to help based on availability.",
          },
        ],
      },
      {
        category: "What to Expect",
        items: [
          {
            question: "How long does the experience take?",
            answer:
              "Most groups can expect the experience to take around 2 to 3 hours depending on walking pace and time spent at each stop.",
          },
          {
            question: "How much walking is involved?",
            answer:
              "Zowar is a walkable experience. Guests should expect a moderate amount of walking, so comfortable shoes are recommended.",
          },
          {
            question: "Can I do the experience with friends or family?",
            answer:
              "Yes. It works especially well for couples, friends, and small groups.",
          },
          {
            question: "Can I do it alone?",
            answer:
              "Yes! However, many guests find it most enjoyable with at least 2 people.",
          },
          {
            question: "What if we get stuck on a puzzle?",
            answer:
              "Hints are built into the experience so you can keep moving without getting stuck for too long.",
          },
        ],
      },
      {
        category: "Food & Stops",
        items: [
          {
            question: "What kinds of stops are included?",
            answer:
              "The route is built around curated local stops that showcase the food, tradition, atmosphere, and character of Amman. The exact sequence is part of the experience.",
          },
          {
            question: "Are the stops random?",
            answer:
              "No. The experience is intentionally designed around selected destinations to create a smooth and memorable route.",
          },
          {
            question: "Can I buy extra things during the experience?",
            answer:
              "Yes. You are welcome to purchase extra food, drinks, or items at any stop if you want to, but those purchases are separate from your Zowar booking.",
          },
          {
            question: "Do participating places know about Zowar?",
            answer:
              "Yes. Zowar is organized intentionally, not as a random route, which helps the experience feel smooth and legitimate.",
          },
        ],
      },
      {
        category: "Practical Questions",
        items: [
          {
            question: "What do I need to bring?",
            answer:
              "Bring a charged smartphone internet access, comfortable walking shoes, and be ready to explore.",
          },
          {
            question: "Is it family-friendly?",
            answer:
              "Yes. The experience is designed to be approachable and enjoyable for a wide range of guests.",
          },
          {
            question: "What happens after I book?",
            answer:
              "After checkout, you will receive the information needed for your experience so you can arrive prepared and start with confidence.",
          },
          {
            question: "Why should I book Zowar instead of exploring on my own?",
            answer:
              "Zowar adds structure, anticipation, and discovery to your outing. Instead of simply visiting places one by one, you experience the city through a curated sequence of clues, stops, and moments designed to feel memorable.",
          },
        ],
      },
    ],
    support: {
      title: "Still have questions?",
      body:
        "If anything important to your decision is not answered here, reach out before booking and we’ll help clarify it.",
      bookingCta: "Go to Booking",
      contactCta: "Email Zowar",
    },
    footer: {
      explore: "Explore",
      support: "Support",
      connect: "Connect",
      about: "About us",
      hunts: "Our hunts",
      faq: "FAQ",
      contact: "Contact",
      privacy: "Privacy Policy",
      partnerships: "Partnerships",
      rightTitle: "Taste Amman!",
      terms: "Terms of Service",
      copyright: "COPYRIGHT ©",
      rights: "ALL RIGHTS RESERVED.",
      city: "Built for curious food lovers in Amman.",
    },
  },
  ar: {
    nav: {
      home: "الرئيسية",
      booking: "احجز الآن",
      about: "عن زوّار",
      contact: "تواصل",
      faq: "الأسئلة الشائعة",
      menu: "القائمة",
      langToggle: "English",
    },
    hero: {
      badge: "الأسئلة الشائعة",
      title: "احجز بثقة",
      body:
        "صُممت هذه الصفحة للإجابة على الأسئلة التي غالبًا ما تمنع الناس من الحجز — من الدفع والموثوقية إلى شكل التجربة فعليًا.",
      bookCta: "احجز التجربة",
      homeCta: "العودة للرئيسية",
    },
    trustCards: [
      {
        title: "دفعة واحدة",
        body:
          "يتم دفع قيمة زوار مرة واحدة فقط عند إتمام الحجز. ولا تحتاج إلى الدفع لزوار مرة أخرى أثناء التجربة.",
      },
      {
        title: "بدون رسوم مفاجئة",
        body:
          "أي مصاريف إضافية تكون فقط إذا اخترت بنفسك شراء إضافات خارج الباقة في إحدى المحطات.",
      },
      {
        title: "دفع آمن",
        body:
          "تتم عملية الدفع بشكل آمن حتى يتمكن الضيوف من الحجز بثقة أكبر.",
      },
    ],
    sections: [
      {
        category: "عن زوّار",
        items: [
          {
            question: "ما هي زوّار؟",
            answer:
              "زوار هي تجربة ذاتية التوجيه تجمع بين الطعام والألغاز في عمّان. باستخدام هاتفك، تتبع الأدلة، وتحل تحديات بسيطة، وتكتشف محطات محلية مختارة على طول الطريق.",
          },
          {
            question: "هل زوّار جولة أم لعبة؟",
            answer:
              "هي مزيج من الاثنين. تجمع زوّار بين إحساس التجول في المدينة ومتعة المغامرة المبنية على الألغاز.",
          },
          {
            question: "لمن صُممت زوّار؟",
            answer:
              "صُممت زوّار للسياح، والسكان المحليين، والأزواج، والأصدقاء، والمجموعات الصغيرة التي تبحث عن طريقة مميزة لاكتشاف عمّان.",
          },
          {
            question: "هل أحتاج إلى معرفة جيدة بعمّان للمشاركة؟",
            answer:
              "لا. التجربة مصممة للزائرين لأول مرة وللسكان المحليين على حد سواء. ولا تحتاج إلى معرفة مسبقة بالمدينة.",
          },
          {
            question: "هل زوّار متاحة باللغتين العربية والإنجليزية؟",
            answer:
              "نعم. تم تصميم زوّار لتكون متاحة باللغتين العربية والإنجليزية.",
          },
        ],
      },
      {
        category: "الحجز والدفع",
        items: [
          {
            question: "كيف يمكنني الحجز؟",
            answer:
              "اختر التاريخ المناسب من صفحة الحجز ثم أكمل عملية الدفع. بعد الحجز ستصلك المعلومات التي تحتاجها لبدء التجربة.",
          },
          {
            question: "هل الدفع آمن؟",
            answer:
              "نعم. تستخدم زوار عملية دفع آمنة بحيث يتم التعامل مع معلومات الدفع الخاصة بك بأمان أثناء الحجز.",
          },
          {
            question: "هل ستكون هناك رسوم إضافية لاحقًا؟",
            answer:
              "فقط إذا اخترتها بنفسك. إذا رغبت في شراء أطعمة أو مشروبات أو منتجات إضافية خارج ما هو مشمول في باقتك، فستكون تلك المشتريات منفصلة واختيارية.",
          },
          {
            question: "هل يمكنني إعادة جدولة حجزي؟",
            answer:
              "إذا تغيرت خططك، تواصل مع زوار في أقرب وقت ممكن وسنبذل جهدنا للمساعدة حسب التوفر.",
          },
        ],
      },
      {
        category: "ماذا تتوقع",
        items: [
          {
            question: "كم تستغرق التجربة؟",
            answer:
              "يمكن لمعظم المجموعات أن تتوقع أن تستغرق التجربة حوالي ساعتين إلى ثلاث ساعات، بحسب سرعة المشي والوقت الذي تقضيه في كل محطة.",
          },
          {
            question: "كم مقدار المشي المطلوب؟",
            answer:
              "زوار تجربة قابلة للمشي. لذا ينبغي على الضيوف توقع قدر متوسط من المشي، ولهذا نوصي بارتداء أحذية مريحة.",
          },
          {
            question: "هل يمكنني القيام بالتجربة مع الأصدقاء أو العائلة؟",
            answer:
              "نعم. وهي مناسبة بشكل خاص للأزواج، والأصدقاء، والمجموعات الصغيرة.",
          },
          {
            question: "هل يمكنني القيام بها وحدي؟",
            answer:
              "نعم! ومع ذلك، يجد كثير من الضيوف أنها أكثر متعة عند المشاركة مع شخصين على الأقل.",
          },
          {
            question: "ماذا لو تعثرنا في أحد الألغاز؟",
            answer:
              "توجد تلميحات مدمجة داخل التجربة حتى تتمكنوا من الاستمرار دون البقاء عالقين لفترة طويلة.",
          },
        ],
      },
      {
        category: "الطعام والمحطات",
        items: [
          {
            question: "ما نوع المحطات المشمولة؟",
            answer:
              "المسار مبني حول محطات محلية مختارة تُبرز الطعام، والتقاليد، والأجواء، والطابع المميز لعمّان. أما التسلسل الدقيق فهو جزء من التجربة نفسها.",
          },
          {
            question: "هل المحطات عشوائية؟",
            answer:
              "لا. تم تصميم التجربة عمدًا حول وجهات مختارة لخلق مسار سلس ولا يُنسى.",
          },
          {
            question: "هل يمكنني شراء أشياء إضافية أثناء التجربة؟",
            answer:
              "نعم. يمكنك شراء أطعمة أو مشروبات أو منتجات إضافية في أي محطة إذا رغبت، لكن هذه المشتريات تكون منفصلة عن حجزك مع زوار.",
          },
          {
            question: "هل الأماكن المشاركة على علم بزوار؟",
            answer:
              "نعم. زوار منظمة بشكل مقصود وليست مسارًا عشوائيًا، وهذا ما يساعد على أن تبدو التجربة سلسة وموثوقة.",
          },
        ],
      },
      {
        category: "أسئلة عملية",
        items: [
          {
            question: "ماذا يجب أن أحضر معي؟",
            answer:
              "أحضر هاتفًا مشحونًا مع إمكانية الوصول إلى الإنترنت، وحذاءً مريحًا للمشي، واستعدادًا للاستكشاف.",
          },
          {
            question: "هل التجربة مناسبة للعائلات؟",
            answer:
              "نعم. صُممت التجربة لتكون سهلة وممتعة لشريحة واسعة من الضيوف.",
          },
          {
            question: "ماذا يحدث بعد أن أحجز؟",
            answer:
              "بعد إتمام الدفع ستصلك المعلومات التي تحتاجها لتكون مستعدًا وتبدأ التجربة بثقة.",
          },
          {
            question: "لماذا أحجز زوار بدلًا من الاستكشاف بنفسي؟",
            answer:
              "تضيف زوار عنصر التنظيم، والترقّب، والاكتشاف إلى خروجتك. فبدلًا من زيارة الأماكن واحدًا تلو الآخر، ستعيش المدينة من خلال تسلسل منسق من الأدلة، والمحطات، واللحظات المصممة لتكون لا تُنسى.",
          },
        ],
      },
    ],
    support: {
      title: "ما زالت لديك أسئلة؟",
      body:
        "إذا كان هناك أي شيء مهم لقرارك ولم تجد إجابته هنا، فتواصل معنا قبل الحجز وسنساعدك في توضيحه.",
      bookingCta: "اذهب إلى الحجز",
      contactCta: "راسل زوار",
    },
    footer: {
      explore: "اكتشف",
      support: "الدعم",
      connect: "تواصل",
      about: "من نحن",
      hunts: "تجاربنا",
      faq: "الأسئلة الشائعة",
      contact: "تواصل",
      privacy: "سياسة الخصوصية",
      partnerships: "الشراكات",
      rightTitle: "تذوّق عمّان!",
      terms: "شروط الخدمة",
      copyright: "حقوق النشر ©",
      rights: "جميع الحقوق محفوظة.",
      city: "تجربة صُممت لعشّاق الطعام الفضوليين في عمّان.",
    },
  },
  es: {
    nav: {
      home: "Inicio",
      booking: "Reserva Ahora",
      about: "Sobre Zowar",
      contact: "Contacto",
      faq: "Preguntas Frecuentes",
      menu: "Menú",
      langToggle: "English",
    },
    hero: {
      badge: "Preguntas Frecuentes",
      title: "Reserva con confianza",
      body:
        "Todo aquí está diseñado para responder las preguntas que normalmente impiden a alguien reservar — desde el pago y la legitimidad hasta cómo se siente realmente la experiencia.",
      bookCta: "Reserva la Experiencia",
      homeCta: "Volver al Inicio",
    },
    trustCards: [
      {
        title: "Un solo pago",
        body:
          "El pago de Zowar se realiza una sola vez al reservar. No vuelves a pagar a Zowar durante la experiencia.",
      },
      {
        title: "Sin cargos sorpresa",
        body:
          "El gasto extra solo ocurre si decides hacer compras opcionales fuera del paquete en una parada.",
      },
      {
        title: "Pago seguro",
        body:
          "El pago se gestiona de forma segura para que los visitantes puedan reservar con mayor confianza.",
      },
    ],
    sections: [
      {
        category: "Sobre Zowar",
        items: [
          {
            question: "¿Qué es Zowar?",
            answer:
              "Zowar es una experiencia autoguiada de comida y puzzles por Amán. Usando tu teléfono, sigues pistas, resuelves desafíos sencillos y descubres paradas locales seleccionadas a lo largo del camino.",
          },
          {
            question: "¿Es Zowar una visita guiada o un juego?",
            answer:
              "Es una combinación de ambos. Zowar combina la sensación de una experiencia de paseo por la ciudad con la diversión de una aventura basada en puzzles.",
          },
          {
            question: "¿Para quién es Zowar?",
            answer:
              "Zowar está diseñado para turistas, locales, parejas, amigos y grupos pequeños que buscan una forma memorable de explorar Amán.",
          },
          {
            question: "¿Necesito conocer bien Amán para participar?",
            answer:
              "No. La experiencia está diseñada tanto para visitantes primerizos como para locales. No necesitas conocimiento previo de la ciudad.",
          },
          {
            question: "¿Está Zowar disponible en inglés y árabe?",
            answer:
              "Sí. Zowar está diseñado para ser accesible en inglés, árabe y español.",
          },
        ],
      },
      {
        category: "Reserva y Pago",
        items: [
          {
            question: "¿Cómo reservo?",
            answer:
              "Elige tu fecha en la página de reservas y completa el pago. Tras reservar, recibirás la información necesaria para comenzar tu experiencia.",
          },
          {
            question: "¿Es seguro el pago?",
            answer:
              "Sí. Zowar utiliza un proceso de pago seguro para que tu información de pago se gestione de forma segura durante la reserva.",
          },
          {
            question: "¿Habrá cargos adicionales más adelante?",
            answer:
              "Solo si los eliges tú. Si decides comprar comida extra, bebidas u otros artículos fuera de lo incluido en tu paquete, esas compras son separadas y opcionales.",
          },
          {
            question: "¿Puedo reprogramar mi reserva?",
            answer:
              "Si tus planes cambian, contacta con Zowar lo antes posible y haremos todo lo posible para ayudarte según la disponibilidad.",
          },
        ],
      },
      {
        category: "Qué Esperar",
        items: [
          {
            question: "¿Cuánto dura la experiencia?",
            answer:
              "La mayoría de los grupos pueden esperar que la experiencia dure entre 2 y 3 horas según el ritmo de caminata y el tiempo en cada parada.",
          },
          {
            question: "¿Cuánto hay que caminar?",
            answer:
              "Zowar es una experiencia caminable. Los visitantes deben esperar una cantidad moderada de caminata, por lo que se recomiendan zapatos cómodos.",
          },
          {
            question: "¿Puedo hacer la experiencia con amigos o familia?",
            answer:
              "Sí. Funciona especialmente bien para parejas, amigos y grupos pequeños.",
          },
          {
            question: "¿Puedo hacerla solo?",
            answer:
              "¡Sí! Sin embargo, muchos visitantes la disfrutan más con al menos 2 personas.",
          },
          {
            question: "¿Qué pasa si nos atascamos en un puzzle?",
            answer:
              "Las pistas están integradas en la experiencia para que puedas seguir avanzando sin quedarte atascado demasiado tiempo.",
          },
        ],
      },
      {
        category: "Comida y Paradas",
        items: [
          {
            question: "¿Qué tipo de paradas se incluyen?",
            answer:
              "La ruta está construida alrededor de paradas locales seleccionadas que muestran la comida, la tradición, el ambiente y el carácter de Amán. La secuencia exacta es parte de la experiencia.",
          },
          {
            question: "¿Son aleatorias las paradas?",
            answer:
              "No. La experiencia está diseñada intencionalmente alrededor de destinos seleccionados para crear una ruta fluida y memorable.",
          },
          {
            question: "¿Puedo comprar cosas extra durante la experiencia?",
            answer:
              "Sí. Puedes comprar comida extra, bebidas u otros artículos en cualquier parada si quieres, pero esas compras son independientes de tu reserva de Zowar.",
          },
          {
            question: "¿Los lugares participantes conocen Zowar?",
            answer:
              "Sí. Zowar está organizado intencionalmente, no como una ruta aleatoria, lo que ayuda a que la experiencia se sienta fluida y legítima.",
          },
        ],
      },
      {
        category: "Preguntas Prácticas",
        items: [
          {
            question: "¿Qué necesito traer?",
            answer:
              "Trae un smartphone cargado con acceso a internet, zapatos cómodos para caminar y ganas de explorar.",
          },
          {
            question: "¿Es apta para familias?",
            answer:
              "Sí. La experiencia está diseñada para ser accesible y agradable para una amplia variedad de visitantes.",
          },
          {
            question: "¿Qué pasa después de reservar?",
            answer:
              "Tras el pago recibirás la información necesaria para tu experiencia y podrás llegar preparado y comenzar con confianza.",
          },
          {
            question: "¿Por qué reservar Zowar en lugar de explorar por mi cuenta?",
            answer:
              "Zowar añade estructura, anticipación y descubrimiento a tu salida. En lugar de simplemente visitar lugares uno por uno, vives la ciudad a través de una secuencia curada de pistas, paradas y momentos diseñados para ser memorables.",
          },
        ],
      },
    ],
    support: {
      title: "¿Aún tienes preguntas?",
      body:
        "Si algo importante para tu decisión no está respondido aquí, contáctanos antes de reservar y te ayudaremos a aclararlo.",
      bookingCta: "Ir a Reservas",
      contactCta: "Escríbenos",
    },
    footer: {
      explore: "Explorar",
      support: "Soporte",
      connect: "Conectar",
      about: "Sobre nosotros",
      hunts: "Nuestras rutas",
      faq: "Preguntas Frecuentes",
      contact: "Contacto",
      privacy: "Política de Privacidad",
      partnerships: "Colaboraciones",
      rightTitle: "¡Prueba Amán!",
      terms: "Términos de Servicio",
      copyright: "Derechos de autor ©",
      rights: "TODOS LOS DERECHOS RESERVADOS.",
      city: "Creado para amantes curiosos de la comida en Amán.",
    },
  },
};

function buildFaqSchema(locale: Locale) {
  const c = content[locale];
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: locale,
    mainEntity: c.sections.flatMap((section) =>
      section.items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      }))
    ),
  };
}

export default async function FAQPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { lang } = await searchParams;
  const normalizedLang = (lang ?? "").toLowerCase();
  const locale: Locale = normalizedLang.startsWith("ar") ? "ar" : normalizedLang.startsWith("es") ? "es" : "en";
  const isAr = locale === "ar";
  const c = content[locale];
  const fontClass = isAr ? tajawal.className : fredoka.className;

  const homeHref = `/?lang=${locale}`;
  const aboutHref = `/about?lang=${locale}`;
  const bookingHref = `/booking?lang=${locale}`;
  const collaborateHref = `/collaborate?lang=${locale}`;
  const faqHref = `/faq?lang=${locale}`;
  const nextLang = locale === "en" ? "ar" : locale === "ar" ? "es" : "en";
  const switchHref = `/faq?lang=${nextLang}`;

  const pageBg =
    "min-h-screen text-neutral-900 bg-[radial-gradient(900px_600px_at_18%_24%,rgba(249,115,22,0.16),transparent_55%),radial-gradient(700px_500px_at_80%_30%,rgba(0,0,0,0.06),transparent_55%),linear-gradient(to_bottom,#ffffff,#f6f6f7)]";

  const faqSchema = buildFaqSchema(locale);

  return (
    <main dir={isAr ? "rtl" : "ltr"} className={`${pageBg} ${fontClass}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <header className="sticky top-0 left-0 right-0 z-50">
        <div className="mx-auto max-w-7xl px-5">
          <nav className="mt-4 flex items-center justify-between rounded-2xl border border-black/10 bg-white/70 backdrop-blur-md px-4 py-3 text-neutral-900 shadow-sm">
            <a
              href={homeHref}
              className="group flex items-center gap-3 rounded-xl px-2 py-2 transition hover:bg-black/[0.03]"
              aria-label="Go to home"
            >
              <div className="relative h-10 w-10 md:h-11 md:w-11">
                <img
                  src="/logo.png"
                  alt="ZOWAR logo"
                  className="h-full w-full object-contain opacity-95 transition-transform duration-200 ease-out group-hover:opacity-100 group-hover:-translate-y-[2px] group-hover:rotate-[-1deg] group-hover:scale-[1.02]"
                />
              </div>
              <span className="hidden sm:inline text-sm font-semibold tracking-wide">
                ZOWAR
              </span>
            </a>

            <div className="hidden md:flex items-center gap-8 text-sm">
              <a className="hover:z-orange transition" href={homeHref}>
                {c.nav.home}
              </a>
              <a className="hover:z-orange transition" href={aboutHref}>
                {c.nav.about}
              </a>
              <a className="hover:z-orange transition z-orange" href={faqHref}>
                {c.nav.faq}
              </a>
              <a className="hover:z-orange transition" href={bookingHref}>
                {c.nav.booking}
              </a>
              <a className="hover:z-orange transition" href={`${homeHref}#contact`}>
                {c.nav.contact}
              </a>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href={switchHref}
                className="rounded-full border border-black/10 bg-white/80 px-4 py-3 text-xs sm:text-sm font-semibold"
                aria-label={isAr ? "Switch to English" : "Switch to Arabic"}
              >
                {c.nav.langToggle}
              </Link>
            </div>
          </nav>
        </div>
      </header>

      <section className="px-6 pt-16 pb-8">
        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-[2rem] border border-black/10 bg-white/75 backdrop-blur-xl shadow-[0_18px_60px_rgba(0,0,0,0.08)]">
            <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="p-8 md:p-12">
                <span className="inline-flex items-center rounded-full border border-z-orange bg-white px-3 py-1 text-sm font-medium z-orange">
                  {c.hero.badge}
                </span>

                <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900">
                  {isAr ? (
                    <span className="z-orange">{c.hero.title}</span>
                  ) : locale === "es" ? (
                    <>
                      <span className="z-orange">Reserva</span> con confianza
                    </>
                  ) : (
                    <>
                      <span className="z-orange">Book</span> with confidence
                    </>
                  )}
                </h1>

                <p className="mt-5 max-w-2xl text-sm sm:text-lg text-neutral-600 leading-relaxed">
                  {c.hero.body}
                </p>

                <div className="mt-7 flex flex-col sm:flex-row items-start gap-3">
                  <a
                    href={bookingHref}
                    className="inline-flex items-center justify-center rounded-full bg-z-orange text-neutral-950 px-8 py-4 text-sm font-extrabold tracking-wide transition hover:opacity-95"
                  >
                    {c.hero.bookCta}
                  </a>

                  <a
                    href={homeHref}
                    className="inline-flex items-center justify-center rounded-full border border-black/10 bg-white px-8 py-4 text-sm font-bold tracking-wide text-neutral-900 transition hover:bg-black/[0.03]"
                  >
                    {c.hero.homeCta}
                  </a>
                </div>
              </div>

              <div className="border-t lg:border-t-0 lg:border-l border-black/10 bg-[#fff3e8] p-8 md:p-10">
                <div className="grid grid-cols-1 gap-4">
                  {c.trustCards.map((card, i) => (
                    <div
                      key={card.title}
                      className="rounded-3xl bg-white/95 border border-black/5 shadow-sm px-6 py-6 transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-lg"
                    >
                      <div className="flex items-center justify-between">
                        <div className="text-lg font-bold">{card.title}</div>
                        <div className="z-orange font-extrabold text-2xl">
                          {i + 1}
                        </div>
                      </div>
                      <div className="mt-3 text-sm text-neutral-600 leading-relaxed">
                        {card.body}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-4 sm:py-6 bg-transparent">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {[
              { icon: "🔒", label: locale === "ar" ? "دفع آمن" : locale === "es" ? "Pago seguro" : "Secure checkout" },
              { icon: "💳", label: locale === "ar" ? "دفعة واحدة" : locale === "es" ? "Pago único" : "One-time payment" },
              { icon: "🧩", label: locale === "ar" ? "تلميحات عند الحاجة" : locale === "es" ? "Pistas si las necesitas" : "Hints if needed" },
              { icon: "📍", label: locale === "ar" ? "مسار منظم" : locale === "es" ? "Ruta curada" : "Curated route" },
              { icon: "🌆", label: locale === "ar" ? "تجربة ذاتية" : locale === "es" ? "Autoguiado" : "Self-guided" },
            ].map((x) => (
              <div
                key={x.label}
                className="min-w-[150px] rounded-2xl bg-white/80 border border-black/5 px-6 py-4 text-center shadow-sm"
              >
                <div className="text-xl">{x.icon}</div>
                <div className="mt-2 text-xs font-semibold text-neutral-800">
                  {x.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 max-w-7xl mx-auto py-12">
        <div className="space-y-10">
          {c.sections.map((section) => (
            <section key={section.category}>
              <div className="mb-5 flex items-center gap-3">
                <span className="h-[2px] w-12 bg-z-orange/70" />
                <h2 className="text-2xl md:text-3xl font-bold">{section.category}</h2>
              </div>

              <div className="space-y-4">
                {section.items.map((item) => (
                  <details
                    key={item.question}
                    className="group rounded-3xl border border-black/10 bg-white/80 backdrop-blur-xl p-5 md:p-6 shadow-[0_18px_60px_rgba(0,0,0,0.06)]"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-base md:text-lg font-semibold text-neutral-900">
                      <span>{item.question}</span>
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/[0.03] border border-black/10 z-orange transition group-open:rotate-45">
                        +
                      </span>
                    </summary>

                    <p className="mt-4 max-w-3xl text-sm md:text-base leading-7 text-neutral-600">
                      {item.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>

      <section className="px-6 max-w-7xl mx-auto py-4 pb-16">
        <div className="rounded-3xl border border-black/10 bg-white/80 backdrop-blur-xl p-8 md:p-10 shadow-[0_18px_60px_rgba(0,0,0,0.08)]">
          <h3 className="text-2xl md:text-3xl font-bold">{c.support.title}</h3>
          <p className="mt-3 text-neutral-600 max-w-2xl leading-relaxed">
            {c.support.body}
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <a
              href={bookingHref}
              className="inline-flex items-center justify-center rounded-full bg-z-orange text-neutral-950 px-6 py-4 text-sm font-extrabold transition hover:opacity-95"
            >
              {c.support.bookingCta}
            </a>

            <a
              href="mailto:hello@zowar.net"
              className="inline-flex items-center justify-center rounded-full border border-z-orange px-6 py-4 text-sm font-semibold transition hover:bg-black/[0.03] z-orange"
            >
              {c.support.contactCta}
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
            <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-10">
              <div>
                <div className="inline-flex items-center gap-2">
                  <span className="text-xs uppercase tracking-[0.22em] text-white/60">
                    {c.footer.explore}
                  </span>
                  <span className="h-[2px] w-12 bg-z-orange/70" />
                </div>
                <ul className="mt-4 space-y-3 text-sm">
                  <li>
                    <a className="hover:text-white transition z-orange" href={aboutHref}>
                      {c.footer.about}
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-white transition z-orange" href={bookingHref}>
                      {c.footer.hunts}
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <div className="inline-flex items-center gap-2">
                  <span className="text-xs uppercase tracking-[0.22em] text-white/60">
                    {c.footer.support}
                  </span>
                  <span className="h-[2px] w-12 bg-z-orange/70" />
                </div>
                <ul className="mt-4 space-y-3 text-sm">
                  <li>
                    <a className="hover:text-white/90 transition" href={faqHref}>
                      {c.footer.faq}
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-white/90 transition" href={`${homeHref}#contact`}>
                      {c.footer.contact}
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-white/90 transition" href="#">
                      {c.footer.privacy}
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <div className="inline-flex items-center gap-2">
                  <span className="text-xs uppercase tracking-[0.22em] text-white/60">
                    {c.footer.connect}
                  </span>
                  <span className="h-[2px] w-12 bg-z-orange/70" />
                </div>
                <ul className="mt-4 space-y-3 text-sm">
                  <li>
                    <a className="hover:text-white/90 transition" href={collaborateHref}>
                      {c.footer.partnerships}
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="md:col-span-4 flex md:justify-end">
              <div className="flex items-stretch gap-8">
                <div className="hidden md:block w-px bg-z-orange/35" />
                <div className={isAr ? "text-right" : "text-left"}>
                  <div className="text-sm font-semibold">{c.footer.rightTitle}</div>
                  <p className="mt-6 text-xs text-white/60">
                    {c.footer.copyright} {new Date().getFullYear()} ZOWAR. {c.footer.rights}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-white/10 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-white/60">
            <span>{c.footer.city}</span>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-white transition">
                {c.footer.terms}
              </a>
              <span className="opacity-30">|</span>
              <a href="#" className="hover:text-white transition">
                {c.footer.privacy}
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}