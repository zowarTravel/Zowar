import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "What to Eat in Jordan: 15 Dishes to Try (and Where in Amman)",
  description:
    "Mansaf, maqluba, musakhan, falafel, knafeh and more: the 15 Jordanian dishes worth travelling for, what's in them, how to eat them, and where to find them in Amman.",
  alternates: { canonical: "https://zowar.net/blog/what-to-eat-in-jordan" },
  openGraph: {
    title: "What to Eat in Jordan: 15 Dishes to Try",
    description:
      "From mansaf to knafeh: a local guide to the 15 dishes that define Jordanian food, and where to eat them in Amman.",
    url: "https://zowar.net/blog/what-to-eat-in-jordan",
    images: [{ url: "/images/blog/tabbouleh-jordanian-food.jpg", alt: "Fresh tabbouleh with Jordanian mezze" }],
  },
  keywords: [
    "what to eat in Jordan",
    "Jordanian food",
    "Jordanian dishes",
    "traditional Jordanian food",
    "food in Jordan",
    "mansaf",
    "maqluba",
    "musakhan",
    "zarb Wadi Rum",
    "galayet bandora",
    "knafeh Amman",
    "falafel Amman",
    "shawarma Amman",
    "Jordanian breakfast",
    "Amman food guide",
    "must try food Jordan",
  ],
};

type Dish = {
  name: string;
  nameAr: string;
  oneLiner: string;
  description: string;
  where: string;
};

type Section = {
  id: string;
  label: string;
  title: string;
  intro: string;
  dishes: Dish[];
};

const sections: Section[] = [
  {
    id: "mains",
    label: "Part One",
    title: "The Big Dishes",
    intro: "The centrepieces. Cooked for families, guests and celebrations, and the dishes Jordanians are proudest of.",
    dishes: [
      {
        name: "Mansaf",
        nameAr: "منسف",
        oneLiner: "The national dish: lamb, jameed and rice",
        description: `If you eat one thing in Jordan, make it mansaf. Lamb is slow-cooked in jameed, a sauce made from dried, fermented yoghurt, then piled over rice on a layer of thin shrak bread and finished with toasted almonds or pine nuts. More jameed is poured over at the table.

Mansaf is the dish of weddings, funerals, Eid and any occasion where a family wants to honour a guest. The flavour is sharp, salty and rich, unlike anything else in the region. The best jameed is said to come from Karak, in the south.

Traditionally it is eaten standing around a shared platter, using only the right hand to roll rice and lamb into a ball. Restaurants will give you a spoon, and nobody will mind if you use it.`,
        where: "Sufra on Rainbow Street serves it the traditional way. Many places only cook it on Fridays, so ask.",
      },
      {
        name: "Maqluba",
        nameAr: "مقلوبة",
        oneLiner: "The upside-down rice pot, flipped at the table",
        description: `Maqluba means "upside down", which describes the best part of eating it. Fried aubergine, cauliflower or potato is layered in a deep pot with chicken or lamb and spiced rice, cooked together, then turned over onto a platter in front of everyone. A good flip comes out as a clean, standing cake. A bad one gets teased about for years.

It is a home dish first, usually served with plain yoghurt and a chopped salad on the side, and a common choice for a big Friday lunch.`,
        where: "Sufra has it on the menu. If a Jordanian friend invites you for maqluba, say yes.",
      },
      {
        name: "Musakhan",
        nameAr: "مسخن",
        oneLiner: "Taboon bread, sumac onions and roast chicken",
        description: `Musakhan is Palestinian in origin and a fixture in Jordan, where a large part of the population has Palestinian roots. Thick taboon bread is soaked in olive oil and covered with a heap of onions slowly cooked down with sumac, then topped with roast chicken and pine nuts.

It is a celebration of the olive harvest, which runs from October into December, so late autumn is the best time to eat it, when the new season's oil is green and peppery. Expect oily fingers. That is the point.`,
        where: "Look for it on menus at traditional restaurants, especially during the olive harvest. Home-cooked is best.",
      },
      {
        name: "Zarb",
        nameAr: "زرب",
        oneLiner: "Bedouin barbecue, cooked underground",
        description: `Zarb is how the Bedouin cook for a crowd. Lamb or chicken and vegetables are loaded onto racks, lowered into a pit oven dug into the sand over hot coals, sealed with a lid and buried for a couple of hours. What comes out is smoky, tender and falling off the bone.

The lifting of the zarb is an event in itself, and it is the dinner most camps in Wadi Rum serve their guests.`,
        where: "Wadi Rum desert camps, rather than Amman. Most overnight stays include a zarb dinner.",
      },
      {
        name: "Galayet Bandora",
        nameAr: "قلاية بندورة",
        oneLiner: "Tomatoes, garlic and chilli in a hot pan",
        description: `The simplest dish on this list, and one of the best. Tomatoes are cooked down in olive oil with garlic and green chilli until soft and jammy, then eaten straight from the pan with bread. Some versions add onion or a scattering of pine nuts.

It is a camping dish, a student dish and a breakfast dish all at once. Order the qalaya at a breakfast place and this is the family it belongs to.`,
        where: "Khashoka is known for its qalaya dishes (see our breakfast guide). Also easy to make at home.",
      },
      {
        name: "Mujaddara",
        nameAr: "مجدرة",
        oneLiner: "Lentils, rice and deeply caramelised onions",
        description: `Mujaddara is lentils and rice (or bulgur) cooked together and covered in onions fried slowly until they are dark brown and sweet. It is cheap, filling and completely vegetarian, and many Jordanians would call it comfort food before anything else on this list.

It is usually eaten with yoghurt or a sharp salad to cut through the richness.`,
        where: "Home kitchens and small local restaurants. A good option for vegetarian travellers.",
      },
    ],
  },
  {
    id: "mezze",
    label: "Part Two",
    title: "Breakfast & Mezze",
    intro: "The small shared plates that cover a Jordanian table at breakfast and before any big meal.",
    dishes: [
      {
        name: "Hummus",
        nameAr: "حمص",
        oneLiner: "Warm, smooth, and never from a tub",
        description: `Hummus in Amman is a different thing from the supermarket version. It is made fresh every morning, served warm in a wide, shallow bowl with a pool of olive oil in the centre, and eaten by scooping with torn bread. It is a breakfast food first.

Look out for hummus with lamb and pine nuts on top, and msabbaha, a warmer, chunkier version where the chickpeas are left mostly whole.`,
        where: "Hashem downtown and Abu Jbara. Or make it yourself with our traditional hummus recipe.",
      },
      {
        name: "Falafel",
        nameAr: "فلافل",
        oneLiner: "Chickpea fritters, crisp outside and green inside",
        description: `Jordanian falafel is made from chickpeas and a lot of fresh herbs, which is why it is bright green when you break it open. It is fried to order and eaten either on the breakfast table or stuffed into bread with tomato, pickles and tahini.

At some places you will also find stuffed falafel, filled with spiced onion and sumac before frying.`,
        where: "Al-Quds Falafel on Rainbow Street (since 1966) and Hashem downtown (since 1952).",
      },
      {
        name: "Ful Medames",
        nameAr: "فول مدمس",
        oneLiner: "Slow-cooked fava beans with lemon and olive oil",
        description: `Fava beans cooked slowly until soft, then dressed with lemon, garlic, cumin, olive oil and sometimes chopped tomato and chilli. Ful is earthy and filling, and it is what keeps manual workers going until lunch.

It is almost always on the table next to the hummus, and the two are eaten together.`,
        where: "Any traditional breakfast place. Abu Mahjoub and Hashem are good bets.",
      },
      {
        name: "Fatteh",
        nameAr: "فتة",
        oneLiner: "Crisp bread, chickpeas and garlicky yoghurt",
        description: `Fatteh is layers: toasted or fried pieces of bread at the bottom, warm chickpeas in the middle, a garlic, yoghurt and tahini sauce on top, finished with sizzling ghee or butter and pine nuts. The contrast of crunchy bread and cool, sour yoghurt is the whole appeal.

Hummus fatteh is the breakfast version. At lunch you will also see aubergine fatteh and versions with meat.`,
        where: "Abu Jbara for breakfast fatteh. Sufra does an aubergine fatteh.",
      },
      {
        name: "Mutabbal",
        nameAr: "متبل",
        oneLiner: "Smoky aubergine with tahini",
        description: `Aubergines are charred whole over an open flame until the skin blackens and the flesh collapses, then mashed with tahini, lemon and garlic. The smokiness is the reason to order it.

Outside the region it often gets called baba ghanoush. In Jordan, baba ghanoush usually means a different dish of chopped aubergine with vegetables and no tahini.`,
        where: "On almost every mezze menu in Amman.",
      },
      {
        name: "Tabbouleh",
        nameAr: "تبولة",
        oneLiner: "A parsley salad, not a grain salad",
        description: `Real tabbouleh is mostly parsley, chopped very fine, with mint, tomato, a little onion and only a sprinkle of fine bulgur, dressed generously with lemon and olive oil. If yours is mostly grain, it was made for export.

It is the fresh, sharp counterweight to everything heavy on the table, and it is often eaten scooped up with lettuce leaves.`,
        where: "Any mezze spread. Order it alongside hummus and mutabbal.",
      },
    ],
  },
  {
    id: "street",
    label: "Part Three",
    title: "Street Food & Sweets",
    intro: "What you eat on the move, and what you finish with.",
    dishes: [
      {
        name: "Manakish",
        nameAr: "مناقيش",
        oneLiner: "Flatbread with za'atar and olive oil",
        description: `Manakish are flatbreads baked with a topping, most often za'atar (a mix of wild thyme, sumac and sesame) and olive oil, or white cheese. They come straight out of the oven at neighbourhood bakeries every morning and cost very little.

Fold one in half and eat it walking. Ask for a mix of za'atar and cheese if you can't decide.`,
        where: "Any neighbourhood bakery (furn) in the morning. Follow the smell.",
      },
      {
        name: "Shawarma",
        nameAr: "شاورما",
        oneLiner: "Late-night chicken or lamb wraps",
        description: `Meat is stacked on a vertical spit, roasted slowly, then shaved off and rolled into thin bread. Chicken shawarma in Amman typically comes with toum (a sharp garlic sauce), pickles and sometimes chips inside the wrap.

It is the city's default late-night food, and everyone has a favourite stand they will defend.`,
        where: "Shawerma Reem at Second Circle, where the queue runs late into the night, is the famous one.",
      },
      {
        name: "Knafeh",
        nameAr: "كنافة",
        oneLiner: "Hot cheese pastry soaked in syrup",
        description: `Knafeh is a layer of soft white cheese under a crisp topping of semolina or shredded pastry, baked in huge round trays, soaked in sugar syrup scented with orange blossom and sprinkled with pistachio. It must be eaten hot, when the cheese still stretches.

In Amman it is eaten at any hour, often standing in the street, and often for breakfast.`,
        where: "Habiba Sweets downtown, serving knafeh since 1951. Eat it on the spot from the alley counter.",
      },
    ],
  },
];

const allDishes = sections.flatMap((s) => s.dishes);

// Running dish number (1–15) across sections, keyed by dish name.
const dishNumber = new Map(allDishes.map((d, i) => [d.name, i + 1]));

const articleSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: "What to Eat in Jordan: 15 Dishes to Try",
      description:
        "A local guide to the 15 dishes that define Jordanian food, from mansaf and maqluba to falafel and knafeh, with where to eat them in Amman.",
      url: "https://zowar.net/blog/what-to-eat-in-jordan",
      datePublished: "2026-11-14",
      dateModified: "2026-11-14",
      author: { "@type": "Organization", name: "Zowar", url: "https://zowar.net" },
      publisher: {
        "@type": "Organization",
        name: "Zowar",
        url: "https://zowar.net",
        logo: { "@type": "ImageObject", url: "https://zowar.net/logo.png" },
      },
      inLanguage: "en",
      about: [
        { "@type": "Country", name: "Jordan" },
        { "@type": "City", name: "Amman" },
      ],
    },
    {
      "@type": "ItemList",
      name: "Jordanian dishes to try",
      numberOfItems: allDishes.length,
      itemListElement: allDishes.map((d, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: d.name,
        description: d.oneLiner,
      })),
    },
  ],
};

function DishCard({ dish, number }: { dish: Dish; number: number }) {
  return (
    <section id={`dish-${number}`}>
      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-bold tabular-nums" style={{ color: "rgba(200,105,74,0.18)" }}>
          {String(number).padStart(2, "0")}
        </span>
        <div>
          <h3 className="text-2xl font-semibold text-neutral-950">
            {dish.name}
            <span className="ms-2 text-base font-normal text-neutral-600">{dish.nameAr}</span>
          </h3>
          <p className="mt-0.5 text-sm text-neutral-500">{dish.oneLiner}</p>
        </div>
      </div>

      <div className="mt-4 space-y-4">
        {dish.description.split("\n\n").map((para, j) => (
          <p key={j} className="text-base leading-8 text-neutral-700">{para}</p>
        ))}
      </div>

      <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4">
        <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-amber-600">Where to try it</p>
        <p className="text-sm leading-6 text-amber-900">{dish.where}</p>
      </div>
    </section>
  );
}

const images: Record<string, { src: string; alt: string; caption: string }> = {
  mezze: {
    src: "/images/blog/hummus-and-zowar-puzzle.jpg",
    alt: "Hummus with olive oil and fresh bread on a café table in Amman",
    caption: "Hummus the Amman way: warm, in a shallow bowl, with plenty of olive oil",
  },
  street: {
    src: "/images/blog/jordanian-shawarma-platter.jpg",
    alt: "A platter of chicken shawarma arabi, wraps cut into pieces and piled with fries",
    caption: "Shawarma arabi: the wrap cut into bite-size pieces and served with fries, garlic sauce and pickles",
  },
};

export default function WhatToEatInJordan() {
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
            <span className="text-neutral-700">What to Eat in Jordan</span>
          </div>
        </div>

        <article className="mx-auto max-w-3xl px-6 py-14">
          {/* Header */}
          <header className="mb-12">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-z-orange bg-z-orange-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-[#c8694a]">
              Food Guide · Jordan
            </div>
            <h1 className="text-3xl font-semibold leading-tight tracking-tight text-neutral-950 sm:text-4xl">
              What to Eat in Jordan: 15 Dishes to Try
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-neutral-600">
              From mansaf at a family table to knafeh eaten standing in a downtown alley,
              these are the dishes that define Jordanian food: what&apos;s in them, how to
              eat them, and where to find them in Amman.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-neutral-600">
              <span>By Zowar · Amman, Jordan</span>
              <span>·</span>
              <span>12 min read</span>
              <span>·</span>
              <span>Updated November 2026</span>
            </div>
          </header>

          {/* Hero image */}
          <figure className="mb-10">
            <div className="relative h-72 w-full overflow-hidden rounded-3xl sm:h-96">
              <Image
                src="/images/blog/tabbouleh-jordanian-food.jpg"
                alt="A plate of fresh tabbouleh with Jordanian mezze"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
                priority
              />
            </div>
            <figcaption className="mt-2 text-center text-xs text-neutral-600">Tabbouleh, the sharp, fresh counterweight on every Jordanian table</figcaption>
          </figure>

          {/* Intro */}
          <section className="rounded-3xl border border-black/8 bg-white p-6 sm:p-8">
            <p className="text-base leading-8 text-neutral-700">
              Jordanian food sits at the meeting point of Bedouin, Palestinian, Syrian and
              Levantine cooking. It is built on a few things done well: lamb, yoghurt,
              olive oil, chickpeas, bread and herbs, and meals that are meant to be shared.
              Hospitality is taken seriously. A guest is fed first and fed too much, and
              refusing a second helping takes practice.
            </p>
            <p className="mt-4 text-base leading-8 text-neutral-700">
              This list covers the dishes worth seeking out on a trip, split into the big
              centrepieces, the breakfast and mezze table, and street food and sweets.
              Most of them can be found within a short walk of Rainbow Street and downtown
              Amman.
            </p>
          </section>

          {/* Early CTA */}
          <aside className="mt-6 flex flex-col gap-4 rounded-2xl border border-[#c8694a]/20 bg-z-orange-soft p-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm leading-6 text-neutral-700">
              <strong className="font-semibold text-neutral-900">Want to taste some of these in one afternoon?</strong>{" "}
              Zowar is a self-guided puzzle walk through Rainbow Street with over 25 JOD in tastings and gifts.
            </p>
            <Link
              href="/booking"
              data-umami-event="blog_cta_click"
              data-umami-event-post="what-to-eat-in-jordan"
              data-umami-event-position="top"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-[#c8694a] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
            >
              See the experience →
            </Link>
          </aside>

          {/* Quick nav */}
          <nav className="mt-8 rounded-2xl border border-black/8 bg-white p-5">
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-600">The 15 dishes</p>
            <div className="grid gap-5 sm:grid-cols-3">
              {sections.map((section) => (
                <div key={section.id}>
                  <p className="mb-2 text-xs font-bold text-neutral-700">{section.title}</p>
                  <ol className="space-y-1.5 text-sm">
                    {section.dishes.map((d) => {
                      const n = dishNumber.get(d.name)!;
                      return (
                        <li key={d.name} className="flex items-center gap-2">
                          <span className="text-xs font-bold tabular-nums text-[#c8694a]/40">{String(n).padStart(2, "0")}</span>
                          <a href={`#dish-${n}`} className="text-neutral-700 hover:text-[#c8694a] transition">{d.name}</a>
                        </li>
                      );
                    })}
                  </ol>
                </div>
              ))}
            </div>
          </nav>

          {/* Sections */}
          {sections.map((section, si) => {
            const image = images[section.id];
            return (
              <div key={section.id}>
                {si > 0 && (
                  <div className="my-16 flex items-center gap-4">
                    <div className="h-px flex-1 bg-black/8" />
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-600">{section.title}</span>
                    <div className="h-px flex-1 bg-black/8" />
                  </div>
                )}

                {image && (
                  <figure className="mb-10">
                    <div className="relative h-60 w-full overflow-hidden rounded-3xl sm:h-72">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover object-center"
                        sizes="(max-width: 768px) 100vw, 768px"
                      />
                    </div>
                    <figcaption className="mt-2 text-center text-xs text-neutral-600">{image.caption}</figcaption>
                  </figure>
                )}

                <div className={si === 0 ? "mt-14" : ""}>
                  <div className="mb-8">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c8694a]">{section.label}</p>
                    <h2 className="text-2xl font-semibold text-neutral-950 text-balance">{section.title}</h2>
                    <p className="mt-1 text-sm text-neutral-500">{section.intro}</p>
                  </div>
                  <div className="space-y-16">
                    {section.dishes.map((dish) => (
                      <DishCard key={dish.name} dish={dish} number={dishNumber.get(dish.name)!} />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Drinks */}
          <section className="mt-16 rounded-3xl border border-black/8 bg-white p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-neutral-950 text-balance">And to drink</h2>
            <ul className="mt-5 space-y-5 text-sm leading-7 text-neutral-700">
              {[
                ["Arabic coffee (qahwa sada).", "Bitter, cardamom-spiced and served in tiny handleless cups as a gesture of welcome. Your cup will keep being refilled. Gently shake it from side to side when you have had enough."],
                ["Tea with sage or mint.", "Sweet black tea, often with a sprig of maramiya (sage) or fresh mint. It comes with almost every meal and most conversations."],
                ["Lemon and mint juice.", "Blended lemon, fresh mint, sugar and ice. The answer to a hot afternoon on Rainbow Street."],
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

          {/* Tips */}
          <section className="mt-10 rounded-3xl border border-black/8 bg-white p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-neutral-950 text-balance">Tips for eating in Jordan</h2>
            <ul className="mt-5 space-y-5 text-sm leading-7 text-neutral-700">
              {[
                ["Order to share.", "Jordanian meals are communal. Order several mezze for the table rather than one plate each."],
                ["Use your right hand.", "If you eat with your hands, especially from a shared mansaf platter, use the right one."],
                ["Bread is your cutlery.", "Tear off a piece of khubz and use it to scoop hummus, ful and mutabbal."],
                ["Breakfast is the big local meal.", "Some of the best food in Amman is served before 10 AM. See our breakfast guide for where to go."],
                ["Say sahtain.", "It means \"to your health\" and is what people say when food is served. The reply is \"ala qalbak\" (on your heart)."],
                ["Ask what day it is.", "Mansaf and some other big dishes are cooked on particular days, often Fridays. It's worth asking before you go."],
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

          {/* Related */}
          <section className="mt-10 rounded-3xl border border-black/8 bg-white p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-neutral-950 text-balance">More food guides</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {[
                ["Best breakfast in Amman", "/blog/best-breakfast-amman"],
                ["Best restaurants on Rainbow Street", "/blog/best-restaurants-rainbow-street"],
                ["Traditional hummus recipe", "/blog/traditional-hummus-recipe"],
              ].map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  className="rounded-2xl border border-black/8 p-4 text-sm font-medium text-neutral-800 transition hover:border-[#c8694a]/40 hover:text-[#c8694a]"
                >
                  {label} →
                </Link>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="mt-10 rounded-3xl border border-[#c8694a]/20 bg-z-orange-soft p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c8694a]">Taste Amman</p>
            <h2 className="mt-2 text-xl font-semibold text-neutral-950 text-balance">
              Eat your way through Rainbow Street with Zowar
            </h2>
            <p className="mt-3 text-sm leading-7 text-neutral-700">
              Zowar is a self-guided puzzle walk through Rainbow Street and Weibdeh, with
              curated stops for tastings and discoveries along the way, including over
              25 JOD in food and gifts. Go at your own pace, on your own schedule.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/booking"
                data-umami-event="blog_cta_click"
                data-umami-event-post="what-to-eat-in-jordan"
                data-umami-event-position="bottom"
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
            <Link href="/blog/best-breakfast-amman" className="hover:text-neutral-800 transition">Best breakfast in Amman →</Link>
          </div>
        </article>
      </div>
    </>
  );
}
