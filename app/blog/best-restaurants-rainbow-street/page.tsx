import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Best Restaurants on Rainbow Street, Amman – Local Guide 2026",
  description:
    "Where to eat on Rainbow Street — from traditional Jordanian dining at Sufra to farm-to-table at Maisa Space, artisan café Namliyeh, live music at Maestro, and the iconic Al-Quds Falafel.",
  alternates: { canonical: "https://zowar.net/blog/best-restaurants-rainbow-street" },
  openGraph: {
    title: "Best Restaurants on Rainbow Street, Amman – Local Guide 2026",
    description:
      "A local guide to eating on Rainbow Street — from a falafel counter open since 1966 to a Jordanian villa restaurant on the World's 50 Best Discovery list.",
    url: "https://zowar.net/blog/best-restaurants-rainbow-street",
    images: [{ url: "/logo.png", width: 1200, height: 630 }],
  },
  keywords: [
    "best restaurants Rainbow Street Amman",
    "where to eat Rainbow Street",
    "Sufra restaurant Amman",
    "Shams Al Balad Amman",
    "Rumman Collective",
    "Maisa Space Amman",
    "Namliyeh Amman",
    "Al-Quds Falafel",
    "Books Cafe Amman",
    "Wild Jordan Cafe",
    "Rainbow Street food guide",
    "Jabal Amman restaurants",
    "Amman food guide",
    "Jordan restaurants",
  ],
};

const articleSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: "Best Restaurants on Rainbow Street, Amman",
      description:
        "A local guide to eating on Rainbow Street — from Sufra and Shams Al Balad to Namliyeh, Maisa Space, Books@Café, Wild Jordan Café, and Al-Quds Falafel.",
      url: "https://zowar.net/blog/best-restaurants-rainbow-street",
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
      name: "Restaurants on Rainbow Street, Amman",
      numberOfItems: 8,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          item: {
            "@type": "Restaurant",
            name: "Sufra",
            description: "Traditional Jordanian home cooking in an early 20th-century villa on Rainbow Street. World's 50 Best Discovery. Mansaf, makloubeh, eggplant fatteh.",
            address: { "@type": "PostalAddress", streetAddress: "Rainbow Street", addressLocality: "Jabal Amman", addressCountry: "JO" },
            servesCuisine: "Jordanian",
            priceRange: "$$",
            url: "https://www.theworlds50best.com/discovery/Establishments/Jordan/Amman/Sufra.html",
          },
        },
        {
          "@type": "ListItem",
          position: 2,
          item: {
            "@type": "Restaurant",
            name: "Shams Al Balad",
            description: "Breakfast and lunch restaurant on Rainbow Street with a terrace overlooking the Citadel. Organic local ingredients. World's 50 Best Discovery.",
            address: { "@type": "PostalAddress", streetAddress: "Rainbow Street", addressLocality: "Jabal Amman", addressCountry: "JO" },
            servesCuisine: "Jordanian, Mediterranean",
            priceRange: "$$",
          },
        },
        {
          "@type": "ListItem",
          position: 3,
          item: {
            "@type": "Restaurant",
            name: "Rumman Collective",
            description: "Cultural collective and weekend brunch destination on Rainbow Street. Mediterranean and Arab flavours in a garden courtyard with a regional crafts showroom.",
            address: { "@type": "PostalAddress", streetAddress: "Rainbow Street", addressLocality: "Jabal Amman", addressCountry: "JO" },
            servesCuisine: "Jordanian, Mediterranean",
            priceRange: "$$",
          },
        },
        {
          "@type": "ListItem",
          position: 4,
          item: {
            "@type": "Restaurant",
            name: "Maisa Space",
            description: "Farm-to-table café on Rainbow Street by Maisa Miqdadi. Sourdough baked in-house, labneh Jarashieh, seasonal jams, fattet jameed. Small outdoor garden.",
            address: { "@type": "PostalAddress", streetAddress: "Rainbow Street", addressLocality: "Jabal Amman", addressCountry: "JO" },
            servesCuisine: "Jordanian",
            priceRange: "$",
          },
        },
        {
          "@type": "ListItem",
          position: 5,
          item: {
            "@type": "CafeOrCoffeeShop",
            name: "Namliyeh",
            description: "Artisan jam, botanical tea, and raw honey café inside The Good Book Store on Rainbow Street. Seasonal menu, locally sourced ingredients.",
            address: { "@type": "PostalAddress", streetAddress: "Rainbow Street", addressLocality: "Jabal Amman", addressCountry: "JO" },
            servesCuisine: "Cafe",
            priceRange: "$",
          },
        },
        {
          "@type": "ListItem",
          position: 6,
          item: {
            "@type": "CafeOrCoffeeShop",
            name: "Wild Jordan Café",
            description: "Café inside the Wild Jordan Center with panoramic views over the old city. Organic menu. Run by the Royal Society for the Conservation of Nature.",
            address: { "@type": "PostalAddress", addressLocality: "Jabal Amman", addressCountry: "JO" },
            servesCuisine: "Cafe, Vegetarian",
            priceRange: "$$",
          },
        },
        {
          "@type": "ListItem",
          position: 7,
          item: {
            "@type": "BarOrPub",
            name: "Books@Café",
            description: "Amman's pioneering bookshop, café, bar, and gallery since 1997. City terrace views, open until midnight, fusion menu, mixed crowd.",
            address: { "@type": "PostalAddress", streetAddress: "Omar Bin Al-Khattab Street", addressLocality: "Jabal Amman", addressCountry: "JO" },
            servesCuisine: "International, Jordanian, Italian",
            priceRange: "$$",
          },
        },
        {
          "@type": "ListItem",
          position: 8,
          item: {
            "@type": "Restaurant",
            name: "Al-Quds Falafel",
            description: "Rainbow Street's most iconic falafel counter, open since 1966. Takeout only. Crispy herb falafel in French bread — sells out by mid-morning.",
            address: { "@type": "PostalAddress", streetAddress: "Rainbow Street", addressLocality: "Jabal Amman", addressCountry: "JO" },
            servesCuisine: "Jordanian",
            priceRange: "$",
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

const restaurants: Place[] = [
  {
    name: "Sufra",
    nameAr: "سفرة",
    neighborhood: "Rainbow Street, Jabal Amman",
    highlight: "Traditional Jordanian home cooking in a historic villa — World's 50 Best Discovery",
    description: `Sufra opened in 2011 in a stone villa on Rainbow Street and quickly became the answer to a question that visitors and locals had been asking for years: where do you go for a full, proper, sit-down Jordanian meal in a space that does justice to the food? The name means tablecloth in Arabic — the spread you lay out for guests — and that is the hospitality the restaurant tries to replicate.

The menu covers traditional Jordanian and Levantine home cooking in more depth than most restaurants are willing to attempt. Mansaf — slow-cooked lamb in fermented yoghurt (jameed) over rice — is here alongside makloubeh, eggplant fatteh, and a mezze selection that includes dishes rarely seen outside home kitchens. Stuffed grape leaves prepared in multiple styles, kibbeh variations, seasonal specials. For the more adventurous, liver stuffed spleen is also on the menu.

The villa setting — stone arches, a shaded courtyard, tiled floors — adds to an experience that feels more like eating at someone's house than at a restaurant. Sufra is listed on the World's 50 Best Discovery and has appeared in more travel features on Amman than any other restaurant on the street. Reservations are strongly recommended for Friday lunch.`,
    order: "Mansaf if you have never had it — ask for it served the traditional way. Add the eggplant fatteh and any seasonal special on offer.",
    tip: "Book ahead for Friday lunch — the courtyard fills completely. Mains from around 10 JOD per person.",
  },
  {
    name: "Shams Al Balad",
    nameAr: "شمس البلد",
    neighborhood: "Rainbow Street, Jabal Amman",
    highlight: "From a flower shop to one of Amman's most celebrated breakfast spots — with a Citadel view",
    description: `Shams Al Balad started as a flower shop and became, over a decade, one of the most recognised restaurants on Rainbow Street — listed on the World's 50 Best Discovery and consistently recommended as the place to have breakfast with a view. The shift from flowers to food was driven by a kitchen doing something genuinely different: traditional Jordanian home dishes made with organic, locally sourced ingredients at a time when very few restaurants in the city were taking that approach.

The menu changes with the season. The staples are things like parsley ljjeh — a frittata of parsley, onion, and sumac — labneh kurat rolled in herbs and olive oil, makdous, taboun bread baked in-house, and Yemeni coffee sourced directly from origin. It is traditional in its ingredients but careful and intentional in its execution.

The terrace, which overlooks the Citadel and the Umayyad Palace across the valley, is one of the best breakfast settings in the city. It fills up fast on Friday and Saturday mornings. Shams Al Balad is open for breakfast and lunch, which makes it an ideal starting point for a day on Rainbow Street — you eat, you drink coffee slowly, and then you are already exactly where you need to be.`,
    order: "The parsley ljjeh, labneh kurat, and the Yemeni coffee. Sit on the terrace if you can get it.",
    tip: "Book ahead for weekends. Weekday mornings before 9am are reliably quieter and the terrace is yours.",
  },
  {
    name: "Rumman Collective",
    nameAr: "رمان كوليكتيف",
    neighborhood: "Rainbow Street, Jabal Amman",
    highlight: "Cultural collective, garden courtyard, weekend brunch — pomegranate trees at the entrance",
    description: `Rumman means pomegranate in Arabic, and the collective announces itself with the fruit: pomegranate and lemon trees at the entrance, pomegranate motifs throughout, and the same warmth and layered character the fruit carries. The space is part kitchen, part showroom, part gathering point — an eclectic interior of regional crafts and curated design objects, with a balcony looking over a green courtyard that makes it feel entirely removed from the street below.

The food draws on Mediterranean and Arab traditions with a seasonal approach. Weekend brunch — Saturday and Sunday from 10am to 2pm — is the main food draw, with Syrian-style breakfast spreads, Levantine mezze, and rotating dishes that shift with what is available that week. The kitchen takes its sourcing seriously; Rumman is recommended by Royal Jordanian as part of a selection of sustainable, community-focused destinations in Amman.

On weekdays the space is open for coffee and lighter plates — quieter, more contemplative, and worth visiting just to browse the showroom, which features local crafts, textiles, and objects produced by regional artisans. Either visit is worthwhile; the weekend brunch is the reason most people come the first time.`,
    order: "The weekend brunch spread on Saturday or Sunday. Arrive at opening for the best table in the courtyard.",
    tip: "Weekday visits work well for coffee and the showroom. The brunch is what Rumman is known for.",
  },
  {
    name: "Maisa Space",
    nameAr: "مساحة ميسا",
    neighborhood: "Rainbow Street, Jabal Amman",
    highlight: "Farm-to-table on Rainbow Street — sourdough baked daily, locally sourced, personal atmosphere",
    description: `Maisa Space sits toward the end of Rainbow Street and was founded by Maisa Miqdadi as something between a café, a kitchen, and a place to slow down. Everything on the table has a traceable origin: the sourdough is baked in-house every morning, the labneh is Jarashieh from Jerash, the herbs and jams come from local farmers or are made by hand in the kitchen. It is not performing farm-to-table — it is simply how the food is made here.

Breakfast and lunch are both worth coming for. Mornings bring eggs, labneh, seasonal jams, and homemade granola — the kind of spread that takes time and care to produce properly. Lunch shifts toward Levantine mezze: yalanji (stuffed vine leaves), fattet jameed, and whatever seasonal dishes are ready from the kitchen that day. The herbal tea blends, mixed in-house, are among the best in the city.

The space itself is small, with a garden out back that makes it feel residential rather than commercial. Miqdadi is often there, and the welcome is personal. It is the kind of place that becomes a regular once you have been once — you stop by for the sourdough, stay for the tea, and leave with a jar of jam.`,
    order: "Sourdough with labneh Jarashieh and seasonal jam in the morning. Ask what is on the lunch menu that day.",
    tip: "The menu is seasonal — not everything is available every day. Ask what is fresh before ordering.",
  },
  {
    name: "Namliyeh",
    nameAr: "نملية",
    neighborhood: "Inside The Good Book Store, Rainbow Street",
    highlight: "Artisan jams, botanical teas, raw honey — a café inside one of Amman's best bookshops",
    description: `Namliyeh — the name means pantry in Arabic — is a food and lifestyle brand that makes its own artisan jams, botanical herbal teas, and raw honey. It is also a café, operating inside The Good Book Store on Rainbow Street: a well-stocked independent bookshop in the heart of Jabal Amman that draws a local and expat crowd looking for regional literature, travel books, maps, and English-language titles.

The combination works well. You come for the books, you sit down with a herbal tea, and you end up staying for a plate of seasonal toast with house-made jam or a light breakfast. Everything is sourced and produced with the same attention as the pantry products — locally grown, seasonal, put together thoughtfully. The menu reflects what the season and local farmers can supply rather than a fixed year-round list.

Namliyeh also sells its products to take home: jams in small jars, loose-leaf tea blends, and honey. These have become some of the better food souvenirs available on Rainbow Street — made in Jordan, properly packaged, and genuinely good. The bookshop around them is worth browsing regardless of whether you order anything.`,
    order: "A herbal tea and whatever seasonal toast is on. Pick up a jar of jam or a tea blend on the way out.",
    tip: "Open Mon–Thu and Sat–Sun 9:30am–9pm, Friday 3–9pm. The bookshop sells maps, regional guides, and local literature.",
  },
  {
    name: "Wild Jordan Café",
    nameAr: "وايلد جوردان كافيه",
    neighborhood: "Wild Jordan Center, near 1st Circle (~400m from Rainbow Street)",
    highlight: "Panoramic views over the old city — organic café run by Jordan's conservation society",
    description: `Wild Jordan Café sits inside the Wild Jordan Center, operated by the Royal Society for the Conservation of Nature. The café's terrace looks out over a deep valley toward downtown Amman — the Roman Theatre, the Citadel, the ridge of hills, the enormous Jordanian flag — one of the best views the city offers, accessible for the price of a coffee.

The menu leans organic and vegetarian-friendly, which is less common in Amman than it sounds. The kitchen keeps the offering relatively simple — salads, sandwiches, hot dishes, good coffee — because the food is not really the point. The terrace is. Lunch here on a clear day, with the city spread below and afternoon light on the limestone hills, is an experience that holds up in memory longer than most restaurant meals.

Revenue from the café and the Nature Shop inside the center goes directly toward supporting the RSCN's conservation work in Jordan's eight nature reserves. The shop sells crafts, food products, and natural goods made by local cooperatives in those reserves — a better souvenir option than most of what is available on the tourist trail. Both the café and the shop connect to something larger than a meal.`,
    order: "Coffee and whatever seasonal dish is on. The terrace is the main reason to come.",
    tip: "About 400m from Rainbow Street — a short walk or a 2-JOD taxi ride. Best at lunch on a clear day.",
  },
  {
    name: "Books@Café",
    nameAr: "بوكس كافيه",
    neighborhood: "Omar Bin Al-Khattab Street, Jabal Amman (just off Rainbow Street)",
    highlight: "Amman's most open social space — bookshop, café, bar, and gallery since 1997",
    description: `Books@Café opened in 1997 as the first internet café in the Middle East. That fact tells you something about what it was trying to be: a place ahead of its moment, mixing ideas and people who might not otherwise share a space. The internet café is long gone, but the spirit has not changed much. It is still one of the few places in Amman where a genuinely mixed crowd — locals, expats, tourists, students, artists — shares a room without any of it feeling forced or curated.

The space runs across two floors with exposed brick walls, mismatched chairs, and shelves of books available for sale or browsing. The terrace upstairs looks over the rooftops of Jabal Amman toward the hills. The kitchen serves breakfast, lunch, and dinner — a broad menu running from Jordanian staples to Italian pastas and sandwiches — and the bar has one of the few proper alcohol selections in this part of the city. Open until midnight.

Books@Café is not the newest or trendiest place on or near Rainbow Street, and that is part of its value. It has been here long enough to become a fixture rather than a destination — the place you end up when you are not sure where else to go, and are reliably glad you did. It is also one of the most consistently open spots on the street, which counts for something.`,
    order: "Whatever you feel like — the menu is broad. The coffee is good. Stay for the terrace if it is a clear evening.",
    tip: "Open Sun–Thu 10am–midnight, Fri–Sat 9am–midnight. One of the few places on the street that stays open late.",
  },
  {
    name: "Al-Quds Falafel",
    nameAr: "فلافل القدس",
    neighborhood: "Rainbow Street, Jabal Amman",
    highlight: "Rainbow Street's most iconic falafel counter since 1966 — takeout only, sells out by morning",
    description: `Al-Quds means Jerusalem in Arabic, and the founder of this small counter on Rainbow Street originally came from there. The falafel has been made the same way since 1966: a dark, crispy exterior, vivid green inside from the fresh herbs, stuffed into French bread with tomatoes, pickled vegetables, fresh parsley, and a drizzle of tahini. That is the entire menu — one thing, done consistently for sixty years.

What sets Al-Quds apart is not just the age of the place but the reputation it has earned and maintained without changing anything about how it operates. His Majesty King Abdullah and members of the royal family have stopped here — something the neighbourhood still mentions. No seating. No variations. No tourist pricing. Just the falafel, made fresh, and a queue that forms before 8am on a busy morning.

The falafel is at its best in the first hours — freshest from the fryer, crispiest, most fragrant. The stand sells out before midday most days. If you are on Rainbow Street for breakfast or a late morning walk, this is the first stop to make, not the last.`,
    order: "One thing: the falafel sandwich. Get it hot from the fryer — that is when it is best.",
    tip: "Arrive before 9am for the freshest batch. It sells out. Do not assume you can come back later.",
  },
];

function PlaceCard({ place, index }: { place: Place; index: number }) {
  return (
    <section id={`place-${index + 1}`}>
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

      <div className="mt-2 inline-block rounded-full bg-[#fef3ee] px-3 py-0.5 text-xs font-semibold text-[#c8694a]">
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

export default function BestRestaurantsRainbowStreet() {
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
            <span className="text-neutral-700">Best Restaurants on Rainbow Street</span>
          </div>
        </div>

        <article className="mx-auto max-w-3xl px-6 py-14">
          <header className="mb-12">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#c8694a] bg-[#fef3ee] px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-[#c8694a]">
              Food Guide · Rainbow Street, Amman
            </div>
            <h1 className="text-3xl font-semibold leading-tight tracking-tight text-neutral-950 sm:text-4xl">
              Best Restaurants on Rainbow Street, Amman
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-neutral-600">
              From a falafel counter open since 1966 to a Jordanian villa on the
              World&apos;s 50 Best Discovery list — a local guide to eating on
              Rainbow Street and the surrounding neighbourhood.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-neutral-400">
              <span>By Zowar · Amman, Jordan</span>
              <span>·</span>
              <span>14 min read</span>
              <span>·</span>
              <span>Updated 2026</span>
            </div>
          </header>

          <figure className="mb-10">
            <div className="relative h-72 w-full overflow-hidden rounded-3xl sm:h-96">
              <Image
                src="/images/blog/rainbow-street--blue-gate-bougainvillea.jpg"
                alt="Blue gate and bougainvillea on Rainbow Street, Amman"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
                priority
              />
            </div>
            <figcaption className="mt-2 text-center text-xs text-neutral-400">Rainbow Street — where most of the best food on this list is within a ten-minute walk</figcaption>
          </figure>

          <section className="rounded-3xl border border-black/8 bg-white p-6 sm:p-8">
            <p className="text-base leading-8 text-neutral-700">
              Rainbow Street is not one type of food experience. It is a falafel
              counter that has been doing the same thing since 1966, alongside a villa
              restaurant serving mansaf to guests since 2011, alongside a café that
              started as a flower shop and ended up on an international best list. The
              street and its surroundings hold more variety — and more quality — per
              kilometre than almost anywhere else in Amman. This guide covers the
              eight places worth knowing, from breakfast through to a late night on
              the terrace.
            </p>
          </section>

          <nav className="mt-8 rounded-2xl border border-black/8 bg-white p-5">
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">In this guide</p>
            <ol className="space-y-1.5 text-sm">
              {restaurants.map((p, i) => (
                <li key={p.name} className="flex items-center gap-2">
                  <span className="text-xs font-bold tabular-nums text-[#c8694a]/40">{String(i + 1).padStart(2, "0")}</span>
                  <a href={`#place-${i + 1}`} className="text-neutral-700 hover:text-[#c8694a] transition">{p.name}</a>
                </li>
              ))}
            </ol>
          </nav>

          <figure className="mt-8">
            <div className="relative h-60 w-full overflow-hidden rounded-3xl sm:h-72">
              <Image
                src="/images/blog/amman-traditional-cafe-interior.jpg"
                alt="Traditional café interior on Rainbow Street with colourful cushions and city views"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
            <figcaption className="mt-2 text-center text-xs text-neutral-400">A Rainbow Street café — the neighbourhood where most of these restaurants have been for years</figcaption>
          </figure>

          <div className="mt-14 space-y-16">
            {restaurants.map((place, i) => (
              <PlaceCard key={place.name} place={place} index={i} />
            ))}
          </div>

          <figure className="mt-10">
            <div className="relative h-60 w-full overflow-hidden rounded-3xl sm:h-72">
              <Image
                src="/images/blog/jordanian-kilim-rugs-rainbow-street.jpg"
                alt="Colourful Jordanian kilim rugs hanging outside a shop on Rainbow Street"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
            <figcaption className="mt-2 text-center text-xs text-neutral-400">Rainbow Street — shops, crafts, and food all on the same block</figcaption>
          </figure>

          <section className="mt-16 rounded-3xl border border-black/8 bg-white p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-neutral-950">Tips for eating on Rainbow Street</h2>
            <ul className="mt-5 space-y-5 text-sm leading-7 text-neutral-700">
              {[
                ["Book ahead at Sufra and Shams Al Balad.", "Both are popular enough that Friday and Saturday lunches fill up. A quick call or online reservation saves the walk of shame."],
                ["Start early for falafel.", "Al-Quds Falafel sells out before midday. If you want it fresh from the fryer, aim for 8–9am."],
                ["Rumman and Maisa Space are weekday gems.", "Both are quieter during the week and offer a more relaxed version of the Rainbow Street experience."],
                ["Walk between Rainbow Street and Weibdeh.", "Most of these restaurants are within 15 minutes of each other on foot. Breakfast at one end, lunch at the other, is a good day."],
                ["Bring cash for the smaller spots.", "Namliyeh, Maisa Space, and Al-Quds Falafel are cash-friendly operations. Prices are low."],
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

          <section className="mt-10 rounded-3xl border border-[#c8694a]/20 bg-[#fef3ee] p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c8694a]">Experience Rainbow Street</p>
            <h2 className="mt-2 text-xl font-semibold text-neutral-950">
              Discover the street through the Zowar experience
            </h2>
            <p className="mt-3 text-sm leading-7 text-neutral-700">
              Several of the spots on this list are stops along the Zowar route — a
              self-guided food and puzzle walk through Rainbow Street designed for
              anyone who wants to discover the neighbourhood properly. Follow clues at
              your own pace, taste Jordanian food at curated local spots, and piece
              together a side of Amman that most visitors walk past. Over 25 JOD in
              tastings and gifts included.
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
                About the walk
              </Link>
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
