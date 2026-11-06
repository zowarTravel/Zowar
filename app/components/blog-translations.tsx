import Link from "next/link";

type Translation = { lang: "en" | "ar" | "es"; label: string; href: string };

/** "Also in: Español · العربية" line shown under a blog post's byline. */
export default function BlogTranslations({
  prefix,
  links,
}: {
  prefix: string;
  links: Translation[];
}) {
  return (
    <p className="mt-3 text-sm text-neutral-500">
      {prefix}{" "}
      {links.map((l, i) => (
        <span key={l.href}>
          {i > 0 && " · "}
          <Link
            href={l.href}
            hrefLang={l.lang}
            lang={l.lang}
            className="font-medium text-[#c8694a] hover:underline"
          >
            {l.label}
          </Link>
        </span>
      ))}
    </p>
  );
}
