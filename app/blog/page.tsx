import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Journal – Amman Food & Travel Guides",
  description:
    "Guides to eating, exploring, and experiencing Amman and Jordan — from the best breakfast spots to neighbourhood walks.",
  alternates: { canonical: "https://zowar.net/blog" },
  openGraph: {
    title: "Zowar Journal – Amman Food & Travel Guides",
    description:
      "Local guides to eating and exploring Amman, Jordan.",
    url: "https://zowar.net/blog",
    images: [{ url: "/logo.png", width: 1200, height: 630 }],
  },
};

const posts = [
  {
    slug: "best-breakfast-amman",
    title: "Best Breakfast Places in Amman, Jordan",
    description:
      "From crispy falafel at Al Quds to slow morning plates at Khashooga — a local guide to the most iconic breakfast spots in Amman.",
    tag: "Food Guide",
    readTime: "8 min read",
  },
];

export default function BlogIndex() {
  return (
    <div className="min-h-screen bg-[#faf7f2] text-neutral-900">
      {/* Nav strip */}
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
