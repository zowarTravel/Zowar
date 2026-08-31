import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Traditional Jordanian Hummus Recipe – Smooth, Authentic & Easy",
  description:
    "The authentic Jordanian method for making ultra-smooth, creamy hummus at home — with dried chickpeas, high-quality tahini, and the techniques that make the difference.",
  alternates: { canonical: "https://zowar.net/blog/traditional-hummus-recipe" },
  openGraph: {
    title: "Traditional Jordanian Hummus Recipe – Smooth & Authentic",
    description:
      "The real method for Jordanian hummus — dried chickpeas, ice-cold water, and quality tahini. Better than anything from a tub.",
    url: "https://zowar.net/blog/traditional-hummus-recipe",
    images: [{ url: "/logo.png", width: 1200, height: 630 }],
  },
  keywords: [
    "traditional hummus recipe",
    "Jordanian hummus recipe",
    "authentic hummus recipe",
    "homemade hummus",
    "how to make hummus",
    "smooth creamy hummus",
    "hummus with dried chickpeas",
    "Middle Eastern hummus recipe",
    "Arab hummus recipe",
    "hummus tahini lemon",
    "best hummus recipe",
    "Jordan food recipe",
  ],
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Recipe",
      name: "Traditional Jordanian Hummus",
      description:
        "Authentic Jordanian hummus made from scratch with dried chickpeas, quality tahini, fresh lemon, and garlic. Blended with ice-cold water for a silky, creamy result.",
      url: "https://zowar.net/blog/traditional-hummus-recipe",
      author: { "@type": "Organization", name: "Zowar", url: "https://zowar.net" },
      datePublished: "2026-08-30",
      image: "https://zowar.net/logo.png",
      prepTime: "PT12H",
      cookTime: "PT1H30M",
      totalTime: "PT13H30M",
      recipeYield: "4–6 servings",
      recipeCategory: "Dip, Mezze",
      recipeCuisine: "Jordanian, Middle Eastern",
      keywords: "hummus, chickpeas, tahini, Jordanian, traditional",
      recipeIngredient: [
        "300 g dried chickpeas",
        "1 tsp baking soda",
        "100 g good-quality tahini",
        "Juice of 2 lemons (about 60 ml), plus more to taste",
        "2 cloves garlic",
        "1 tsp fine salt, plus more to taste",
        "½ tsp ground cumin",
        "Ice-cold water (4–6 tbsp)",
        "Extra virgin olive oil, paprika, and fresh parsley to serve",
      ],
      recipeInstructions: [
        { "@type": "HowToStep", text: "Soak the dried chickpeas in plenty of cold water overnight (at least 12 hours). They will roughly double in size." },
        { "@type": "HowToStep", text: "Drain and rinse the soaked chickpeas. Transfer to a large saucepan and cover generously with fresh cold water. Add the baking soda. Bring to a boil, then reduce to a steady simmer and cook for 60–90 minutes until the chickpeas are very soft — much softer than you would use for a salad. They should crush easily between two fingers." },
        { "@type": "HowToStep", text: "Reserve a cup of the cooking liquid, then drain the chickpeas. Set aside a small handful for serving." },
        { "@type": "HowToStep", text: "In a food processor, blend the garlic and lemon juice together for 30 seconds. Add the tahini and blend for a full minute until pale and thick — this emulsification step is what creates a creamy rather than grainy result." },
        { "@type": "HowToStep", text: "Add the warm chickpeas, cumin, and salt. Blend for two minutes. With the motor running, add ice-cold water one tablespoon at a time until the hummus reaches a smooth, pourable consistency. Cold water is the traditional Jordanian trick for achieving a lighter, fluffier texture." },
        { "@type": "HowToStep", text: "Taste and adjust — more lemon for brightness, more salt to lift the flavour. Blend again briefly." },
        { "@type": "HowToStep", text: "To serve: spread into a wide, shallow bowl with a deep well in the centre. Pool olive oil into the well, scatter the reserved whole chickpeas, dust with paprika, and add a few sprigs of parsley. Serve immediately with warm flatbread or khubz." },
      ],
      nutrition: {
        "@type": "NutritionInformation",
        servingSize: "100g",
        calories: "165 kcal",
        proteinContent: "8g",
        fatContent: "9g",
        carbohydrateContent: "16g",
      },
    },
    {
      "@type": "Article",
      headline: "Traditional Jordanian Hummus Recipe",
      url: "https://zowar.net/blog/traditional-hummus-recipe",
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
    },
  ],
};

const ingredients = [
  { item: "Dried chickpeas", amount: "300 g", note: "Do not use tinned — dried makes a significantly smoother result" },
  { item: "Baking soda", amount: "1 tsp", note: "Added during cooking; softens the chickpeas faster and more evenly" },
  { item: "Good-quality tahini", amount: "100 g", note: "This is the single most important ingredient. Buy the best you can find" },
  { item: "Fresh lemon juice", amount: "60 ml (2 lemons)", note: "Always freshly squeezed. Bottled lemon juice will not taste the same" },
  { item: "Garlic", amount: "2 cloves", note: "Raw garlic gives a sharp bite; roast it first for something milder" },
  { item: "Fine salt", amount: "1 tsp", note: "" },
  { item: "Ground cumin", amount: "½ tsp", note: "Traditional, not optional — it gives depth without flavouring the hummus strongly" },
  { item: "Ice-cold water", amount: "4–6 tbsp", note: "The Jordanian secret to a lighter, fluffier texture" },
];

const steps = [
  {
    n: "01",
    title: "Soak the chickpeas",
    body: "Cover the dried chickpeas with plenty of cold water and leave them overnight — a minimum of 12 hours. They will roughly double in size. Do not skip this step. Pre-soaking significantly reduces cooking time and makes the chickpeas easier to blend smooth.",
  },
  {
    n: "02",
    title: "Cook until very soft",
    body: "Drain and rinse the soaked chickpeas. Transfer to a large saucepan, cover generously with fresh cold water, and add the baking soda. Bring to a boil, then reduce to a steady simmer. Cook for 60 to 90 minutes. The chickpeas should be much softer than you would use for a salad — they need to crush completely between two fingers with no resistance. The softer they are, the smoother the final result.",
  },
  {
    n: "03",
    title: "Reserve the liquid",
    body: "Before draining, scoop out a cup of the cooking liquid. This starchy water can be used to adjust the consistency at the end if needed. Drain the rest, and set aside a small handful of whole chickpeas to garnish the finished bowl.",
  },
  {
    n: "04",
    title: "Emulsify the tahini and lemon first",
    body: "This is the step most people skip, and it makes the most difference. In a food processor, combine the garlic and lemon juice and blend for 30 seconds. Then add the tahini and blend for a full minute. The mixture will turn pale and thick — almost like a paste. This emulsification is what gives hummus its creamy, cohesive body rather than a grainy or separated texture.",
  },
  {
    n: "05",
    title: "Add the chickpeas and blend",
    body: "Add the warm drained chickpeas, cumin, and salt to the food processor. Blend for two full minutes. With the motor running, add the ice-cold water one tablespoon at a time. The cold water is the traditional Jordanian technique for achieving a lighter, fluffier consistency — it aerates the mixture as it blends. Stop adding water when the hummus reaches a smooth, pourable texture.",
  },
  {
    n: "06",
    title: "Taste and adjust",
    body: "Taste carefully. Add more lemon juice for brightness, more salt to lift the overall flavour. If the hummus seems heavy or dense, add another tablespoon of cold water or a little of the reserved chickpea liquid and blend again briefly.",
  },
  {
    n: "07",
    title: "Serve properly",
    body: "Traditional Jordanian hummus is served in a wide, shallow bowl — never deep. Use the back of a spoon to spread the hummus to the edges, creating a well in the centre. Fill the well generously with extra virgin olive oil. Scatter the reserved whole chickpeas, dust lightly with paprika, and add a few sprigs of flat-leaf parsley. Serve immediately with warm flatbread or khubz. Hummus is always best fresh.",
  },
];

export default function HummusRecipe() {
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
            <span className="text-neutral-700">Jordanian Hummus Recipe</span>
          </div>
        </div>

        <article className="mx-auto max-w-3xl px-6 py-14">
          <header className="mb-12">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-z-orange bg-z-orange-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-[#c8694a]">
              Recipe · Jordanian Kitchen
            </div>
            <h1 className="text-3xl font-semibold leading-tight tracking-tight text-neutral-950 sm:text-4xl">
              Traditional Jordanian Hummus
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-neutral-600">
              Made from dried chickpeas, blended with ice-cold water, and served the
              only way it should be — in a wide bowl with a pool of olive oil and warm
              bread on the side.
            </p>
            <div className="mt-5 flex flex-wrap gap-4 text-sm text-neutral-500">
              {[
                ["Prep", "12 hrs (soak)"],
                ["Cook", "1.5 hrs"],
                ["Serves", "4–6"],
                ["Difficulty", "Easy"],
              ].map(([label, val]) => (
                <div key={label} className="rounded-xl border border-black/8 bg-white px-3 py-1.5">
                  <span className="text-neutral-400">{label}: </span>
                  <span className="font-medium text-neutral-800">{val}</span>
                </div>
              ))}
            </div>
          </header>

          {/* Hero image */}
          <figure className="mb-10">
            <div className="relative h-64 w-full overflow-hidden rounded-3xl sm:h-80">
              <Image
                src="/images/blog/hummus-and-zowar-puzzle.jpg"
                alt="Hummus with olive oil and fresh bread on a table alongside a phone showing the Zowar puzzle experience"
                fill
                className="object-cover"
                style={{ objectPosition: "center 55%" }}
                sizes="(max-width: 768px) 100vw, 768px"
                priority
              />
            </div>
            <figcaption className="mt-2 text-center text-xs text-neutral-400">Hummus with olive oil and fresh khubz — the way it should always be served</figcaption>
          </figure>

          {/* Intro */}
          <section className="rounded-3xl border border-black/8 bg-white p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-neutral-950">Before you start</h2>
            <div className="mt-4 space-y-4 text-sm leading-7 text-neutral-700">
              <p>
                Hummus has been eaten across the Levant for centuries. The word simply
                means chickpeas in Arabic — hummus bi tahini means chickpeas with tahini,
                which is what the dish technically is. In Jordan, it is a staple of the
                morning table, served warm and freshly made, not refrigerated and
                re-heated.
              </p>
              <p>
                The difference between the hummus you buy in a supermarket and the hummus
                you eat in Amman comes down to three things: starting with dried
                chickpeas, using excellent tahini, and blending with ice-cold water. None
                of these steps are complicated. They just require a little planning ahead.
              </p>
              <p>
                This recipe follows the traditional Jordanian method. Make it the night
                before for breakfast, or the morning of for lunch. It does not keep well
                beyond a day or two — but it rarely needs to.
              </p>
            </div>
          </section>

          {/* Ingredients */}
          <section className="mt-8 rounded-3xl border border-black/8 bg-white p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-neutral-950">Ingredients</h2>
            <p className="mt-1 text-sm text-neutral-500">Makes 4–6 servings as part of a mezze spread</p>
            <div className="mt-5 space-y-3">
              {ingredients.map((ing) => (
                <div key={ing.item} className="flex items-start gap-4 border-b border-black/5 pb-3 last:border-0 last:pb-0">
                  <span className="w-20 shrink-0 text-sm font-semibold text-[#c8694a]">{ing.amount}</span>
                  <div>
                    <span className="text-sm font-medium text-neutral-900">{ing.item}</span>
                    {ing.note && (
                      <p className="mt-0.5 text-xs text-neutral-500">{ing.note}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Method */}
          <section className="mt-8">
            <h2 className="mb-5 text-xl font-semibold text-neutral-950">Method</h2>
            <div className="space-y-5">
              {steps.map((step) => (
                <div key={step.n} className="rounded-3xl border border-black/8 bg-white p-6 sm:p-8">
                  <div className="flex items-baseline gap-3">
                    <span className="text-2xl font-bold text-[#c8694a]/25 tabular-nums">{step.n}</span>
                    <h3 className="text-base font-semibold text-neutral-950">{step.title}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-neutral-700">{step.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Tips */}
          <section className="mt-8 rounded-3xl border border-black/8 bg-white p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-neutral-950">Tips for the best result</h2>
            <ul className="mt-5 space-y-5 text-sm leading-7 text-neutral-700">
              {[
                ["Tahini quality is everything.", "Buy tahini made from 100% sesame seeds with no additives. Jordanian and Lebanese brands tend to be the best. If your tahini tastes bitter or is separated and oily at the top of the jar, it will give you inferior hummus."],
                ["Blend for longer than you think.", "Most people underblend. Two full minutes in a food processor transforms grainy mashed chickpeas into something genuinely smooth. Keep going."],
                ["The chickpeas must be warm when blended.", "Cold chickpeas seize up and never blend as smoothly. Blend them hot or warm from the pot."],
                ["Do not rush the soak.", "Twelve hours minimum. Some cooks soak for 24. The longer the soak, the softer the chickpea, the smoother the hummus."],
                ["Serve at room temperature.", "Hummus should never be cold. If you made it ahead, let it come to room temperature before serving and refresh the olive oil on top."],
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

          {/* Tea/serving image */}
          <figure className="mt-8">
            <div className="relative h-60 w-full overflow-hidden rounded-3xl sm:h-72">
              <Image
                src="/images/blog/jordanian-tea-cafe-table.jpg"
                alt="Jordanian tea in glass cups on a wooden café table — a typical serving alongside hummus"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
            <figcaption className="mt-2 text-center text-xs text-neutral-400">Hummus is always served with tea at a Jordanian breakfast — the two are inseparable</figcaption>
          </figure>

          {/* Serve with */}
          <section className="mt-8 rounded-3xl border border-black/8 bg-white p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-neutral-950">What to serve with hummus</h2>
            <div className="mt-4 space-y-4 text-sm leading-7 text-neutral-700">
              <p>
                In Jordan, hummus is almost always part of a larger spread rather than a
                standalone dish. It appears at breakfast alongside ful medames (slow-cooked
                fava beans), falafel, labneh, olives, tomatoes, and warm flatbread. It is
                also served at lunch and dinner as part of the mezze table before the main
                course arrives.
              </p>
              <p>
                Warm flatbread or khubz is the traditional accompaniment — never crackers
                or crudités, which are a Western adaptation. In Amman, many restaurants
                bake their bread fresh and bring it continuously throughout the meal.
              </p>
              <p>
                Hummus msabbaha (also called masabacha) is a variation where the chickpeas
                are left whole or roughly broken and served warm in the tahini-lemon sauce
                — a more rustic, textured version that is popular for breakfast in Jordan
                and across the Levant.
              </p>
            </div>
          </section>

          {/* Where to eat */}
          <section className="mt-8 rounded-3xl border border-[#c8694a]/20 bg-z-orange-soft p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c8694a]">Eat it in Amman</p>
            <h2 className="mt-2 text-xl font-semibold text-neutral-950">
              Where to eat hummus in Amman
            </h2>
            <p className="mt-3 text-sm leading-7 text-neutral-700">
              If you want to taste the real thing in context, Abu Jbara and Abu Mahjoud
              both serve excellent hummus as part of a full Jordanian breakfast spread.
              The Zowar experience also stops at curated local spots along Rainbow Street
              where hummus is part of the tasting.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/blog/best-breakfast-amman"
                className="inline-flex items-center gap-2 rounded-2xl bg-[#c8694a] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
              >
                Best breakfast in Amman →
              </Link>
              <Link
                href="/booking"
                className="inline-flex items-center gap-2 rounded-2xl border border-black/10 bg-white px-5 py-2.5 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50"
              >
                Book Zowar experience →
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
