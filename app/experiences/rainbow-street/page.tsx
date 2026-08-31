import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Rainbow Street Experience – Self-Guided Food & Puzzle Walk in Amman",
  description:
    "Explore Rainbow Street in Amman on a self-guided food and puzzle walk. 7 curated stops, 3–4 hours, over 25 JOD in tastings and gifts. Book from 30 JOD per person.",
  alternates: {
    canonical: "https://zowar.net/experiences/rainbow-street",
    languages: {
      "x-default": "https://zowar.net/experiences/rainbow-street",
    },
  },
  openGraph: {
    title: "Rainbow Street Experience – Zowar, Amman",
    description:
      "A self-guided food and puzzle walk through Amman's iconic Rainbow Street. Solve clues, taste local bites, discover the city at your own pace.",
    url: "https://zowar.net/experiences/rainbow-street",
    images: [{ url: "/logo.png", width: 1200, height: 630 }],
  },
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TouristTrip",
      "@id": "https://zowar.net/experiences/rainbow-street#trip",
      name: "Zowar Rainbow Street Experience",
      description:
        "A self-guided food and puzzle walk through Amman's iconic Rainbow Street. Follow clues, taste Jordanian bites at 7 curated local stops, and discover the city at your own pace. Takes 3–4 hours — a half day in one of Amman's most vibrant neighbourhoods.",
      url: "https://zowar.net/experiences/rainbow-street",
      touristType: ["Tourists", "Locals", "Couples", "Families"],
      itinerary: {
        "@type": "ItemList",
        name: "Rainbow Street Route",
        numberOfItems: 7,
        description:
          "7 curated stops along Rainbow Street in Amman, including local restaurants, cafés, and cultural landmarks.",
      },
      offers: {
        "@type": "Offer",
        price: "30",
        priceCurrency: "JOD",
        availability: "https://schema.org/InStock",
        url: "https://zowar.net/booking",
      },
      provider: {
        "@type": "LocalBusiness",
        name: "Zowar",
        url: "https://zowar.net",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is the Rainbow Street Experience by Zowar?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A self-guided food and puzzle walk on Rainbow Street in Amman, Jordan. You follow clues on your phone, stop at 7 curated local spots, taste iconic Jordanian food, and discover the street at your own pace. No tour guide needed.",
          },
        },
        {
          "@type": "Question",
          name: "How long does the Rainbow Street walk take?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Most groups complete the experience in 3 to 4 hours — approximately half a day on Rainbow Street.",
          },
        },
        {
          "@type": "Question",
          name: "How much does the Rainbow Street experience cost?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The Zowar Rainbow Street experience starts at 30 JOD per person, and includes over 25 JOD worth of food tastings and a Jordanian gift at the final stop.",
          },
        },
        {
          "@type": "Question",
          name: "Is Rainbow Street good for tourists?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Rainbow Street is one of Amman's most vibrant and accessible neighbourhoods, with local restaurants, cafés, craft shops, and city views. The Zowar experience is designed to introduce both first-time visitors and locals to the best the street has to offer.",
          },
        },
      ],
    },
  ],
};

export default function RainbowStreetExperiencePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <main className="min-h-screen bg-[#faf7f2] text-neutral-900">
        <div className="border-b border-black/8 bg-white/80 backdrop-blur-md">
          <div className="mx-auto flex max-w-3xl items-center gap-4 px-6 py-4 text-sm">
            <Link href="/" className="text-neutral-500 hover:text-neutral-800 transition">
              Zowar
            </Link>
            <span className="text-neutral-300">/</span>
            <span className="text-neutral-700">Rainbow Street Experience</span>
          </div>
        </div>

        <div className="mx-auto max-w-3xl px-6 py-14">
          <header className="mb-10">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#c8694a] bg-[#fef3ee] px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-[#c8694a]">
              Self-Guided Experience
            </div>
            <h1 className="text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
              Rainbow Street Experience
            </h1>
            <p className="mt-3 text-base leading-relaxed text-neutral-600">
              A self-guided food and puzzle walk through Amman&apos;s most iconic street — 7 curated
              stops, 3–4 hours, and over 25 JOD in tastings and gifts included.
            </p>
          </header>

          <section className="mb-10 rounded-3xl border border-black/8 bg-white p-8">
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">What is this experience?</h2>
            <p className="text-neutral-600 leading-relaxed">
              The Zowar Rainbow Street Experience is a self-guided adventure that takes you through
              Amman&apos;s Rainbow Street neighbourhood at your own pace. Using your phone, you follow a
              series of clues and puzzles that lead you from one local stop to the next — tasting
              iconic Jordanian food, discovering hidden gems, and connecting the pieces of the city
              along the way.
            </p>
            <p className="mt-4 text-neutral-600 leading-relaxed">
              It is designed for tourists visiting Amman for the first time, locals who want to
              rediscover their city, couples looking for a memorable outing, and small groups who
              want more than a standard restaurant visit or guided tour. No guide. No fixed
              schedule. Just Rainbow Street, your phone, and a route designed to surprise you.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-neutral-900 mb-6">Experience at a glance</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { label: "Duration", value: "3–4 hours" },
                { label: "Stops", value: "7 curated spots" },
                { label: "Price", value: "30 JOD / person" },
                { label: "Included", value: "25+ JOD in tastings & gifts" },
                { label: "Days", value: "Tuesday – Saturday" },
                { label: "Language", value: "English & Arabic" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-black/8 bg-white p-4"
                >
                  <div className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
                    {item.label}
                  </div>
                  <div className="mt-1 text-sm font-semibold text-neutral-900">{item.value}</div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-10 rounded-3xl border border-black/8 bg-white p-8">
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">How it works</h2>
            <ol className="space-y-4 text-neutral-600 leading-relaxed list-decimal list-inside">
              <li>
                <strong className="text-neutral-900">Book online</strong> — choose your date
                on the booking page and pay securely. You pay once; there are no surprise charges
                during the experience.
              </li>
              <li>
                <strong className="text-neutral-900">Unlock the Puzzle Portal</strong> — after
                checkout, you receive a confirmation email with your portal access link. Open it
                on the day of your experience.
              </li>
              <li>
                <strong className="text-neutral-900">Follow the clues</strong> — the Portal
                guides you through Rainbow Street, stop by stop. Hints are available if you get
                stuck.
              </li>
              <li>
                <strong className="text-neutral-900">Taste and discover</strong> — at each stop
                you taste something iconic and learn something new about Amman. The final stop
                includes a Jordanian gift.
              </li>
            </ol>
          </section>

          <section className="mb-10 rounded-3xl border border-black/8 bg-white p-8">
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">About Rainbow Street</h2>
            <p className="text-neutral-600 leading-relaxed">
              Rainbow Street — officially Al-Rainbow Street — runs through Jabal Al-Weibdeh, one
              of Amman&apos;s oldest and most atmospheric hillside neighbourhoods. The street earned its
              name from the Rainbow Cinema, which opened here in 1957 and became a cultural landmark
              for generations of Ammanis. Today the cinema is gone, but Rainbow Street remains one
              of the city&apos;s most beloved destinations — lined with local restaurants, cafés, craft
              shops, and panoramic views over Amman&apos;s hills.
            </p>
            <p className="mt-4 text-neutral-600 leading-relaxed">
              It is the kind of street that rewards curiosity — the more you look, the more you
              find. The Zowar experience is designed around exactly that idea.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-neutral-900 mb-6">Frequently asked questions</h2>
            <div className="space-y-4">
              {[
                {
                  q: "Do I need to know Amman to participate?",
                  a: "No. The experience is designed for both first-time visitors and locals. The Puzzle Portal guides you step by step.",
                },
                {
                  q: "What should I bring?",
                  a: "A charged smartphone with internet access and comfortable walking shoes. The experience involves a moderate amount of walking.",
                },
                {
                  q: "Can I do it with children?",
                  a: "Yes. The experience is family-friendly and designed to be approachable for a wide range of guests.",
                },
                {
                  q: "Is parking available on Rainbow Street?",
                  a: "Street parking is available in the area. We recommend arriving by taxi or Uber if you prefer not to drive.",
                },
              ].map((item) => (
                <details
                  key={item.q}
                  className="group rounded-2xl border border-black/8 bg-white p-5"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-neutral-900">
                    <span>{item.q}</span>
                    <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-black/[0.03] border border-black/10 text-[#c8694a] transition group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-sm text-neutral-600 leading-relaxed">{item.a}</p>
                </details>
              ))}
            </div>
          </section>

          <div className="rounded-3xl border border-[#c8694a]/20 bg-[#fef3ee] p-8 text-center">
            <h2 className="text-xl font-semibold text-neutral-900">
              Ready to explore Rainbow Street?
            </h2>
            <p className="mt-2 text-neutral-600">
              Book your spot for 30 JOD per person. Over 25 JOD in tastings and gifts included.
            </p>
            <Link
              href="/booking"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-[#c8694a] px-8 py-4 text-sm font-extrabold text-white transition hover:opacity-95"
            >
              Book the Experience →
            </Link>
            <p className="mt-3 text-xs text-neutral-500">
              Available Tuesday – Saturday · English &amp; Arabic
            </p>
          </div>

          <div className="mt-12 border-t border-black/8 pt-8 text-sm text-neutral-500">
            <p>
              Explore more:{" "}
              <Link href="/faq" className="text-[#c8694a] hover:underline">
                FAQ
              </Link>
              {" · "}
              <Link href="/about" className="text-[#c8694a] hover:underline">
                About Zowar
              </Link>
              {" · "}
              <Link href="/blog/rainbow-street-guide" className="text-[#c8694a] hover:underline">
                Rainbow Street Guide
              </Link>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
