import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Rainbow Street Amman: History, Cinema & Complete Guide 2026",
  description:
    "The complete guide to Rainbow Street in Amman — its history from early-20th-century residential quarter to cultural hub, the story of the Rainbow Cinema, and everything to do there today.",
  alternates: { canonical: "https://zowar.net/blog/rainbow-street-guide" },
  openGraph: {
    title: "Rainbow Street Amman: History, Cinema & Complete Guide 2026",
    description:
      "From the 1957 Rainbow Cinema to today's galleries, cafés and food scene — the full story and guide to Amman's most famous street.",
    url: "https://zowar.net/blog/rainbow-street-guide",
    images: [{ url: "/logo.png", width: 1200, height: 630 }],
  },
  keywords: [
    "Rainbow Street Amman",
    "Rainbow Street history",
    "Rainbow Cinema Amman",
    "Rainbow Theater Amman",
    "Jabal Amman",
    "things to do Rainbow Street",
    "Rainbow Street restaurants",
    "Rainbow Street cafes",
    "First Circle Amman",
    "Jordan National Gallery Fine Arts",
    "things to do Amman",
    "Amman travel guide",
    "Jordan tourism",
  ],
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: "Rainbow Street Amman: History, Cinema & Complete Guide",
      description:
        "The complete guide to Rainbow Street — its history, the iconic Rainbow Cinema, and what to do, eat, and see along Amman's most beloved street.",
      url: "https://zowar.net/blog/rainbow-street-guide",
      datePublished: "2026-08-30",
      dateModified: "2026-08-30",
      author: { "@type": "Organization", name: "Zowar", url: "https://zowar.net" },
      publisher: {
        "@type": "Organization",
        name: "Zowar",
        url: "https://zowar.net",
        logo: { "@type": "ImageObject", url: "https://zowar.net/logo.png" },
      },
      inLanguage: "en",
      keywords:
        "Rainbow Street Amman, Rainbow Cinema history, Jabal Amman, things to do Rainbow Street, Jordan tourism, First Circle Amman",
      about: [
        { "@type": "LandmarkOrHistoricalBuilding", name: "Rainbow Street", address: { "@type": "PostalAddress", addressLocality: "Amman", addressCountry: "JO" } },
        { "@type": "City", name: "Amman" },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Why is it called Rainbow Street?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Rainbow Street was renamed after the Rainbow Cinema, an iconic movie theatre that opened in 1957. Before that, the street was known as Abu Bakr al-Siddiq Street.",
          },
        },
        {
          "@type": "Question",
          name: "Where is Rainbow Street in Amman?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Rainbow Street runs through Jabal Amman, starting at the First Circle and extending toward Mango Street. The walkable stretch is approximately 800 metres along the ridgeline.",
          },
        },
        {
          "@type": "Question",
          name: "What is there to do on Rainbow Street?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Rainbow Street has a mix of restaurants, cafés, art galleries, independent shops, and the Rainbow Theater. The Jordan National Gallery of Fine Arts is also located nearby. It is particularly lively in the evenings.",
          },
        },
        {
          "@type": "Question",
          name: "Is Rainbow Street walkable?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, the main stretch of Rainbow Street is fully walkable and pedestrian-friendly. Most visitors park near the First Circle and walk from there.",
          },
        },
      ],
    },
  ],
};

const stops = [
  {
    name: "Rainbow Theater (the former Rainbow Cinema)",
    desc: "The building the street was named after. Today it is an art-house cinema and cultural venue hosting film cycles, festivals, and lecture series. Worth checking what is on before you visit.",
  },
  {
    name: "Jordan National Gallery of Fine Arts",
    desc: "One of the most significant art institutions in the Arab world, with a permanent collection of modern and contemporary works from Jordan and across the region. The sculpture park outside is free to wander.",
  },
  {
    name: "Darat Al Funun",
    desc: "A set of three restored 1920s villas with a hillside garden, dedicated to modern Arab art. Within the grounds lie the remains of a sixth-century Byzantine church. Exhibitions, screenings, and concerts are held throughout the year.",
  },
  {
    name: "Al-Quds Falafel",
    desc: "The falafel counter that has been on the street since 1966. Takeout only, no seating. Go before 9 AM for the first fresh batch.",
  },
  {
    name: "Jafra",
    desc: "A beloved café and gathering place on Rainbow Street known for live music, Arabic coffee, and a crowd that stays late into the evening.",
  },
  {
    name: "Independent shops and galleries",
    desc: "The street and its side alleys are home to independent boutiques selling Jordanian crafts, design pieces, vintage goods, and local art prints.",
  },
];

export default function RainbowStreetGuide() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="min-h-screen bg-[#faf7f2] text-neutral-900">
        <div className="border-b border-black/8 bg-white/80 backdrop-blur-md">
          <div className="mx-auto flex max-w-3xl items-center gap-4 px-6 py-4 text-sm">
            <Link href="/" className="text-neutral-500 hover:text-neutral-800 transition">Zowar</Link>
            <span className="text-neutral-300">/</span>
            <Link href="/blog" className="text-neutral-500 hover:text-neutral-800 transition">Journal</Link>
            <span className="text-neutral-300">/</span>
            <span className="text-neutral-700">Rainbow Street Guide</span>
          </div>
        </div>

        <article className="mx-auto max-w-3xl px-6 py-14">
          <header className="mb-12">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-z-orange bg-z-orange-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-[#c8694a]">
              Neighbourhood Guide · Amman
            </div>
            <h1 className="text-3xl font-semibold leading-tight tracking-tight text-neutral-950 sm:text-4xl">
              Rainbow Street, Amman: History, Cinema & Complete Guide
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-neutral-600">
              The street that started as a residential quarter for Amman&apos;s early
              elite, was renamed after a cinema, and became the cultural heart of the
              city. Everything you need to know — and do — on Rainbow Street.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-neutral-400">
              <span>By Zowar · Amman, Jordan</span>
              <span>·</span>
              <span>8 min read</span>
              <span>·</span>
              <span>Updated 2026</span>
            </div>
          </header>

          {/* Hero image */}
          <figure className="mb-10">
            <div className="relative h-80 w-full overflow-hidden rounded-3xl sm:h-[28rem]">
              <Image
                src="/images/blog/rainbow-street-sign-amman.jpg"
                alt="AL-RAINBOW St. street sign on a pole with bougainvillea flowers and stone buildings in Jabal Amman"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 768px"
                priority
              />
            </div>
            <figcaption className="mt-2 text-center text-xs text-neutral-400">The sign that gave the street its name — and the bougainvillea that frames almost every corner of it</figcaption>
          </figure>

          {/* History section */}
          <section className="rounded-3xl border border-black/8 bg-white p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-neutral-950">A brief history of Rainbow Street</h2>
            <div className="mt-4 space-y-4 text-base leading-8 text-neutral-700">
              <p>
                The street now known as Rainbow Street was not always called that. For much
                of the early twentieth century it was named Abu Bakr al-Siddiq Street, and
                it ran through one of the most desirable residential areas in Amman — a
                ridge in the Jabal Amman district where wealthy families had built their
                homes above the noise and density of the city centre below.
              </p>
              <p>
                Before that, the area had been a small settlement on the edge of Amman,
                occupied mainly by Bedouin families drawn by the springs and fertile land
                nearby. As Amman grew through the first half of the twentieth century —
                rapidly and unexpectedly, from a small Circassian village to the capital
                of a new country — the gardens and orchards of Jabal Amman were replaced
                by stone villas and residential streets. The ridge became one of the
                quieter, more elegant parts of the expanding city.
              </p>
              <p>
                What changed the character of the street permanently was a cinema.
              </p>
            </div>
          </section>

          {/* Cinema section */}
          <section className="mt-8 rounded-3xl border border-black/8 bg-white p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-neutral-950">The Rainbow Cinema, 1957</h2>
            <div className="mt-4 space-y-4 text-base leading-8 text-neutral-700">
              <p>
                In 1957, the Rainbow Cinema opened on Abu Bakr al-Siddiq Street and
                immediately became one of the most important social venues in Amman. At a
                time when cinema was one of the primary forms of public entertainment, a
                well-run movie house in a central location drew people from across the
                city. The Rainbow showed international films and became a meeting point
                for Amman&apos;s growing middle class — professionals, students, artists,
                and families who arrived for the film and stayed to walk the street
                afterwards.
              </p>
              <p>
                The cinema gave the street its name. Over time, people stopped using the
                official street name and simply referred to it as Rainbow Street — the
                street where the Rainbow was. The informal name stuck, and it eventually
                became official.
              </p>
              <p>
                The building still stands, though it has changed considerably. Today it
                operates as the Rainbow Theater — an art-house cinema and cultural venue
                that hosts film cycles, festivals, lecture series, and small performances.
                The shift from commercial cinema to cultural space mirrors what happened
                to the street as a whole: from a place of mainstream entertainment to
                something more eclectic and independent.
              </p>
            </div>
          </section>

          {/* Café interior image */}
          <figure className="mt-8">
            <div className="relative h-64 w-full overflow-hidden rounded-3xl sm:h-80">
              <Image
                src="/images/blog/amman-traditional-cafe-interior.jpg"
                alt="Traditional café interior on Rainbow Street Amman with colourful cushions and city skyline view"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
            <figcaption className="mt-2 text-center text-xs text-neutral-400">A Rainbow Street café — traditional textiles, Amman's skyline through the window</figcaption>
          </figure>

          {/* Architecture section */}
          <section className="mt-8 rounded-3xl border border-black/8 bg-white p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-neutral-950">Architecture and character</h2>
            <div className="mt-4 space-y-4 text-base leading-8 text-neutral-700">
              <p>
                One of the most striking things about Rainbow Street is how much of the
                original architecture survives. The area around First Circle and along
                the ridge is still lined with early-twentieth-century stone villas —
                many of them built in the Syrian style, with high balconied walls
                enclosing central courtyards. The materials are the pale limestone that
                defines much of Amman&apos;s older building stock, warm in sunlight and
                cool in shade.
              </p>
              <p>
                Several of these historic buildings have been converted into restaurants,
                galleries, and cultural spaces — a pattern that has given Rainbow Street
                its current character. The buildings themselves are part of the
                experience: high ceilings, arched windows, stone staircases leading up
                from the street. Walking the ridge on a clear day, with views south toward
                the city centre and the hills beyond, it is easy to understand why this
                particular strip of Amman became what it is.
              </p>
              <p>
                The street runs roughly 800 metres from First Circle toward Mango Street,
                with most of the restaurants, cafés, and galleries concentrated in the
                central section. Side streets branch off down the hillside, leading to
                quieter residential lanes that still feel like a different era.
              </p>
            </div>
          </section>

          {/* Blue gate image */}
          <figure className="mt-8">
            <div className="relative h-80 w-full overflow-hidden rounded-3xl sm:h-96">
              <Image
                src="/images/blog/weibdeh-blue-gate-bougainvillea.jpg"
                alt="Blue wooden gate framed by pink bougainvillea flowers on a Rainbow Street side street in Amman"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
            <figcaption className="mt-2 text-center text-xs text-neutral-400">A side street off Rainbow Street — the old residential villas still carry the character of early-20th-century Amman</figcaption>
          </figure>

          {/* Painted door image */}
          <figure className="mt-8">
            <div className="relative h-64 w-full overflow-hidden rounded-3xl sm:h-80">
              <Image
                src="/images/blog/rainbow-street-painted-door.jpg"
                alt="Colourful painted door and gate with Arabic calligraphy and graffiti on Rainbow Street Amman"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
            <figcaption className="mt-2 text-center text-xs text-neutral-400">Street art and painted doors are part of Rainbow Street's everyday character</figcaption>
          </figure>

          {/* What to do */}
          <section className="mt-8 rounded-3xl border border-black/8 bg-white p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-neutral-950">What to do on Rainbow Street today</h2>
            <p className="mt-3 text-sm leading-7 text-neutral-600">
              The street is most active from late morning through to midnight. Early morning is quieter — ideal for a walk before the day heats up.
            </p>
            <div className="mt-5 space-y-5">
              {stops.map((stop) => (
                <div key={stop.name} className="flex gap-4">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#c8694a]" />
                  <div>
                    <p className="font-semibold text-neutral-900">{stop.name}</p>
                    <p className="mt-1 text-sm leading-6 text-neutral-600">{stop.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Mural image */}
          <figure className="mt-8">
            <div className="relative h-64 w-full overflow-hidden rounded-3xl sm:h-80">
              <Image
                src="/images/blog/amman-colourful-mural.jpg"
                alt="Colourful wall mural depicting a Mediterranean street scene in Amman Jordan"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
            <figcaption className="mt-2 text-center text-xs text-neutral-400">Murals like this appear throughout the Rainbow Street and Weibdeh area</figcaption>
          </figure>

          {/* Practical info */}
          <section className="mt-8 rounded-3xl border border-black/8 bg-white p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-neutral-950">Practical information</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {[
                ["Getting there", "Rainbow Street begins at First Circle. Taxis from downtown take 5–10 minutes. Most visitors arrive by car — park at First Circle and walk."],
                ["Best time to visit", "Early morning (7–9 AM) for breakfast and a quiet walk. Evening (6–10 PM) for the full social scene — restaurants and cafés are busiest then."],
                ["How long to spend", "A relaxed morning walk takes 1–2 hours. The Zowar guided experience runs 3–4 hours and covers the street end to end with stops and tastings."],
                ["Getting around", "Rainbow Street is fully walkable. Comfortable shoes are recommended as parts of Jabal Amman are hilly. The side streets leading to Weibdeh are worth exploring on foot."],
              ].map(([title, body]) => (
                <div key={title} className="rounded-2xl border border-black/8 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400">{title}</p>
                  <p className="mt-2 text-sm leading-6 text-neutral-700">{body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="mt-8 rounded-3xl border border-black/8 bg-white p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-neutral-950">Frequently asked questions</h2>
            <div className="mt-5 space-y-6">
              {[
                ["Why is it called Rainbow Street?", "The street was renamed after the Rainbow Cinema, which opened in 1957. Before that it was known as Abu Bakr al-Siddiq Street. The cinema became such a landmark that people started calling the whole street by its name."],
                ["Is Rainbow Street safe?", "Yes. Rainbow Street and the Jabal Amman area are among the safest and most visited parts of Amman. It is well-lit in the evenings and consistently busy."],
                ["What neighbourhood is Rainbow Street in?", "Rainbow Street runs through Jabal Amman, near the First and Second Circles. The adjacent neighbourhood of Jabal Al-Weibdeh is a short walk to the north and shares much of the same character."],
                ["Can you walk from Rainbow Street to downtown Amman?", "Yes, the walk down from First Circle to downtown takes about 15–20 minutes on foot through the older hillside streets. It is a steep descent but worthwhile."],
              ].map(([q, a]) => (
                <div key={q}>
                  <p className="font-semibold text-neutral-900">{q}</p>
                  <p className="mt-2 text-sm leading-6 text-neutral-600">{a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="mt-10 rounded-3xl border border-[#c8694a]/20 bg-z-orange-soft p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c8694a]">Experience it yourself</p>
            <h2 className="mt-2 text-xl font-semibold text-neutral-950">
              Explore Rainbow Street with Zowar
            </h2>
            <p className="mt-3 text-sm leading-7 text-neutral-700">
              Zowar is a self-guided puzzle experience that takes you through Rainbow Street
              and Weibdeh with stops at local venues for tastings and discoveries. Over 25 JOD
              in food and gifts are included across a half-day adventure — starting from 30 JOD
              per person.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/booking"
                className="inline-flex items-center gap-2 rounded-2xl bg-[#c8694a] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
              >
                Book the experience →
              </Link>
              <Link
                href="/experiences/rainbow-street"
                className="inline-flex items-center gap-2 rounded-2xl border border-black/10 bg-white px-5 py-2.5 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50"
              >
                Discover the Rainbow Street walk →
              </Link>
            </div>
          </section>

          <div className="mt-14 flex items-center justify-between border-t border-black/8 pt-8 text-sm text-neutral-500">
            <Link href="/blog" className="hover:text-neutral-800 transition">← All guides</Link>
            <Link href="/blog/weibdeh-neighbourhood-guide" className="hover:text-neutral-800 transition">Weibdeh guide →</Link>
          </div>
        </article>
      </div>
    </>
  );
}
