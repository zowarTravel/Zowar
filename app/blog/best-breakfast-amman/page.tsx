import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Best Breakfast Places in Amman, Jordan – Local Guide",
  description:
    "From crispy falafel at Al Quds to slow morning plates at Khashooga — a local guide to the best breakfast spots in Amman, Jordan.",
  alternates: {
    canonical: "https://zowar.net/blog/best-breakfast-amman",
  },
  openGraph: {
    title: "Best Breakfast Places in Amman, Jordan",
    description:
      "A local guide to Amman's most iconic morning spots — falafel, hummus, ful, and everything in between.",
    url: "https://zowar.net/blog/best-breakfast-amman",
    images: [{ url: "/logo.png", width: 1200, height: 630 }],
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Best Breakfast Places in Amman, Jordan",
  description:
    "A local guide to the most iconic morning spots in Amman — from street-side falafel counters to sit-down breakfast spreads.",
  url: "https://zowar.net/blog/best-breakfast-amman",
  author: { "@type": "Organization", name: "Zowar", url: "https://zowar.net" },
  publisher: { "@type": "Organization", name: "Zowar", url: "https://zowar.net" },
  inLanguage: "en",
  about: { "@type": "City", name: "Amman", containedInPlace: { "@type": "Country", name: "Jordan" } },
  keywords:
    "breakfast Amman, best breakfast Jordan, falafel Amman, hummus Amman, things to do Amman, where to eat Amman, Rainbow Street food, Jordan travel food",
};

const places = [
  {
    name: "Falafel Al Quds",
    nameAr: "فلافل القدس",
    neighborhood: "Rainbow Street, Jabal Amman",
    highlight: "The Rainbow Street staple",
    description:
      "If you are walking down Rainbow Street and you smell something frying, it is probably Al Quds. This small counter has been feeding the neighbourhood for decades and is one of the most recognized falafel stops in Amman. The falafel comes out hot, crispy on the outside, and bright green inside from the fresh herbs. Order them stuffed into bread with tomatoes, parsley, and a drizzle of tahini. It is the kind of breakfast that makes you understand why people say Amman mornings are worth waking up early for.",
    order: "Falafel sandwich, optionally with hummus on the side.",
    tip: "Go early — the first batch of the morning is always the best.",
  },
  {
    name: "Abu Mahjoud",
    nameAr: "أبو محجوب",
    neighborhood: "Downtown Amman",
    highlight: "A downtown institution",
    description:
      "Abu Mahjoud is the kind of place that has been doing the same thing for generations and has no reason to change. Set in the older part of Amman, it draws a crowd of regulars every morning — taxi drivers, shopkeepers, students, and the occasional curious visitor who found their way in. The spread here is traditional: ful medames simmered with olive oil, hummus made fresh, boiled eggs, and warm bread. The tables are simple, the service is fast, and the price will surprise you.",
    order: "Ful medames with olive oil, a plate of hummus, and bread.",
    tip: "It gets busy fast. Arrive before 9 AM to get a seat without waiting.",
  },
  {
    name: "Abu Jbara",
    nameAr: "أبو جبارة",
    neighborhood: "Multiple locations across Amman",
    highlight: "The classic Amman breakfast spread",
    description:
      "Abu Jbara is one of those names every Ammani knows. It has been around long enough to become part of the city's food identity, and its breakfast spread is what many locals picture when they think of a proper Jordanian morning meal. You get ful, hummus, falafel, labneh, olive oil, za'atar, eggs, and fresh vegetables — all at once, all sharing the table. It is less of an order and more of an experience. The kind of breakfast that becomes the reference point for everything you eat after.",
    order: "The full breakfast spread — let the table fill up and work through it slowly.",
    tip: "Abu Jbara has several branches. The older locations tend to have the most atmosphere.",
  },
  {
    name: "Khashooga",
    nameAr: "خشوقة",
    neighborhood: "Jabal Amman",
    highlight: "Modern breakfast with Jordanian soul",
    description:
      "Khashooga sits at the intersection of the traditional and the contemporary. The menu takes familiar Jordanian breakfast ingredients — labneh, za'atar, eggs, seasonal produce — and presents them with a bit more care and intention. The space is warm and feels considered, popular with people who want a slower morning rather than a quick bite on the go. It is a good choice if you are spending a full morning in the Jabal Amman area and want somewhere to sit, eat well, and take your time.",
    order: "Eggs any style with labneh and seasonal bread, paired with a strong Arabic coffee.",
    tip: "Weekend mornings fill up. A weekday visit is more relaxed.",
  },
];

export default function BestBreakfastAmman() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="min-h-screen bg-[#faf7f2] text-neutral-900">
        {/* Nav strip */}
        <div className="border-b border-black/8 bg-white/80 backdrop-blur-md">
          <div className="mx-auto flex max-w-3xl items-center gap-4 px-6 py-4 text-sm">
            <Link href="/" className="text-neutral-500 hover:text-neutral-800 transition">
              Zowar
            </Link>
            <span className="text-neutral-300">/</span>
            <Link href="/blog" className="text-neutral-500 hover:text-neutral-800 transition">
              Journal
            </Link>
            <span className="text-neutral-300">/</span>
            <span className="text-neutral-700">Best Breakfast in Amman</span>
          </div>
        </div>

        <article className="mx-auto max-w-3xl px-6 py-14">
          {/* Header */}
          <header className="mb-12">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-z-orange bg-z-orange-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-[#c8694a]">
              Food Guide · Amman
            </div>
            <h1 className="text-3xl font-semibold leading-tight tracking-tight text-neutral-950 sm:text-4xl">
              Best Breakfast Places in Amman, Jordan
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-neutral-600">
              Amman does not ease you into the morning. It feeds you properly from the start.
              Here are the spots worth knowing — from legendary falafel counters on Rainbow
              Street to the full spread that defines a Jordanian morning.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 text-sm text-neutral-500">
              <span>By Zowar · Amman, Jordan</span>
              <span>·</span>
              <span>8 min read</span>
            </div>
          </header>

          {/* Intro */}
          <section className="prose prose-neutral max-w-none">
            <p className="text-base leading-8 text-neutral-700">
              Breakfast in Jordan is not a small meal. It is often the largest, most communal
              one of the day — a table loaded with hummus, ful medames, falafel, labneh,
              olive oil, za&apos;atar, eggs, tomatoes, olives, and bread. In Amman, this
              tradition plays out across a handful of places that have been doing it for
              decades, each with its own loyal following. What follows is a guide to the
              ones worth seeking out — whether you are a first-time visitor or a local who
              has been meaning to try something new.
            </p>
          </section>

          {/* Place cards */}
          <div className="mt-12 space-y-14">
            {places.map((place, i) => (
              <section key={place.name}>
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl font-bold text-[#c8694a]/30 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h2 className="text-2xl font-semibold text-neutral-950">
                      {place.name}
                      <span className="ms-2 text-base font-normal text-neutral-400">
                        {place.nameAr}
                      </span>
                    </h2>
                    <p className="mt-0.5 text-sm text-neutral-500">{place.neighborhood}</p>
                  </div>
                </div>

                <div className="mt-1 inline-block rounded-full bg-z-orange-soft px-3 py-0.5 text-xs font-semibold text-[#c8694a]">
                  {place.highlight}
                </div>

                <p className="mt-4 text-base leading-8 text-neutral-700">{place.description}</p>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-black/8 bg-white p-4">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400">
                      What to order
                    </p>
                    <p className="text-sm leading-6 text-neutral-700">{place.order}</p>
                  </div>
                  <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.18em] text-amber-600">
                      Local tip
                    </p>
                    <p className="text-sm leading-6 text-amber-900">{place.tip}</p>
                  </div>
                </div>
              </section>
            ))}
          </div>

          {/* Tips section */}
          <section className="mt-16 rounded-3xl border border-black/8 bg-white p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-neutral-950">
              Tips for breakfast in Amman
            </h2>
            <ul className="mt-5 space-y-4 text-sm leading-7 text-neutral-700">
              <li className="flex gap-3">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c8694a]" />
                <span>
                  <strong className="font-semibold text-neutral-900">Go early.</strong>{" "}
                  Most of these spots peak between 7 and 10 AM. By late morning, the best
                  items are often gone and the crowds have thinned.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c8694a]" />
                <span>
                  <strong className="font-semibold text-neutral-900">Bring cash.</strong>{" "}
                  Many traditional breakfast spots in Amman are cash-only, and the prices
                  are low enough that you will rarely need more than a few dinars for two.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c8694a]" />
                <span>
                  <strong className="font-semibold text-neutral-900">Order more than you think you need.</strong>{" "}
                  A Jordanian breakfast is designed to be shared. Extra dishes are cheap,
                  and the experience is better when the table is full.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c8694a]" />
                <span>
                  <strong className="font-semibold text-neutral-900">Don&apos;t rush.</strong>{" "}
                  Breakfast in Jordan is social. The meal is the occasion. Sit, eat slowly,
                  and let it take as long as it takes.
                </span>
              </li>
            </ul>
          </section>

          {/* CTA */}
          <section className="mt-12 rounded-3xl border border-[#c8694a]/20 bg-z-orange-soft p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c8694a]">
              Experience Amman differently
            </p>
            <h2 className="mt-2 text-xl font-semibold text-neutral-950">
              Walk Rainbow Street with Zowar
            </h2>
            <p className="mt-3 text-sm leading-7 text-neutral-700">
              Several of Amman&apos;s best-known breakfast spots sit along or just off
              Rainbow Street — the same route that runs through the Zowar experience.
              On a Zowar walk, you follow a self-guided puzzle trail through the
              neighbourhood, stopping at curated local spots for tastings along the way.
              Over 25 JOD in food and gifts included.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/booking"
                className="inline-flex items-center gap-2 rounded-2xl bg-[#c8694a] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
              >
                Book the experience →
              </Link>
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-2xl border border-black/10 bg-white px-5 py-2.5 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50"
              >
                Learn more
              </Link>
            </div>
          </section>

          {/* Footer nav */}
          <div className="mt-14 flex items-center justify-between border-t border-black/8 pt-8 text-sm text-neutral-500">
            <Link href="/blog" className="hover:text-neutral-800 transition">
              ← All guides
            </Link>
            <Link href="/faq" className="hover:text-neutral-800 transition">
              Got questions? →
            </Link>
          </div>
        </article>
      </div>
    </>
  );
}
