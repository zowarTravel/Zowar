import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const PUBLISHED_ISO = "2026-11-04";
const PUBLISHED = "4 November 2026";

export const metadata: Metadata = {
  title: "Amman in Winter: Weather, What to Pack & What to Expect (Dec–Feb)",
  description:
    "What Amman is really like from December to February — temperatures, rain and the occasional snow day, cold buildings, what to pack, winter food, and which day trips are best this time of year.",
  alternates: { canonical: "https://zowar.net/blog/amman-in-winter" },
  openGraph: {
    title: "Amman in Winter: What to Expect from December to February",
    description:
      "Weather, snow days, what to pack, winter food and the best day trips — a local's guide to visiting Amman in winter.",
    url: "https://zowar.net/blog/amman-in-winter",
    type: "article",
    images: [{ url: "/images/blog/amman-cafe-city-view.jpg", alt: "Café with a view over Amman's hills" }],
  },
  keywords: [
    "Amman in winter",
    "Amman weather December",
    "Amman weather January",
    "Amman weather February",
    "Jordan in winter",
    "does it snow in Amman",
    "what to pack for Jordan in winter",
    "visiting Jordan in December",
    "is winter a good time to visit Jordan",
    "Petra in winter",
    "Dead Sea in winter",
  ],
};

const faqs: [string, string][] = [
  [
    "Is winter a good time to visit Amman?",
    "Yes, if you pack for the cold. December to February is quieter and often cheaper than spring and autumn, the air is clear, and the Dead Sea and Aqaba are pleasantly warm. The trade-off is chilly evenings, a few rainy days each month, and cold buildings.",
  ],
  [
    "How cold does Amman get in winter?",
    "Typical daytime highs are around 12–15°C, and nights drop to roughly 3–7°C. January is usually the coldest month. Because Amman sits on hills between about 700 and 1,100 metres, it is noticeably colder than the Dead Sea or Aqaba.",
  ],
  [
    "Does it snow in Amman?",
    "Sometimes. Many winters bring a cold spell with snow on the higher hills for a day or two, and some winters bring none. When it does snow, the city largely stops: schools and offices close and some roads shut until it melts.",
  ],
  [
    "What should I pack for Jordan in winter?",
    "Layers, a warm jacket, a waterproof layer or small umbrella, comfortable shoes that can handle wet stone streets, and something warm to sleep in. If you are going to Petra or Wadi Rum, bring a hat and gloves — desert nights get close to freezing.",
  ],
  [
    "Is Petra open in winter?",
    "Yes, Petra is open all year. Winter days are cool and good for walking, but it can rain, and the site occasionally closes for safety during heavy rain or flash flood warnings. Snow at Petra is rare but has happened.",
  ],
  [
    "Is the Dead Sea warm enough to swim in winter?",
    "Usually, yes. The Dead Sea is about 430 metres below sea level, so winter days are often around 20°C — much warmer than Amman, which is only an hour's drive away.",
  ],
];

const articleSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: "Amman in Winter: What to Expect from December to February",
      description:
        "Weather, snow days, cold buildings, what to pack, winter food and the best day trips for visiting Amman in winter.",
      url: "https://zowar.net/blog/amman-in-winter",
      image: "https://zowar.net/images/blog/amman-cafe-city-view.jpg",
      datePublished: PUBLISHED_ISO,
      dateModified: PUBLISHED_ISO,
      author: {
        "@type": "Person",
        name: "Abdallah Al-Qudsi",
        description: "Founder of Zowar. Grew up in Jordan, with family across the country.",
        url: "https://zowar.net/about",
      },
      publisher: {
        "@type": "Organization",
        name: "Zowar",
        url: "https://zowar.net",
        logo: { "@type": "ImageObject", url: "https://zowar.net/logo.png" },
      },
      inLanguage: "en",
      about: [{ "@type": "City", name: "Amman" }, { "@type": "Country", name: "Jordan" }],
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map(([q, a]) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
  ],
};

const months = [
  {
    month: "December",
    temps: "Highs ~14–15°C · lows ~6–7°C",
    detail: "Rain starts to pick up. Plenty of clear, crisp days, and Christmas decorations in hotels, malls and Christian neighbourhoods.",
  },
  {
    month: "January",
    temps: "Highs ~12–13°C · lows ~4°C",
    detail: "Usually the coldest and wettest month, and the most likely time for a snow day. Pack your warmest layers.",
  },
  {
    month: "February",
    temps: "Highs ~13–15°C · lows ~4–5°C",
    detail: "Still cold, but the days start to lengthen and the hills turn green after the rain. Ramadan 2027 is expected to begin around 8 February.",
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
  ["short-answer", "The short answer"],
  ["weather", "Weather month by month"],
  ["snow", "Does it snow in Amman?"],
  ["indoors", "Why it feels colder indoors"],
  ["pack", "What to pack"],
  ["food", "Winter food to look for"],
  ["day-trips", "Day trips in winter"],
  ["holidays", "Holidays and Ramadan"],
  ["rainbow-street", "Rainbow Street in winter"],
  ["faq", "FAQ"],
];

export default function AmmanInWinter() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="min-h-screen bg-[#faf7f2] text-neutral-900">
        <div className="border-b border-black/8 bg-white/80 backdrop-blur-md">
          <div className="mx-auto flex max-w-3xl items-center gap-4 px-6 py-4 text-sm">
            <Link href="/" className="text-neutral-500 hover:text-neutral-800 transition">Zowar</Link>
            <span className="text-neutral-300">/</span>
            <Link href="/blog" className="text-neutral-500 hover:text-neutral-800 transition">Journal</Link>
            <span className="text-neutral-300">/</span>
            <span className="text-neutral-700">Amman in Winter</span>
          </div>
        </div>

        <article className="mx-auto max-w-3xl px-6 py-14">
          <header className="mb-10">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#c8694a] bg-[#fef3ee] px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-[#c8694a]">
              Travel Planning · Amman, Jordan
            </div>
            <h1 className="text-3xl font-semibold leading-tight tracking-tight text-neutral-950 sm:text-4xl">
              Amman in Winter: What to Expect from December to February
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-neutral-600">
              Most people picture Jordan as hot and dry. In winter, Amman is a hill
              city with cold nights, rainy spells and the occasional snow day — and
              it is one of the best times to visit if you come prepared.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-neutral-400">
              <span>By Abdallah Al-Qudsi</span>
              <span>·</span>
              <span>8 min read</span>
              <span>·</span>
              <time dateTime={PUBLISHED_ISO}>{PUBLISHED}</time>
            </div>
          </header>

          <figure className="mb-10">
            <div className="relative h-72 w-full overflow-hidden rounded-3xl sm:h-96">
              <Image
                src="/images/blog/amman-cafe-city-view.jpg"
                alt="Café with a view over Amman's hills"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
                priority
              />
            </div>
            <figcaption className="mt-2 text-center text-xs text-neutral-400">Clear winter light over Amman&apos;s hills</figcaption>
          </figure>

          <section id="short-answer" className="scroll-mt-20 rounded-3xl border border-black/8 bg-white p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c8694a]">The short answer</p>
            <p className="mt-3 text-base leading-8 text-neutral-700">
              <strong className="text-neutral-950">Winter is a good time to visit Amman — as long as you pack for the cold.</strong>{" "}
              Expect daytime highs around 12–15°C, nights close to freezing on the
              coldest days, and a handful of rainy days each month. In return you get
              fewer crowds, clear views, quieter sites, and the Dead Sea at its most
              comfortable. The thing that surprises visitors most is not the weather
              outside — it is how cold buildings can be inside.
            </p>
          </section>

          <nav className="mt-8 rounded-2xl border border-black/8 bg-white p-5">
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">In this guide</p>
            <ol className="space-y-1.5 text-sm">
              {toc.map(([id, label], i) => (
                <li key={id} className="flex items-center gap-2">
                  <span className="text-xs font-bold tabular-nums text-[#c8694a]/40">{String(i + 1).padStart(2, "0")}</span>
                  <a href={`#${id}`} className="text-neutral-700 hover:text-[#c8694a] transition">{label}</a>
                </li>
              ))}
            </ol>
          </nav>

          <Section id="weather" title="Weather month by month">
            <p>
              Amman is built across hills between roughly 700 and 1,100 metres above
              sea level, so it is much cooler than people expect. Rain tends to come in
              bursts — a wet day or two, then a run of bright, cold sunshine.
            </p>
            <div className="space-y-3">
              {months.map((m) => (
                <div key={m.month} className="rounded-2xl border border-black/8 bg-white p-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="font-semibold text-neutral-950">{m.month}</p>
                    <p className="text-sm font-semibold text-[#c8694a]">{m.temps}</p>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-neutral-600">{m.detail}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-neutral-500">
              These are typical figures — individual winters vary a lot. Check the
              forecast in the week before you travel.
            </p>
          </Section>

          <Section id="snow" title="Does it snow in Amman?">
            <p>
              Sometimes. Many winters bring at least one cold front that covers the
              higher parts of the city in snow for a day or two, and some winters bring
              none at all. January and February are the most likely months.
            </p>
            <p>
              When it snows, Amman effectively stops. Schools and many offices close,
              steep roads become impassable, and families head outside to build
              snowmen on the hills. If you happen to be here for it, it is a genuinely
              lovely thing to see — but build a spare day into your plans, because
              intercity roads and some sites can close until it melts.
            </p>
          </Section>

          <Section id="indoors" title="Why it feels colder indoors">
            <p>
              This is the part nobody warns you about. Many Ammani homes and older
              buildings are made of thick stone and do not have central heating.
              People heat individual rooms with gas or kerosene heaters, and it can
              feel colder inside than out in the sun.
            </p>
            <Bullets
              items={[
                "Before booking, check that your hotel or apartment has proper heating — modern hotels usually do, older guesthouses and some rentals may not.",
                "Cafés and restaurants are generally warm, but traditional places with open fronts can be chilly. Keep a layer with you.",
                <>
                  If your room has a gas heater, ventilate the room and never sleep with
                  it running.
                </>,
              ]}
            />
          </Section>

          <figure className="mt-10">
            <div className="relative h-60 w-full overflow-hidden rounded-3xl sm:h-72">
              <Image
                src="/images/blog/jordanian-tea-cafe-table.jpg"
                alt="Glasses of Jordanian tea on a café table"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
            <figcaption className="mt-2 text-center text-xs text-neutral-400">Sweet sage tea — the standard winter warm-up</figcaption>
          </figure>

          <Section id="pack" title="What to pack">
            <Bullets
              items={[
                <>
                  <strong className="text-neutral-950">Layers:</strong> a T-shirt, a jumper
                  and a warm jacket will cover a sunny midday and a cold evening on the
                  same day.
                </>,
                <>
                  <strong className="text-neutral-950">A waterproof layer or small umbrella</strong>{" "}
                  for the rainy spells.
                </>,
                <>
                  <strong className="text-neutral-950">Shoes with grip:</strong> Amman&apos;s
                  stone pavements and stairways get slippery in the rain.
                </>,
                <>
                  <strong className="text-neutral-950">Warm sleepwear and socks</strong> —
                  see the section above.
                </>,
                <>
                  <strong className="text-neutral-950">Hat and gloves</strong> if you are
                  heading to Petra or Wadi Rum, where nights can drop to around freezing.
                </>,
                <>
                  <strong className="text-neutral-950">Swimwear</strong> if you are going to
                  the Dead Sea or Aqaba — they are much warmer than Amman.
                </>,
              ]}
            />
          </Section>

          <Section id="food" title="Winter food to look for">
            <p>
              Winter is when Jordanian food is at its most comforting. A few things to
              look out for:
            </p>
            <Bullets
              items={[
                <>
                  <strong className="text-neutral-950">Sahlab</strong> — a thick, hot milk
                  drink thickened with orchid root or starch and topped with cinnamon,
                  coconut and nuts. Sold in cafés and from street stalls.
                </>,
                <>
                  <strong className="text-neutral-950">Knafeh</strong> — hot, cheesy and
                  syrupy, and best eaten straight from the tray downtown on a cold evening.
                </>,
                <>
                  <strong className="text-neutral-950">Adas (lentil soup)</strong> — served
                  with lemon and crisp bread; a staple in homes and simple restaurants all
                  winter.
                </>,
                <>
                  <strong className="text-neutral-950">Mansaf and maqloubeh</strong> — the
                  big, slow-cooked family dishes that feel right when it is cold outside.
                </>,
                <>
                  <strong className="text-neutral-950">Sweet tea with sage (maramiyeh)</strong>{" "}
                  — offered almost everywhere you sit down.
                </>,
              ]}
            />
            <p>
              For where to eat, see our guides to the{" "}
              <Link href="/blog/best-breakfast-amman" className="text-[#c8694a] underline">best breakfast in Amman</Link>{" "}
              and the{" "}
              <Link href="/blog/best-restaurants-rainbow-street" className="text-[#c8694a] underline">best restaurants on Rainbow Street</Link>.
            </p>
          </Section>

          <figure className="mt-10">
            <div className="relative h-60 w-full overflow-hidden rounded-3xl sm:h-72">
              <Image
                src="/images/blog/knafeh-downtown-amman.jpg"
                alt="Knafeh served in downtown Amman"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
            <figcaption className="mt-2 text-center text-xs text-neutral-400">Hot knafeh downtown — better in January than July</figcaption>
          </figure>

          <Section id="day-trips" title="Day trips in winter">
            <p>
              Jordan&apos;s geography means you can swap seasons in an hour&apos;s
              drive. Here is how the main trips from Amman feel in winter:
            </p>
            <Bullets
              items={[
                <>
                  <strong className="text-neutral-950">Dead Sea — best in winter.</strong>{" "}
                  At roughly 430 metres below sea level, days are often around 20°C. It is
                  the easiest warm escape from Amman.
                </>,
                <>
                  <strong className="text-neutral-950">Jerash — good.</strong> Cool, bright
                  days are ideal for walking the Roman city. Avoid the day after heavy rain,
                  when it gets muddy.
                </>,
                <>
                  <strong className="text-neutral-950">Petra — good, with a warm layer.</strong>{" "}
                  Walking is far more comfortable than in summer, but mornings and
                  evenings are cold, and the site can close during heavy rain or flood
                  warnings.
                </>,
                <>
                  <strong className="text-neutral-950">Wadi Rum — cold nights.</strong> Days
                  are pleasant; nights in camp can be close to freezing. Check that your
                  camp provides heating and heavy blankets.
                </>,
                <>
                  <strong className="text-neutral-950">Aqaba — warm.</strong> Jordan&apos;s
                  Red Sea coast stays mild through the winter.
                </>,
              ]}
            />
            <p>
              One safety note: from November to March, flash floods can hit low-lying
              roads and wadis. Stay out of wadis and canyons for at least a day after
              heavy rain, and follow local closures. Our{" "}
              <Link href="/blog/is-amman-safe" className="text-[#c8694a] underline">Amman safety guide</Link>{" "}
              covers this and the current travel advisories.
            </p>
          </Section>

          <Section id="holidays" title="Holidays and Ramadan">
            <Bullets
              items={[
                <>
                  <strong className="text-neutral-950">Christmas (25 December)</strong> is a
                  public holiday in Jordan. Hotels, malls and Christian neighbourhoods
                  decorate, and it is a festive time to be in the city.
                </>,
                <>
                  <strong className="text-neutral-950">New Year&apos;s Day</strong> is also a
                  public holiday, and New Year&apos;s Eve is busy at hotels and restaurants —
                  book ahead.
                </>,
                <>
                  <strong className="text-neutral-950">Ramadan 2027</strong> is expected to
                  begin around 8 February (the exact date depends on the moon sighting).
                  Opening hours shift, many restaurants close during the day, and the
                  city comes alive after sunset. Late February is a very different — and
                  memorable — time to visit.
                </>,
              ]}
            />
          </Section>

          <Section id="rainbow-street" title="Rainbow Street in winter">
            <p>
              Rainbow Street is one of the best places in Amman to spend a winter
              afternoon: sunny viewpoints over the city, warm cafés, and plenty of
              places to duck into when it rains. A late-morning start gives you the
              warmest part of the day for the outdoor stretches. Our{" "}
              <Link href="/blog/rainbow-street-guide" className="text-[#c8694a] underline">Rainbow Street guide</Link>{" "}
              covers its history and what to see.
            </p>
          </Section>

          <section id="faq" className="mt-14 scroll-mt-20 rounded-3xl border border-black/8 bg-white p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-neutral-950">Frequently asked questions</h2>
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
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400">About the author</p>
            <p className="mt-2 font-semibold text-neutral-950">Abdallah Al-Qudsi</p>
            <p className="mt-2 text-sm leading-6 text-neutral-600">
              Abdallah grew up in Jordan and has family in many different parts of the
              country. He founded Zowar to show visitors the side of Amman that locals
              know.
            </p>
          </section>

          <section className="mt-10 rounded-3xl border border-[#c8694a]/20 bg-[#fef3ee] p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c8694a]">Rain or shine</p>
            <h2 className="mt-2 text-xl font-semibold text-neutral-950">
              A warm way to spend a winter afternoon in Amman
            </h2>
            <p className="mt-3 text-sm leading-7 text-neutral-700">
              Zowar is a self-guided food and puzzle walk through Rainbow Street and
              Jabal Amman: 7 local stops, tastings included, at your own pace. Every
              stop has an indoor space, so it runs rain or shine, Tuesday to Saturday.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/experiences/rainbow-street"
                className="inline-flex items-center gap-2 rounded-2xl bg-[#c8694a] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
              >
                How it works →
              </Link>
              <Link
                href="/blog/3-days-in-amman"
                className="inline-flex items-center gap-2 rounded-2xl border border-black/10 bg-white px-5 py-2.5 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50"
              >
                3 days in Amman itinerary
              </Link>
            </div>
          </section>

          <div className="mt-14 flex items-center justify-between border-t border-black/8 pt-8 text-sm text-neutral-500">
            <Link href="/blog" className="hover:text-neutral-800 transition">← All guides</Link>
            <Link href="/blog/jordan-pass" className="hover:text-neutral-800 transition">Is the Jordan Pass worth it? →</Link>
          </div>
        </article>
      </div>
    </>
  );
}
