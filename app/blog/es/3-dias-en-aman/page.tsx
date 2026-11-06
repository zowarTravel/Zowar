import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BlogTranslations from "@/app/components/blog-translations";

const URL = "https://zowar.net/blog/es/3-dias-en-aman";
const EN_URL = "https://zowar.net/blog/3-days-in-amman";

export const metadata: Metadata = {
  title: "Amán en 3 días: itinerario completo para 2026",
  description:
    "Qué ver en Amán en 3 días: Rainbow Street y Weibdeh, la Ciudadela y el Teatro Romano, excursiones a Jerash y al mar Muerto. Dónde comer, qué ver y cómo organizar tu tiempo.",
  alternates: {
    canonical: URL,
    languages: { en: EN_URL, es: URL, "x-default": EN_URL },
  },
  openGraph: {
    title: "Amán en 3 días: itinerario completo para 2026",
    description:
      "Cómo pasar 3 días en Amán: del desayuno en Rainbow Street a la Ciudadela, el Teatro Romano, Jerash y el mar Muerto.",
    url: URL,
    locale: "es_ES",
    type: "article",
    images: [{ url: "/images/blog/amman-city-panoramic.jpg", alt: "Vista panorámica de Amán, Jordania" }],
  },
  keywords: [
    "Amán en 3 días",
    "qué ver en Amán",
    "itinerario Amán",
    "qué hacer en Amán",
    "guía de viaje Amán",
    "viaje a Jordania",
    "Ciudadela de Amán",
    "Teatro Romano Amán",
    "excursión a Jerash desde Amán",
    "mar Muerto desde Amán",
    "Rainbow Street Amán",
    "Jordania itinerario 2026",
  ],
};

const faqs: [string, string][] = [
  [
    "¿Son suficientes 3 días para Amán?",
    "Sí. Con tres días ves lo principal de la ciudad y haces una excursión. Rainbow Street, Weibdeh, la Ciudadela, el Teatro Romano y el centro se recorren con calma en dos días, y el tercero queda para Jerash o el mar Muerto. Un cuarto día te permitiría añadir Madaba y el monte Nebo sin prisas.",
  ],
  [
    "¿Es seguro Amán para los turistas?",
    "Amán es una de las capitales más tranquilas de Oriente Medio y la delincuencia contra visitantes es poco habitual. Viajeros solos, incluidas mujeres que viajan solas, cuentan que se sienten cómodos por toda la ciudad. Consulta siempre las recomendaciones de viaje de tu país antes de salir.",
  ],
  [
    "¿Necesito visado para Jordania?",
    "La mayoría de nacionalidades necesitan visado, pero si compras el Jordan Pass online antes de llegar y te quedas al menos dos noches, la tasa de visado queda incluida, además de la entrada a Petra y a más de 40 lugares. Comprueba los requisitos para tu pasaporte en la web oficial.",
  ],
  [
    "¿Qué idioma se habla en Amán?",
    "El árabe es el idioma oficial. En las zonas turísticas, restaurantes y hoteles de Jabal Amman, Weibdeh y Abdoun se habla mucho inglés. En el centro y en los barrios más antiguos, menos. El español apenas se habla, así que unas palabras de inglés o árabe ayudan.",
  ],
  [
    "¿Cómo llego del aeropuerto de Amán a la ciudad?",
    "El aeropuerto Queen Alia está a unos 35 kilómetros al sur del centro. Hay un autobús Airport Express frecuente y barato. También hay taxis y Careem: en el taxi, acuerda el precio antes de subir, o usa la aplicación.",
  ],
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: "Amán en 3 días: itinerario completo",
      description:
        "Itinerario día a día para pasar 3 días en Amán, Jordania: Rainbow Street, Weibdeh, la Ciudadela, el Teatro Romano, el centro y excursiones a Jerash y al mar Muerto.",
      url: URL,
      image: "https://zowar.net/images/blog/amman-city-panoramic.jpg",
      datePublished: "2026-11-06",
      dateModified: "2026-11-06",
      author: { "@type": "Organization", name: "Zowar", url: "https://zowar.net" },
      publisher: {
        "@type": "Organization",
        name: "Zowar",
        url: "https://zowar.net",
        logo: { "@type": "ImageObject", url: "https://zowar.net/logo.png" },
      },
      inLanguage: "es",
      about: [
        { "@type": "City", name: "Amán" },
        { "@type": "Country", name: "Jordania" },
      ],
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

const days = [
  {
    day: "Día 1",
    title: "Rainbow Street, Weibdeh y la comida que define Amán",
    subtitle: "Empieza donde el carácter de la ciudad está más concentrado.",
    color: "bg-z-orange-soft border-[#c8694a]/20",
    labelColor: "text-[#c8694a]",
    schedule: [
      {
        time: "7:30",
        heading: "Desayuno en Rainbow Street",
        body: "Empieza el día en Al-Quds Falafel, un pequeño mostrador que lleva en Rainbow Street desde 1966. Solo para llevar: falafel en pan francés, y se acaba pronto. Si prefieres algo más tranquilo, Shams Al Balad está a dos minutos calle abajo, con una terraza frente a la Ciudadela y una carta de platos jordanos de temporada hechos con ingredientes locales ecológicos. Aparece en la lista World's 50 Best Discovery y merece la pena sentarse un rato más.",
        link: { text: "Guía de desayunos (en inglés) →", href: "/blog/best-breakfast-amman" },
      },
      {
        time: "9:30",
        heading: "La experiencia Zowar",
        body: "Es la mejor manera de pasar tu primera mañana en Amán. Zowar es un paseo autoguiado con acertijos por Rainbow Street y Weibdeh: sigues un rastro de pistas por el barrio y te detienes en locales para probar comida y descubrir su historia. Son entre 3 y 4 horas a ritmo tranquilo y recorres más barrio del que la mayoría de visitantes ve en un día entero paseando. Incluye más de 25 JOD en comida y regalos, y funciona como una introducción real a lo que hace especial esta parte de la ciudad.",
        cta: { text: "Reservar la experiencia Zowar", href: "/booking?lang=es" },
      },
      {
        time: "13:30",
        heading: "Almuerzo y paseo por Weibdeh",
        body: "Cuando termine la ruta de Zowar, sigue cuesta arriba hacia Jabal Al-Weibdeh. El barrio es más tranquilo y residencial que Rainbow Street: villas de piedra, callejuelas con sombra, estudios de artistas. Go Mashawi, en una de las calles laterales, prepara unos bocadillos de carne a la parrilla excelentes si necesitas comer algo. Después, camina hasta Darat Al Funun: tres villas restauradas de los años veinte en un jardín en ladera, con ruinas bizantinas en el recinto y buenas exposiciones de arte árabe contemporáneo. La entrada es gratuita.",
        link: { text: "Guía de Weibdeh (en inglés) →", href: "/blog/weibdeh-neighbourhood-guide" },
      },
      {
        time: "15:30",
        heading: "Galería Nacional de Bellas Artes de Jordania",
        body: "A cinco minutos andando de Darat Al Funun. La Galería Nacional tiene una de las colecciones de arte árabe moderno y contemporáneo más importantes del mundo, repartida en dos edificios con un parque de esculturas entre ambos. El parque es gratuito y es uno de los rincones más tranquilos de la ciudad.",
      },
      {
        time: "17:30",
        heading: "Café en Rumi Café",
        body: "Termina la tarde en Rumi Café, en Weibdeh: abierto desde 2013, café de especialidad, patio exterior y bizcocho de naranja casero. Es de esos sitios en los que te quedas hasta que entra la luz de la tarde por las ventanas.",
      },
      {
        time: "19:30",
        heading: "Cena en Rainbow Street",
        body: "Vuelve a Rainbow Street para cenar. La calle está en su mejor momento por la noche: restaurantes llenos, cafés que se extienden a la acera y, a menudo, música en directo en Jafra. Rumman Collective merece una visita si no llegaste a su brunch de fin de semana.",
      },
    ],
  },
  {
    day: "Día 2",
    title: "La Ciudadela, el Teatro Romano y el centro de Amán",
    subtitle: "Dos mil años de historia en una sola mañana.",
    color: "bg-blue-50 border-blue-200",
    labelColor: "text-blue-600",
    schedule: [
      {
        time: "8:00",
        heading: "Desayuno en Abu Jbara",
        body: "Abu Jbara es uno de los restaurantes de desayuno completo más fiables de Amán: hummus, ful medames, fatteh, falafel y pan árabe recién hecho, todo a la vez. Tiene tres locales en la ciudad y uno abre las 24 horas. Desayuna bien antes de subir a la Ciudadela.",
      },
      {
        time: "9:30",
        heading: "Ciudadela de Amán (Jabal al-Qal'a)",
        body: "La Ciudadela ocupa la colina más alta de Amán y lleva habitada más de 7000 años. Conserva los restos de un templo romano dedicado a Hércules, una iglesia bizantina y el Palacio Omeya, un gran complejo que fue sede del gobernador en el siglo VIII. Las vistas de la ciudad desde el borde de la colina son las mejores de Amán. El Museo Arqueológico de Jordania, dentro del recinto, merece una hora: es pequeño, está bien montado y guarda las estatuas de Ain Ghazal, de las figuras humanas más antiguas que se conocen.",
      },
      {
        time: "11:30",
        heading: "Teatro Romano",
        body: "Bajando 15 minutos a pie desde la Ciudadela llegas al Teatro Romano: un anfiteatro de 6000 localidades del siglo II d. C., muy bien conservado y que todavía se usa para espectáculos. Sube a la última grada para ver la ciudad. Justo al lado está el Odeón, un teatro romano más pequeño.",
      },
      {
        time: "13:00",
        heading: "Almuerzo en el centro (Al-Balad)",
        body: "El centro de Amán, conocido como Al-Balad, es la parte más antigua y densa de la ciudad. Después del Teatro Romano, métete por las calles de alrededor para encontrar la mayor concentración de comida callejera de Amán: knafeh en alguna de las pastelerías, zumo recién exprimido y el ambiente de una ciudad mercado que lleva siglos funcionando. Merece la pena perderse por el zoco del oro, el mercado de especias y las viejas calles cubiertas.",
      },
      {
        time: "15:00",
        heading: "Duke's Diwan y el casco antiguo",
        body: "Duke's Diwan es un edificio de principios del siglo XX restaurado en el centro de Amán que funciona como espacio cultural y de patrimonio. La entrada es libre y está lleno de fotografías y documentos antiguos sobre la historia de la ciudad. Un buen punto de partida para pasear por las calles más antiguas de alrededor.",
      },
      {
        time: "17:00",
        heading: "Atardecer desde un mirador",
        body: "Amán se construyó sobre siete colinas (hoy son casi veinte) y ver el atardecer desde un punto alto es una de sus mejores experiencias. El borde de la Ciudadela es el sitio más espectacular. Otra opción es la terraza de Shams Al Balad en Rainbow Street, que mira directamente a la Ciudadela y al Palacio Omeya, iluminados al anochecer.",
      },
      {
        time: "19:30",
        heading: "Cena",
        body: "Hay opciones para todos los apetitos. Hashem, en el centro, es toda una institución de Amán para hummus y falafel, abierto desde 1952: pequeño, sin pretensiones y merece la cola. Si prefieres algo más relajado, los restaurantes de Rainbow Street o Abdoun quedan muy cerca.",
      },
    ],
  },
  {
    day: "Día 3",
    title: "Excursión: Jerash o el mar Muerto",
    subtitle: "Los dos están a menos de una hora de la ciudad. Elige según lo que hayas venido a buscar.",
    color: "bg-emerald-50 border-emerald-200",
    labelColor: "text-emerald-700",
    schedule: [
      {
        time: "Opción A",
        heading: "Jerash: ruinas romanas a 45 minutos al norte",
        body: "Jerash conserva una de las ciudades romanas más completas y mejor conservadas del mundo. Estuvo habitada desde el Neolítico y vivió su época de mayor esplendor bajo Roma, en los siglos I y II d. C. La Plaza Oval, las calles columnadas, los templos de Artemisa y Zeus, el hipódromo y los teatros se recorren a pie dentro del recinto. Calcula un mínimo de 3 a 4 horas. Llega temprano, antes de que apriete el calor y antes de que lleguen los grupos a partir de las 10.",
      },
      {
        time: "Opción B",
        heading: "Mar Muerto: una hora al suroeste",
        body: "El mar Muerto está a más de 400 metros bajo el nivel del mar, el punto más bajo de la Tierra, y el agua tiene tanta sal y minerales que flotar es inevitable y nadar, imposible. Es una experiencia que no se parece a ninguna otra. La mayoría de visitantes va a una de las zonas de playa de los resorts, con vestuarios, duchas y agua dulce. El barro negro de la orilla se aplica sobre la piel y luego se aclara. Reserva medio día. La vuelta a Amán por el valle del Jordán es muy bonita.",
      },
      {
        time: "Vuelta a las 15:00",
        heading: "Tarde en Amán",
        body: "Si te vas a la mañana siguiente, aprovecha la tarde para volver a lo que te quedó pendiente: los zocos del centro, un café en Weibdeh o un paseo más largo por Rainbow Street. Si tienes otro día, Madaba (la ciudad de los mosaicos) y el monte Nebo (desde donde, según la tradición, Moisés vio la Tierra Prometida) están a una hora de Amán y se combinan fácilmente en una sola excursión.",
      },
      {
        time: "Noche",
        heading: "Cena de despedida",
        body: "La última noche en Amán es mejor pasarla en algún sitio al que no llegaste antes. Sufra, en Rainbow Street, es uno de los restaurantes de cocina jordana más celebrados de la ciudad: una villa de los años cuarenta y cocina jordana cuidada en un entorno a la altura. O vuelve a ese sitio que se ganó una segunda visita.",
      },
    ],
  },
];

export default function TresDiasEnAman() {
  return (
    <div lang="es">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="min-h-screen bg-[#faf7f2] text-neutral-900">
        <div className="border-b border-black/8 bg-white/80 backdrop-blur-md">
          <div className="mx-auto flex max-w-3xl items-center gap-4 px-6 py-4 text-sm">
            <Link href="/?lang=es" className="text-neutral-500 hover:text-neutral-800 transition">Zowar</Link>
            <span className="text-neutral-300">/</span>
            <Link href="/blog" className="text-neutral-500 hover:text-neutral-800 transition">Blog</Link>
            <span className="text-neutral-300">/</span>
            <span className="text-neutral-700">Amán en 3 días</span>
          </div>
        </div>

        <article className="mx-auto max-w-3xl px-6 py-14">
          <header className="mb-12">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-z-orange bg-z-orange-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-[#c8694a]">
              Guía de viaje · Amán, Jordania
            </div>
            <h1 className="text-3xl font-semibold leading-tight tracking-tight text-neutral-950 sm:text-4xl">
              Amán en 3 días: itinerario completo
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-neutral-600">
              La mayoría de la gente pasa una noche en Amán de camino a Petra y se va
              sin haber visto casi nada. Tres días bastan para entender por qué la
              ciudad merece quedarse: la comida, la historia, los barrios y el país
              que la rodea.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-neutral-400">
              <span>Por Zowar · Amán, Jordania</span>
              <span>·</span>
              <span>12 min de lectura</span>
              <span>·</span>
              <span>Actualizado en 2026</span>
            </div>
            <BlogTranslations
              prefix="También disponible en:"
              links={[{ lang: "en", label: "English", href: "/blog/3-days-in-amman" }]}
            />
          </header>

          <figure className="mb-10">
            <div className="relative h-72 w-full overflow-hidden rounded-3xl sm:h-96">
              <Image
                src="/images/blog/amman-city-panoramic.jpg"
                alt="Vista panorámica de Amán, Jordania, desde la colina de Jabal Amman"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
                priority
              />
            </div>
            <figcaption className="mt-2 text-center text-xs text-neutral-400">Amán desde Jabal Amman: la ciudad se extiende sobre unas 20 colinas</figcaption>
          </figure>

          <section className="rounded-3xl border border-black/8 bg-white p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-neutral-950">Antes de empezar</h2>
            <div className="mt-4 space-y-4 text-sm leading-7 text-neutral-700">
              <p>
                Amán es una de las ciudades más infravaloradas de Oriente Medio. Se suele
                tratar como un lugar de paso: una noche antes de ir a Petra, un sitio
                donde cambiar dinero y seguir. Es un error. La ciudad tiene un carácter
                propio repartido por sus colinas: un centro antiguo y denso junto a
                barrios tranquilos de villas de piedra, una escena gastronómica que
                refleja de verdad su cultura y una ubicación que la convierte en la mejor
                base del país para llegar al resto de Jordania.
              </p>
              <p>
                Este itinerario está pensado para quien pasa tres noches usando Amán como
                base. El primer día cubre Rainbow Street y Weibdeh, el corazón cultural
                de la ciudad. El segundo profundiza en la historia: la Ciudadela, el
                Teatro Romano y el centro. El tercero es una excursión a Jerash o al mar
                Muerto, ambos a menos de una hora.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3 text-center">
              {[
                ["Día 1", "Rainbow Street y Weibdeh"],
                ["Día 2", "Ciudadela, Teatro y centro"],
                ["Día 3", "Jerash o mar Muerto"],
              ].map(([day, desc]) => (
                <div key={day} className="rounded-2xl border border-black/8 p-3">
                  <p className="text-xs font-bold text-[#c8694a]">{day}</p>
                  <p className="mt-1 text-xs leading-5 text-neutral-600">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-6 rounded-3xl border border-black/8 bg-white p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-neutral-950">Información práctica</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {[
                ["Dónde alojarse", "Jabal Amman (zona de la Primera y Segunda Rotonda) es la mejor base: a pie de Rainbow Street y Weibdeh y con fácil acceso en taxi a todo lo demás. Abdoun es más tranquilo y algo más alejado de los principales lugares."],
                ["Cómo moverse", "Los taxis y Careem/Uber son baratos y fiables. Amán tiene muchas cuestas y está muy extendida: dentro de cada barrio se puede caminar, pero entre barrios usa taxi. La mayoría de trayectos cuestan entre 2 y 5 JOD."],
                ["Mejor época", "De marzo a mayo y de septiembre a noviembre: temperaturas suaves, sin lluvia y cielos despejados. Julio y agosto son calurosos. De diciembre a febrero puede hacer frío y llover alguna vez, pero hay muy poca gente."],
                ["Moneda", "Dinar jordano (JOD). Muchos restaurantes y tiendas solo aceptan efectivo. Hay cajeros por todas partes. Las tarjetas se aceptan en hoteles y restaurantes grandes."],
              ].map(([title, body]) => (
                <div key={title} className="rounded-2xl border border-black/8 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400">{title}</p>
                  <p className="mt-2 text-sm leading-6 text-neutral-700">{body}</p>
                </div>
              ))}
            </div>
          </section>

          <figure className="mt-6">
            <div className="relative h-64 w-full overflow-hidden rounded-3xl sm:h-80">
              <Image
                src="/images/blog/rainbow-street-painted-stairs.jpg"
                alt="Escaleras pintadas en Rainbow Street, Amán, con la bandera jordana y flores"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
            <figcaption className="mt-2 text-center text-xs text-neutral-400">Las escaleras pintadas de Rainbow Street, uno de muchos detalles que se descubren paseando despacio</figcaption>
          </figure>

          <div className="mt-10 space-y-12">
            {days.map((day) => (
              <section key={day.day}>
                <div className={`rounded-3xl border p-6 sm:p-8 ${day.color}`}>
                  <p className={`text-xs font-bold uppercase tracking-[0.2em] ${day.labelColor}`}>{day.day}</p>
                  <h2 className="mt-1 text-2xl font-semibold text-neutral-950">{day.title}</h2>
                  <p className="mt-2 text-sm text-neutral-600">{day.subtitle}</p>
                </div>

                <div className="mt-4 space-y-4">
                  {day.schedule.map((slot, i) => (
                    <div key={i} className="rounded-3xl border border-black/8 bg-white p-6 sm:p-8">
                      <div className="flex items-baseline gap-3">
                        <span className="shrink-0 rounded-full border border-black/8 px-2.5 py-0.5 text-xs font-semibold tabular-nums text-neutral-500">
                          {slot.time}
                        </span>
                        <h3 className="text-base font-semibold text-neutral-950">{slot.heading}</h3>
                      </div>
                      <p className="mt-3 text-sm leading-7 text-neutral-700">{slot.body}</p>
                      {"link" in slot && slot.link && (
                        <Link
                          href={slot.link.href}
                          className="mt-3 inline-flex text-sm font-medium text-[#c8694a] hover:underline"
                        >
                          {slot.link.text}
                        </Link>
                      )}
                      {"cta" in slot && slot.cta && (
                        <div className="mt-4">
                          <Link
                            href={slot.cta.href}
                            className="inline-flex items-center gap-2 rounded-2xl bg-[#c8694a] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
                          >
                            {slot.cta.text} →
                          </Link>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <figure className="mt-4">
            <div className="relative h-64 w-full overflow-hidden rounded-3xl sm:h-80">
              <Image
                src="/images/blog/knafeh-downtown-amman.jpg"
                alt="Knafeh servida en la calle en el centro de Amán, Jordania"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
            <figcaption className="mt-2 text-center text-xs text-neutral-400">Knafeh recién hecha en la calle, en el centro de Amán: imprescindible el día 2</figcaption>
          </figure>

          <section className="mt-12 rounded-3xl border border-black/8 bg-white p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-neutral-950">Consejos para aprovechar Amán al máximo</h2>
            <ul className="mt-5 space-y-5 text-sm leading-7 text-neutral-700">
              {[
                ["Madruga.", "Los sitios de desayuno más populares, la Ciudadela y Jerash son mucho mejores antes de las 10: más fresco, menos gente y mejor luz para las fotos."],
                ["El viernes es distinto.", "El viernes es fin de semana en Jordania. Muchas tiendas y algunos restaurantes cierran por la mañana. La tarde y la noche son animadas. Organízate en consecuencia."],
                ["Viste con discreción fuera de las zonas turísticas.", "Rainbow Street y Weibdeh son relajados. El centro y los zocos son más conservadores. Hombros y rodillas cubiertos es la norma respetuosa."],
                ["Amán tiene muchas cuestas: lleva calzado cómodo.", "La ciudad está construida sobre colinas y las calles suelen ser de piedra irregular. Un buen calzado se nota mucho, sobre todo los días en que recorres a pie la Ciudadela, el centro y Weibdeh."],
                ["Usa Amán como base para todo el país.", "Petra está a 3 horas al sur, Áqaba a 4, Wadi Rum a 4,5 y Jerash a 45 minutos al norte. Casi toda Jordania se puede visitar en el día desde Amán. Mantener el alojamiento aquí te ahorra hacer y deshacer la maleta entre hoteles."],
              ].map(([title, body]) => (
                <li key={title} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c8694a]" />
                  <span>
                    <strong className="font-semibold text-neutral-900">{title}</strong>{" "}
                    {body}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <figure className="mt-4">
            <div className="relative h-64 w-full overflow-hidden rounded-3xl sm:h-80">
              <Image
                src="/images/blog/amman-view-from-ruins.jpg"
                alt="Vista de Amán desde las ruinas de la Ciudadela, con la bandera de Jordania"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
            <figcaption className="mt-2 text-center text-xs text-neutral-400">La vista desde la Ciudadela de Amán, habitada sin interrupción durante más de 7000 años</figcaption>
          </figure>

          <section className="mt-8 rounded-3xl border border-black/8 bg-white p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-neutral-950">Preguntas frecuentes</h2>
            <div className="mt-5 space-y-6">
              {faqs.map(([q, a]) => (
                <div key={q} className="border-b border-black/5 pb-5 last:border-0 last:pb-0">
                  <p className="font-semibold text-neutral-900">{q}</p>
                  <p className="mt-2 text-sm leading-6 text-neutral-600">{a}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-10 rounded-3xl border border-[#c8694a]/20 bg-z-orange-soft p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c8694a]">El día 1, resuelto</p>
            <h2 className="mt-2 text-xl font-semibold text-neutral-950">
              Empieza tu viaje a Amán con Zowar
            </h2>
            <p className="mt-3 text-sm leading-7 text-neutral-700">
              Zowar es la mejor manera de pasar tu primera mañana en Amán: una
              experiencia autoguiada con acertijos por Rainbow Street y Weibdeh, con
              paradas en locales para probar comida y descubrir su historia. De 3 a 4
              horas, más de 25 JOD en comida y regalos incluidos, desde 25 JOD por
              persona. Sin guía, disponible de martes a sábado.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/booking?lang=es"
                className="inline-flex items-center gap-2 rounded-2xl bg-[#c8694a] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
              >
                Reservar la experiencia →
              </Link>
              <Link
                href="/?lang=es"
                className="inline-flex items-center gap-2 rounded-2xl border border-black/10 bg-white px-5 py-2.5 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50"
              >
                Más sobre Zowar →
              </Link>
            </div>
          </section>

          <figure className="mt-4">
            <div className="relative h-64 w-full overflow-hidden rounded-3xl sm:h-80">
              <Image
                src="/images/blog/jordanian-kilim-rugs-rainbow-street.jpg"
                alt="Alfombras kilim jordanas colgadas en la fachada de una tienda de Rainbow Street, Amán"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
            <figcaption className="mt-2 text-center text-xs text-neutral-400">Alfombras kilim en una de las tiendas independientes de Rainbow Street: detalles que solo se ven a pie</figcaption>
          </figure>

          <section className="mt-8 rounded-3xl border border-black/8 bg-white p-6 sm:p-8">
            <p className="mb-4 text-sm font-semibold text-neutral-700">Más guías</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ["¿Merece la pena el Jordan Pass?", "Precios, qué incluye, cómo funciona la exención del visado y cuánto ahorras.", "/blog/es/jordan-pass"],
                ["Mejores desayunos en Amán (en inglés)", "Dónde desayunar cada mañana de tu viaje.", "/blog/best-breakfast-amman"],
                ["Guía de Rainbow Street (en inglés)", "La historia de la calle más famosa de Amán y todo lo que hacer en ella.", "/blog/rainbow-street-guide"],
                ["¿Es seguro visitar Amán? (en inglés)", "Lo que dicen las recomendaciones oficiales y cómo es el día a día en la ciudad.", "/blog/is-amman-safe"],
              ].map(([title, desc, href]) => (
                <Link
                  key={href}
                  href={href}
                  className="group rounded-2xl border border-black/8 p-4 transition hover:border-[#c8694a]/30"
                >
                  <p className="text-sm font-semibold text-neutral-900 group-hover:text-[#c8694a] transition">{title}</p>
                  <p className="mt-1 text-xs leading-5 text-neutral-500">{desc}</p>
                </Link>
              ))}
            </div>
          </section>

          <div className="mt-14 flex items-center justify-between border-t border-black/8 pt-8 text-sm text-neutral-500">
            <Link href="/blog" className="hover:text-neutral-800 transition">← Todas las guías</Link>
            <Link href="/blog/es/jordan-pass" className="hover:text-neutral-800 transition">¿Merece la pena el Jordan Pass? →</Link>
          </div>
        </article>
      </div>
    </div>
  );
}
