import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Journal – Amman Food & Travel Guides",
  description:
    "Guides to eating, exploring, and experiencing Amman and Jordan — from the best breakfast spots to neighbourhood walks, hummus recipes, and the history of Rainbow Street.",
  alternates: {
    canonical: "https://zowar.net/blog",
    languages: { "x-default": "https://zowar.net/blog" },
  },
  openGraph: {
    title: "Zowar Journal – Amman Food & Travel Guides",
    description:
      "Local guides to eating and exploring Amman, Jordan — written by the team behind the Zowar experience.",
    url: "https://zowar.net/blog",
    images: [{ url: "/logo.png", width: 1200, height: 630 }],
  },
};

const posts = [
  {
    slug: "3-days-in-amman",
    title: "3 Days in Amman: The Complete Itinerary",
    description:
      "Rainbow Street and Weibdeh, the Citadel and Roman Theatre, day trips to Jerash and the Dead Sea — how to spend three days in Amman properly.",
    tag: "Travel Itinerary",
    readTime: "12 min read",
  },
  {
    slug: "things-to-do-amman",
    title: "Things to Do in Amman, Jordan",
    description:
      "The Citadel, Roman Theatre, Jordan Museum, Darat Al Funun, Rainbow Street, Weibdeh, and the Zowar experience — the complete local guide to Amman's best places to spend time.",
    tag: "Travel Guide",
    readTime: "16 min read",
  },
  {
    slug: "things-to-do-amman-locals",
    title: "Things to Do in Amman – Local Experiences",
    description:
      "Pottery workshops, free outdoor cinema above the city, live music in Weibdeh, a Friday market on Rainbow Street, and a self-guided food walk through the neighbourhood.",
    tag: "Local Guide",
    readTime: "12 min read",
  },
  {
    slug: "best-restaurants-rainbow-street",
    title: "Best Restaurants on Rainbow Street, Amman",
    description:
      "From Sufra and Shams Al Balad to Maisa Space, Namliyeh, Wild Jordan Café, Books@Café, and Al-Quds Falafel — where to eat on Rainbow Street.",
    tag: "Food Guide",
    readTime: "14 min read",
  },
  {
    slug: "best-breakfast-amman",
    title: "Best Breakfast Places in Amman, Jordan",
    description:
      "Traditional spots like Al-Quds Falafel, Abu Jbara and Khashoka alongside modern takes at Shams Al Balad, Rumman Collective and Blue Fig — the definitive local guide.",
    tag: "Food Guide",
    readTime: "12 min read",
  },
  {
    slug: "rainbow-street-guide",
    title: "Rainbow Street, Amman: History, Cinema & Complete Guide",
    description:
      "How a residential ridge became a cultural street, the story of the 1957 Rainbow Cinema, and everything to do, eat, and see there today.",
    tag: "Neighbourhood Guide",
    readTime: "8 min read",
  },
  {
    slug: "weibdeh-neighbourhood-guide",
    title: "Jabal Al-Weibdeh: Amman's Creative Quarter",
    description:
      "Darat Al Funun, the Jordan National Gallery, Rumi Café, and the quiet stone lanes of one of Amman's most atmospheric neighbourhoods.",
    tag: "Neighbourhood Guide",
    readTime: "7 min read",
  },
  {
    slug: "traditional-hummus-recipe",
    title: "Traditional Jordanian Hummus Recipe",
    description:
      "The authentic method — dried chickpeas, high-quality tahini, ice-cold water, and the techniques that separate Jordanian hummus from everything else.",
    tag: "Recipe",
    readTime: "6 min read",
  },
];

export default function BlogIndex() {
  return (
    <div className="min-h-screen bg-[#faf7f2] text-neutral-900">
      <div className="border-b border-black/8 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center gap-4 px-6 py-4 text-sm">
          <Link href="/" className="text-neutral-500 hover:text-neutral-800 transition">
            Zowar
          </Link>
          <span className="text-neutral-300">/</span>
          <span className="text-neutral-700">Journal</span>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 py-14">
        <header className="mb-10">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-z-orange bg-z-orange-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-[#c8694a]">
            Zowar Journal
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
            Amman Food &amp; Travel Guides
          </h1>
          <p className="mt-3 text-base leading-relaxed text-neutral-600">
            Local guides to eating, exploring, and experiencing Amman and Jordan — written
            by the team behind the Zowar experience.
          </p>
        </header>

        <div className="space-y-5">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block rounded-3xl border border-black/8 bg-white p-6 transition hover:border-[#c8694a]/30 hover:shadow-md"
            >
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-z-orange bg-z-orange-soft px-2.5 py-0.5 text-xs font-semibold text-[#c8694a]">
                {post.tag}
              </div>
              <h2 className="text-lg font-semibold text-neutral-950 group-hover:text-[#c8694a] transition">
                {post.title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-neutral-600">{post.description}</p>
              <div className="mt-4 flex items-center gap-3 text-xs text-neutral-400">
                <span>{post.readTime}</span>
                <span>·</span>
                <span className="font-medium text-[#c8694a] group-hover:underline">
                  Read guide →
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-14 border-t border-black/8 pt-8 text-center text-sm text-neutral-500">
          More guides coming soon.{" "}
          <Link href="/" className="font-medium text-[#c8694a] hover:underline">
            Back to Zowar →
          </Link>
        </div>
      </div>
    </div>
  );
}
