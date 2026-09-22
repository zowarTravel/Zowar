import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Things to Do in Amman – Local Experiences & Hidden Gems",
  description:
    "Hands-on local activities in Amman — pottery painting at Gilgamesh, free outdoor cinema at the Royal Film Commission, live music at Maestro, Souk Jara, Shatleh, Darat Al Funun, and the Zowar experience.",
  alternates: { canonical: "https://zowar.net/blog/things-to-do-amman-locals" },
  openGraph: {
    title: "Things to Do in Amman – Local Experiences & Hidden Gems",
    description:
      "The local side of Amman — pottery workshops, free outdoor cinema, live music, open-air markets, and a self-guided food walk through Rainbow Street.",
    url: "https://zowar.net/blog/things-to-do-amman-locals",
    images: [{ url: "/logo.png", width: 1200, height: 630 }],
  },
  keywords: [
    "things to do in Amman locals",
    "Amman local experiences",
    "Gilgamesh Art Cafe Amman",
    "Royal Film Commission Amman outdoor cinema",
    "Maestro Music House Amman",
    "Souk Jara Rainbow Street",
    "Darat Al Funun",
    "Shatleh Amman",
    "Zowar Amman",
    "Rainbow Street activities",
    "Amman hidden gems",
    "hands-on Amman",
    "Amman pottery workshop",
    "Amman free events",
    "local Amman guide",
  ],
};

const articleSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: "Things to Do in Amman – Local Experiences",
      description:
        "Hands-on and local activities in Amman — Gilgamesh pottery workshops, the Royal Film Commission outdoor cinema, Maestro Music House, Souk Jara, Shatleh, Darat Al Funun, and Zowar.",
      url: "https://zowar.net/blog/things-to-do-amman-locals",
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
      name: "Local Experiences in Amman",
      numberOfItems: 7,
      itemListElement: [
        { "@type": "ListItem", position: 1, item: { "@type": "TouristAttraction", name: "The Zowar Experience", description: "Self-guided food and puzzle walk through Rainbow Street. 7 stops, 3–4 hours, tastings included.", url: "https://zowar.net/experiences/rainbow-street" } },
        { "@type": "ListItem", position: 2, item: { "@type": "EntertainmentBusiness", name: "Gilgamesh Art Cafe", description: "Pottery painting, stained glass, kintsugi, and Japanese pottery workshops in a heritage house in Jabal Lweibdeh. All materials included.", address: { "@type": "PostalAddress", addressLocality: "Jabal Al-Weibdeh, Amman", addressCountry: "JO" } } },
        { "@type": "ListItem", position: 3, item: { "@type": "LocalBusiness", name: "Shatleh", description: "A plant experience where you choose and pot your own seedling to take home. A growing local favourite in Amman.", address: { "@type": "PostalAddress", addressLocality: "Amman", addressCountry: "JO" } } },
        { "@type": "ListItem", position: 4, item: { "@type": "MovieTheater", name: "Royal Film Commission – Outdoor Cinema", description: "Free outdoor film screenings in summer at an amphitheatre overlooking downtown Amman. Arabic, European, Japanese, Korean, and South American film weeks.", address: { "@type": "PostalAddress", streetAddress: "Omar Bin Al Khattab Street, 1st Circle", addressLocality: "Jabal Amman", addressCountry: "JO" } } },
        { "@type": "ListItem", position: 5, item: { "@type": "MusicVenue", name: "Maestro Music House", description: "Jordan's first dedicated live music venue in Jabal Lweibdeh. Weekly concerts and jam sessions in jazz, classical Arabic, folk, and experimental. Rooftop with 360° city views.", address: { "@type": "PostalAddress", addressLocality: "Jabal Al-Weibdeh, Amman", addressCountry: "JO" } } },
        { "@type": "ListItem", position: 6, item: { "@type": "Event", name: "Souk Jara", description: "Amman's beloved open-air Friday market on Rainbow Street, running May–September. Artisan jams, jewellery, ceramics, embroidery, live music.", address: { "@type": "PostalAddress", streetAddress: "Rainbow Street", addressLocality: "Jabal Amman", addressCountry: "JO" } } },
        { "@type": "ListItem", position: 7, item: { "@type": "Museum", name: "Darat Al Funun", description: "Contemporary Arab art in six 1920s buildings with Byzantine chapel ruins in the garden. Free entry. Regularly rotating exhibitions and events.", address: { "@type": "PostalAddress", addressLocality: "Jabal Al-Weibdeh, Amman", addressCountry: "JO" } } },
      ],
    },
  ],
};

type Activity = {
  name: string;
  nameAr: string;
  neighborhood: string;
  highlight: string;
  description: string;
  know: string;
  tip: string;
};

const activities: Activity[] = [
  {
    name: "The Zowar Experience",
    nameAr: "تجربة زوار",
    neighborhood: "Rainbow Street, Jabal Amman",
    highlight: "A self-guided food and puzzle walk through the city's most iconic street",
    description: `Zowar is a self-guided food and puzzle walk through Rainbow Street and Jabal Amman — designed for anyone who wants to experience the city beyond the surface, at their own pace and without a guide. Using your phone, you follow a series of clues and puzzles that lead you from one local stop to the next, with food tastings and surprises built into select stops along the route.

The experience runs for 3 to 4 hours and covers 7 curated stops — independent local businesses that reward the kind of attention most city visits don't allow time for. Over 25 JOD in tastings and a Jordanian gift are included in the price. It is available in English and Arabic, Tuesday to Saturday, and is designed to work for solo travellers, couples, families, and groups.

It is the kind of activity that works precisely because it is not passive. You are solving something, moving through the city, stopping to eat, talking to the people who run the places along the route. It is a morning that stays with you longer than a tour does.`,
    know: "25 JOD per person. Includes tastings and gifts. Available Tue–Sat. Book at zowar.net/booking.",
    tip: "Weekday mornings are quieter than Fridays. Start before 10am to get the freshest food at the early stops.",
  },
  {
    name: "Gilgamesh Art Cafe",
    nameAr: "جلجامش",
    neighborhood: "Jabal Al-Weibdeh, Amman",
    highlight: "Paint your own pottery piece — they fire it in the kiln. Also stained glass, kintsugi, and Japanese clay",
    description: `Gilgamesh Art Cafe opened in 2019 in a heritage house in Jabal Lweibdeh and has become one of the most popular creative spaces in Amman — the kind of place locals come back to with a different friend each time, because there is always another workshop to try. The setup is a working art studio that also serves food and drinks, with a warm and unhurried atmosphere that makes it easy to spend three hours without noticing.

The workshop menu is wide. Pottery painting is the most popular option: you choose a pre-made ceramic piece, paint it with your own design or pattern, and the studio fires it in the kiln for you — usually ready for collection within a few days, or available to be shipped. Beyond that, there is stained glass (cutting, foiling, and soldering), kintsugi (the Japanese art of repairing broken ceramics with gold), and Japanese kurinuki pottery (carving a vessel from a solid block of clay by hand). Each workshop includes all materials, tools, and a break with tea, juice, and pastries.

No prior experience is needed for any of the workshops, and the instructors are patient with beginners. It is one of the few places in Amman where the activity itself is the point rather than incidental to a meal or a venue.`,
    know: "Workshops include all materials and a refreshment break. Book in advance via gilgameshartcafe.com — sessions fill up.",
    tip: "The pottery painting kiln firing takes a few days — plan accordingly if you want to take your piece home with you.",
  },
  {
    name: "Shatleh",
    nameAr: "شتلة",
    neighborhood: "Amman",
    highlight: "Choose and pot your own plant or seedling to take home",
    description: `Shatleh — the name simply means seedling in Arabic — is one of those local places that spreads by word of mouth rather than advertising. The concept is straightforward: you come, you browse a selection of plants and seedlings, you choose one, and you pot it yourself to take home. It is tactile, unhurried, and the kind of experience that is harder to find in a city than it should be.

It is the sort of place that has been finding an audience among Ammani families, couples, and anyone who wants to do something with their hands that is not a screen. The seedlings range from herbs and small houseplants to seasonal and native varieties. The process of choosing, potting, and carrying something living out of a place is more satisfying than it sounds before you have done it.

Part of what makes Shatleh worth including in any list of genuinely local things to do in Amman is that it exists entirely outside the tourism infrastructure. There is no website, no English-language review trail, no tour operator including it in a package. It is simply somewhere locals go, and have started recommending.`,
    know: "A local, independently run space. Check their Instagram for current hours and availability.",
    tip: "Go with enough time to browse and choose properly — it is not the kind of place to rush through.",
  },
  {
    name: "Royal Film Commission – Outdoor Cinema",
    nameAr: "هيئة الأفلام الملكية",
    neighborhood: "1st Circle, Jabal Amman (off Rainbow Street)",
    highlight: "Free outdoor film screenings all summer — Arabic, European, Korean, Japanese cinema",
    description: `The Royal Film Commission of Jordan was established in 2003 to promote film culture in the country, and it operates from a historic building — the Mango House — on a hillside near the first circle, a short walk from Rainbow Street. In summer, the open-air amphitheatre at the back of the building hosts free public film screenings on a programme that runs through the warmer months, with the city spread below and the Citadel visible in the distance.

The programming is genuinely varied. The RFC runs themed weeks dedicated to Arabic cinema, European films, Japanese cinema, Korean films, South American cinema, and documentary programmes. Films are shown with subtitles, admission is free, and the setting — 250 seats in an outdoor amphitheatre overlooking downtown Amman — is one of the most atmospheric places to watch a film anywhere in the city. In winter, screenings move indoors to the nearby Rainbow Theatre.

It is the kind of cultural programme that Ammanis talk about but visitors rarely encounter unless someone tells them it exists. The schedule changes by season, so checking ahead is worth doing — but on a summer evening, finding yourself in the outdoor amphitheatre with a good film and the city lights below is one of the better things you can do in Amman for free.`,
    know: "Free entry. Outdoor screenings run May–October at the RFC amphitheatre. Indoor screenings at Rainbow Theatre in winter.",
    tip: "Check the RFC schedule in advance — specific film weeks have their own dates and it is worth planning around one.",
  },
  {
    name: "Maestro Music House",
    nameAr: "مايسترو",
    neighborhood: "Jabal Al-Weibdeh, Amman",
    highlight: "Jordan's first dedicated live music venue — weekly concerts, rooftop, opened 2015",
    description: `Maestro Music House opened in 2015 in the creative neighbourhood of Jabal Lweibdeh and holds a distinction that still applies: it is Jordan's first dedicated live music venue. In a city where most music happens in restaurants or hotel bars as a side offering, Maestro was built around the idea that live performance should be the main event — and that commitment has shaped what it has become.

The weekly programme covers a wide range of genres: jazz, classical Arabic music, folk, experimental, and regional acts from across the Levant and beyond. Jam sessions run alongside scheduled concerts, which means the music on any given night can be as structured or as spontaneous as the evening calls for. The venue is connected to La Locanda boutique hotel, whose 21 rooms are each named for a famous Arab musician — a gesture that sets the tone for what the whole building is trying to do.

The physical space adds to it. Maestro has a lush outdoor garden and a rooftop with 360° views across Amman — genuinely one of the better viewpoints in the city, especially at night when the hills are lit and the city feels smaller and more legible than it does from street level. The food and drinks menu is taken seriously. It is a full evening destination rather than a quick stop.`,
    know: "Weekly concerts and jam sessions. Check maestroamman.com for the current schedule and ticket prices.",
    tip: "The rooftop is worth arriving early for — it fills up before the main act. Check the programme a few days in advance.",
  },
  {
    name: "Souk Jara",
    nameAr: "سوق جارة",
    neighborhood: "Rainbow Street, Jabal Amman",
    highlight: "Amman's beloved open-air Friday market — May to September, every week",
    description: `Souk Jara started over a decade ago in collaboration with the Greater Amman Municipality and has become one of those annual fixtures that Ammanis genuinely look forward to — the arrival of the market is as much a signal of summer as the heat. Every Friday from May to September, Rainbow Street and the surrounding area transform into an open-air bazaar running from 10am to 10pm, with stalls spread along the pavement and into the alleyways.

The vendors are mostly local makers, artists, and small producers: handmade jewellery, embroidered cushions and clothing, ceramic pottery, paintings, spice blends, homemade jams, artisan honey, hand-poured candles, and natural soaps. The quality varies from stall to stall, but the range is consistently interesting, and the prices reflect the fact that you are buying directly from the person who made the thing.

The atmosphere is as much the point as the market itself. There is usually live music somewhere along the street, families taking their Friday morning walk through the stalls, and the regular Rainbow Street cafés staying open late to catch the crowd. It is the version of the neighbourhood that feels most alive — the one that reminds you that Amman has a very particular social culture, and that it tends to happen outside.`,
    know: "Free entry. Every Friday May–September, 10am–10pm, on Rainbow Street and surrounding streets.",
    tip: "Go in the morning when the stalls are freshest and the street is not yet crowded. Return in the evening for the atmosphere.",
  },
  {
    name: "Darat Al Funun",
    nameAr: "دارة الفنون",
    neighborhood: "Jabal Al-Weibdeh, Amman",
    highlight: "Free contemporary Arab art in six 1920s buildings — with Byzantine ruins in the garden",
    description: `Darat Al Funun has been one of the most important cultural institutions in Jordan since it opened in 1993. The complex occupies six historic buildings on a hillside in Jabal Lweibdeh — built in the 1920s from the same honey-coloured limestone as everything else in the neighbourhood — with an excavated Byzantine chapel in the garden and views across a wadi toward downtown. It is the kind of place that surprises you, because nothing about the approach prepares you for what is inside.

The programming is what sets Darat apart from a static museum. Alongside the permanent Khalid Shoman Collection of contemporary Arab art, there are rotating exhibitions from regional and international artists, an artist residency programme, film screenings, concerts, public talks, and educational events. The calendar is dense with things worth attending, and the events are typically free alongside the exhibitions.

For anyone doing any amount of time in Weibdeh or Jabal Amman, Darat Al Funun is a natural stop. But it is also worth visiting specifically — particularly in the evening, when events bring a crowd and the combination of old buildings, garden ruins, and new art feels like a genuinely Ammani way to spend a few hours.`,
    know: "Free entry. Open Sat–Thu 10am–7pm. Closed Fridays and the month of August.",
    tip: "Check daratalfunun.org for the events calendar — film nights and concerts are often the best reason to visit.",
  },
];

function ActivityCard({ item, index }: { item: Activity; index: number }) {
  return (
    <section id={`activity-${index + 1}`}>
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

export default function ThingsToDoAmmanLocals() {
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
            <span className="text-neutral-700">Local Experiences in Amman</span>
          </div>
        </div>

        <article className="mx-auto max-w-3xl px-6 py-14">
          <header className="mb-12">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#c8694a] bg-[#fef3ee] px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-[#c8694a]">
              Local Guide · Amman, Jordan
            </div>
            <h1 className="text-3xl font-semibold leading-tight tracking-tight text-neutral-950 sm:text-4xl">
              Things to Do in Amman – Local Experiences
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-neutral-600">
              Pottery workshops where they fire your piece in a kiln. Free outdoor
              cinema above the city. Live music in a heritage house. A Friday market
              that transforms Rainbow Street every summer. The side of Amman that
              locals come back to.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-neutral-400">
              <span>By Zowar · Amman, Jordan</span>
              <span>·</span>
              <span>12 min read</span>
              <span>·</span>
              <span>Updated 2026</span>
            </div>
          </header>

          <figure className="mb-10">
            <div className="relative h-72 w-full overflow-hidden rounded-3xl sm:h-96">
              <Image
                src="/images/blog/amman-colourful-mural.jpg"
                alt="Colourful street mural in Amman's Weibdeh neighbourhood"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
                priority
              />
            </div>
            <figcaption className="mt-2 text-center text-xs text-neutral-400">Weibdeh — where most of the local creative scene in Amman has settled</figcaption>
          </figure>

          <section className="rounded-3xl border border-black/8 bg-white p-6 sm:p-8">
            <p className="text-base leading-8 text-neutral-700">
              The best things to do in Amman are often the ones that nobody put in a
              brochure. Free outdoor cinema overlooking the old city. A workshop where
              you make something with your hands and leave with it. A Friday market
              that Ammani families have been going to for over a decade. This guide
              covers seven of the local experiences worth knowing — the kind that
              residents recommend to each other rather than to tourists, and that make
              the city feel like more than a list of monuments.
            </p>
          </section>

          <nav className="mt-8 rounded-2xl border border-black/8 bg-white p-5">
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">In this guide</p>
            <ol className="space-y-1.5 text-sm">
              {activities.map((a, i) => (
                <li key={a.name} className="flex items-center gap-2">
                  <span className="text-xs font-bold tabular-nums text-[#c8694a]/40">{String(i + 1).padStart(2, "0")}</span>
                  <a href={`#activity-${i + 1}`} className="text-neutral-700 hover:text-[#c8694a] transition">{a.name}</a>
                </li>
              ))}
            </ol>
          </nav>

          <figure className="mt-8">
            <div className="relative h-60 w-full overflow-hidden rounded-3xl sm:h-72">
              <Image
                src="/images/blog/traditional-handmade-pottery.JPEG"
                alt="Traditional handmade pottery workshop in Amman"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
            <figcaption className="mt-2 text-center text-xs text-neutral-400">Pottery at Gilgamesh — paint your piece, they fire it in the kiln</figcaption>
          </figure>

          <div className="mt-14 space-y-16">
            {activities.map((item, i) => (
              <ActivityCard key={item.name} item={item} index={i} />
            ))}
          </div>

          {/* Outdoor section */}
          <section className="mt-16 rounded-3xl border border-black/8 bg-white p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-neutral-950">If you want to get out of the city</h2>
            <p className="mt-3 text-sm leading-7 text-neutral-600">
              Each of these deserves its own guide — but here is the short version for
              when Amman is ready to expand.
            </p>
            <ul className="mt-5 space-y-5 text-sm leading-7 text-neutral-700">
              {[
                ["Dana Biosphere Reserve", "3 hrs south", "Jordan's largest nature reserve, spanning cliff highlands down to desert. The best hiking in the country. Eco-lodges run by local communities. Go before Petra."],
                ["Wadi Mujib", "2 hrs south", "Jordan's Grand Canyon. The Siq Trail is a 2km wade through a narrow gorge to a waterfall. April–October only. Book in advance through RSCN. 45 JOD per person."],
                ["Ajloun Forest Reserve", "1 hr north", "Pine and oak forest with marked hiking trails, Bedouin coffee at the trailhead, and overnight tented stays. Jordan's green north, and significantly less visited than the south."],
                ["Dead Sea", "1 hr west", "Float in water you cannot sink in, cover yourself in black mineral mud, and watch the sun set over the Judean Hills. Public beaches exist alongside the resort strip."],
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
                src="/images/blog/amman-stamp-mural.JPEG"
                alt="Amman city stamp mural street art"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
            <figcaption className="mt-2 text-center text-xs text-neutral-400">Amman street art — the city expresses itself in the places between the landmarks</figcaption>
          </figure>

          <section className="mt-10 rounded-3xl border border-[#c8694a]/20 bg-[#fef3ee] p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c8694a]">Start on Rainbow Street</p>
            <h2 className="mt-2 text-xl font-semibold text-neutral-950">
              The Zowar experience — discover the city at your own pace
            </h2>
            <p className="mt-3 text-sm leading-7 text-neutral-700">
              Zowar is a self-guided food and puzzle walk through Rainbow Street and
              Jabal Amman. Follow clues at your own pace, stop at 7 curated local
              spots, taste Jordanian food, and piece together a side of the city most
              visitors walk past. Over 25 JOD in tastings and gifts included. No guide,
              no group, no fixed schedule.
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
                How it works
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
