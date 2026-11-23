import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { posts } from "./posts";

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
    images: [
      {
        url: "/images/og/blog.jpg",
        width: 1200,
        height: 630,
        alt: "Rainbow Street sign with bougainvillea in Jabal Amman",
      },
    ],
  },
};

const translatedPosts = [
  {
    lang: "es",
    heading: "Guías en español",
    posts: [
      { title: "Amán en 3 días: itinerario completo", href: "/blog/es/3-dias-en-aman" },
      { title: "¿Merece la pena el Jordan Pass?", href: "/blog/es/jordan-pass" },
    ],
  },
  {
    lang: "ar",
    heading: "أدلة بالعربية",
    posts: [
      { title: "أفضل مطاعم الفطور في عمّان", href: "/blog/ar/best-breakfast-amman" },
      { title: "أفضل مطاعم شارع الرينبو", href: "/blog/ar/best-restaurants-rainbow-street" },
    ],
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
          <h1 className="text-3xl font-semibold tracking-tight text-neutral-950 text-balance sm:text-4xl">
            Amman Food &amp; Travel Guides
          </h1>
          <p className="mt-3 text-base leading-relaxed text-neutral-600">
            Local guides to eating, exploring, and experiencing Amman and Jordan — written
            by the team behind the Zowar experience.
          </p>
        </header>

        <div className="space-y-5">
          {posts.map((post, i) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col overflow-hidden rounded-3xl border border-black/8 bg-white transition hover:border-[#c8694a]/30 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8694a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#faf7f2] sm:flex-row"
            >
              <div className="relative aspect-[16/9] w-full shrink-0 bg-neutral-100 sm:aspect-auto sm:w-56">
                <Image
                  src={post.image}
                  alt={post.imageAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, 224px"
                  priority={i < 2}
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="p-6">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-z-orange bg-z-orange-soft px-2.5 py-0.5 text-xs font-semibold text-[#c8694a]">
                  {post.tag}
                </div>
                <h2 className="text-lg font-semibold text-neutral-950 text-balance group-hover:text-[#c8694a] transition">
                  {post.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-neutral-600">{post.description}</p>
                <div className="mt-4 flex items-center gap-3 text-xs text-neutral-600">
                  <span>{post.readTime}</span>
                  <span>·</span>
                  <span className="font-medium text-[#c8694a] group-hover:underline">
                    Read guide →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {translatedPosts.map((group) => (
            <section
              key={group.lang}
              lang={group.lang}
              dir={group.lang === "ar" ? "rtl" : "ltr"}
              className="rounded-3xl border border-black/8 bg-white p-6"
            >
              <h2 className="text-sm font-semibold text-neutral-700">{group.heading}</h2>
              <ul className="mt-3 space-y-2 text-sm">
                {group.posts.map((p) => (
                  <li key={p.href}>
                    <Link href={p.href} className="font-medium text-neutral-900 hover:text-[#c8694a] transition">
                      {p.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
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
