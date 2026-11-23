import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#faf7f2] text-neutral-900">
      <div className="border-b border-black/8 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center gap-4 px-6 py-4 text-sm">
          <Link href="/" className="text-neutral-500 hover:text-neutral-800 transition">
            Zowar
          </Link>
          <span className="text-neutral-300">/</span>
          <span className="text-neutral-700">Not found</span>
        </div>
      </div>

      <main className="mx-auto max-w-3xl px-6 py-20 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c8694a]">404</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-950 text-balance sm:text-4xl">
          This page took a wrong turn
        </h1>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-neutral-600">
          The link may be old, or the address may have a typo. Here are the places most
          people are looking for.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/booking"
            className="inline-flex w-full items-center justify-center rounded-full bg-z-orange px-8 py-3.5 text-sm font-extrabold text-neutral-950 transition hover:opacity-95 sm:w-auto"
          >
            Book the Experience
          </Link>
          <Link
            href="/blog"
            className="inline-flex w-full items-center justify-center rounded-full border border-black/10 bg-white px-8 py-3.5 text-sm font-semibold text-neutral-800 transition hover:border-[#c8694a]/40 sm:w-auto"
          >
            Read the Journal
          </Link>
        </div>

        <p className="mt-10 text-sm text-neutral-600">
          <Link href="/" className="font-medium text-[#c8694a] hover:underline">
            Back to the homepage →
          </Link>
        </p>
      </main>
    </div>
  );
}
