import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Jabal Al-Weibdeh Guide: Amman's Creative Quarter – What to Do & See",
  description:
    "Your complete guide to Jabal Al-Weibdeh — Amman's arts and culture neighbourhood. Darat Al Funun, the National Gallery, Rumi Café, Paris Circle and everything worth discovering on foot.",
  alternates: { canonical: "https://zowar.net/blog/weibdeh-neighbourhood-guide" },
  openGraph: {
    title: "Jabal Al-Weibdeh Guide: Amman's Creative Quarter",
    description:
      "Stone villas, art galleries, the best specialty coffee in the city, and a neighbourhood that still feels like a hidden corner of Amman. Your guide to Weibdeh.",
    url: "https://zowar.net/blog/weibdeh-neighbourhood-guide",
    images: [{ url: "/logo.png", width: 1200, height: 630 }],
  },
  keywords: [
    "Jabal Al-Weibdeh guide",
    "Weibdeh Amman",
    "things to do Weibdeh",
    "Darat Al Funun Amman",
    "Jordan National Gallery Fine Arts",
    "Paris Circle Amman",
    "Rumi Café Amman",
    "Amman art galleries",
    "Amman creative quarter",
    "Amman neighbourhoods",
    "things to do Amman",
    "Jordan travel guide",
    "Amman walking tour",
  ],
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: "Jabal Al-Weibdeh: Amman's Creative Quarter — Complete Guide",
      description:
        "A guide to Jabal Al-Weibdeh — art galleries, historic villas, specialty coffee, and one of Amman's most walkable and atmospheric neighbourhoods.",
      url: "https://zowar.net/blog/weibdeh-neighbourhood-guide",
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
        "Jabal Al-Weibdeh, Weibdeh Amman, Darat Al Funun, Jordan National Gallery, Paris Circle, Amman art, things to do Amman",
      about: [
        { "@type": "Place", name: "Jabal Al-Weibdeh", address: { "@type": "PostalAddress", addressLocality: "Amman", addressCountry: "JO" } },
        { "@type": "City", name: "Amman" },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Where is Jabal Al-Weibdeh?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Jabal Al-Weibdeh is a neighbourhood in central Amman, just north of Jabal Amman (Rainbow Street). It sits above Downtown and is centred around Paris Circle at the top of its hill.",
          },
        },
        {
          "@type": "Question",
          name: "What is Weibdeh known for?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Weibdeh is known as Amman's arts and culture quarter. It is home to Darat Al Funun, the Jordan National Gallery of Fine Arts, Rumi Café, and a concentration of independent galleries, creative studios, and neighbourhood cafés.",
          },
        },
        {
          "@type": "Question",
          name: "Is Weibdeh walkable?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes — Weibdeh is one of the most walkable parts of Amman. The streets are relatively quiet, the architecture is worth exploring on foot, and most key destinations are within a 10–15 minute walk of Paris Circle.",
          },
        },
      ],
    },
  ],
};

const places = [
  {
    category: "Art & Culture",
    stops: [
      {
        name: "Darat Al Funun",
        nameAr: "دارة الفنون",
        desc: "Arguably the most beautiful cultural space in Amman. Three restored 1920s villas set in a hillside garden overlooking the city, with the remains of a sixth-century Byzantine Church of St George woven into the grounds. The organisation is dedicated to modern and contemporary Arab art and runs exhibitions, film screenings, and concerts throughout the year. The garden alone is worth the visit.",
        tip: "Entry is free. Check their programme online before visiting — the events calendar is consistently excellent.",
      },
      {
        name: "Jordan National Gallery of Fine Arts",
        nameAr: "المتحف الوطني للفنون الجميلة",
        desc: "One of the most significant art institutions in the Arab world, housed in two connected buildings with a sculpture park between them. The permanent collection spans modern and contemporary works from Jordan and across the broader Arab and Islamic world. The sculpture park is open to the public and provides a rare moment of quiet in the middle of the city.",
        tip: "The sculpture park is free to walk through. The gallery itself has a modest entry fee.",
      },
      {
        name: "Paris Circle (Square de Paris)",
        nameAr: "دوار باريس",
        desc: "The small roundabout at the top of Weibdeh's hill that functions as the neighbourhood's informal centre. Named for the relationship between Amman and Paris, it is flanked by independent shops, galleries, and cafés. It is the natural starting point for a walk through the neighbourhood.",
        tip: "Start here, orient yourself, and explore the side streets that branch off in each direction.",
      },
    ],
  },
  {
    category: "Cafés & Food",
    stops: [
      {
        name: "Rumi Café",
        nameAr: "كافيه رومي",
        desc: "The café that Weibdeh residents keep coming back to. Open since 2013, with floor-to-ceiling windows, natural wood, white tiles, and an outdoor patio shaded by trees. The specialty coffee is consistently good — Arabic, Turkish, and espresso-based options — and the kitchen produces its own pastries, including an orange cake and banana bread that have become house signatures. Opens at 7 AM.",
        tip: "The outdoor patio is the best seat in the neighbourhood on a clear morning. It fills up on weekends.",
      },
      {
        name: "Go Mashawi",
        nameAr: "قو مشاوي",
        desc: "One of the best quick-eat spots in Weibdeh — a grill and BBQ restaurant built around fresh Baladi meat and traditional meat sandwiches with a range of house sauces. It was among the first BBQ fast-food concepts in Amman to take quality meat seriously at an accessible price. Both indoor and outdoor seating, and a menu that keeps things simple and well-executed. Popular with the local Weibdeh crowd for a reason.",
        tip: "Good prices, generous portions, friendly service. A natural stop after walking Darat Al Funun or the National Gallery.",
      },
    ],
  },
  {
    category: "Streets & Walking",
    stops: [
      {
        name: "The side streets south of Paris Circle",
        nameAr: "",
        desc: "The narrow one-way streets that run south from Paris Circle toward Rainbow Street are among the most atmospheric in Amman. The buildings here are stone, often three storeys, with wrought-iron balconies and old wooden shutters. Several have been converted into studios or small galleries without losing their residential feel. It is an easy walk into the upper end of Rainbow Street from here.",
        tip: "Give yourself 30 minutes to wander without a map. Getting a little lost here is part of the experience.",
      },
      {
        name: "The walk to Rainbow Street",
        nameAr: "",
        desc: "Weibdeh sits just above and to the north of Rainbow Street, and the walk between the two takes about 10 minutes downhill through quiet residential streets. The connection means you can easily combine a morning in Weibdeh with a walk along Rainbow Street — or vice versa.",
        tip: "Walk from Weibdeh down to Rainbow Street in the morning, and back up in the late afternoon when the light on the old stone buildings is at its best.",
      },
    ],
  },
];

export default function WeibdehGuide() {
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
            <span className="text-neutral-700">Weibdeh Guide</span>
          </div>
        </div>

        <article className="mx-auto max-w-3xl px-6 py-14">
          <header className="mb-12">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-z-orange bg-z-orange-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-[#c8694a]">
              Neighbourhood Guide · Amman
            </div>
            <h1 className="text-3xl font-semibold leading-tight tracking-tight text-neutral-950 sm:text-4xl">
              Jabal Al-Weibdeh: Amman&apos;s Creative Quarter
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-neutral-600">
              Stone villas, hillside gardens, modern Arab art, and the city&apos;s
              best specialty coffee — the neighbourhood that sits just above Rainbow
              Street and feels like a different world.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-neutral-400">
              <span>By Zowar · Amman, Jordan</span>
              <span>·</span>
              <span>7 min read</span>
              <span>·</span>
              <span>Updated 2026</span>
            </div>
          </header>

          {/* Hero image */}
          <figure className="mb-10">
            <div className="relative h-80 w-full overflow-hidden rounded-3xl sm:h-[28rem]">
              <Image
                src="/images/blog/amman-weibdeh-street-mural.jpg"
                alt="Large street mural on a building wall in Jabal Al-Weibdeh Amman — woman in yellow dress with a bird and lemon"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 768px"
                priority
              />
            </div>
            <figcaption className="mt-2 text-center text-xs text-neutral-400">One of Weibdeh's most striking murals — the neighbourhood's art scene spills onto its building walls</figcaption>
          </figure>

          {/* Intro */}
          <section className="rounded-3xl border border-black/8 bg-white p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-neutral-950">About the neighbourhood</h2>
            <div className="mt-4 space-y-4 text-base leading-8 text-neutral-700">
              <p>
                Jabal Al-Weibdeh sits on a hill in central Amman, just north of Jabal
                Amman and its main artery, Rainbow Street. It is not the loudest part of
                the city. There is no single famous landmark that draws the tour buses
                here. What Weibdeh has instead is an accumulation of things that matter:
                good architecture, a strong arts scene, quiet lanes, and the kind of
                neighbourhood infrastructure — cafés, independent shops, studios — that
                attracts people who intend to stay for a while.
              </p>
              <p>
                The neighbourhood has a relatively high proportion of artists, writers,
                and foreign residents who have been drawn by exactly those qualities. The
                shaded stone lanes and 1920s villas create an atmosphere that is
                relatively rare in modern Amman — intimate, unhurried, and genuinely
                pleasant to walk through without a specific destination.
              </p>
              <p>
                It is also home to two of the most significant cultural institutions in
                Jordan: Darat Al Funun and the Jordan National Gallery of Fine Arts. Both
                are free or nearly free to enter, both are consistently excellent, and
                both are reasons alone to spend a morning in Weibdeh.
              </p>
            </div>
          </section>

          {/* Street art image */}
          <figure className="mt-8">
            <div className="relative h-64 w-full overflow-hidden rounded-3xl sm:h-80">
              <Image
                src="/images/blog/weibdeh-street-art-stencil.jpg"
                alt="Banksy-style street art stencil of a cat on a wall in Weibdeh Amman"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
            <figcaption className="mt-2 text-center text-xs text-neutral-400">Street art appears throughout Weibdeh — small, unexpected, and worth slowing down for</figcaption>
          </figure>

          {/* Places */}
          {places.map((cat) => (
            <section key={cat.category} className="mt-10">
              <h2 className="mb-5 text-xl font-semibold text-neutral-950">{cat.category}</h2>
              <div className="space-y-5">
                {cat.stops.map((stop) => (
                  <div key={stop.name} className="rounded-3xl border border-black/8 bg-white p-6 sm:p-8">
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-950">
                        {stop.name}
                        {stop.nameAr && (
                          <span className="ms-2 text-base font-normal text-neutral-400">{stop.nameAr}</span>
                        )}
                      </h3>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-neutral-700">{stop.desc}</p>
                    <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-amber-600">Tip</p>
                      <p className="mt-1 text-sm leading-6 text-amber-900">{stop.tip}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}

          {/* Café bookshelf image */}
          <figure className="mt-8">
            <div className="relative h-64 w-full overflow-hidden rounded-3xl sm:h-80">
              <Image
                src="/images/blog/weibdeh-cafe-bookshelf.jpg"
                alt="Warm café interior in Weibdeh Amman with bookshelves and pendant lights"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
            <figcaption className="mt-2 text-center text-xs text-neutral-400">One of Weibdeh's neighbourhood cafés — books, warm light, and unhurried mornings</figcaption>
          </figure>

          {/* Practical */}
          <section className="mt-10 rounded-3xl border border-black/8 bg-white p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-neutral-950">Getting there and getting around</h2>
            <div className="mt-5 space-y-5 text-sm leading-7 text-neutral-700">
              <p>
                Weibdeh is in central Amman and easily reached by taxi from anywhere in
                the city. Tell the driver Paris Circle (دوار باريس / Duwwar Barees) and
                you will be dropped at the top of the hill. From Rainbow Street or First
                Circle, it is a 10-minute walk uphill.
              </p>
              <p>
                The neighbourhood is best explored on foot. Streets are narrow and
                one-way in many places, and parking is limited. Most visitors park near
                Paris Circle and walk from there. The entire area is safe to walk at any
                time of day.
              </p>
              <p>
                A full walk around Weibdeh — taking in Darat Al Funun, the National
                Gallery, Paris Circle, and the side streets — takes about 2 hours at a
                relaxed pace. Combined with coffee at Rumi and a walk down to Rainbow
                Street, half a day disappears comfortably.
              </p>
            </div>
          </section>

          {/* FAQ */}
          <section className="mt-8 rounded-3xl border border-black/8 bg-white p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-neutral-950">Frequently asked questions</h2>
            <div className="mt-5 space-y-6">
              {[
                ["Is Weibdeh worth visiting?", "Yes, particularly if you have an interest in art, architecture, or local culture. It is a more genuine and less touristy part of Amman than some of the more commercially developed areas, and it rewards slow exploration."],
                ["How does Weibdeh compare to Rainbow Street?", "They are adjacent and complementary. Rainbow Street is more active and commercially developed, with more restaurants and nightlife. Weibdeh is quieter, more residential, and more arts-focused. Most visitors enjoy spending time in both."],
                ["When is the best time to visit Weibdeh?", "Friday and Saturday mornings are particularly good — Rumi and Rumman Collective are active, Darat Al Funun often has programming, and the neighbourhood has an unhurried weekend feeling. Avoid midday in summer — the heat makes walking less comfortable."],
                ["Are there tours of Weibdeh?", "The Zowar experience covers both Weibdeh and Rainbow Street as part of a guided puzzle walk with stops at local venues."],
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
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c8694a]">Explore with Zowar</p>
            <h2 className="mt-2 text-xl font-semibold text-neutral-950">
              The Zowar experience covers Weibdeh and Rainbow Street
            </h2>
            <p className="mt-3 text-sm leading-7 text-neutral-700">
              Zowar is a self-guided puzzle walk through Amman that takes you through the
              streets of Weibdeh and Rainbow Street with stops at local venues for
              tastings and discoveries. A half-day adventure starting from 30 JOD per
              person, with over 25 JOD in food and gifts included.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/booking"
                className="inline-flex items-center gap-2 rounded-2xl bg-[#c8694a] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
              >
                Book the experience →
              </Link>
              <Link
                href="/blog/rainbow-street-guide"
                className="inline-flex items-center gap-2 rounded-2xl border border-black/10 bg-white px-5 py-2.5 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50"
              >
                Rainbow Street guide →
              </Link>
            </div>
          </section>

          <div className="mt-14 flex items-center justify-between border-t border-black/8 pt-8 text-sm text-neutral-500">
            <Link href="/blog" className="hover:text-neutral-800 transition">← All guides</Link>
            <Link href="/blog/rainbow-street-guide" className="hover:text-neutral-800 transition">Rainbow Street history →</Link>
          </div>
        </article>
      </div>
    </>
  );
}
