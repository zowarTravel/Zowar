import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

// Update these together whenever rental prices or road rules change.
const LAST_UPDATED_ISO = "2026-11-16";
const LAST_UPDATED = "16 November 2026";

export const metadata: Metadata = {
  title: "Driving in Jordan: Renting a Car, Road Rules & Routes (2026)",
  description:
    "Should you rent a car in Jordan? What you need to rent one, what it costs, insurance, road rules, speed cameras and checkpoints, the best routes to Petra and Wadi Rum, and why you should skip driving in Amman.",
  alternates: { canonical: "https://zowar.net/blog/driving-in-jordan" },
  openGraph: {
    title: "Driving in Jordan: A Local's Guide to Renting a Car",
    description:
      "What you need to rent a car, what it costs, the road rules that catch visitors out, and the best road-trip routes from Amman to Petra, Wadi Rum and the Dead Sea.",
    url: "https://zowar.net/blog/driving-in-jordan",
    type: "article",
    images: [{ url: "/images/blog/jordan-camel-crossing-road-sign.jpg", alt: "Camel crossing road sign with mountains in southern Jordan" }],
  },
  keywords: [
    "driving in Jordan",
    "renting a car in Jordan",
    "car rental Jordan",
    "car rental Amman airport",
    "Jordan road trip",
    "is it safe to drive in Jordan",
    "international driving permit Jordan",
    "King's Highway",
    "Desert Highway Jordan",
    "driving Amman to Petra",
    "driving to Wadi Rum",
    "Jordan speed cameras",
  ],
};

const faqs: [string, string][] = [
  [
    "Is it safe to drive in Jordan?",
    "Yes, for a confident driver. Highways between cities are in good condition and well signposted in English and Arabic. The challenges are local driving habits, unmarked speed bumps, trucks on the Desert Highway and unlit roads at night. Driving inside Amman is the hardest part, and most visitors are better off not doing it.",
  ],
  [
    "Do I need an International Driving Permit in Jordan?",
    "Many rental companies will rent to you on a valid licence from home, especially if it is in English. An International Driving Permit is still recommended, and essential if your licence is not in English or Arabic script. It is cheap to get before you travel and avoids problems at a police checkpoint.",
  ],
  [
    "How much does it cost to rent a car in Jordan?",
    "A small economy car typically costs around 20–35 JOD a day, more in peak season (spring and autumn) and for automatics or SUVs. Expect a refundable deposit of a few hundred dinars held on a credit card in the driver's name.",
  ],
  [
    "Do traffic cameras in Jordan check seatbelts and phone use?",
    "Yes. Smart cameras in Amman and on major highways detect front-seat occupants without a seatbelt and drivers holding a phone, as well as speeding. Fines go to the car's registered owner, so in a rental car the company charges them to your card later.",
  ],
  [
    "Which side of the road do they drive on in Jordan?",
    "The right, as in the US and most of Europe. Most rental cars are automatic, but check when you book.",
  ],
  [
    "Can I drive a rental car into Wadi Rum?",
    "No. Ordinary rental cars are not allowed, or able, to drive into the desert. Park at the Wadi Rum visitor centre or in Rum village and let your camp or a local guide take you in by 4x4.",
  ],
  [
    "Can I take a Jordanian rental car across the border?",
    "Generally no. Rental companies do not allow their cars to leave Jordan, and you cannot take a private car across the King Hussein (Allenby) Bridge. Plan to return the car and cross on foot or by bus.",
  ],
  [
    "What should I do if I have an accident in Jordan?",
    "Stop, call 911 (Jordan's emergency number) and your rental company, and do not move the car unless the police tell you to. You will need a police report for the insurance claim, even for a minor scrape.",
  ],
];

const articleSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: "Driving in Jordan: Renting a Car, Road Rules & Routes",
      description:
        "A local guide to renting a car and driving in Jordan: what you need, costs, insurance, road rules, checkpoints and the best routes from Amman.",
      url: "https://zowar.net/blog/driving-in-jordan",
      image: "https://zowar.net/images/blog/jordan-camel-crossing-road-sign.jpg",
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

const routes = [
  {
    name: "Desert Highway (Highway 15)",
    time: "Amman to Petra: about 3 hours",
    body: "The fast, direct road south from Amman to Petra and Aqaba. Dual carriageway most of the way, flat and fairly dull, with a lot of heavy trucks. Use it when you need to cover distance.",
  },
  {
    name: "King's Highway (Highway 35)",
    time: "Amman to Petra: 5 hours plus stops",
    body: "The scenic route, through Madaba, the Mujib canyon, Karak castle, Dana and Shobak. Slow, winding and single-lane, through villages full of speed bumps. Give it a full day and drive it in daylight. It is the best drive in the country.",
  },
  {
    name: "Dead Sea Highway (Highway 65)",
    time: "Amman to the Dead Sea: about 45–60 minutes",
    body: "Drops more than 1,000 metres from Amman to the lowest point on earth, then runs south along the shore towards Aqaba. Expect military checkpoints along the way, as it runs close to the border.",
  },
];

const driveTimes: [string, string][] = [
  ["Queen Alia Airport to central Amman", "40–50 min"],
  ["Amman to Jerash", "about 1 hr"],
  ["Amman to Madaba", "about 45 min"],
  ["Amman to the Dead Sea resorts", "45–60 min"],
  ["Amman to Petra (Desert Highway)", "about 3 hr"],
  ["Petra to Wadi Rum", "about 1 hr 30 min"],
  ["Wadi Rum to Aqaba", "about 1 hr"],
  ["Aqaba to Amman", "about 4 hr"],
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
  ["need", "What you need to rent a car"],
  ["cost", "What it costs, and insurance"],
  ["culture", "A different driving culture"],
  ["amman", "Don't drive in Amman"],
  ["rules", "Road rules"],
  ["checkpoints", "Traffic cameras and police checkpoints"],
  ["routes", "The three roads that matter"],
  ["times", "Driving times"],
  ["tips", "Practical tips"],
  ["faq", "FAQ"],
];

export default function DrivingInJordan() {
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
            <span className="text-neutral-700">Driving in Jordan</span>
          </div>
        </div>

        <article className="mx-auto max-w-3xl px-6 py-14">
          <header className="mb-10">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#c8694a] bg-[#fef3ee] px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-[#c8694a]">
              Travel Planning · Jordan
            </div>
            <h1 className="text-3xl font-semibold leading-tight tracking-tight text-neutral-950 sm:text-4xl">
              Driving in Jordan: Renting a Car, Road Rules &amp; the Best Routes
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-neutral-600">
              A rental car is the best way to see Jordan outside Amman: Petra, Wadi Rum,
              the Dead Sea and the King&apos;s Highway on your own schedule. Here is what
              you need to rent one, what it costs, and the local habits nobody warns you
              about.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-neutral-400">
              <span>By Abdallah Al-Qudsi</span>
              <span>·</span>
              <span>12 min read</span>
              <span>·</span>
              <time dateTime={LAST_UPDATED_ISO} className="font-medium text-[#c8694a]">
                Last updated {LAST_UPDATED}
              </time>
            </div>
          </header>

          <figure className="mb-10">
            <div className="relative h-72 w-full overflow-hidden rounded-3xl sm:h-96">
              <Image
                src="/images/blog/jordan-camel-crossing-road-sign.jpg"
                alt="A camel crossing road sign in front of desert mountains in southern Jordan"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
                priority
              />
            </div>
            <figcaption className="mt-2 text-center text-xs text-neutral-400">On the road south, the warning signs are for camels</figcaption>
          </figure>

          <section id="short-answer" className="scroll-mt-20 rounded-3xl border border-black/8 bg-white p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c8694a]">The short answer</p>
            <p className="mt-3 text-base leading-8 text-neutral-700">
              <strong className="text-neutral-950">Rent a car for the road trip, not for Amman.</strong>{" "}
              Jordan&apos;s highways are good, distances are short and the country is made
              for a self-drive loop south to Petra, Wadi Rum and back along the Dead Sea.
              But driving in Amman itself is stressful, parking is hard and taxis are
              cheap. Spend your Amman days on foot and in Careem or Uber, then pick up the
              car on the day you leave the city.
            </p>
          </section>

          <aside className="mt-6 flex flex-col gap-4 rounded-2xl border border-[#c8694a]/20 bg-[#fef3ee] p-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm leading-6 text-neutral-700">
              <strong className="font-semibold text-neutral-900">Before you pick up the car:</strong>{" "}
              spend an afternoon on foot in Amman. Zowar is a self-guided puzzle walk through Rainbow Street with tastings along the way.
            </p>
            <Link
              href="/booking"
              data-umami-event="blog_cta_click"
              data-umami-event-post="driving-in-jordan"
              data-umami-event-position="top"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-[#c8694a] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
            >
              See the experience →
            </Link>
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

          <Section id="need" title="What you need to rent a car">
            <Bullets
              items={[
                <>
                  <strong className="text-neutral-950">A valid driving licence</strong> from
                  home, usually held for at least one year.
                </>,
                <>
                  <strong className="text-neutral-950">An International Driving Permit (IDP).</strong>{" "}
                  Not every rental desk asks for one, but carry it anyway. It is essential if
                  your licence is not in English, and it makes police checkpoints simpler.
                </>,
                <>
                  <strong className="text-neutral-950">Your passport.</strong> The rental
                  company will copy it, and you should keep it with you while driving.
                </>,
                <>
                  <strong className="text-neutral-950">A credit card in the driver&apos;s name</strong>{" "}
                  for the deposit. Debit cards are often refused.
                </>,
                <>
                  <strong className="text-neutral-950">Minimum age.</strong> Usually 21,
                  sometimes 23 or 25 for larger cars, with a young-driver surcharge under 25.
                </>,
              ]}
            />
            <p>
              The easiest place to pick up is Queen Alia International Airport, where the
              big international brands and several local companies have desks. One-way
              rentals, for example collecting in Amman and dropping off in Aqaba, are
              possible but usually carry a drop-off fee.
            </p>
          </Section>

          <Section id="cost" title="What it costs, and insurance">
            <p>
              A small economy car typically runs around <strong className="text-neutral-950">20–35 JOD a day</strong>{" "}
              (roughly US$28–50), with weekly rates working out cheaper. Prices climb in
              the peak seasons of spring and autumn, and for SUVs. Book ahead if you are
              travelling around Easter, Eid or Christmas.
            </p>
            <p>
              Basic collision damage cover is usually included, but with a high excess,
              often several hundred dinars. Given the scratches and dents that come with
              Jordanian traffic, it is worth paying for full or &quot;super&quot; cover
              that reduces the excess to zero. Walk around the car with the agent before
              you leave and photograph every existing mark.
            </p>
            <p>
              Fuel prices are set by the government and change monthly. Petrol stations
              are attended, so you stay in the car and tell the attendant how much you
              want. Cards are accepted at most stations, but keep cash for rural ones.
            </p>
          </Section>

          <Section id="culture" title="A different driving culture">
            <p>
              The roads themselves are fine. What surprises visitors is how people drive
              on them. Driving in Jordan runs on confidence and eye contact more than on
              the rulebook, and if you are used to orderly European or North American
              traffic, the first hour can feel hectic. It is not aggressive so much as
              fluid: everyone expects everyone else to adapt.
            </p>
            <Bullets
              items={[
                <>
                  <strong className="text-neutral-950">Lanes are loose.</strong> Three
                  marked lanes often carry four cars side by side, and drivers drift
                  between them without signalling.
                </>,
                <>
                  <strong className="text-neutral-950">Gaps get taken.</strong> Leave
                  space in front of you and someone will fill it. Merging works by
                  nosing in slowly and steadily, not by waiting to be let in.
                </>,
                <>
                  <strong className="text-neutral-950">Indicators are optional.</strong>{" "}
                  Watch the car, not its lights. Assume any car might turn or change lane
                  at any moment.
                </>,
                <>
                  <strong className="text-neutral-950">Horns are communication.</strong> A
                  short beep usually means &quot;I&apos;m here&quot; or &quot;I&apos;m
                  passing&quot;, not anger. A car flashing its headlights behind you on the
                  highway wants you to move over.
                </>,
                <>
                  <strong className="text-neutral-950">Anyone can stop anywhere.</strong>{" "}
                  Taxis and minibuses pull over without warning to pick up passengers,
                  cars double-park outside shops, and pedestrians cross busy roads,
                  including highways, wherever they like.
                </>,
                <>
                  <strong className="text-neutral-950">Expect animals in the south.</strong>{" "}
                  Goats, sheep and camels wander onto rural roads, especially near
                  Bedouin camps and around dusk.
                </>,
              ]}
            />
            <p>
              The trick is to be predictable, not timid. Drive steadily, keep checking
              your mirrors, don&apos;t make sudden moves and don&apos;t take anything
              personally. Most visitors settle in within a day, as long as that day
              is not spent in central Amman.
            </p>
          </Section>

          <Section id="amman" title="Don't drive in Amman">
            <p>
              This is the advice locals give every visiting friend. Everything above is
              at its most intense in the capital. Amman is spread across steep hills, so
              you will be doing hill starts in stop-and-go traffic. The street layout is
              confusing, and the roundabouts (called &quot;circles&quot;) are busy
              multi-lane free-for-alls where the most confident car goes first. Rush
              hour, roughly 7–9 AM and 3–6 PM, can turn a 15-minute drive into an hour.
              And parking near Rainbow Street, Weibdeh or downtown is scarce.
            </p>
            <p>
              Inside the city, Careem, Uber and yellow taxis are cheap and quick, and the
              neighbourhoods worth exploring are best seen on foot anyway. Our{" "}
              <Link href="/blog/3-days-in-amman" className="text-[#c8694a] underline">3 days in Amman itinerary</Link>{" "}
              works without a car for the city days.
            </p>
            <p>
              If you fly in and out of Queen Alia, the airport sits south of the city on
              the Desert Highway, so you can collect the car on your way out of Amman and
              head south without ever touching city traffic.
            </p>
          </Section>

          <figure className="mt-10">
            <div className="relative h-60 w-full overflow-hidden rounded-3xl sm:h-72">
              <Image
                src="/images/blog/amman-vw-book-van.jpg"
                alt="An old VW van selling secondhand books, parked on a street in Amman"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
            <figcaption className="mt-2 text-center text-xs text-neutral-400">In Amman, even the parked cars have a second job. Kerb space is hard to come by</figcaption>
          </figure>

          <Section id="rules" title="Road rules">
            <Bullets
              items={[
                <>
                  <strong className="text-neutral-950">Drive on the right.</strong> Most
                  rental cars are automatic.
                </>,
                <>
                  <strong className="text-neutral-950">Speed limits</strong> are usually
                  around 40–60 km/h in towns, 80–100 km/h on open roads and up to 110–120
                  km/h on parts of the Desert Highway. Limits change often, so watch the
                  signs.
                </>,
                <>
                  <strong className="text-neutral-950">Seatbelts for everyone, no phones.</strong>{" "}
                  Seatbelts are compulsory for the driver and passengers, and holding a
                  phone while driving is illegal. Cameras now catch both. See below.
                </>,
                <>
                  <strong className="text-neutral-950">Speed bumps everywhere.</strong> Every
                  village has them, many unpainted and unsigned. Slow down whenever you see
                  houses or shops by the road.
                </>,
                <>
                  <strong className="text-neutral-950">Avoid driving at night</strong> on
                  highways and rural roads. Many are unlit, trucks drive slowly without
                  good lights, and speed bumps are invisible in the dark.
                </>,
              ]}
            />
          </Section>

          <Section id="checkpoints" title="Traffic cameras and police checkpoints">
            <p>
              Jordan has a lot of fixed and mobile speed cameras. Locals flash their
              headlights to warn of a mobile camera ahead.
            </p>
            <p>
              Speed is not the only thing being watched. Jordan has rolled out smart
              traffic cameras, concentrated in Amman and on the main highways, that
              automatically detect{" "}
              <strong className="text-neutral-950">anyone in the front seats without a seatbelt</strong>{" "}
              and{" "}
              <strong className="text-neutral-950">drivers holding a phone</strong>. Your
              passenger forgetting to buckle up gets the car a fine just as surely as
              you do. Checking a map with the phone in your hand counts too, so use a
              dashboard mount and set the route before you pull away.
            </p>
            <p>
              Camera fines are registered against the car, so the rental company
              receives them and charges your card, sometimes weeks after you have flown
              home, often with an admin fee on top. Everyone buckled up and phone in the
              holder is the cheapest habit you can have in Jordan.
            </p>
            <p>
              You will also pass police and military checkpoints, especially on the Dead
              Sea Highway and near the borders. They are routine. Slow down, roll down the
              window, smile and say{" "}
              <em>&quot;marhaba&quot;</em>. Usually you will be waved through. If you are
              stopped, show your passport, licence and rental papers. Do not photograph
              checkpoints or military sites.
            </p>
          </Section>

          <Section id="routes" title="The three roads that matter">
            <p>
              Almost every Jordan road trip uses some combination of these. A classic loop
              is south on the King&apos;s Highway to Petra, on to Wadi Rum and Aqaba, then
              back north on the Dead Sea Highway or the Desert Highway.
            </p>
            <div className="space-y-3">
              {routes.map((r) => (
                <div key={r.name} className="rounded-2xl border border-black/8 bg-white p-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="font-semibold text-neutral-950">{r.name}</p>
                    <p className="text-sm font-semibold text-[#c8694a]">{r.time}</p>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-neutral-600">{r.body}</p>
                </div>
              ))}
            </div>
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-900">
              <strong>Wadi Rum:</strong> you cannot drive a rental car into the desert.
              Park at the visitor centre or in Rum village, and your camp will collect you
              in a 4x4. Entry is covered by the{" "}
              <Link href="/blog/jordan-pass" className="underline">Jordan Pass</Link>.
            </div>
          </Section>

          <figure className="mt-10">
            <div className="relative h-60 w-full overflow-hidden rounded-3xl sm:h-72">
              <Image
                src="/images/blog/southern-jordan-winding-road-flags.jpg"
                alt="Jordanian flags above a winding road leading into a hillside town in southern Jordan"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
            <figcaption className="mt-2 text-center text-xs text-neutral-400">Off the highways, roads wind slowly through hillside towns</figcaption>
          </figure>

          <Section id="times" title="Driving times">
            <p>Typical times without long stops. Add more for the King&apos;s Highway and for traffic leaving Amman.</p>
            <div className="rounded-2xl border border-black/8 bg-white p-5">
              <dl className="space-y-2 text-sm text-neutral-600">
                {driveTimes.map(([route, time]) => (
                  <div key={route} className="flex justify-between gap-3 border-b border-black/5 pb-2 last:border-0 last:pb-0">
                    <dt>{route}</dt>
                    <dd className="shrink-0 font-semibold tabular-nums text-neutral-900">{time}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Section>

          <Section id="tips" title="Practical tips">
            <Bullets
              items={[
                <>
                  <strong className="text-neutral-950">Get a local SIM or eSIM.</strong>{" "}
                  Google Maps and Waze both work well in Jordan. Download offline maps for
                  the south, where signal can drop.
                </>,
                <>
                  <strong className="text-neutral-950">Fill up when you can.</strong>{" "}
                  Stations are far apart on the King&apos;s Highway and stretches of the
                  Desert Highway. Do not let the tank drop below a quarter.
                </>,
                <>
                  <strong className="text-neutral-950">Carry water and snacks.</strong>{" "}
                  Especially in summer, when temperatures in the south pass 35°C.
                </>,
                <>
                  <strong className="text-neutral-950">Keep the car tidy and locked.</strong>{" "}
                  Crime against cars is rare, but don&apos;t leave bags on the seats at
                  busy sites.
                </>,
                <>
                  <strong className="text-neutral-950">Watch the weather in winter.</strong>{" "}
                  Snow occasionally closes roads around Amman, Petra and the King&apos;s
                  Highway for a day or two. See our{" "}
                  <Link href="/blog/amman-in-winter" className="text-[#c8694a] underline">Amman in winter guide</Link>.
                </>,
                <>
                  <strong className="text-neutral-950">Not confident behind the wheel?</strong>{" "}
                  Hire a driver for the day through your hotel, or take the JETT bus to
                  Petra and Aqaba. Both are common and reasonably priced.
                </>,
              ]}
            />
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
              country, which means a lot of hours on the Desert Highway. He founded Zowar
              to show visitors the side of Amman that locals know.
            </p>
          </section>

          <section className="mt-10 rounded-3xl border border-[#c8694a]/20 bg-[#fef3ee] p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c8694a]">Park the car</p>
            <h2 className="mt-2 text-xl font-semibold text-neutral-950">
              See Amman the way it&apos;s meant to be seen: on foot
            </h2>
            <p className="mt-3 text-sm leading-7 text-neutral-700">
              Zowar is a self-guided food and puzzle walk through Rainbow Street and
              Jabal Amman, with local stops and over 25 JOD in tastings and gifts along
              the way. No group, no fixed schedule, and no parking to find.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/booking"
                data-umami-event="blog_cta_click"
                data-umami-event-post="driving-in-jordan"
                data-umami-event-position="bottom"
                className="inline-flex items-center gap-2 rounded-2xl bg-[#c8694a] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
              >
                Book the experience →
              </Link>
              <Link
                href="/experiences/rainbow-street"
                className="inline-flex items-center gap-2 rounded-2xl border border-black/10 bg-white px-5 py-2.5 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50"
              >
                How it works
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
