import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

// Update these together whenever the advisories or the situation change.
const LAST_UPDATED_ISO = "2026-10-18";
const LAST_UPDATED = "18 October 2026";

export const metadata: Metadata = {
  title: "Is Amman Safe to Visit Right Now? A Local's Honest Answer (2026)",
  description:
    "What the US, UK and Canadian travel advisories say about Jordan right now, what daily life in Amman actually looks like, what to do if you hear a siren, and how to decide for yourself. Updated October 2026.",
  alternates: { canonical: "https://zowar.net/blog/is-amman-safe" },
  openGraph: {
    title: "Is Amman Safe to Visit Right Now? A Local's Honest Answer",
    description:
      "Official advisories, daily life on the ground, missile alerts explained, and practical safety tips — from someone who grew up in Jordan. Updated October 2026.",
    url: "https://zowar.net/blog/is-amman-safe",
    type: "article",
    images: [{ url: "/images/blog/amman-city-panoramic.jpg", alt: "Panoramic view over Amman's hills" }],
  },
  keywords: [
    "is Amman safe",
    "is Amman safe right now",
    "is Jordan safe to visit",
    "is Jordan safe 2026",
    "Jordan travel advisory",
    "Amman travel safety",
    "is it safe to travel to Jordan now",
    "Jordan missile alerts",
    "Jordan safe for tourists",
    "is Jordan safe for women",
    "solo travel Amman",
    "Amman safety tips",
  ],
};

const faqs: [string, string][] = [
  [
    "Is Amman safe to visit right now?",
    "For most visitors, yes, with some extra awareness. Amman is not under a 'do not travel' warning from the US, UK or Canada, and daily life in the city has carried on normally. But the US currently rates Jordan as Level 3 (Reconsider Travel) because of the regional conflict involving Iran, which has included missile and drone attacks that Jordanian air defences have intercepted. Read the current advisory from your own government before you book.",
  ],
  [
    "Has Amman been attacked?",
    "Jordan has been affected by Iranian strikes across the region since 2026. Most have been intercepted by Jordanian air defences. The main risk the UK government highlights is falling debris from interceptions. Phone alerts and sirens have sounded in Amman, but in recent months they have become less frequent.",
  ],
  [
    "Is Jordan safe for tourists in 2026?",
    "Jordan's main tourist areas — Amman, Petra, Wadi Rum, the Dead Sea and Jerash — have stayed open. The areas all three governments warn against are the border zones with Syria and Iraq and the far north-east desert, which are not on a normal tourist itinerary. Flight disruption is the most likely way the situation will affect your trip.",
  ],
  [
    "Is the airport in Amman open?",
    "Queen Alia International Airport has continued to operate, but flights can be cancelled or delayed, and airspace can close at short notice during periods of regional escalation. Check your airline and the airport's live departures board in the days before you fly.",
  ],
  [
    "Is Amman safe for women and solo travellers?",
    "Amman is generally safe for women and solo travellers, and violent crime against visitors is rare. Verbal harassment can happen, especially in busy downtown areas. Use Careem or Uber rather than hailing street taxis, sit in the back seat, and dress modestly outside of the more relaxed areas like Rainbow Street and Abdoun.",
  ],
  [
    "Will my travel insurance cover me in Jordan?",
    "It depends on your policy and your government's advice. The UK government warns that insurance can be invalidated if you travel against its advice — which for Jordan currently applies only to within 3km of the Syrian border. Some policies exclude war or terrorism. Ask your insurer directly about Jordan before you travel.",
  ],
];

const articleSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: "Is Amman Safe to Visit Right Now? A Local's Honest Answer",
      description:
        "What the official travel advisories say about Jordan, what daily life in Amman looks like, what to do during a missile alert, and practical safety advice for visitors.",
      url: "https://zowar.net/blog/is-amman-safe",
      image: "https://zowar.net/images/blog/amman-city-panoramic.jpg",
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

const advisories = [
  {
    country: "United States",
    level: "Level 3 — Reconsider Travel",
    detail:
      "Raised in March 2026 due to the regional conflict with Iran and the threat of missile and drone attacks. The border areas with Syria and Iraq are Level 4 (Do Not Travel).",
    href: "https://travel.state.gov/en/international-travel/travel-advisories/jordan.html",
  },
  {
    country: "United Kingdom",
    level: "No warning for Amman",
    detail:
      "Advises against all travel within 3km of the Syrian border only. Warns of regional strikes, possible flight disruption, and the risk of falling debris from interceptions.",
    href: "https://www.gov.uk/foreign-travel-advice/jordan",
  },
  {
    country: "Canada",
    level: "Exercise a high degree of caution",
    detail:
      "Avoid all travel within 5km of the Iraqi and Syrian borders and east of Ruwaished. Avoid non-essential travel to Zarqa governorate and parts of Mafraq.",
    href: "https://travel.gc.ca/destinations/jordan",
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
  ["advisories", "What the official advisories say"],
  ["situation", "What is actually happening"],
  ["daily-life", "Daily life in Amman right now"],
  ["alerts", "What to do if you hear a siren"],
  ["flights", "Flights and travel insurance"],
  ["everyday", "Everyday safety in Amman"],
  ["women", "Women and solo travellers"],
  ["avoid", "Areas to avoid"],
  ["decide", "How to decide"],
  ["faq", "FAQ"],
];

export default function IsAmmanSafe() {
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
            <span className="text-neutral-700">Is Amman Safe?</span>
          </div>
        </div>

        <article className="mx-auto max-w-3xl px-6 py-14">
          <header className="mb-10">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#c8694a] bg-[#fef3ee] px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-[#c8694a]">
              Travel Safety · Amman, Jordan
            </div>
            <h1 className="text-3xl font-semibold leading-tight tracking-tight text-neutral-950 sm:text-4xl">
              Is Amman Safe to Visit Right Now? A Local&apos;s Honest Answer
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-neutral-600">
              What the official travel advisories actually say, what daily life in
              the city looks like this year, and how to make the call for yourself —
              without the hype in either direction.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-neutral-400">
              <span>By Abdallah Al-Qudsi</span>
              <span>·</span>
              <span>10 min read</span>
              <span>·</span>
              <time dateTime={LAST_UPDATED_ISO} className="font-medium text-[#c8694a]">
                Last updated {LAST_UPDATED}
              </time>
            </div>
          </header>

          <figure className="mb-10">
            <div className="relative h-72 w-full overflow-hidden rounded-3xl sm:h-96">
              <Image
                src="/images/blog/amman-city-panoramic.jpg"
                alt="Panoramic view over Amman's hills and limestone houses"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
                priority
              />
            </div>
            <figcaption className="mt-2 text-center text-xs text-neutral-400">Amman, autumn 2026</figcaption>
          </figure>

          <section id="short-answer" className="scroll-mt-20 rounded-3xl border border-black/8 bg-white p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c8694a]">The short answer</p>
            <p className="mt-3 text-base leading-8 text-neutral-700">
              <strong className="text-neutral-950">For most visitors, Amman is safe to visit right now — but this year calls for more awareness than usual.</strong>{" "}
              The city is not under a &ldquo;do not travel&rdquo; warning from the US, UK or
              Canada, and day-to-day life has carried on normally. At the same time, the
              regional conflict involving Iran has reached Jordan&apos;s skies, the US rates
              Jordan as <strong className="text-neutral-950">Level 3: Reconsider Travel</strong>,
              and flights can be disrupted at short notice. Read your own government&apos;s
              advice, check your insurance, and read on for what it actually looks like
              on the ground.
            </p>
          </section>

          <aside className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-900">
            <strong>A note on bias:</strong> we run a walking experience in Amman, so we
            have an interest in people visiting. That is exactly why this guide links to
            every official source and tells you where the real risks are. If your
            government tells you not to go, listen to them over us.
          </aside>

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

          <Section id="advisories" title="What the official advisories say">
            <p>
              These are the three advisories most visitors check. They differ in tone,
              but they agree on where the serious risk is: the border regions, not
              Amman. Advisories change — always check the live page before you travel.
            </p>
            <div className="space-y-3">
              {advisories.map((a) => (
                <a
                  key={a.country}
                  href={a.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-2xl border border-black/8 bg-white p-5 transition hover:border-[#c8694a]/30"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="font-semibold text-neutral-950">{a.country}</p>
                    <p className="text-sm font-semibold text-[#c8694a]">{a.level}</p>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-neutral-600">{a.detail}</p>
                  <p className="mt-2 text-xs font-medium text-neutral-400">Read the official advisory ↗</p>
                </a>
              ))}
            </div>
            <p className="text-sm text-neutral-500">Checked {LAST_UPDATED}.</p>
          </Section>

          <Section id="situation" title="What is actually happening">
            <p>
              In 2026, hostilities between the United States and Iran spread across the
              region. Since July, Iran has carried out strikes in several countries,
              including Jordan. Jordanian air defences have intercepted most of the
              missiles and drones, and renewed attacks and interceptions were reported
              around Aqaba in early September.
            </p>
            <p>
              Jordan is not a party to the conflict, and the attacks have not targeted
              tourist sites. The risk the UK government highlights most is{" "}
              <strong className="text-neutral-950">falling debris from interceptions</strong>,
              along with flight cancellations and short-notice airspace closures. The
              situation can change quickly, which is why the advisories exist — and why
              this page carries a date at the top.
            </p>
          </Section>

          <Section id="daily-life" title="Daily life in Amman right now">
            <p>
              I grew up in Jordan and have family in many different parts of the
              country, so I hear what is happening well beyond Amman. Here is what this
              year has looked like on the ground:
            </p>
            <Bullets
              items={[
                <>
                  <strong className="text-neutral-950">The city has kept running.</strong>{" "}
                  The cafés, restaurants and shops on our Rainbow Street route have not
                  closed for a single day because of the situation.
                </>,
                <>
                  <strong className="text-neutral-950">There have been sirens and phone alerts.</strong>{" "}
                  When they happen, most people carry on with their day. For many Ammanis
                  they have started to feel like a formality — and they have become less
                  frequent in recent months.
                </>,
                <>
                  <strong className="text-neutral-950">Our experience has run as normal.</strong>{" "}
                  We have not had to cancel or reschedule a walk for safety reasons.
                </>,
              ]}
            />
            <p>
              That said, &ldquo;locals are used to it&rdquo; is not the same as
              &ldquo;there is no risk&rdquo;. If you get an alert, follow the official
              instructions even if the people around you don&apos;t.
            </p>
          </Section>

          <figure className="mt-10">
            <div className="relative h-60 w-full overflow-hidden rounded-3xl sm:h-72">
              <Image
                src="/images/blog/rainbow-street-sign-amman.jpg"
                alt="Rainbow Street sign in Jabal Amman"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
            <figcaption className="mt-2 text-center text-xs text-neutral-400">Rainbow Street — open every day this year</figcaption>
          </figure>

          <Section id="alerts" title="What to do if you hear a siren or get an alert">
            <Bullets
              items={[
                "Go indoors and stay away from windows until the alert is over.",
                "Follow instructions from the Jordanian authorities and your hotel staff.",
                <>
                  <strong className="text-neutral-950">Never touch or approach debris</strong>{" "}
                  or unusual objects — report them to the police (dial 911).
                </>,
                "Keep away from military sites, security facilities and strategic infrastructure.",
                <>
                  Register with your embassy before you travel — for example the US{" "}
                  <a href="https://step.state.gov" target="_blank" rel="noopener noreferrer" className="text-[#c8694a] underline">STEP programme</a>{" "}
                  or Canada&apos;s{" "}
                  <a href="https://travel.gc.ca/travelling/registration" target="_blank" rel="noopener noreferrer" className="text-[#c8694a] underline">Registration of Canadians Abroad</a>{" "}
                  — so you receive updates directly.
                </>,
              ]}
            />
          </Section>

          <Section id="flights" title="Flights and travel insurance">
            <p>
              For most visitors, flight disruption is the most likely way the situation
              will actually affect a trip. Queen Alia International Airport has kept
              operating, but individual flights have been cancelled or rerouted during
              periods of escalation.
            </p>
            <Bullets
              items={[
                "Book flexible fares where you can, and avoid tight connections.",
                "Check your airline and the airport's live departures board in the days before you fly.",
                "Ask your insurer directly whether your policy covers Jordan right now. Some policies exclude war or terrorism, and some are invalidated if you travel against your government's advice.",
                "Keep a buffer day before any onward flight or important commitment.",
              ]}
            />
          </Section>

          <Section id="everyday" title="Everyday safety in Amman">
            <p>
              Outside the regional situation, Amman has always been one of the safer
              capitals in the region. Violent crime against visitors is rare. The usual
              advice applies:
            </p>
            <Bullets
              items={[
                <>
                  <strong className="text-neutral-950">Petty theft:</strong> pickpocketing and
                  bag-snatching happen, mostly in crowded downtown areas. Keep your phone and
                  wallet close.
                </>,
                <>
                  <strong className="text-neutral-950">Getting around:</strong> use Careem or
                  Uber rather than hailing yellow taxis. If you do take a street taxi, make
                  sure the meter is on, and sit in the back when travelling alone.
                </>,
                <>
                  <strong className="text-neutral-950">Winter weather:</strong> from November
                  to March, flash floods can hit low-lying roads and wadis. Stay out of wadis
                  for at least a day after heavy rain.
                </>,
                <>
                  <strong className="text-neutral-950">Roads:</strong> driving is chaotic and
                  the Desert Highway has a poor safety record. Avoid long drives at night.
                </>,
              ]}
            />
          </Section>

          <Section id="women" title="Women and solo travellers">
            <p>
              Amman is generally safe for women and for solo travellers, and many travel
              here alone without problems. Verbal harassment — comments or staring — can
              happen, most often in busy downtown streets. A few things help:
            </p>
            <Bullets
              items={[
                "Dress modestly in downtown and more conservative areas. Rainbow Street, Weibdeh and Abdoun are more relaxed.",
                "Use ride-hailing apps and sit in the back seat.",
                "Firmly ignoring unwanted attention usually works. If it doesn't, step into a shop or café — people will help.",
                "Cafés in Weibdeh and Jabal Amman are comfortable places to spend time alone.",
              ]}
            />
          </Section>

          <Section id="avoid" title="Areas to avoid">
            <p>
              All three governments warn against the same general areas, and none of them
              is on a normal tourist route:
            </p>
            <Bullets
              items={[
                "Anywhere within 3–5km of the Syrian and Iraqi borders.",
                "The far north-east desert, east of Ruwaished.",
                "Canada also advises against non-essential travel to Zarqa governorate and parts of Mafraq, because of the risk of missile and drone debris.",
              ]}
            />
            <p>
              Amman, Petra, Wadi Rum, the Dead Sea, Jerash and Aqaba are not on any of
              these lists — though Aqaba saw interceptions in September, so check the
              latest news before heading south.
            </p>
          </Section>

          <Section id="decide" title="How to decide">
            <p>
              Only you can make this decision. Here is how I would think it through:
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-black/8 bg-white p-5">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400">You will probably be fine if</p>
                <p className="text-sm leading-6 text-neutral-700">
                  You are comfortable following official alerts, your insurance covers
                  Jordan, you have some flexibility in your dates, and you are mainly
                  visiting Amman, Petra, Wadi Rum and the Dead Sea.
                </p>
              </div>
              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-amber-600">You might wait if</p>
                <p className="text-sm leading-6 text-amber-900">
                  Your insurer won&apos;t cover you, you cannot afford a cancelled flight,
                  you would be anxious for the whole trip, or your government advises
                  against travel.
                </p>
              </div>
            </div>
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
              country. He founded Zowar to show visitors the side of
              Amman that locals know. This page is updated whenever the advisories or
              the situation on the ground change.
            </p>
          </section>

          <section className="mt-10 rounded-3xl border border-[#c8694a]/20 bg-[#fef3ee] p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c8694a]">If you are coming</p>
            <h2 className="mt-2 text-xl font-semibold text-neutral-950">
              See the Amman locals know — at your own pace
            </h2>
            <p className="mt-3 text-sm leading-7 text-neutral-700">
              Zowar is a self-guided food and puzzle walk through Rainbow Street and
              Jabal Amman: 7 local stops, tastings included, no group and no fixed
              schedule. We have not had to cancel a single walk for safety reasons this year.
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
            <Link href="/blog/things-to-do-amman" className="hover:text-neutral-800 transition">Things to do in Amman →</Link>
          </div>
        </article>
      </div>
    </>
  );
}
