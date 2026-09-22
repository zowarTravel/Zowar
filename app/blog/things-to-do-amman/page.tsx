import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Things to Do in Amman, Jordan – Local Guide 2026",
  description:
    "The complete guide to Amman — the Citadel, Roman Theatre, Jordan Museum, Darat Al Funun, Rainbow Street, Weibdeh, day trips, and the self-guided Zowar experience.",
  alternates: { canonical: "https://zowar.net/blog/things-to-do-amman" },
  openGraph: {
    title: "Things to Do in Amman, Jordan – Local Guide 2026",
    description:
      "From the Citadel and Roman Theatre to Rainbow Street and Darat Al Funun — a local guide to Amman's best attractions and neighbourhoods.",
    url: "https://zowar.net/blog/things-to-do-amman",
    images: [{ url: "/logo.png", width: 1200, height: 630 }],
  },
  keywords: [
    "things to do in Amman",
    "Amman Jordan attractions",
    "Amman Citadel",
    "Roman Theatre Amman",
    "Jordan Museum Amman",
    "Darat Al Funun",
    "Rainbow Street Amman",
    "Jabal Amman",
    "Weibdeh Amman",
    "Wild Jordan Center",
    "King Abdullah Mosque",
    "Amman travel guide",
    "Amman itinerary",
    "Jordan travel",
    "what to do in Amman",
  ],
};

const articleSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: "Things to Do in Amman, Jordan",
      description:
        "A local guide to Amman's best attractions — the Citadel, Roman Theatre, Jordan Museum, Darat Al Funun, Downtown, Rainbow Street, Weibdeh, and the Zowar experience.",
      url: "https://zowar.net/blog/things-to-do-amman",
      datePublished: "2026-09-01",
      dateModified: "2026-09-01",
      author: { "@type": "Organization", name: "Zowar", url: "https://zowar.net" },
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
      "@type": "ItemList",
      name: "Things to Do in Amman",
      numberOfItems: 10,
      itemListElement: [
        { "@type": "ListItem", position: 1, item: { "@type": "TouristAttraction", name: "The Amman Citadel", description: "Ancient hilltop site with the Temple of Hercules, Umayyad Palace, and panoramic views of Amman. Entry 2 JOD.", address: { "@type": "PostalAddress", addressLocality: "Amman", addressCountry: "JO" } } },
        { "@type": "ListItem", position: 2, item: { "@type": "TouristAttraction", name: "The Roman Theatre", description: "2nd-century AD Roman amphitheatre seating 6,000, still in use for performances. Entry 2 JOD. Includes Folklore Museum.", address: { "@type": "PostalAddress", addressLocality: "Downtown Amman", addressCountry: "JO" } } },
        { "@type": "ListItem", position: 3, item: { "@type": "Museum", name: "The Jordan Museum", description: "Jordan's national museum. Houses the Copper Scroll and Ain Ghazal statues. Entry 5 JOD.", address: { "@type": "PostalAddress", addressLocality: "Amman", addressCountry: "JO" } } },
        { "@type": "ListItem", position: 4, item: { "@type": "Museum", name: "Darat Al Funun", description: "Contemporary Arab art in six 1920s buildings with a Byzantine chapel in the garden. Free entry.", address: { "@type": "PostalAddress", addressLocality: "Jabal Luweibdeh, Amman", addressCountry: "JO" } } },
        { "@type": "ListItem", position: 5, item: { "@type": "TouristAttraction", name: "Downtown Amman (Al-Balad)", description: "The oldest part of the city — Al-Husseini Mosque, Gold Souk, Hashem Restaurant, Habiba Sweets. Best explored on foot.", address: { "@type": "PostalAddress", addressLocality: "Downtown Amman", addressCountry: "JO" } } },
        { "@type": "ListItem", position: 6, item: { "@type": "PlaceOfWorship", name: "King Abdullah Mosque", description: "Amman's blue-domed mosque, open to non-Muslim visitors outside prayer times. Free entry.", address: { "@type": "PostalAddress", addressLocality: "Amman", addressCountry: "JO" } } },
        { "@type": "ListItem", position: 7, item: { "@type": "TouristAttraction", name: "Wild Jordan Center", description: "Café with panoramic city views and Nature Shop, run by the Royal Society for the Conservation of Nature.", address: { "@type": "PostalAddress", addressLocality: "Jabal Amman", addressCountry: "JO" } } },
        { "@type": "ListItem", position: 8, item: { "@type": "TouristAttraction", name: "Rainbow Street & Jabal Amman", description: "Amman's most social neighbourhood — cafés, falafel, bookshops, restaurants, and the Zowar experience.", address: { "@type": "PostalAddress", streetAddress: "Rainbow Street", addressLocality: "Jabal Amman", addressCountry: "JO" } } },
        { "@type": "ListItem", position: 9, item: { "@type": "TouristAttraction", name: "Jabal Al-Weibdeh", description: "Amman's creative quarter — galleries, Rumi Café, Gilgamesh Art Cafe, Darat Al Funun, and quiet stone lanes.", address: { "@type": "PostalAddress", addressLocality: "Jabal Al-Weibdeh, Amman", addressCountry: "JO" } } },
        { "@type": "ListItem", position: 10, item: { "@type": "TouristTrip", name: "The Zowar Experience", description: "Self-guided food and puzzle walk through Rainbow Street. 7 stops, 3–4 hours, 25+ JOD in tastings included.", url: "https://zowar.net/experiences/rainbow-street" } },
      ],
    },
  ],
};

type Attraction = {
  name: string;
  nameAr: string;
  neighborhood: string;
  highlight: string;
  description: string;
  know: string;
  tip: string;
};

const attractions: Attraction[] = [
  {
    name: "The Amman Citadel",
    nameAr: "جبل القلعة",
    neighborhood: "Jabal Al-Qala'a, overlooking Downtown",
    highlight: "The highest hill in Amman — ruins, views, and 3,000 years of history",
    description: `The Amman Citadel sits atop Jabal Al-Qala'a, the highest of Amman's original seven hills, at around 850 metres above sea level. People have lived on this hilltop continuously since the Bronze Age, and the layers of that occupation are still visible: Neolithic remains buried beneath Roman columns, buried beneath Byzantine ruins, buried beneath an Umayyad palace. The site is disorganised in the way that only genuinely old places can be — and that is part of what makes it worth the climb.

The two standout structures are the Temple of Hercules, a 2nd-century Roman temple of which only the podium and several towering columns survive, and the Umayyad Palace, an early 8th-century Islamic complex with a domed reception hall still partially intact. Between them sits the Jordan Archaeological Museum, a compact building with finds from the site and the wider region, including some of the Ain Ghazal statues — ancient plaster figures that predate the Egyptian pyramids.

The real reason most people come, though, is the view. From the Citadel terrace you can see all of Amman spread below — white limestone hills rolling in every direction, the Roman Theatre clearly visible in the valley, and on a clear day the horizon extending toward the Jordan Valley. Go early, before the afternoon heat and the tour groups arrive.`,
    know: "Entry 2 JOD (included in Jordan Pass). Open 8am–7pm April–September, 8am–4pm October–March. Closed Friday afternoons.",
    tip: "Come before 10am — the light is better, the site is quieter, and the haze that softens the view hasn't set in yet.",
  },
  {
    name: "The Roman Theatre",
    nameAr: "المدرج الروماني",
    neighborhood: "Downtown Amman (Al-Balad)",
    highlight: "A 6,000-seat Roman amphitheatre built into the hillside — still in use today",
    description: `The Roman Theatre in downtown Amman was built during the reign of Emperor Marcus Aurelius, sometime in the 2nd century AD, and was designed to hold 6,000 spectators. The scale of it still surprises people who arrive expecting a modest ruin — it is a full, steeply tiered amphitheatre carved into the natural slope of Jabal Jofeh, with the city climbing behind it and the old souk spread below. The paving stones of the original Roman street in front are still intact.

What makes the Roman Theatre different from similar ruins in the region is that it is still actively used. Concerts, festivals, and cultural events are held here throughout the year, which means on any given visit you might find it completely empty and silent, or being set up for something happening that evening. The acoustics, as the Romans intended, are still exceptional — you can stand at the top and hear a whisper from the stage.

Entry covers two small museums inside the theatre complex: the Folklore Museum, which has a good collection of traditional Jordanian dress, jewellery, and household objects, and the Museum of Popular Traditions, with a notable display of Nabataean and Byzantine mosaics alongside Bedouin and Circassian artefacts. Both are worth the extra twenty minutes.`,
    know: "Entry 2 JOD. Includes the Folklore Museum and Museum of Popular Traditions. Open daily from around 8am.",
    tip: "Pair with a visit to Hashem Restaurant and Habiba Sweets, both a short walk away in the same part of downtown.",
  },
  {
    name: "The Jordan Museum",
    nameAr: "المتحف الأردني",
    neighborhood: "Ras Al Ain, central Amman",
    highlight: "The best museum in Jordan — and home to the Copper Scroll",
    description: `The Jordan Museum opened in 2014 and is the single best place in the country to understand the full arc of Jordanian and regional history, from the earliest known human settlements through to the present day. The building is modern, well-lit, and organised to actually move you through history rather than depositing objects in disconnected glass cases.

The highlight for most visitors is the Dead Sea Scrolls collection, and specifically the Copper Scroll — one of the most remarkable documents ever found: a list of buried treasures inscribed on rolled copper rather than parchment, discovered in a cave near Qumran in 1952. The museum also houses two of the Ain Ghazal statues — extraordinary plaster figures made around 7500 BCE, among the oldest large-scale human representations ever found anywhere in the world. Standing in front of something 9,500 years old is a different kind of experience than looking at a photograph of it.

The collections on Byzantine mosaics, Islamic archaeology, and the modern history of the Hashemite Kingdom are also well done. Entry is 5 JOD and the museum closes on Tuesdays. Allow at least two hours — it is larger and more absorbing than it first appears, and the permanent collection rewards time.`,
    know: "Entry 5 JOD. Open Sat–Mon, Wed–Thu 10am–5pm. Friday 2–5pm. Closed Tuesdays.",
    tip: "Visit before Petra, not after — it gives the ruins a context that makes everything else make more sense.",
  },
  {
    name: "Darat Al Funun",
    nameAr: "دارة الفنون",
    neighborhood: "Jabal Luweibdeh, Amman",
    highlight: "Free contemporary Arab art in six 1920s buildings — with ruins in the garden",
    description: `Darat Al Funun — which translates roughly as the House of Arts — is the most important contemporary art space in Jordan and one of the most distinctive cultural institutions in the Arab world. It has occupied six historic buildings on a hillside in Jabal Luweibdeh since 1993, with an excavated Byzantine chapel visible in the garden and views across a wadi toward downtown Amman. The combination of ancient archaeology, Mandate-era architecture, and contemporary Arab art in one space is genuinely unusual.

The complex holds the Khalid Shoman Collection — a significant private collection of contemporary Arab art assembled over decades. Beyond the permanent works, Darat Al Funun runs a continuous programme of curated exhibitions, artist residencies, film screenings, concerts, and public talks. It is the kind of institution that treats culture as something to be made and discussed rather than simply preserved and displayed. The programming changes regularly, and it is worth checking the calendar before your visit.

Entry is free. The garden is as worth visiting as the galleries — the Byzantine chapel ruins embedded in a working cultural space are the kind of thing you do not encounter often. Evenings here, when there is an event on, tend to be the most memorable version of the visit.`,
    know: "Free entry. Open Sat–Thu 10am–7pm. Closed Fridays and during August.",
    tip: "Check daratalfunun.org before visiting — film nights and concerts are often the best reason to go.",
  },
  {
    name: "Downtown Amman",
    nameAr: "البلد",
    neighborhood: "Al-Balad, central Amman",
    highlight: "The oldest part of the city — and the most honest version of it",
    description: `Al-Balad — Downtown Amman — is the part of the city that was here before Amman expanded west and uphill into newer, quieter neighbourhoods. It is noisier, denser, and more alive than anywhere else in the city, and it is where you find the things that have been here the longest: the Al-Husseini Mosque, the Gold Souk, the fruit and vegetable markets, and the restaurants that have been feeding the same families for seventy years.

Hashem Restaurant has been on King Faisal Street since 1952, open 24 hours with no printed menu and no closing time — falafel, hummus, ful medames, and moutabel served from open-air tables on the pavement. It has hosted Jordanian royals and backpackers with equal indifference to the distinction. Around the corner from the Roman Theatre, Habiba Sweets has been serving knafeh since 1951 — the cheese pastry soaked in orange blossom syrup that has become the most recognised Jordanian dessert. Both are on the same block, and both reward visiting together.

Downtown is best experienced on foot, without a plan. The streets around the Al-Husseini Mosque hold hardware shops, fabric traders, spice sellers, and fresh juice stands. The Gold Souk running south from the mosque is functional rather than touristic — people come here to buy gold for weddings, not souvenirs. The Roman Theatre sits at the edge of it all, and the steps below it are where the city comes to sit in the evening.`,
    know: "Best visited morning or late afternoon. Most of downtown is walkable from the Roman Theatre.",
    tip: "Hashem Restaurant and Habiba Sweets are within a few minutes of each other. Do both on the same visit.",
  },
  {
    name: "King Abdullah Mosque",
    nameAr: "مسجد الملك عبدالله الأول",
    neighborhood: "3rd Circle, central Amman",
    highlight: "Amman's blue-domed mosque — open to non-Muslim visitors outside prayer times",
    description: `The King Abdullah I Mosque was built between 1982 and 1989 and is the only mosque in Amman that officially welcomes non-Muslim visitors outside of the five daily prayer times. The blue dome — 35 metres in diameter, tiled in deep cobalt blue — is one of the most recognisable shapes on the Amman skyline, a reference point visible from much of the city.

The main prayer hall can accommodate up to 7,000 worshippers, with room for 3,000 more in the surrounding courtyard and adjacent areas. The geometric tilework, calligraphy, and stained glass are all worth examining slowly. There is also a small Islamic museum within the complex, accessible during visiting hours. The overall scale of the building is impressive in a way that photographs do not fully communicate.

Visitors are welcome outside of prayer times — typically between the five daily prayers, though the exact windows shift with the season. Modest dress is required: shoulders and legs should be covered. Abayas are available to borrow at the entrance for those who need one. The visit takes around 30 to 45 minutes, and it is one of the few places in Amman where the inside genuinely rewards as much attention as the exterior.`,
    know: "Free entry. Modest dress required — abayas available at the entrance. Closed during prayer times.",
    tip: "Weekday mornings are the quietest time to visit. A short taxi from Rainbow Street costs 2–3 JOD.",
  },
  {
    name: "Wild Jordan Center",
    nameAr: "وايلد جوردان",
    neighborhood: "Jabal Amman, near 1st Circle",
    highlight: "Panoramic café above the old city — run by Jordan's conservation society",
    description: `The Wild Jordan Center was opened in 2003 by the Royal Society for the Conservation of Nature, and sits on a hillside in Jabal Amman with a view over the valley toward downtown, the Citadel, and the enormous Jordanian flag that flies above the old city. It is roughly 400 metres off Rainbow Street and feels significantly removed from the street's foot traffic.

The café terrace is the reason most people come: an outdoor seating area with a panoramic view of downtown Amman, open for coffee, lunch, and light meals. The menu leans organic and vegetarian-friendly, and the setting — open air, stone terrace, city spread below — is one of the best in the neighbourhood for a coffee or a slow lunch. The building itself, designed by architect Ammar Khammash, is modern and worth noting: a clean structure that sits on the hillside without overwhelming it.

Inside the center, the Nature Shop sells handmade crafts, food products, and natural goods produced by local cooperatives in Jordan's eight nature reserves. Revenue goes directly toward supporting those communities and the conservation work around them. The center also functions as a booking point for hikes and eco-lodge stays at Dana, Ajloun, Mujib, and the other RSCN reserves — worth knowing if you are planning time outside Amman.`,
    know: "Café open daily. Nature Shop hours may vary. RSCN reserve bookings can be arranged here.",
    tip: "The terrace at midday or late afternoon is one of the best coffee-priced views in Amman. Walk there from Rainbow Street.",
  },
  {
    name: "Rainbow Street & Jabal Amman",
    nameAr: "شارع الرينبو",
    neighborhood: "Jabal Amman",
    highlight: "Amman's most social neighbourhood — cafés, falafel, bookshops, and evening atmosphere",
    description: `Rainbow Street is the spine of Jabal Amman — the neighbourhood that climbs the first and second hills west of downtown, where Amman's creative workers, returning diaspora, and longstanding families live alongside each other. The street runs roughly between the first and third circles, and what happens along it and in the alleys branching from it is the closest thing Amman has to a shared public life.

In the morning it is breakfast at Al-Quds Falafel (since 1966) or coffee at Shams Al Balad before the Citadel terrace fills up. At lunch it is Sufra for a full traditional Jordanian meal in an old villa. In the evening it is Rumman Collective on a Friday, Books@Café on a late night, or Souk Jara spreading its stalls across the street on a summer Friday morning. The street also holds the Good Book Store, the Wild Jordan Center a short walk below, and Darat Al Funun at its edge in Weibdeh.

The Zowar experience runs through this neighbourhood — a self-guided food and puzzle walk that turns Rainbow Street into a route of discovery rather than a browsing strip. If you are going to spend a morning here, it is the most structured and rewarding way to do it. The walk covers 7 curated local stops over 3 to 4 hours, with food tastings and local knowledge built into the route.`,
    know: "Most alive Thursday evening through Friday. Souk Jara runs Friday mornings May–September.",
    tip: "Combine with Weibdeh — the two neighbourhoods are 10 minutes apart on foot and naturally complement each other.",
  },
  {
    name: "Jabal Al-Weibdeh",
    nameAr: "جبل اللويبدة",
    neighborhood: "Jabal Al-Weibdeh, Amman",
    highlight: "The quieter creative neighbour to Rainbow Street — galleries, cafés, studios",
    description: `Jabal Al-Weibdeh runs parallel to Jabal Amman and has a noticeably different character — quieter, more residential, with the kind of local institutions that take decades to form. The Arab Medical Society building, the French Cultural Centre, the Jordan National Gallery of Fine Arts, and a cluster of galleries and small cafés have made it Amman's de facto arts neighbourhood, though it wears that designation without much self-consciousness.

Rumi Café has been here since 2013, serving specialty coffee and house-made pastries on a shaded outdoor patio from 7am. Gilgamesh Art Cafe, opened in 2019 in a heritage house on a side street, has become one of the most popular creative spaces in the city — pottery painting, stained glass, kintsugi, and Japanese pottery workshops, all in a warm studio environment. Darat Al Funun sits at the edge of Weibdeh and Jabal Amman, and its programme draws the same audience that lives and works in both neighbourhoods.

It is worth planning an hour or two to walk the streets rather than arriving with a single destination in mind. The neighbourhood is small enough to cover on foot and textured enough to reward wandering — there are murals, a few good bookshops, residential lanes with bougainvillea climbing the stone walls, and the occasional café courtyard easy to miss without looking.`,
    know: "10-minute walk from Rainbow Street. Taxi from central Amman costs 2–3 JOD.",
    tip: "Rumi Café opens at 7am — a good early stop before both Weibdeh and Rainbow Street get busy.",
  },
  {
    name: "The Zowar Experience",
    nameAr: "تجربة زوار",
    neighborhood: "Rainbow Street, Jabal Amman",
    highlight: "A self-guided food and puzzle walk through the city's most iconic street",
    description: `Zowar is a self-guided food and puzzle walk through Rainbow Street and Jabal Amman — designed for anyone who wants to discover the city at their own pace, without a guide or a fixed schedule. Using your phone, you follow a series of clues and puzzles from one local stop to the next, with food tastings and surprises built into the route at select stops.

The experience runs for 3 to 4 hours and covers 7 curated stops across the neighbourhood — independent local businesses that you might not find on your own, with the kind of insider knowledge usually reserved for people who have been coming for years. Over 25 JOD in tastings and a Jordanian gift are included in the price. The experience is available in English and Arabic, Tuesday to Saturday.

It is designed to be done at any pace — some groups take the full morning, others move more quickly. If you are spending time on Rainbow Street anyway, which you should, the Zowar walk is the most rewarding way to structure it. The route starts and ends on the street, and most of the restaurants and cafés in this guide are within easy walking distance of the stops along the way.`,
    know: "25 JOD per person. Includes tastings and gifts. Available Tue–Sat. Book at zowar.net.",
    tip: "Tuesday to Thursday mornings are quieter than weekends. Go before 10am for the freshest food stops.",
  },
];

function AttractionCard({ item, index }: { item: Attraction; index: number }) {
  return (
    <section id={`attraction-${index + 1}`}>
      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-bold tabular-nums" style={{ color: "rgba(200,105,74,0.18)" }}>
          {String(index + 1).padStart(2, "0")}
        </span>
        <div>
          <h3 className="text-2xl font-semibold text-neutral-950">
            {item.name}
            <span className="ms-2 text-base font-normal text-neutral-400">{item.nameAr}</span>
          </h3>
          <p className="mt-0.5 text-sm text-neutral-500">{item.neighborhood}</p>
        </div>
      </div>

      <div className="mt-2 inline-block rounded-full bg-[#fef3ee] px-3 py-0.5 text-xs font-semibold text-[#c8694a]">
        {item.highlight}
      </div>

      <div className="mt-4 space-y-4">
        {item.description.split("\n\n").map((para, j) => (
          <p key={j} className="text-base leading-8 text-neutral-700">{para}</p>
        ))}
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-black/8 bg-white p-4">
          <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400">Good to know</p>
          <p className="text-sm leading-6 text-neutral-700">{item.know}</p>
        </div>
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
          <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-amber-600">Local tip</p>
          <p className="text-sm leading-6 text-amber-900">{item.tip}</p>
        </div>
      </div>
    </section>
  );
}

export default function ThingsToDoAmman() {
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
            <span className="text-neutral-700">Things to Do in Amman</span>
          </div>
        </div>

        <article className="mx-auto max-w-3xl px-6 py-14">
          <header className="mb-12">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#c8694a] bg-[#fef3ee] px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-[#c8694a]">
              Travel Guide · Amman, Jordan
            </div>
            <h1 className="text-3xl font-semibold leading-tight tracking-tight text-neutral-950 sm:text-4xl">
              Things to Do in Amman, Jordan
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-neutral-600">
              The Citadel and Roman Theatre, the Jordan Museum and Darat Al Funun,
              Rainbow Street and Weibdeh — a local guide to Amman&apos;s most
              rewarding places to spend time.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-neutral-400">
              <span>By Zowar · Amman, Jordan</span>
              <span>·</span>
              <span>16 min read</span>
              <span>·</span>
              <span>Updated 2026</span>
            </div>
          </header>

          <figure className="mb-10">
            <div className="relative h-72 w-full overflow-hidden rounded-3xl sm:h-96">
              <Image
                src="/images/blog/amman-city-panoramic.jpg"
                alt="Panoramic view of Amman's limestone hills and city skyline"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
                priority
              />
            </div>
            <figcaption className="mt-2 text-center text-xs text-neutral-400">Amman from above — a city built across hills, best understood by moving through it</figcaption>
          </figure>

          <section className="rounded-3xl border border-black/8 bg-white p-6 sm:p-8">
            <p className="text-base leading-8 text-neutral-700">
              Amman is a city that reveals itself slowly. The ancient ruins sit in the
              middle of a working downtown. The best café view is inside a conservation
              society building. The most famous falafel counter has no sign. This guide
              covers ten places worth understanding — from the hilltop archaeology that
              predates most of human history to the self-guided walk that turns Rainbow
              Street into a morning of discovery — plus a brief section on day trips for
              when the city is ready to expand into the rest of Jordan.
            </p>
          </section>

          <nav className="mt-8 rounded-2xl border border-black/8 bg-white p-5">
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">In this guide</p>
            <ol className="space-y-1.5 text-sm">
              {attractions.map((a, i) => (
                <li key={a.name} className="flex items-center gap-2">
                  <span className="text-xs font-bold tabular-nums text-[#c8694a]/40">{String(i + 1).padStart(2, "0")}</span>
                  <a href={`#attraction-${i + 1}`} className="text-neutral-700 hover:text-[#c8694a] transition">{a.name}</a>
                </li>
              ))}
            </ol>
          </nav>

          <figure className="mt-8">
            <div className="relative h-60 w-full overflow-hidden rounded-3xl sm:h-72">
              <Image
                src="/images/blog/downtown-amman-old-city.jpg"
                alt="Downtown Amman old city with limestone buildings and minarets"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
            <figcaption className="mt-2 text-center text-xs text-neutral-400">Al-Balad — Downtown Amman, the oldest part of the city</figcaption>
          </figure>

          <div className="mt-14 space-y-16">
            {attractions.map((item, i) => (
              <AttractionCard key={item.name} item={item} index={i} />
            ))}
          </div>

          {/* Day trips */}
          <section className="mt-16 rounded-3xl border border-black/8 bg-white p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-neutral-950">Day trips from Amman</h2>
            <p className="mt-3 text-sm leading-7 text-neutral-600">
              Amman is a natural base for exploring the rest of Jordan. Each of these
              destinations is worth a day or more of its own.
            </p>
            <ul className="mt-5 space-y-5 text-sm leading-7 text-neutral-700">
              {[
                ["Jerash", "45 min north", "The best-preserved Roman city in the Middle East — a colonnaded street, oval forum, and two theatres, still largely intact. Go on a weekday before 10am to have it to yourself."],
                ["Dead Sea", "1 hour west", "Float in water so salty you cannot sink, cover yourself in black mineral mud, and watch the Judean Hills from the water. Public beaches exist alongside the resort strip."],
                ["Ajloun", "1 hour north", "Ajloun Castle on a hilltop over olive groves, plus the Ajloun Forest Reserve for hiking and overnight stays in air-conditioned tents. Jordan's green north, often overlooked."],
                ["Petra", "3 hours south", "Jordan's most famous site — the rock-carved Nabataean city in a rose-red sandstone canyon. Plan a full day minimum; the Treasury is the entrance, not the destination."],
                ["Wadi Rum", "4 hours south", "Red desert with towering sandstone formations. Sleep with a Bedouin family under stars that look close enough to touch. A day trip is not enough — go for a night."],
              ].map(([place, distance, desc]) => (
                <li key={place} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c8694a]" />
                  <span>
                    <strong className="font-semibold text-neutral-900">{place}</strong>
                    <span className="ms-2 text-xs text-neutral-400">{distance}</span>
                    {" — "}{desc}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <figure className="mt-10">
            <div className="relative h-60 w-full overflow-hidden rounded-3xl sm:h-72">
              <Image
                src="/images/blog/amman-view-from-ruins.jpg"
                alt="View of Amman from ancient ruins, with limestone hillside buildings"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
            <figcaption className="mt-2 text-center text-xs text-neutral-400">Amman from the ruins — the city has been watched from this hill for 3,000 years</figcaption>
          </figure>

          <section className="mt-10 rounded-3xl border border-[#c8694a]/20 bg-[#fef3ee] p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c8694a]">Start on Rainbow Street</p>
            <h2 className="mt-2 text-xl font-semibold text-neutral-950">
              Discover Amman through the Zowar experience
            </h2>
            <p className="mt-3 text-sm leading-7 text-neutral-700">
              If Rainbow Street and Jabal Amman are on your list — and they should be —
              the Zowar experience is the most rewarding way to spend a morning there.
              A self-guided food and puzzle walk through 7 curated local stops, with
              over 25 JOD in tastings and a Jordanian gift included. No guide, no fixed
              schedule. Just the street, your phone, and a route designed to surprise you.
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
                Learn more
              </Link>
            </div>
          </section>

          <div className="mt-14 flex items-center justify-between border-t border-black/8 pt-8 text-sm text-neutral-500">
            <Link href="/blog" className="hover:text-neutral-800 transition">← All guides</Link>
            <Link href="/blog/best-restaurants-rainbow-street" className="hover:text-neutral-800 transition">Best restaurants on Rainbow Street →</Link>
          </div>
        </article>
      </div>
    </>
  );
}
