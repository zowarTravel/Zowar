import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BlogTranslations from "@/app/components/blog-translations";

// Update these together whenever prices or rules on jordanpass.jo change
// (and keep in sync with the English version at /blog/jordan-pass).
const LAST_UPDATED_ISO = "2026-11-04";
const LAST_UPDATED = "4 de noviembre de 2026";

const URL = "https://zowar.net/blog/es/jordan-pass";
const EN_URL = "https://zowar.net/blog/jordan-pass";

export const metadata: Metadata = {
  title: "¿Merece la pena el Jordan Pass? Precios, ahorro y quién no debería comprarlo (2026)",
  description:
    "Precios del Jordan Pass en 2026, qué incluye, cómo funciona la exención del visado, ejemplos reales de cuánto ahorras y los casos en los que no compensa.",
  alternates: {
    canonical: URL,
    languages: { en: EN_URL, es: URL, "x-default": EN_URL },
  },
  openGraph: {
    title: "¿Merece la pena el Jordan Pass? Explicado por un local",
    description:
      "Precios, qué incluye, las reglas del visado, ejemplos de ahorro y quién debería saltárselo. Actualizado en noviembre de 2026.",
    url: URL,
    locale: "es_ES",
    type: "article",
    images: [{ url: "/images/blog/amman-view-from-ruins.jpg", alt: "Vista de Amán desde las ruinas de la Ciudadela" }],
  },
  keywords: [
    "Jordan Pass",
    "merece la pena el Jordan Pass",
    "vale la pena el Jordan Pass",
    "Jordan Pass precio 2026",
    "Jordan Pass visado",
    "visado Jordania",
    "precio entrada Petra",
    "Jordan Pass qué incluye",
    "Jordan Wanderer Explorer Expert",
  ],
};

const faqs: [string, string][] = [
  [
    "¿Merece la pena el Jordan Pass?",
    "Para la mayoría de viajeros que llegan en avión, se quedan al menos dos noches y visitan Petra, sí. El pase cuesta entre 70 y 80 JOD y sustituye los 40 JOD del visado más una entrada a Petra de 50–60 JOD, así que se amortiza antes de sumar Jerash, la Ciudadela de Amán o Wadi Rum.",
  ],
  [
    "¿Cuánto cuesta el Jordan Pass?",
    "Hay tres versiones, que solo se diferencian en los días de Petra: Jordan Wanderer (1 día) cuesta 70 JOD, Jordan Explorer (2 días consecutivos) 75 JOD y Jordan Expert (3 días consecutivos) 80 JOD.",
  ],
  [
    "¿Cómo funciona la exención del visado con el Jordan Pass?",
    "Si compras el pase antes de llegar a Jordania y te quedas al menos dos noches completas, no pagas la tasa del visado turístico (normalmente 40 JOD). Si te vas antes de dos noches, en inmigración te pedirán que pagues el visado al salir. La exención cubre una sola entrada.",
  ],
  [
    "¿Puedo comprar el Jordan Pass cuando ya estoy en Jordania?",
    "Puedes comprarlo para las entradas, pero la exención del visado solo se aplica si lo compras antes de llegar. Cómpralo online antes del vuelo.",
  ],
  [
    "¿Cuánto tiempo es válido el Jordan Pass?",
    "Según las preguntas frecuentes oficiales, hay que usarlo en los 3 meses siguientes a la compra, y caduca un mes después de escanearlo por primera vez en un monumento.",
  ],
  [
    "¿Incluye el Jordan Pass Petra de noche?",
    "No. Petra by Night es una entrada aparte. El pase solo cubre la entrada diurna a Petra.",
  ],
  [
    "¿Quién no puede usar el Jordan Pass?",
    "El pase no está disponible para ciudadanos de países árabes. Algunas nacionalidades no tienen derecho a la exención del visado y otras ya están exentas de pagarlo: comprueba tu pasaporte en la web oficial antes de comprar.",
  ],
];

const articleSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: "¿Merece la pena el Jordan Pass? Precios, ahorro y quién no debería comprarlo",
      description:
        "Precios del Jordan Pass, qué incluye, las reglas de la exención del visado, ejemplos de ahorro y cuándo no compensa.",
      url: URL,
      image: "https://zowar.net/images/blog/amman-view-from-ruins.jpg",
      datePublished: "2026-11-06",
      dateModified: LAST_UPDATED_ISO,
      author: {
        "@type": "Person",
        name: "Abdallah Al-Qudsi",
        description: "Fundador de Zowar. Creció en Jordania y tiene familia por todo el país.",
        url: "https://zowar.net/about?lang=es",
      },
      publisher: {
        "@type": "Organization",
        name: "Zowar",
        url: "https://zowar.net",
        logo: { "@type": "ImageObject", url: "https://zowar.net/logo.png" },
      },
      inLanguage: "es",
      about: [{ "@type": "Country", name: "Jordania" }],
    },
    {
      "@type": "FAQPage",
      inLanguage: "es",
      mainEntity: faqs.map(([q, a]) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
  ],
};

const passes = [
  { name: "Jordan Wanderer", price: "70 JOD", approx: "≈ 99 US$", petra: "1 día en Petra" },
  { name: "Jordan Explorer", price: "75 JOD", approx: "≈ 106 US$", petra: "2 días consecutivos en Petra" },
  { name: "Jordan Expert", price: "80 JOD", approx: "≈ 113 US$", petra: "3 días consecutivos en Petra" },
];

const examples = [
  {
    title: "Amán + un día en Petra",
    lines: [
      ["Visado", "40 JOD"],
      ["Petra, 1 día", "50 JOD"],
    ],
    total: "90 JOD",
    pass: "Wanderer: 70 JOD",
    saving: "Ahorras unos 20 JOD",
  },
  {
    title: "Una semana clásica",
    lines: [
      ["Visado", "40 JOD"],
      ["Petra, 2 días", "55 JOD"],
      ["Jerash", "~10 JOD"],
      ["Wadi Rum", "5 JOD"],
      ["Ciudadela de Amán", "3 JOD"],
    ],
    total: "~113 JOD",
    pass: "Explorer: 75 JOD",
    saving: "Ahorras unos 38 JOD",
  },
];

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mt-14 scroll-mt-20">
      <h2 className="text-2xl font-semibold text-neutral-950">{title}</h2>
      <div className="mt-4 space-y-4 text-base leading-8 text-neutral-700">{children}</div>
    </section>
  );
}

function Bullets({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="space-y-3 text-base leading-7 text-neutral-700">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3">
          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c8694a]" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

const toc = [
  ["respuesta-corta", "La respuesta corta"],
  ["precios", "Precios del Jordan Pass"],
  ["visado", "Cómo funciona la exención del visado"],
  ["incluye", "Qué incluye y qué no"],
  ["ahorro", "Cuánto ahorras de verdad"],
  ["no-compensa", "Cuándo no compensa"],
  ["consejos", "Consejos para usarlo"],
  ["aman", "El pase en Amán"],
  ["preguntas", "Preguntas frecuentes"],
];

export default function JordanPassEs() {
  return (
    <div lang="es">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="min-h-screen bg-[#faf7f2] text-neutral-900">
        <div className="border-b border-black/8 bg-white/80 backdrop-blur-md">
          <div className="mx-auto flex max-w-3xl items-center gap-4 px-6 py-4 text-sm">
            <Link href="/?lang=es" className="text-neutral-500 hover:text-neutral-800 transition">Zowar</Link>
            <span className="text-neutral-300">/</span>
            <Link href="/blog" className="text-neutral-500 hover:text-neutral-800 transition">Blog</Link>
            <span className="text-neutral-300">/</span>
            <span className="text-neutral-700">Jordan Pass</span>
          </div>
        </div>

        <article className="mx-auto max-w-3xl px-6 py-14">
          <header className="mb-10">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#c8694a] bg-[#fef3ee] px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-[#c8694a]">
              Planificar el viaje · Jordania
            </div>
            <h1 className="text-3xl font-semibold leading-tight tracking-tight text-neutral-950 sm:text-4xl">
              ¿Merece la pena el Jordan Pass? Precios, ahorro y quién no debería comprarlo
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-neutral-600">
              El Jordan Pass combina tu visado turístico con la entrada a Petra y a más
              de 40 lugares. Para la mayoría de visitantes es una compra fácil, pero hay
              algunos casos en los que te cuesta más de lo que te ahorra.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-neutral-400">
              <span>Por Abdallah Al-Qudsi</span>
              <span>·</span>
              <span>7 min de lectura</span>
              <span>·</span>
              <time dateTime={LAST_UPDATED_ISO} className="font-medium text-[#c8694a]">
                Actualizado el {LAST_UPDATED}
              </time>
            </div>
            <BlogTranslations
              prefix="También disponible en:"
              links={[{ lang: "en", label: "English", href: "/blog/jordan-pass" }]}
            />
          </header>

          <figure className="mb-10">
            <div className="relative h-72 w-full overflow-hidden rounded-3xl sm:h-96">
              <Image
                src="/images/blog/amman-view-from-ruins.jpg"
                alt="Vista de Amán desde las ruinas de la Ciudadela"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
                priority
              />
            </div>
            <figcaption className="mt-2 text-center text-xs text-neutral-400">La Ciudadela de Amán, uno de los lugares que cubre el pase</figcaption>
          </figure>

          <section id="respuesta-corta" className="scroll-mt-20 rounded-3xl border border-black/8 bg-white p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c8694a]">La respuesta corta</p>
            <p className="mt-3 text-base leading-8 text-neutral-700">
              <strong className="text-neutral-950">Si llegas en avión, te quedas al menos dos noches y vas a Petra, cómpralo.</strong>{" "}
              El pase más barato cuesta 70 JOD. Solo el visado cuesta 40 JOD y una
              entrada de un día a Petra 50 JOD, así que el pase te ahorra unos 20 JOD
              antes de visitar nada más. No lo compres si tienes pasaporte de un país
              árabe, si ya estás exento del visado, si te quedas menos de dos noches o
              si no vas a Petra.
            </p>
          </section>

          <nav className="mt-8 rounded-2xl border border-black/8 bg-white p-5">
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">En esta guía</p>
            <ol className="space-y-1.5 text-sm">
              {toc.map(([id, label], i) => (
                <li key={id} className="flex items-center gap-2">
                  <span className="text-xs font-bold tabular-nums text-[#c8694a]/40">{String(i + 1).padStart(2, "0")}</span>
                  <a href={`#${id}`} className="text-neutral-700 hover:text-[#c8694a] transition">{label}</a>
                </li>
              ))}
            </ol>
          </nav>

          <Section id="precios" title="Precios del Jordan Pass">
            <p>
              Hay tres versiones. Incluyen exactamente los mismos lugares y la misma
              exención del visado; la única diferencia es cuántos días tienes en Petra.
            </p>
            <div className="space-y-3">
              {passes.map((p) => (
                <div key={p.name} className="rounded-2xl border border-black/8 bg-white p-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="font-semibold text-neutral-950">{p.name}</p>
                    <p className="text-sm font-semibold text-[#c8694a]">
                      {p.price} <span className="font-normal text-neutral-400">{p.approx}</span>
                    </p>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-neutral-600">{p.petra}</p>
                </div>
              ))}
            </div>
            <p>
              Petra es enorme. Con un día ves el Siq, el Tesoro y el valle principal.
              Con dos puedes añadir el Monasterio y alguna ruta a los lugares altos sin
              prisas. El día extra cuesta solo 5 JOD, así que si dudas, elige el Explorer.
            </p>
            <p className="text-sm text-neutral-500">
              Precios de{" "}
              <a href="https://www.jordanpass.jo" target="_blank" rel="noopener noreferrer" className="text-[#c8694a] underline">jordanpass.jo</a>,
              comprobados el {LAST_UPDATED}. Las cifras en dólares son aproximadas.
            </p>
          </Section>

          <Section id="visado" title="Cómo funciona la exención del visado">
            <p>
              La mayor parte del valor del pase viene del visado, así que conviene tener
              claras las reglas:
            </p>
            <Bullets
              items={[
                <>
                  <strong className="text-neutral-950">Cómpralo antes de llegar.</strong> La
                  exención solo se aplica si compraste el pase antes de entrar en Jordania.
                </>,
                <>
                  <strong className="text-neutral-950">Quédate al menos dos noches completas.</strong>{" "}
                  Si te vas antes, inmigración te mandará a pagar el visado al salir.
                </>,
                <>
                  <strong className="text-neutral-950">Solo una entrada.</strong> Si sales
                  de Jordania y vuelves a entrar (por ejemplo, para visitar un país vecino),
                  la exención no cubre la segunda entrada.
                </>,
                <>
                  <strong className="text-neutral-950">Enséñalo en inmigración.</strong> Lleva
                  el pase en el móvil o impreso al aterrizar.
                </>,
                <>
                  <strong className="text-neutral-950">Las tasas de salida por frontera terrestre van aparte.</strong>{" "}
                  El pase no cubre el impuesto de salida en los pasos fronterizos terrestres.
                </>,
              ]}
            />
          </Section>

          <Section id="incluye" title="Qué incluye y qué no">
            <p>El pase cubre la entrada diurna a más de 40 lugares, entre ellos:</p>
            <Bullets
              items={[
                <>
                  <strong className="text-neutral-950">Petra</strong> (de día, de 1 a 3 días
                  según tu pase)
                </>,
                <>
                  <strong className="text-neutral-950">Wadi Rum</strong>: entrada al área protegida
                </>,
                <>
                  <strong className="text-neutral-950">Jerash</strong>, la ciudad romana a una
                  hora al norte de Amán
                </>,
                <>
                  <strong className="text-neutral-950">La Ciudadela y el Teatro Romano de Amán</strong>
                </>,
                "Los castillos de Ajloun, Karak y Shobak, Umm Qais, el parque arqueológico de Madaba y los castillos del desierto al este de Amán",
              ]}
            />
            <p>No incluye:</p>
            <Bullets
              items={[
                "Petra by Night (Petra de noche): es una entrada aparte.",
                "El lugar del Bautismo (Betania al otro lado del Jordán), aunque puedes añadirlo con descuento al comprar el pase online.",
                "Excursiones en 4x4, campamentos y guías en Wadi Rum: el pase solo cubre la entrada al área protegida.",
                "Las playas y resorts del mar Muerto, ni museos o experiencias privadas.",
              ]}
            />
            <p className="text-sm text-neutral-500">
              La lista completa está en la{" "}
              <a href="https://www.jordanpass.jo" target="_blank" rel="noopener noreferrer" className="text-[#c8694a] underline">web oficial del Jordan Pass</a>.
            </p>
          </Section>

          <Section id="ahorro" title="Cuánto ahorras de verdad">
            <p>
              Dos viajes habituales, con y sin el pase. Los precios de las entradas son
              aproximados y pueden cambiar, pero la conclusión se mantiene:
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {examples.map((ex) => (
                <div key={ex.title} className="rounded-2xl border border-black/8 bg-white p-5">
                  <p className="font-semibold text-neutral-950">{ex.title}</p>
                  <dl className="mt-3 space-y-1.5 text-sm text-neutral-600">
                    {ex.lines.map(([label, value]) => (
                      <div key={label} className="flex justify-between gap-3">
                        <dt>{label}</dt>
                        <dd className="tabular-nums">{value}</dd>
                      </div>
                    ))}
                    <div className="flex justify-between gap-3 border-t border-black/8 pt-1.5 font-semibold text-neutral-900">
                      <dt>Sin el pase</dt>
                      <dd className="tabular-nums">{ex.total}</dd>
                    </div>
                    <div className="flex justify-between gap-3 text-neutral-900">
                      <dt>Con el pase</dt>
                      <dd className="tabular-nums">{ex.pass}</dd>
                    </div>
                  </dl>
                  <p className="mt-3 text-sm font-semibold text-[#c8694a]">{ex.saving}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section id="no-compensa" title="Cuándo no compensa">
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-900">
              <Bullets
                items={[
                  <>
                    <strong>Tienes pasaporte de un país árabe.</strong> El pase no está
                    disponible para ciudadanos árabes.
                  </>,
                  <>
                    <strong>Ya estás exento del visado</strong> por tu nacionalidad. Sin
                    el ahorro de 40 JOD, el pase solo compensa si visitas Petra y varios
                    lugares más.
                  </>,
                  <>
                    <strong>Te quedas menos de dos noches.</strong> Pagarás el visado al
                    salir de todas formas.
                  </>,
                  <>
                    <strong>No vas a Petra.</strong> Petra es la mayor parte del valor del
                    pase. Sin ella, el visado más unos cuantos lugares pequeños suele
                    sumar menos de 70 JOD.
                  </>,
                  <>
                    <strong>Tu nacionalidad no tiene derecho a la exención.</strong> Algunas
                    nacionalidades pagan el visado igualmente: compruébalo antes en la web
                    oficial.
                  </>,
                ]}
              />
            </div>
          </Section>

          <figure className="mt-10">
            <div className="relative h-60 w-full overflow-hidden rounded-3xl sm:h-72">
              <Image
                src="/images/blog/downtown-amman-old-city.jpg"
                alt="El casco antiguo del centro de Amán sobre las colinas"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
            <figcaption className="mt-2 text-center text-xs text-neutral-400">El centro de Amán, a los pies de la Ciudadela</figcaption>
          </figure>

          <Section id="consejos" title="Consejos para usarlo">
            <Bullets
              items={[
                <>
                  <strong className="text-neutral-950">Ojo con la validez.</strong> Hay que
                  usar el pase en los 3 meses siguientes a la compra y caduca un mes después
                  del primer escaneo. Cómpralo unas semanas antes del vuelo, no meses antes.
                </>,
                <>
                  <strong className="text-neutral-950">Los días de Petra son consecutivos.</strong>{" "}
                  Con el Explorer o el Expert, tus días en Petra tienen que ir seguidos:
                  organiza el resto del itinerario en torno a ellos.
                </>,
                <>
                  <strong className="text-neutral-950">Llévalo en el móvil y en papel.</strong>{" "}
                  En los lugares más remotos la cobertura puede fallar.
                </>,
                <>
                  <strong className="text-neutral-950">Lleva el pasaporte a las visitas.</strong>{" "}
                  El pase está vinculado a él y pueden pedírtelo.
                </>,
              ]}
            />
          </Section>

          <Section id="aman" title="El pase en Amán">
            <p>
              En Amán, el pase te da acceso a la Ciudadela y al Teatro Romano, que están
              a ambos lados del centro y se ven fácilmente en una mañana. Desde ahí hay
              un paseo corto o un trayecto en taxi hasta Rainbow Street y Jabal Amman
              para comer. Nuestro{" "}
              <Link href="/blog/es/3-dias-en-aman" className="text-[#c8694a] underline">itinerario de 3 días en Amán</Link>{" "}
              explica cómo encajarlo todo, incluida una excursión a Jerash.
            </p>
          </Section>

          <section id="preguntas" className="mt-14 scroll-mt-20 rounded-3xl border border-black/8 bg-white p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-neutral-950">Preguntas frecuentes</h2>
            <div className="mt-5 space-y-6">
              {faqs.map(([q, a]) => (
                <div key={q}>
                  <p className="font-semibold text-neutral-900">{q}</p>
                  <p className="mt-2 text-sm leading-6 text-neutral-600">{a}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-10 rounded-3xl border border-black/8 bg-white p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400">Sobre el autor</p>
            <p className="mt-2 font-semibold text-neutral-950">Abdallah Al-Qudsi</p>
            <p className="mt-2 text-sm leading-6 text-neutral-600">
              Abdallah creció en Jordania y tiene familia en muchas partes del país.
              Fundó Zowar para enseñar a los visitantes la cara de Amán que conocen los
              locales. Esta página se actualiza cuando cambian los precios o las reglas
              del Jordan Pass.
            </p>
          </section>

          <section className="mt-10 rounded-3xl border border-[#c8694a]/20 bg-[#fef3ee] p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c8694a]">Después de la Ciudadela</p>
            <h2 className="mt-2 text-xl font-semibold text-neutral-950">
              Pasa la tarde comiendo calle arriba por Rainbow Street
            </h2>
            <p className="mt-3 text-sm leading-7 text-neutral-700">
              Zowar es un paseo autoguiado de comida y acertijos por Rainbow Street y
              Jabal Amman: 7 paradas locales, degustaciones incluidas, sin grupo y sin
              horario fijo. Es la parte de Amán que el Jordan Pass no cubre.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/booking?lang=es"
                className="inline-flex items-center gap-2 rounded-2xl bg-[#c8694a] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
              >
                Reservar la experiencia →
              </Link>
              <Link
                href="/blog/es/3-dias-en-aman"
                className="inline-flex items-center gap-2 rounded-2xl border border-black/10 bg-white px-5 py-2.5 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50"
              >
                Amán en 3 días
              </Link>
            </div>
          </section>

          <div className="mt-14 flex items-center justify-between border-t border-black/8 pt-8 text-sm text-neutral-500">
            <Link href="/blog" className="hover:text-neutral-800 transition">← Todas las guías</Link>
            <Link href="/blog/es/3-dias-en-aman" className="hover:text-neutral-800 transition">Amán en 3 días →</Link>
          </div>
        </article>
      </div>
    </div>
  );
}
