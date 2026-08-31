import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Best Breakfast Places in Amman, Jordan – Local Guide 2026",
  description:
    "The complete guide to breakfast in Amman — traditional spots like Al-Quds Falafel, Abu Jbara and Khashoka, plus modern takes at Shams Al Balad, Rumman Collective, Rumi Café and Blue Fig.",
  alternates: { canonical: "https://zowar.net/blog/best-breakfast-amman" },
  openGraph: {
    title: "Best Breakfast Places in Amman, Jordan – Local Guide 2026",
    description:
      "From a falafel counter open since 1966 to a terrace overlooking the Citadel — the definitive guide to breakfast in Amman.",
    url: "https://zowar.net/blog/best-breakfast-amman",
    images: [{ url: "/logo.png", width: 1200, height: 630 }],
  },
  keywords: [
    "best breakfast Amman",
    "breakfast Jordan",
    "Al-Quds Falafel",
    "Abu Jbara Amman",
    "Khashoka Amman",
    "Shams Al Balad Amman",
    "Blue Fig Amman",
    "Rumi Cafe Amman",
    "Rumman Collective",
    "falafel Rainbow Street",
    "hummus Amman",
    "traditional Jordanian breakfast",
    "modern breakfast Amman",
    "Rainbow Street food",
    "Jordan travel food guide",
    "Amman food tour",
  ],
};

const articleSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: "Best Breakfast Places in Amman, Jordan",
      description:
        "A local guide to breakfast in Amman — from traditional institutions like Al-Quds Falafel and Khashoka to modern takes at Shams Al Balad, Rumi Café, and Blue Fig.",
      url: "https://zowar.net/blog/best-breakfast-amman",
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
        "best breakfast Amman, breakfast Jordan, Al-Quds Falafel, Abu Jbara, Khashoka, Shams Al Balad, Blue Fig, Rumi Cafe, falafel Rainbow Street, traditional Jordanian breakfast",
      about: [
        { "@type": "City", name: "Amman" },
        { "@type": "Country", name: "Jordan" },
      ],
    },
    {
      "@type": "ItemList",
      name: "Traditional Breakfast Places in Amman",
      numberOfItems: 5,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          item: {
            "@type": "Restaurant",
            name: "Al-Quds Falafel",
            description: "Amman's most iconic falafel counter, open since 1966 on Rainbow Street. Takeout only — crispy falafel in French bread, visited by Jordan's royal family.",
            address: { "@type": "PostalAddress", streetAddress: "Rainbow Street", addressLocality: "Amman", addressCountry: "JO" },
            servesCuisine: "Jordanian",
            priceRange: "$",
          },
        },
        {
          "@type": "ListItem",
          position: 2,
          item: {
            "@type": "Restaurant",
            name: "Abu Jbara Restaurant",
            description: "A beloved Amman breakfast institution with three branches, known for hummus, ful medames, fatteh, and falafel. Some locations open 24 hours.",
            address: { "@type": "PostalAddress", addressLocality: "Amman", addressCountry: "JO" },
            servesCuisine: "Jordanian",
            priceRange: "$$",
          },
        },
        {
          "@type": "ListItem",
          position: 3,
          item: {
            "@type": "Restaurant",
            name: "Khashoka",
            description: "A rustic Jordanian breakfast restaurant — the name means spoon in Turkish — known for Chicken Liver Qalaya, Shakshouka, and a hearty full spread.",
            address: { "@type": "PostalAddress", addressLocality: "Amman", addressCountry: "JO" },
            servesCuisine: "Jordanian, Arabic",
            priceRange: "$$",
          },
        },
        {
          "@type": "ListItem",
          position: 4,
          item: {
            "@type": "Restaurant",
            name: "Abu Mahjoud",
            description: "A classic downtown Amman breakfast spot beloved by locals for ful medames, hummus, and traditional Jordanian morning plates.",
            address: { "@type": "PostalAddress", addressLocality: "Amman", addressCountry: "JO" },
            servesCuisine: "Jordanian",
            priceRange: "$",
          },
        },
        {
          "@type": "ListItem",
          position: 5,
          item: {
            "@type": "Restaurant",
            name: "Asma Kitchen",
            description: "An intimate home-style Jordanian restaurant with just a few tables, serving traditional dishes to a largely local crowd.",
            address: { "@type": "PostalAddress", addressLocality: "Amman", addressCountry: "JO" },
            servesCuisine: "Jordanian",
            priceRange: "$",
          },
        },
      ],
    },
    {
      "@type": "ItemList",
      name: "Modern Breakfast Places in Amman",
      numberOfItems: 4,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          item: {
            "@type": "Restaurant",
            name: "Shams Al Balad",
            description: "A Rainbow Street institution that started as a flower shop and became one of Amman's most celebrated breakfast spots — featured on the World's 50 Best Discovery list.",
            url: "https://www.theworlds50best.com/discovery/Establishments/Jordan/Amman/Shams-El-Balad.html",
            address: { "@type": "PostalAddress", streetAddress: "Rainbow Street", addressLocality: "Amman", addressCountry: "JO" },
            servesCuisine: "Jordanian, Mediterranean",
            priceRange: "$$",
          },
        },
        {
          "@type": "ListItem",
          position: 2,
          item: {
            "@type": "Restaurant",
            name: "Rumman Collective",
            description: "A cultural collective and weekend brunch destination on Rainbow Street with Mediterranean and Arab flavours, garden seating, and a curated design showroom.",
            url: "https://www.rummancollective.com/",
            address: { "@type": "PostalAddress", streetAddress: "Rainbow Street", addressLocality: "Amman", addressCountry: "JO" },
            servesCuisine: "Jordanian, Mediterranean",
            priceRange: "$$",
          },
        },
        {
          "@type": "ListItem",
          position: 3,
          item: {
            "@type": "CafeOrCoffeeShop",
            name: "Rumi Café",
            description: "A beloved neighbourhood café in Jabal Al-Weibdeh open since 2013, known for specialty coffee, house-made orange cake, and a relaxed outdoor patio.",
            url: "https://www.rumijordan.com/",
            address: { "@type": "PostalAddress", streetAddress: "Kulliyat Al Shareaa Street 14", addressLocality: "Jabal Al-Weibdeh, Amman", addressCountry: "JO" },
            servesCuisine: "Cafe, International",
            priceRange: "$$",
          },
        },
        {
          "@type": "ListItem",
          position: 4,
          item: {
            "@type": "Restaurant",
            name: "Blue Fig",
            description: "A Abdoun institution with an international menu, known for avocado toast, French toast, and a spacious outdoor terrace.",
            address: { "@type": "PostalAddress", streetAddress: "Abdoun", addressLocality: "Amman", addressCountry: "JO" },
            servesCuisine: "International, Mediterranean",
            priceRange: "$$",
          },
        },
      ],
    },
  ],
};

type Place = {
  name: string;
  nameAr: string;
  neighborhood: string;
  highlight: string;
  description: string;
  order: string;
  tip: string;
};

const traditional: Place[] = [
  {
    name: "Al-Quds Falafel",
    nameAr: "فلافل القدس",
    neighborhood: "Rainbow Street, Jabal Amman",
    highlight: "Amman's most iconic falafel counter since 1966",
    description: `Al-Quds means Jerusalem in Arabic — and that is exactly where the founder of this small counter originally came from. Since opening in 1966, Al-Quds Falafel has become one of the most recognized breakfast stops in Amman, and arguably the most famous falafel stand on Rainbow Street.

The setup is deliberately simple: a small counter, no seating, takeout only. The falafel comes out hot, deeply crispy on the outside, and vivid green inside from the fresh herbs. It is served stuffed into French bread with tomatoes, parsley, pickled vegetables, and a drizzle of tahini. That is the entire menu, and it is all you need.

What sets Al-Quds apart is not just the age of the place but who it draws. His Majesty King Abdullah and members of the royal family have stopped here for breakfast — something the neighbourhood still talks about. Ranked among the top 50 restaurants in Amman on Tripadvisor, with a 4.5 rating across thousands of reviews, it has earned its reputation the old-fashioned way.`,
    order: "One thing only: the falafel sandwich. Get it fresh out of the fryer.",
    tip: "The first batch of the morning is the best. Go before 9 AM — it sells out.",
  },
  {
    name: "Abu Jbara",
    nameAr: "أبو جبارة",
    neighborhood: "Multiple branches — Madina al Muawara Street, Gardens Street, Mecca Street",
    highlight: "The full Jordanian breakfast spread, done properly",
    description: `Abu Jbara has been one of Amman's most dependable breakfast names since it opened in 2006, and it now has three official branches across the city. The restaurant is known for one thing above all else: giving you the complete Jordanian breakfast experience, all at once, at a table that fills up fast.

The spread here covers everything a traditional Jordanian morning includes — hummus topped with olive oil, ful medames slow-cooked and fragrant, fatteh layered with bread and yoghurt and chickpeas, crispy falafel made fresh, and warm Arabic bread arriving constantly from the kitchen. Salads, olives, and tea round it out.

A full breakfast for two costs just a few dinars, which is part of why the place draws such a loyal crowd of locals, tourists, and everyone in between. At least one branch is open 24 hours, making Abu Jbara a useful option for late arrivals or early risers who cannot wait until regular breakfast hours.`,
    order: "The full breakfast spread — hummus, ful, fatteh, falafel, and fresh bread.",
    tip: "One location is open 24 hours. Weekday mornings are quieter than weekends.",
  },
  {
    name: "Khashoka",
    nameAr: "خشوقة",
    neighborhood: "Abdoun and multiple locations, Amman",
    highlight: "Rustic, hearty, and unapologetically Jordanian",
    description: `The name Khashoka comes from the Turkish word for spoon — and that tells you something about the restaurant's approach. This is food designed to be eaten from a deep dish, slowly, with good bread on the side.

Khashoka is a rustic Arabic breakfast restaurant that has expanded well beyond Amman, with locations now in Aqaba and even a flagship in the United States, in Richardson, Texas. But the original spirit is firmly rooted in Jordan — a place where families come to eat properly and get their hands a little messy.

The standout dishes are the Chicken Liver Qalaya, cooked down with spices in a cast iron pan until it is rich and slightly charred at the edges, and the Shakshouka Qalaya, eggs poached in a spiced tomato sauce that arrives still bubbling. The menu also covers hummus, cheese and za'atar pastries, foul, falafel, and a full range of traditional morning items. Khashoka opens at 8 AM and stays open until midnight.`,
    order: "Chicken Liver Qalaya or Shakshouka Qalaya. Add the Cheese and Za'atar Pie.",
    tip: "Popular with families on weekends. A weekday morning visit is more relaxed.",
  },
  {
    name: "Abu Mahjoud",
    nameAr: "أبو محجوب",
    neighborhood: "Downtown Amman",
    highlight: "The neighbourhood's best-kept morning secret",
    description: `Abu Mahjoud sits in the older part of Amman where breakfast has been a serious business for generations. This is not a restaurant that needs to advertise — its regulars find it by habit, and visitors find it by asking around. The crowd tells you everything: taxi drivers, shopkeepers, students, the occasional traveller who wandered off the tourist trail.

The menu is rooted in tradition. Ful medames simmered long and finished with olive oil. Hummus made fresh, smooth and properly thick. Boiled eggs, flatbread, olives. The kind of breakfast that costs almost nothing and stays with you all morning.

What Abu Mahjoud offers that few restaurants can replicate is the sense that you are eating exactly where and how Ammani people have always eaten — without any performance of it. No branding, no Instagram lighting. Just good food, fast service, and a room full of people who have been coming for years.`,
    order: "Ful medames with olive oil, hummus, boiled eggs, and fresh bread.",
    tip: "Arrive before 9 AM for a seat. Cash only — prices are low.",
  },
  {
    name: "Asma Kitchen",
    nameAr: "مطبخ أسمى",
    neighborhood: "Downtown Amman",
    highlight: "A living-room restaurant — two tables, one kitchen, all local",
    description: `Asma Kitchen is the kind of place that does not advertise itself because it does not need to. The setup is simple: two tables, a small kitchen, and a menu of traditional Jordanian food cooked by someone who clearly knows what they are doing. It has been described as a living-room restaurant, and that description is accurate — the intimacy is real, the portion sizes are generous, and the crowd is almost entirely local.

In a city where many breakfast spots have been smoothed out for broader appeal, Asma Kitchen stays deliberately small and deliberate. The food is rooted in what a Jordanian home kitchen would produce: ful medames made properly, hummus that has clearly been blended fresh, warm bread, eggs cooked to order. The kind of breakfast that feels like it was made for you specifically, because in a room with two tables, it was.

The limited seating means it never feels crowded, but it also means you cannot always get a table without arriving early or accepting a wait. Most regulars consider that a worthwhile trade.`,
    order: "Whatever they are making that morning. Ask what is fresh.",
    tip: "Cash only. Two tables means limited space — go early or expect to wait.",
  },
];

const modern: Place[] = [
  {
    name: "Shams Al Balad",
    nameAr: "شمس البلد",
    neighborhood: "Rainbow Street, Jabal Amman",
    highlight: "From a flower shop to one of Amman's most celebrated breakfast spots",
    description: `Shams Al Balad began as a small flower shop with a focus on design and sustainability. It evolved gradually — first into a café, then into a full-service restaurant — driven by a kitchen that was doing something genuinely different: serving breakfast dishes that had rarely been seen outside Jordanian home kitchens, made with organic, seasonal ingredients sourced directly from local producers.

Today it is one of the most recognisable names in Amman's food scene, listed on the World's 50 Best Discovery — a distinction that places it alongside the most interesting independent restaurants in the world. The terrace, which overlooks the Citadel and the Umayyad Palace across the valley, is one of the finest breakfast settings in the city.

The menu reads like a love letter to Jordanian home cooking, reframed carefully. Foul with a twist, labneh kurat rolled in herbs, parsley ljjeh (a frittata of parsley, onion and sumac), makdous, taboun bread baked in-house, and Yemeni coffee sourced directly from origin. It is traditional in its ingredients and respect for the food, but intentional in every detail.`,
    order: "The parsley ljjeh, labneh kurat, and a pot of the Yemeni coffee. Sit on the terrace.",
    tip: "Book ahead for weekend mornings — the terrace fills up. One of the few breakfast spots in Amman where a reservation makes sense.",
  },
  {
    name: "Rumman Collective",
    nameAr: "رمان كوليكتيف",
    neighborhood: "Rainbow Street, Jabal Amman",
    highlight: "Weekend brunch in a cultural space with a garden courtyard",
    description: `Rumman means pomegranate in Arabic, and the collective carries that character throughout — warm, layered, full of unexpected texture. The entrance is marked by lemon and pomegranate trees, the interior has high ceilings and an eclectic mix of regional crafts and curated design objects, and the outdoor seating on the balcony looks over a green courtyard that makes it feel removed from the street outside.

Rumman is not just a restaurant. It is a social and cultural space: part showroom, part gathering point, part kitchen. The food leans into Mediterranean and Arab flavours with a seasonal and considered approach. Weekend brunch — running Saturday and Sunday from 10 AM to 2 PM — is the main food draw, with a spread that has included Syrian-style breakfast dishes and a menu that shifts with the season.

It is also recommended by Royal Jordanian as part of their sustainable and community-focused destinations in Amman, which reflects the collective's broader purpose: connecting local ingredients, crafts, and storytelling in a way that goes beyond a meal.`,
    order: "The weekend brunch spread on Saturday or Sunday. Arrive closer to opening for the best table.",
    tip: "Weekday visits are possible for coffee and lighter plates, but the brunch is the reason to come.",
  },
  {
    name: "Rumi Café",
    nameAr: "كافيه رومي",
    neighborhood: "Kulliyat Al Shareaa Street, Jabal Al-Weibdeh",
    highlight: "Weibdeh's best specialty coffee, open since 2013",
    description: `Rumi Café sits quietly on a side street in Jabal Al-Weibdeh, the creative neighbourhood that runs parallel to Rainbow Street, and it has been one of the most consistently loved spots in Amman since it opened in 2013. The name is a nod to the 13th-century poet — and the café carries something of that spirit: unhurried, thoughtful, worth sitting in for a while.

The interior is clean and considered — white tiles, natural wood, floor-to-ceiling windows that open onto a shaded outdoor patio. On a good morning, you take your coffee outside, the city is still quiet, and it is one of the more pleasant ways to start a day in Amman.

Rumi is not a traditional breakfast spread restaurant. The specialty coffee is the draw — single-origin, well-prepared, with Arabic and Turkish options alongside espresso-based drinks. The kitchen produces its own pastries: the orange cake and banana bread have become house signatures. Sandwiches and lighter plates fill out the menu. Opens at 7 AM.`,
    order: "A specialty coffee — Arabic or Turkish — and the orange cake or banana bread.",
    tip: "The outdoor patio is the best seat on a cool morning. Gets busier from 9 AM onwards.",
  },
  {
    name: "Blue Fig",
    nameAr: "بلو فيج",
    neighborhood: "Abdoun, West Amman",
    highlight: "The Abdoun institution — international menu, outdoor terrace",
    description: `Blue Fig has been a fixture of the Abdoun social scene long enough to have become something of an institution — the kind of place that Ammani families return to for weekend mornings without much deliberation, because they know what they are getting and they know it will be good.

The menu does not try to be traditionally Jordanian. It goes in the opposite direction: avocado toast, French toast, eggs in various formats, pancakes, and a wider international menu that pulls from Mediterranean, Greek, and Italian influences. There is also a range of lighter options including quinoa salads and vegetarian plates. The result is a breakfast that appeals equally to people who grew up in Amman and people visiting for the first time.

The outdoor terrace is the main draw — spacious, well-shaded, and set back enough from the street to feel comfortable. The coffee is good and the service is practiced. Blue Fig is not the place to come for a deeply local Jordanian morning, but it is a very reliable place to come for a pleasant one.`,
    order: "Avocado toast or French toast. Sit outside.",
    tip: "Busy on Friday and Saturday mornings. Arrive before 10 AM for the best outdoor table.",
  },
];

function PlaceCard({ place, index, accent }: { place: Place; index: number; accent: string }) {
  return (
    <section id={`place-${accent}-${index + 1}`}>
      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-bold tabular-nums" style={{ color: "rgba(200,105,74,0.18)" }}>
          {String(index + 1).padStart(2, "0")}
        </span>
        <div>
          <h3 className="text-2xl font-semibold text-neutral-950">
            {place.name}
            <span className="ms-2 text-base font-normal text-neutral-400">{place.nameAr}</span>
          </h3>
          <p className="mt-0.5 text-sm text-neutral-500">{place.neighborhood}</p>
        </div>
      </div>

      <div className="mt-2 inline-block rounded-full bg-z-orange-soft px-3 py-0.5 text-xs font-semibold text-[#c8694a]">
        {place.highlight}
      </div>

      <div className="mt-4 space-y-4">
        {place.description.split("\n\n").map((para, j) => (
          <p key={j} className="text-base leading-8 text-neutral-700">{para}</p>
        ))}
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-black/8 bg-white p-4">
          <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400">What to order</p>
          <p className="text-sm leading-6 text-neutral-700">{place.order}</p>
        </div>
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
          <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-amber-600">Local tip</p>
          <p className="text-sm leading-6 text-amber-900">{place.tip}</p>
        </div>
      </div>
    </section>
  );
}

export default function BestBreakfastAmman() {
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
            <span className="text-neutral-700">Best Breakfast in Amman</span>
          </div>
        </div>

        <article className="mx-auto max-w-3xl px-6 py-14">
          {/* Header */}
          <header className="mb-12">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-z-orange bg-z-orange-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-[#c8694a]">
              Food Guide · Amman, Jordan
            </div>
            <h1 className="text-3xl font-semibold leading-tight tracking-tight text-neutral-950 sm:text-4xl">
              Best Breakfast Places in Amman, Jordan
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-neutral-600">
              From falafel counters that have been feeding the city since 1966 to
              terraces overlooking the Citadel — a local guide to breakfast in Amman,
              split between the traditional and the modern.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-neutral-400">
              <span>By Zowar · Amman, Jordan</span>
              <span>·</span>
              <span>14 min read</span>
              <span>·</span>
              <span>Updated 2026</span>
            </div>
          </header>

          {/* Hero image */}
          <figure className="mb-10">
            <div className="relative h-72 w-full overflow-hidden rounded-3xl sm:h-96">
              <Image
                src="/images/blog/amman-traditional-cafe-interior.jpg"
                alt="Traditional café interior on Rainbow Street Amman with colourful cushions and city view"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
                priority
              />
            </div>
            <figcaption className="mt-2 text-center text-xs text-neutral-400">A Rainbow Street café — where breakfast can last as long as you want it to</figcaption>
          </figure>

          {/* Intro */}
          <section className="rounded-3xl border border-black/8 bg-white p-6 sm:p-8">
            <p className="text-base leading-8 text-neutral-700">
              Breakfast in Jordan is not a light meal. It is traditionally the largest
              and most communal eating occasion of the day — a table covered in hummus,
              ful medames, falafel, labneh, olive oil, za&apos;atar, eggs, tomatoes,
              olives, and warm bread, with tea poured continuously. In Amman, that
              tradition is kept alive by a handful of places that have been doing it for
              decades. Alongside them, a newer generation of spots has found its own
              language — still rooted in local ingredients, but more deliberate in
              presentation and setting. This guide covers both.
            </p>
          </section>

          {/* Quick nav */}
          <nav className="mt-8 rounded-2xl border border-black/8 bg-white p-5">
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">In this guide</p>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <p className="mb-2 text-xs font-bold text-neutral-700">Traditional Breakfast</p>
                <ol className="space-y-1.5 text-sm">
                  {traditional.map((p, i) => (
                    <li key={p.name} className="flex items-center gap-2">
                      <span className="text-xs font-bold tabular-nums text-[#c8694a]/40">{String(i + 1).padStart(2, "0")}</span>
                      <a href={`#place-t-${i + 1}`} className="text-neutral-700 hover:text-[#c8694a] transition">{p.name}</a>
                    </li>
                  ))}
                </ol>
              </div>
              <div>
                <p className="mb-2 text-xs font-bold text-neutral-700">Modern Takes</p>
                <ol className="space-y-1.5 text-sm">
                  {modern.map((p, i) => (
                    <li key={p.name} className="flex items-center gap-2">
                      <span className="text-xs font-bold tabular-nums text-[#c8694a]/40">{String(i + 1).padStart(2, "0")}</span>
                      <a href={`#place-m-${i + 1}`} className="text-neutral-700 hover:text-[#c8694a] transition">{p.name}</a>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </nav>

          {/* Baklava / pastries image */}
          <figure className="mt-8">
            <div className="relative h-60 w-full overflow-hidden rounded-3xl sm:h-72">
              <Image
                src="/images/blog/amman-baklava-downtown.jpg"
                alt="Large trays of baklava and pastries on display in a downtown Amman bakery"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
            <figcaption className="mt-2 text-center text-xs text-neutral-400">Baklava trays in downtown Amman — pastries are part of the morning ritual too</figcaption>
          </figure>

          {/* Traditional section */}
          <div className="mt-14">
            <div className="mb-8 flex items-center gap-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c8694a]">Part One</p>
                <h2 className="text-2xl font-semibold text-neutral-950">Traditional Breakfast</h2>
                <p className="mt-1 text-sm text-neutral-500">Spots that have been doing it the same way for decades — and have earned every regular they have.</p>
              </div>
            </div>
            <div className="space-y-16">
              {traditional.map((place, i) => (
                <div key={place.name} id={`place-t-${i + 1}`}>
                  <PlaceCard place={place} index={i} accent="t" />
                </div>
              ))}
            </div>
          </div>

          {/* Tea image — end of traditional section */}
          <figure className="mt-10">
            <div className="relative h-60 w-full overflow-hidden rounded-3xl sm:h-72">
              <Image
                src="/images/blog/jordanian-tea-cafe-table.jpg"
                alt="Glasses of Jordanian tea on a wooden café table with fresh herbs"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
            <figcaption className="mt-2 text-center text-xs text-neutral-400">Tea is served continuously at a Jordanian breakfast — the morning does not end until the pot runs dry</figcaption>
          </figure>

          {/* Divider */}
          <div className="my-16 flex items-center gap-4">
            <div className="h-px flex-1 bg-black/8" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400">Modern Takes</span>
            <div className="h-px flex-1 bg-black/8" />
          </div>

          {/* Rumman Collective image — opens the modern section */}
          <figure className="mb-10">
            <div className="relative h-64 w-full overflow-hidden rounded-3xl sm:h-80">
              <Image
                src="/images/blog/rumman-collective-amman.jpg"
                alt="Rumman Collective sign on Rainbow Street Amman with pink bougainvillea flowers and city view"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
            <figcaption className="mt-2 text-center text-xs text-neutral-400">Rumman Collective on Rainbow Street — the name means pomegranate, and the entrance lives up to it</figcaption>
          </figure>

          {/* Modern section */}
          <div>
            <div className="mb-8">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c8694a]">Part Two</p>
              <h2 className="text-2xl font-semibold text-neutral-950">Modern Takes on a Traditional Breakfast</h2>
              <p className="mt-1 text-sm text-neutral-500">Places that use local ingredients and Jordanian food culture as a starting point — and take it somewhere intentional.</p>
            </div>
            <div className="space-y-16">
              {modern.map((place, i) => (
                <div key={place.name} id={`place-m-${i + 1}`}>
                  <PlaceCard place={place} index={i} accent="m" />
                </div>
              ))}
            </div>
          </div>

          {/* Tips */}
          <section className="mt-16 rounded-3xl border border-black/8 bg-white p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-neutral-950">Tips for breakfast in Amman</h2>
            <ul className="mt-5 space-y-5 text-sm leading-7 text-neutral-700">
              {[
                ["Go early.", "Most traditional spots peak between 7 and 10 AM. The best experience is always the early one — falafel sells out, hummus is freshest."],
                ["Bring cash.", "Many traditional breakfast spots in Amman are cash-only. Prices are low — rarely more than a few dinars per person for a full spread."],
                ["Order more than you think you need.", "A Jordanian breakfast is communal. Extra dishes are inexpensive and the table is better when it is full."],
                ["Book ahead at Shams Al Balad.", "It is one of the few breakfast spots in Amman where weekend reservations are genuinely worth making."],
                ["Combine breakfast with a walk.", "Most of the traditional spots and several of the modern ones sit along or near Rainbow Street and Weibdeh — a morning walk through both neighbourhoods pairs naturally with any of them."],
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

          {/* What is a traditional Jordanian breakfast */}
          <section className="mt-10 rounded-3xl border border-black/8 bg-white p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-neutral-950">What is a traditional Jordanian breakfast?</h2>
            <p className="mt-4 text-sm leading-7 text-neutral-700">
              A traditional Jordanian breakfast — known locally as <em>ftour</em> — is a
              spread of small shared dishes rather than a single plate. The staples are
              hummus, ful medames (slow-cooked fava beans), labneh (strained yoghurt),
              falafel, eggs cooked to order, olives, fresh tomatoes, and warm flatbread.
              Za&apos;atar mixed with olive oil is common on the side.
            </p>
            <p className="mt-4 text-sm leading-7 text-neutral-700">
              In Amman you will also find regional variations: shakshouka, liver qalaya,
              fatteh (layers of bread, chickpeas, and yoghurt), and cheese or za&apos;atar
              pastries. Most traditional breakfast spots open between 6 and 8 AM and serve
              through to midday. Breakfast in Jordan is often the most social meal of the
              day — the best introduction to Jordanian hospitality that a visitor can have.
            </p>
          </section>

          {/* CTA */}
          <section className="mt-10 rounded-3xl border border-[#c8694a]/20 bg-z-orange-soft p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c8694a]">Experience Rainbow Street</p>
            <h2 className="mt-2 text-xl font-semibold text-neutral-950">
              Explore Amman&apos;s food scene with Zowar
            </h2>
            <p className="mt-3 text-sm leading-7 text-neutral-700">
              Several of the spots on this list sit along or just off Rainbow Street —
              the same neighbourhood that runs through the Zowar experience. Zowar is a
              self-guided puzzle walk through Amman with curated stops for tastings and
              discoveries, including over 25 JOD in food and gifts across a half-day
              adventure on Rainbow Street and Weibdeh.
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

          <div className="mt-14 flex items-center justify-between border-t border-black/8 pt-8 text-sm text-neutral-500">
            <Link href="/blog" className="hover:text-neutral-800 transition">← All guides</Link>
            <Link href="/blog/rainbow-street-guide" className="hover:text-neutral-800 transition">Rainbow Street history →</Link>
          </div>
        </article>
      </div>
    </>
  );
}
