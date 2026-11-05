import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

// Update these together whenever prices or rules on jordanpass.jo change.
const LAST_UPDATED_ISO = "2026-11-04";
const LAST_UPDATED = "4 November 2026";

export const metadata: Metadata = {
  title: "Is the Jordan Pass Worth It? Prices, Savings & Who Should Skip It (2026)",
  description:
    "Jordan Pass prices for 2026, what it covers, the visa fee waiver rules, worked examples of how much you save, and the situations where it is not worth buying.",
  alternates: { canonical: "https://zowar.net/blog/jordan-pass" },
  openGraph: {
    title: "Is the Jordan Pass Worth It? A Local's Breakdown",
    description:
      "Prices, what is included, the visa waiver rules, real savings examples, and who should skip it. Updated November 2026.",
    url: "https://zowar.net/blog/jordan-pass",
    type: "article",
    images: [{ url: "/images/blog/amman-view-from-ruins.jpg", alt: "View over Amman from the Citadel ruins" }],
  },
  keywords: [
    "Jordan Pass",
    "is the Jordan Pass worth it",
    "Jordan Pass price 2026",
    "Jordan Pass visa waiver",
    "Jordan Pass Wanderer Explorer Expert",
    "Jordan visa on arrival fee",
    "Petra ticket price",
    "Jordan Pass what's included",
    "Jordan Pass Amman Citadel",
  ],
};

const faqs: [string, string][] = [
  [
    "Is the Jordan Pass worth it?",
    "For most visitors who fly in, stay at least two nights and visit Petra, yes. The pass costs 70–80 JOD and replaces the 40 JOD visa fee plus a 50–60 JOD Petra ticket, so it pays for itself before you add Jerash, the Amman Citadel or Wadi Rum.",
  ],
  [
    "How much does the Jordan Pass cost?",
    "There are three versions, which differ only in how many days you get at Petra: Jordan Wanderer (1 day) is 70 JOD, Jordan Explorer (2 consecutive days) is 75 JOD, and Jordan Expert (3 consecutive days) is 80 JOD.",
  ],
  [
    "How does the Jordan Pass visa waiver work?",
    "If you buy the pass before you arrive in Jordan and stay at least two full nights, the tourist visa fee (normally 40 JOD) is waived. If you leave before two nights, immigration will ask you to pay the visa fee when you exit. The waiver covers a single entry.",
  ],
  [
    "Can I buy the Jordan Pass after I arrive?",
    "You can still buy it for the attractions, but the visa fee waiver only applies if you buy the pass before you arrive in Jordan. Buy it online before your flight.",
  ],
  [
    "How long is the Jordan Pass valid?",
    "According to the official FAQ, the pass must be used within 3 months of purchase, and it expires one month after it is first scanned at an attraction.",
  ],
  [
    "Does the Jordan Pass include Petra by Night?",
    "No. Petra by Night is a separate ticket. The pass covers daytime entry to Petra only.",
  ],
  [
    "Who cannot use the Jordan Pass?",
    "The pass is not available to Arab nationals. Some nationalities are not eligible for the visa fee waiver, and some are already exempt from visa fees — check the official site for your passport before you buy.",
  ],
];

const articleSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: "Is the Jordan Pass Worth It? Prices, Savings & Who Should Skip It",
      description:
        "Jordan Pass prices, what it covers, the visa fee waiver rules, worked savings examples, and when it is not worth buying.",
      url: "https://zowar.net/blog/jordan-pass",
      image: "https://zowar.net/images/blog/amman-view-from-ruins.jpg",
      datePublished: LAST_UPDATED_ISO,
      dateModified: LAST_UPDATED_ISO,
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
      about: [{ "@type": "Country", name: "Jordan" }],
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

const passes = [
  { name: "Jordan Wanderer", price: "70 JOD", usd: "≈ US$99", petra: "1 day at Petra" },
  { name: "Jordan Explorer", price: "75 JOD", usd: "≈ US$106", petra: "2 consecutive days at Petra" },
  { name: "Jordan Expert", price: "80 JOD", usd: "≈ US$113", petra: "3 consecutive days at Petra" },
];

const examples = [
  {
    title: "Amman + one day at Petra",
    lines: [
      ["Visa fee", "40 JOD"],
      ["Petra, 1 day", "50 JOD"],
    ],
    total: "90 JOD",
    pass: "Wanderer: 70 JOD",
    saving: "Save about 20 JOD",
  },
  {
    title: "A classic week",
    lines: [
      ["Visa fee", "40 JOD"],
      ["Petra, 2 days", "55 JOD"],
      ["Jerash", "~10 JOD"],
      ["Wadi Rum", "5 JOD"],
      ["Amman Citadel", "3 JOD"],
    ],
    total: "~113 JOD",
    pass: "Explorer: 75 JOD",
    saving: "Save about 38 JOD",
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
  ["prices", "Jordan Pass prices"],
  ["visa", "How the visa waiver works"],
  ["included", "What is included — and what is not"],
  ["savings", "How much you actually save"],
  ["skip", "When it is not worth it"],
  ["tips", "Tips for using it"],
  ["amman", "Using the pass in Amman"],
  ["faq", "FAQ"],
];

export default function JordanPass() {
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
            <span className="text-neutral-700">Jordan Pass</span>
          </div>
        </div>

        <article className="mx-auto max-w-3xl px-6 py-14">
          <header className="mb-10">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#c8694a] bg-[#fef3ee] px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-[#c8694a]">
              Travel Planning · Jordan
            </div>
            <h1 className="text-3xl font-semibold leading-tight tracking-tight text-neutral-950 sm:text-4xl">
              Is the Jordan Pass Worth It? Prices, Savings &amp; Who Should Skip It
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-neutral-600">
              The Jordan Pass bundles your tourist visa with entry to Petra and more
              than 40 other sites. For most visitors it is an easy win — but there are
              a few situations where it costs you more than it saves.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-neutral-400">
              <span>By Abdallah Al-Qudsi</span>
              <span>·</span>
              <span>7 min read</span>
              <span>·</span>
              <time dateTime={LAST_UPDATED_ISO} className="font-medium text-[#c8694a]">
                Last updated {LAST_UPDATED}
              </time>
            </div>
          </header>

          <figure className="mb-10">
            <div className="relative h-72 w-full overflow-hidden rounded-3xl sm:h-96">
              <Image
                src="/images/blog/amman-view-from-ruins.jpg"
                alt="View over Amman from the Citadel ruins"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
                priority
              />
            </div>
            <figcaption className="mt-2 text-center text-xs text-neutral-400">The Amman Citadel — one of the sites the pass covers</figcaption>
          </figure>

          <section id="short-answer" className="scroll-mt-20 rounded-3xl border border-black/8 bg-white p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c8694a]">The short answer</p>
            <p className="mt-3 text-base leading-8 text-neutral-700">
              <strong className="text-neutral-950">If you are flying in, staying at least two nights and visiting Petra, buy it.</strong>{" "}
              The cheapest pass is 70 JOD. The visa fee alone is 40 JOD and a one-day
              Petra ticket is 50 JOD, so the pass saves you about 20 JOD before you
              visit anything else. Skip it if you hold an Arab passport, are already
              exempt from the visa fee, are staying fewer than two nights, or are not
              going to Petra.
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

          <Section id="prices" title="Jordan Pass prices">
            <p>
              There are three versions. They include exactly the same sites and the
              same visa waiver — the only difference is how many days you get at Petra.
            </p>
            <div className="space-y-3">
              {passes.map((p) => (
                <div key={p.name} className="rounded-2xl border border-black/8 bg-white p-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="font-semibold text-neutral-950">{p.name}</p>
                    <p className="text-sm font-semibold text-[#c8694a]">
                      {p.price} <span className="font-normal text-neutral-400">{p.usd}</span>
                    </p>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-neutral-600">{p.petra}</p>
                </div>
              ))}
            </div>
            <p>
              Petra is huge. One day covers the Siq, the Treasury and the main valley.
              Two days lets you add the Monastery and a high-place hike without rushing.
              The extra day costs only 5 JOD, so if you are unsure, go for the Explorer.
            </p>
            <p className="text-sm text-neutral-500">
              Prices from{" "}
              <a href="https://www.jordanpass.jo" target="_blank" rel="noopener noreferrer" className="text-[#c8694a] underline">jordanpass.jo</a>,
              checked {LAST_UPDATED}. US dollar figures are approximate.
            </p>
          </Section>

          <Section id="visa" title="How the visa waiver works">
            <p>
              Most of the pass&apos;s value comes from the visa waiver, so it is worth
              getting the rules right:
            </p>
            <Bullets
              items={[
                <>
                  <strong className="text-neutral-950">Buy it before you arrive.</strong> The
                  waiver only applies if you bought the pass before entering Jordan.
                </>,
                <>
                  <strong className="text-neutral-950">Stay at least two full nights.</strong>{" "}
                  If you leave earlier, immigration will send you to pay the visa fee on
                  your way out.
                </>,
                <>
                  <strong className="text-neutral-950">Single entry only.</strong> If you
                  leave Jordan and come back — for example, a side trip to a neighbouring
                  country — the waiver does not cover your second entry.
                </>,
                <>
                  <strong className="text-neutral-950">Show it at immigration.</strong> Have
                  the pass on your phone or printed when you land.
                </>,
                <>
                  <strong className="text-neutral-950">Land border exit fees are separate.</strong>{" "}
                  The pass does not cover the departure tax charged at land crossings.
                </>,
              ]}
            />
          </Section>

          <Section id="included" title="What is included — and what is not">
            <p>The pass covers daytime entry to more than 40 sites, including:</p>
            <Bullets
              items={[
                <>
                  <strong className="text-neutral-950">Petra</strong> (daytime, for 1–3 days
                  depending on your pass)
                </>,
                <>
                  <strong className="text-neutral-950">Wadi Rum</strong> protected area entry
                </>,
                <>
                  <strong className="text-neutral-950">Jerash</strong>, the Roman city an hour
                  north of Amman
                </>,
                <>
                  <strong className="text-neutral-950">The Amman Citadel and Roman Theatre</strong>
                </>,
                "Ajloun, Karak and Shobak castles, Umm Qais, Madaba's archaeological park and the desert castles east of Amman",
              ]}
            />
            <p>Not included:</p>
            <Bullets
              items={[
                "Petra by Night — a separate ticket.",
                "The Baptism Site (Bethany Beyond the Jordan) — but you can add it at a discount when you buy the pass online.",
                "Jeep tours, camps and guides in Wadi Rum — the pass covers entry to the protected area only.",
                "Dead Sea beaches and resorts, and private museums and experiences.",
              ]}
            />
            <p className="text-sm text-neutral-500">
              The full list is on the{" "}
              <a href="https://www.jordanpass.jo" target="_blank" rel="noopener noreferrer" className="text-[#c8694a] underline">official Jordan Pass site</a>.
            </p>
          </Section>

          <Section id="savings" title="How much you actually save">
            <p>
              Two common trips, priced without and with the pass. Site prices are
              approximate and can change, but the pattern holds:
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
                      <dt>Without the pass</dt>
                      <dd className="tabular-nums">{ex.total}</dd>
                    </div>
                    <div className="flex justify-between gap-3 text-neutral-900">
                      <dt>With the pass</dt>
                      <dd className="tabular-nums">{ex.pass}</dd>
                    </div>
                  </dl>
                  <p className="mt-3 text-sm font-semibold text-[#c8694a]">{ex.saving}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section id="skip" title="When it is not worth it">
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-900">
              <Bullets
                items={[
                  <>
                    <strong>You hold an Arab passport.</strong> The pass is not available
                    to Arab nationals.
                  </>,
                  <>
                    <strong>You are already exempt from the visa fee</strong> because of
                    your nationality. Without the 40 JOD saving, the pass only makes
                    sense if you are visiting Petra plus several other sites.
                  </>,
                  <>
                    <strong>You are staying fewer than two nights.</strong> You will pay
                    the visa fee on exit anyway.
                  </>,
                  <>
                    <strong>You are not going to Petra.</strong> Petra is most of the
                    pass&apos;s value. Without it, the visa fee plus a few smaller sites
                    usually comes to less than 70 JOD.
                  </>,
                  <>
                    <strong>Your nationality is not eligible for the waiver.</strong> Some
                    nationalities pay the visa fee regardless — check the official site
                    first.
                  </>,
                ]}
              />
            </div>
          </Section>

          <figure className="mt-10">
            <div className="relative h-60 w-full overflow-hidden rounded-3xl sm:h-72">
              <Image
                src="/images/blog/downtown-amman-old-city.jpg"
                alt="Downtown Amman's old city on the hillsides"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
            <figcaption className="mt-2 text-center text-xs text-neutral-400">Downtown Amman, below the Citadel</figcaption>
          </figure>

          <Section id="tips" title="Tips for using it">
            <Bullets
              items={[
                <>
                  <strong className="text-neutral-950">Mind the validity.</strong> The pass
                  must be used within 3 months of purchase and expires one month after its
                  first scan. Buy it a few weeks before you fly, not months ahead.
                </>,
                <>
                  <strong className="text-neutral-950">Petra days are consecutive.</strong>{" "}
                  On the Explorer or Expert, your Petra days must run back to back — plan
                  the rest of your itinerary around them.
                </>,
                <>
                  <strong className="text-neutral-950">Keep it on your phone and printed.</strong>{" "}
                  Signal can be patchy at remote sites.
                </>,
                <>
                  <strong className="text-neutral-950">Bring your passport to sites.</strong>{" "}
                  The pass is linked to it and you may be asked to show it.
                </>,
              ]}
            />
          </Section>

          <Section id="amman" title="Using the pass in Amman">
            <p>
              In Amman, the pass gets you into the Citadel and the Roman Theatre, which
              sit on either side of downtown and are easy to do in one morning. From
              there it is a short walk or ride up to Rainbow Street and Jabal Amman for
              lunch. Our{" "}
              <Link href="/blog/3-days-in-amman" className="text-[#c8694a] underline">3 days in Amman itinerary</Link>{" "}
              shows how to fit it all together, including a day trip to Jerash.
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
              know. This page is updated when Jordan Pass prices or rules change.
            </p>
          </section>

          <section className="mt-10 rounded-3xl border border-[#c8694a]/20 bg-[#fef3ee] p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c8694a]">After the Citadel</p>
            <h2 className="mt-2 text-xl font-semibold text-neutral-950">
              Spend the afternoon eating your way up Rainbow Street
            </h2>
            <p className="mt-3 text-sm leading-7 text-neutral-700">
              Zowar is a self-guided food and puzzle walk through Rainbow Street and
              Jabal Amman: 7 local stops, tastings included, no group and no fixed
              schedule. It is the part of Amman the Jordan Pass doesn&apos;t cover.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/experiences/rainbow-street"
                className="inline-flex items-center gap-2 rounded-2xl bg-[#c8694a] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
              >
                How it works →
              </Link>
              <Link
                href="/blog/things-to-do-amman"
                className="inline-flex items-center gap-2 rounded-2xl border border-black/10 bg-white px-5 py-2.5 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50"
              >
                Things to do in Amman
              </Link>
            </div>
          </section>

          <div className="mt-14 flex items-center justify-between border-t border-black/8 pt-8 text-sm text-neutral-500">
            <Link href="/blog" className="hover:text-neutral-800 transition">← All guides</Link>
            <Link href="/blog/amman-in-winter" className="hover:text-neutral-800 transition">Amman in winter →</Link>
          </div>
        </article>
      </div>
    </>
  );
}
