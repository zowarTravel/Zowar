import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "3 Days in Amman: The Complete Itinerary for 2026",
  description:
    "The complete 3-day Amman itinerary — Rainbow Street and Weibdeh, the Citadel and Roman Theatre, day trips to Jerash and the Dead Sea. Where to eat, what to see, and how to spend your time.",
  alternates: { canonical: "https://zowar.net/blog/3-days-in-amman" },
  openGraph: {
    title: "3 Days in Amman: The Complete Itinerary for 2026",
    description:
      "How to spend 3 days in Amman — from breakfast on Rainbow Street to the Citadel, Roman Theatre, Jerash, and the Dead Sea.",
    url: "https://zowar.net/blog/3-days-in-amman",
    images: [{ url: "/logo.png", width: 1200, height: 630 }],
  },
  keywords: [
    "3 days in Amman",
    "Amman itinerary",
    "Amman travel guide",
    "things to do Amman",
    "Amman Jordan trip",
    "Amman 3 day itinerary",
    "what to do in Amman",
    "Amman sightseeing",
    "Rainbow Street Amman",
    "Amman Citadel",
    "Roman Theatre Amman",
    "Jerash day trip from Amman",
    "Dead Sea day trip Amman",
    "Jordan travel itinerary",
    "Jordan tourism 2026",
  ],
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: "3 Days in Amman: The Complete Itinerary",
      description:
        "A day-by-day itinerary for spending 3 days in Amman, Jordan — covering Rainbow Street, Weibdeh, the Citadel, Roman Theatre, downtown, and day trips to Jerash and the Dead Sea.",
      url: "https://zowar.net/blog/3-days-in-amman",
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
        "3 days in Amman, Amman itinerary, things to do Amman, Rainbow Street, Amman Citadel, Roman Theatre, Jerash, Dead Sea, Jordan travel",
      about: [
        { "@type": "City", name: "Amman" },
        { "@type": "Country", name: "Jordan" },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Is 3 days enough for Amman?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Three days is enough to see the main highlights of Amman and do one or two day trips. You can cover Rainbow Street, Weibdeh, the Citadel, Roman Theatre, and downtown comfortably in two days, with a third day for Jerash or the Dead Sea.",
          },
        },
        {
          "@type": "Question",
          name: "What is the best area to stay in Amman?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Jabal Amman (around the First and Second Circles) is the most convenient base — close to Rainbow Street, Weibdeh, and easy taxi access to the Citadel and downtown. Abdoun is quieter and more residential.",
          },
        },
        {
          "@type": "Question",
          name: "What is the best day trip from Amman?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Jerash is the easiest and most rewarding day trip — 45 minutes from Amman, it contains some of the best-preserved Roman ruins in the Middle East. The Dead Sea is also about an hour away and worth a half-day visit.",
          },
        },
        {
          "@type": "Question",
          name: "Is Amman worth visiting?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Amman is often underestimated as a transit city en route to Petra, but it has a strong food scene, fascinating history, distinct neighbourhoods like Rainbow Street and Weibdeh, and makes an excellent base for the wider country.",
          },
        },
        {
          "@type": "Question",
          name: "How do you get around Amman?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Taxis and ride-hailing apps (Careem, Uber) are the most practical way to get around Amman. The city is hilly and spread out — walking works well within individual neighbourhoods like Rainbow Street or Weibdeh, but between areas a taxi is faster and cheap.",
          },
        },
      ],
    },
  ],
};

const days = [
  {
    day: "Day 1",
    title: "Rainbow Street, Weibdeh & the food that defines Amman",
    subtitle: "Start where the city's character is most concentrated.",
    color: "bg-z-orange-soft border-[#c8694a]/20",
    labelColor: "text-[#c8694a]",
    schedule: [
      {
        time: "7:30 AM",
        heading: "Breakfast on Rainbow Street",
        body: "Start the day at Al-Quds Falafel — a small counter that has been on Rainbow Street since 1966. Takeout only, falafel in French bread, and it sells out fast. If you want something more leisurely, Shams Al Balad is two minutes further down the street, with a terrace overlooking the Citadel and a menu of seasonal Jordanian dishes made with organic local ingredients. It is listed on the World's 50 Best Discovery and worth the slightly longer sit.",
        link: { text: "Full breakfast guide →", href: "/blog/best-breakfast-amman" },
      },
      {
        time: "9:30 AM",
        heading: "The Zowar experience",
        body: "This is the best way to spend a first morning in Amman. Zowar is a self-guided puzzle walk through Rainbow Street and Weibdeh — you follow a trail of clues through the neighbourhood, stopping at local venues for tastings and cultural discoveries along the way. It takes 3 to 4 hours at a comfortable pace and covers more of the neighbourhood than most visitors see in a full day of wandering. Over 25 JOD in food and gifts is included, and it works as a genuine introduction to what makes this part of the city worth understanding.",
        cta: { text: "Book the Zowar experience", href: "/booking" },
      },
      {
        time: "1:30 PM",
        heading: "Lunch and a walk through Weibdeh",
        body: "After the Zowar route ends, continue uphill into Jabal Al-Weibdeh. The neighbourhood is quieter and more residential than Rainbow Street — stone villas, shaded lanes, artists' studios. Go Mashawi on one of the side streets does excellent grilled meat sandwiches with Baladi meat if you need something to eat. Then walk to Darat Al Funun: three restored 1920s villas set in a hillside garden with Byzantine ruins in the grounds and consistently good contemporary Arab art exhibitions inside. Entry is free.",
        link: { text: "Weibdeh neighbourhood guide →", href: "/blog/weibdeh-neighbourhood-guide" },
      },
      {
        time: "3:30 PM",
        heading: "Jordan National Gallery of Fine Arts",
        body: "A five-minute walk from Darat Al Funun. The National Gallery holds one of the most significant collections of modern and contemporary Arab art in the world, across two buildings with a sculpture park between them. The sculpture park is free to walk through and is one of the more peaceful spots in the city.",
      },
      {
        time: "5:30 PM",
        heading: "Coffee at Rumi Café",
        body: "End the afternoon at Rumi Café in Weibdeh — open since 2013, specialty coffee, outdoor patio, house-made orange cake. It is the kind of place that makes you want to stay until the evening light comes through the windows.",
      },
      {
        time: "7:30 PM",
        heading: "Dinner on Rainbow Street",
        body: "Return to Rainbow Street for dinner. The street is at its best in the evening — restaurants are full, the cafés spill onto the pavements, and Jafra usually has live music. Rumman Collective on Rainbow Street is worth a visit if you did not catch their weekend brunch.",
      },
    ],
  },
  {
    day: "Day 2",
    title: "The Citadel, Roman Theatre & downtown Amman",
    subtitle: "Two thousand years of history in a single morning.",
    color: "bg-blue-50 border-blue-200",
    labelColor: "text-blue-600",
    schedule: [
      {
        time: "8:00 AM",
        heading: "Breakfast at Abu Jbara",
        body: "Abu Jbara is one of Amman's most reliable full-spread breakfast restaurants — hummus, ful medames, fatteh, falafel, and fresh Arabic bread all arriving at once. Three branches across the city, one open 24 hours. Fill up properly before the Citadel.",
      },
      {
        time: "9:30 AM",
        heading: "Amman Citadel (Jabal al-Qal'a)",
        body: "The Citadel sits on the highest hill in Amman and has been continuously occupied for over 7,000 years. The site contains the remains of a Roman temple dedicated to Hercules, a Byzantine church, and the Umayyad Palace — a vast complex that was the seat of the governor of the Umayyad Amman in the 8th century. The views over the city from the edge of the hill are the best in Amman. The Jordan Archaeological Museum on site is worth an hour — small, well-curated, and contains the Ain Ghazal statues: some of the oldest human statues ever found.",
      },
      {
        time: "11:30 AM",
        heading: "Roman Theatre",
        body: "A 15-minute walk downhill from the Citadel brings you to the Roman Theatre — a 6,000-seat amphitheatre built in the 2nd century AD, remarkably well-preserved and still used for performances today. Climb to the top tier for the views. The Odeon, a smaller Roman theatre, sits just next to it.",
      },
      {
        time: "1:00 PM",
        heading: "Lunch in downtown Amman (Al-Balad)",
        body: "Downtown Amman — known as Al-Balad — is the oldest and most dense part of the city. After the Roman Theatre, walk into the streets around it for the most concentrated street food in Amman. Knafeh from one of the bakeries, fresh juice, and the general atmosphere of a market city that has been running continuously for centuries. The gold souk, spice market, and old covered streets are worth wandering.",
      },
      {
        time: "3:00 PM",
        heading: "Duke's Diwan and the old quarter",
        body: "Duke's Diwan is a restored early-20th-century building in downtown Amman that serves as a cultural and heritage space — free to enter, full of old photographs and documents about the city's history. A good anchor for a walk through the older streets nearby.",
      },
      {
        time: "5:00 PM",
        heading: "Sunset from a viewpoint",
        body: "Amman is built across seven hills — originally seven, now closer to twenty — and sunset from a high point in the city is one of its better experiences. The edge of the Citadel is the most dramatic. Alternatively, the terrace at Shams Al Balad on Rainbow Street faces directly toward the Citadel and Umayyad Palace, which are lit at dusk.",
      },
      {
        time: "7:30 PM",
        heading: "Dinner",
        body: "Plenty of options depending on appetite. Hashem in downtown is a Amman institution for hummus and falafel that has been serving since 1952 — small, unpretentious, and worth the queue. For something more relaxed, the restaurants on Rainbow Street or Abdoun are all within easy reach.",
      },
    ],
  },
  {
    day: "Day 3",
    title: "Day trip — Jerash or the Dead Sea",
    subtitle: "Both are under an hour from the city. Choose based on what you are here for.",
    color: "bg-emerald-50 border-emerald-200",
    labelColor: "text-emerald-700",
    schedule: [
      {
        time: "Option A",
        heading: "Jerash — Roman ruins 45 minutes north",
        body: "Jerash contains some of the most complete and best-preserved Roman city ruins anywhere in the world. The site covers an ancient city that was inhabited from the Neolithic period and reached its peak under Roman rule in the 1st and 2nd centuries AD. The Oval Plaza, the colonnaded streets, the temples of Artemis and Zeus, the hippodrome, and the theatres are all walkable within the site. Plan for 3 to 4 hours minimum. Get there early before the heat builds — and before tour groups arrive from 10 AM onwards.",
      },
      {
        time: "Option B",
        heading: "Dead Sea — one hour southwest",
        body: "The Dead Sea sits more than 400 metres below sea level — the lowest point on earth — and the water is so dense with salt and minerals that floating is effortless and swimming is impossible. The experience is genuinely unlike anything else. Most visitors go to one of the beach resort areas where changing facilities, showers, and fresh water are available. The black mud along the shoreline is traditionally applied to the skin and rinsed off. Allow half a day. The drive back toward Amman through the Jordan Valley is scenic.",
      },
      {
        time: "Return by 3:00 PM",
        heading: "Afternoon back in Amman",
        body: "If you are leaving the following morning, use the afternoon to revisit anything you missed — the downtown souks, a café in Weibdeh, or a longer walk along Rainbow Street. If you have another day, Madaba (the mosaic city) and Mount Nebo (where Moses is said to have seen the Promised Land) are both an hour from Amman and easily combined into a single day trip.",
      },
      {
        time: "Evening",
        heading: "Final dinner",
        body: "A last evening in Amman is best spent somewhere you did not make it to earlier. Sufra on Rainbow Street is one of the most celebrated Jordanian fine-dining restaurants in the city, housed in a 1940s villa, serving elevated Jordanian cuisine in a setting that earns it. Or return to a spot that earned a second visit.",
      },
    ],
  },
];

export default function ThreeDaysInAmman() {
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
            <span className="text-neutral-700">3 Days in Amman</span>
          </div>
        </div>

        <article className="mx-auto max-w-3xl px-6 py-14">
          <header className="mb-12">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-z-orange bg-z-orange-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-[#c8694a]">
              Travel Guide · Amman, Jordan
            </div>
            <h1 className="text-3xl font-semibold leading-tight tracking-tight text-neutral-950 sm:text-4xl">
              3 Days in Amman: The Complete Itinerary
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-neutral-600">
              Most people spend a night in Amman on the way to Petra and leave having seen
              almost nothing. Three days is enough to understand why the city is worth
              staying for — the food, the history, the neighbourhoods, and the country
              beyond.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-neutral-400">
              <span>By Zowar · Amman, Jordan</span>
              <span>·</span>
              <span>12 min read</span>
              <span>·</span>
              <span>Updated 2026</span>
            </div>
          </header>

          {/* Hero image */}
          <figure className="mb-10">
            <div className="relative h-72 w-full overflow-hidden rounded-3xl sm:h-96">
              <Image
                src="/images/blog/amman-city-panoramic.jpg"
                alt="Panoramic view of Amman, Jordan from Jabal Amman hill"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
                priority
              />
            </div>
            <figcaption className="mt-2 text-center text-xs text-neutral-400">Amman from Jabal Amman — the city stretches across 20 hills</figcaption>
          </figure>

          {/* Overview */}
          <section className="rounded-3xl border border-black/8 bg-white p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-neutral-950">Before you start</h2>
            <div className="mt-4 space-y-4 text-sm leading-7 text-neutral-700">
              <p>
                Amman is one of the most underrated cities in the Middle East. It tends to
                be treated as a transit point — a night before the flight to Petra, a place
                to change money and move on. That is a mistake. The city has a distinct
                character built across its hills: a dense, ancient downtown alongside quiet
                stone-villa neighbourhoods, a food scene that genuinely reflects the culture,
                and a position that makes it the best base in the country for reaching the
                rest of Jordan.
              </p>
              <p>
                This itinerary is structured for someone staying three nights, using Amman
                as a base. Day one covers Rainbow Street and Weibdeh — the city&apos;s
                cultural core. Day two goes deeper into history: the Citadel, Roman Theatre,
                and downtown. Day three is a day trip — Jerash or the Dead Sea, both under
                an hour away.
              </p>
            </div>

            {/* Quick overview cards */}
            <div className="mt-6 grid grid-cols-3 gap-3 text-center">
              {[
                ["Day 1", "Rainbow Street & Weibdeh"],
                ["Day 2", "Citadel, Theatre & Downtown"],
                ["Day 3", "Jerash or Dead Sea"],
              ].map(([day, desc]) => (
                <div key={day} className="rounded-2xl border border-black/8 p-3">
                  <p className="text-xs font-bold text-[#c8694a]">{day}</p>
                  <p className="mt-1 text-xs leading-5 text-neutral-600">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Practical info */}
          <section className="mt-6 rounded-3xl border border-black/8 bg-white p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-neutral-950">Practical information</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {[
                ["Where to stay", "Jabal Amman (First/Second Circle area) is the best base — walkable to Rainbow Street and Weibdeh, easy taxi access everywhere else. Abdoun is quieter and slightly further from the main sights."],
                ["Getting around", "Taxis and Careem/Uber are cheap and reliable. Amman is hilly and spread out — walking works within neighbourhoods, but use a taxi between them. Expect to pay 2–5 JOD for most city trips."],
                ["Best time to visit", "March to May and September to November are ideal — mild temperatures, no rain, clear skies. July and August are hot. December to February can be cold and occasionally rainy but very uncrowded."],
                ["Currency", "Jordanian Dinar (JOD). Most restaurants and shops are cash-only. ATMs are widely available. Credit cards accepted at hotels and larger restaurants."],
              ].map(([title, body]) => (
                <div key={title} className="rounded-2xl border border-black/8 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400">{title}</p>
                  <p className="mt-2 text-sm leading-6 text-neutral-700">{body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Painted stairs image */}
          <figure className="mt-6">
            <div className="relative h-64 w-full overflow-hidden rounded-3xl sm:h-80">
              <Image
                src="/images/blog/rainbow-street-painted-stairs.jpg"
                alt="Painted stairs on Rainbow Street Amman with Jordanian flag and flowers"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
            <figcaption className="mt-2 text-center text-xs text-neutral-400">The painted stairs of Rainbow Street — one of many details that reward a slow walk</figcaption>
          </figure>

          {/* Day-by-day */}
          <div className="mt-10 space-y-12">
            {days.map((day) => (
              <section key={day.day}>
                {/* Day header */}
                <div className={`rounded-3xl border p-6 sm:p-8 ${day.color}`}>
                  <p className={`text-xs font-bold uppercase tracking-[0.2em] ${day.labelColor}`}>{day.day}</p>
                  <h2 className="mt-1 text-2xl font-semibold text-neutral-950">{day.title}</h2>
                  <p className="mt-2 text-sm text-neutral-600">{day.subtitle}</p>
                </div>

                {/* Schedule */}
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

          {/* Knafeh image between days */}
          <figure className="mt-4">
            <div className="relative h-64 w-full overflow-hidden rounded-3xl sm:h-80">
              <Image
                src="/images/blog/knafeh-downtown-amman.jpg"
                alt="Knafeh being served on the street in downtown Amman Jordan"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
            <figcaption className="mt-2 text-center text-xs text-neutral-400">Knafeh pulled fresh on the street in downtown Amman — a must on Day 2</figcaption>
          </figure>

          {/* Tips section */}
          <section className="mt-12 rounded-3xl border border-black/8 bg-white p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-neutral-950">Tips for getting the most out of Amman</h2>
            <ul className="mt-5 space-y-5 text-sm leading-7 text-neutral-700">
              {[
                ["Start early.", "Amman's most popular breakfast spots, the Citadel, and Jerash are all significantly better before 10 AM — cooler, quieter, and the light is better for photographs."],
                ["Friday is different.", "Friday is the weekend in Jordan. Most shops and some restaurants are closed in the morning. The afternoon and evening are lively. Plan accordingly."],
                ["Dress modestly outside tourist areas.", "Rainbow Street and Weibdeh are relaxed. Downtown and the souks are more conservative. Shoulders and knees covered is the respectful standard."],
                ["Amman is hilly — wear comfortable shoes.", "The city is built across hills and the streets are often uneven stone. Good walking shoes make a significant difference, especially on days that cover the Citadel, downtown, and Weibdeh on foot."],
                ["Use Amman as your base for the whole country.", "Petra is 3 hours south, Aqaba 4 hours, Wadi Rum 4.5 hours, and Jerash 45 minutes north. Most of Jordan is a day trip from Amman. Keeping your accommodation here and driving out avoids the hassle of packing and moving between hotels."],
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

          {/* Amman ruins view image */}
          <figure className="mt-4">
            <div className="relative h-64 w-full overflow-hidden rounded-3xl sm:h-80">
              <Image
                src="/images/blog/amman-view-from-ruins.jpg"
                alt="View over Amman from the ruins of the Citadel, Jordan flag visible"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
            <figcaption className="mt-2 text-center text-xs text-neutral-400">The view from the Amman Citadel — occupied continuously for over 7,000 years</figcaption>
          </figure>

          {/* FAQ */}
          <section className="mt-8 rounded-3xl border border-black/8 bg-white p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-neutral-950">Frequently asked questions</h2>
            <div className="mt-5 space-y-6">
              {[
                ["Is 3 days enough for Amman?", "Three days is enough to see the main highlights and do one day trip. You can cover Rainbow Street, Weibdeh, the Citadel, Roman Theatre, and downtown comfortably in two days, with a third for Jerash or the Dead Sea. A fourth day would let you add Madaba and Mount Nebo without rushing."],
                ["Is Amman safe for tourists?", "Yes. Amman is one of the safest capital cities in the Middle East and consistently ranks as a low-risk destination. Petty crime is rare. Solo travellers, including women travelling alone, report feeling comfortable across the city."],
                ["Do I need a visa for Jordan?", "Most nationalities can obtain a Jordan Pass online before arrival, which includes the visa fee and entry to over 40 sites including Petra. Check the official Jordan Tourism Board website for your specific country's requirements."],
                ["What language is spoken in Amman?", "Arabic is the official language. English is widely spoken in the tourist areas, restaurants, and hotels of Jabal Amman, Weibdeh, and Abdoun. Less so in downtown and the older parts of the city."],
                ["How do I get from Amman Airport to the city?", "Queen Alia International Airport is about 35 kilometres south of central Amman. An Airport Express bus runs regularly and is inexpensive. Taxis and Careem are also available — agree on a fixed price before getting in a taxi, or use the app."],
              ].map(([q, a]) => (
                <div key={q} className="border-b border-black/5 pb-5 last:border-0 last:pb-0">
                  <p className="font-semibold text-neutral-900">{q}</p>
                  <p className="mt-2 text-sm leading-6 text-neutral-600">{a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="mt-10 rounded-3xl border border-[#c8694a]/20 bg-z-orange-soft p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c8694a]">Day 1 sorted</p>
            <h2 className="mt-2 text-xl font-semibold text-neutral-950">
              Start your Amman trip with Zowar
            </h2>
            <p className="mt-3 text-sm leading-7 text-neutral-700">
              Zowar is the best way to spend your first morning in Amman — a self-guided
              puzzle experience through Rainbow Street and Weibdeh with stops at local
              venues for tastings and cultural discoveries. 3 to 4 hours, over 25 JOD in
              food and gifts included, starting from 30 JOD per person. No guide required,
              available Tuesday to Saturday.
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
                Learn more about Zowar →
              </Link>
            </div>
          </section>

          {/* Kilim / crafts image */}
          <figure className="mt-4">
            <div className="relative h-64 w-full overflow-hidden rounded-3xl sm:h-80">
              <Image
                src="/images/blog/jordanian-kilim-rugs-rainbow-street.jpg"
                alt="Traditional Jordanian kilim rugs hanging on a wall outside a shop on Rainbow Street Amman"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
            <figcaption className="mt-2 text-center text-xs text-neutral-400">Kilim rugs outside one of Rainbow Street's independent shops — the kind of detail you only catch on foot</figcaption>
          </figure>

          {/* Related guides */}
          <section className="mt-8 rounded-3xl border border-black/8 bg-white p-6 sm:p-8">
            <p className="mb-4 text-sm font-semibold text-neutral-700">Related guides</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ["Best breakfast in Amman", "Where to eat on every morning of your trip.", "/blog/best-breakfast-amman"],
                ["Rainbow Street guide", "The history and everything to do on Amman's most famous street.", "/blog/rainbow-street-guide"],
                ["Weibdeh neighbourhood guide", "Darat Al Funun, the National Gallery, and the best of the creative quarter.", "/blog/weibdeh-neighbourhood-guide"],
                ["Traditional Jordanian hummus recipe", "Make the real thing at home before you go — or after.", "/blog/traditional-hummus-recipe"],
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
            <Link href="/blog" className="hover:text-neutral-800 transition">← All guides</Link>
            <Link href="/blog/best-breakfast-amman" className="hover:text-neutral-800 transition">Best breakfast in Amman →</Link>
          </div>
        </article>
      </div>
    </>
  );
}
