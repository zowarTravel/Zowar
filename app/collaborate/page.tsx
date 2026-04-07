// app/collaborate/page.tsx
import React, { Suspense } from "react";
import type { Metadata } from "next";
import CollaborateClient from "./collaborate_client";

type Locale = "en" | "ar" | "es";

function safeLocale(x: unknown): Locale {
  return x === "ar" ? "ar" : x === "es" ? "es" : "en";
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { lang?: string } | Promise<{ lang?: string }>;
}): Promise<Metadata> {
  const sp = await Promise.resolve(searchParams);
  const isAr = sp?.lang === "ar";

  return {
    title: isAr ? "الشراكات | زوّار" : "Partner with Zowar | Food Puzzle Walks in Amman",
    description: isAr
      ? "تعاون مع زوّار وأضف محلك لمسارات تجربة الطعام في عمّان."
      : "Partner your Amman café, restaurant, or food spot with Zowar's guided food puzzle walks.",
    alternates: {
      canonical: "https://zowar.jo/collaborate",
      languages: {
        en: "https://zowar.jo/collaborate?lang=en",
        ar: "https://zowar.jo/collaborate?lang=ar",
        es: "https://zowar.jo/collaborate?lang=es",
      },
    },
    openGraph: {
      title: isAr ? "الشراكات | زوّار" : "Partner with Zowar",
      description: isAr
        ? "تعاون مع زوّار وأضف محلك لمسارات تجربة الطعام في عمّان."
        : "Partner your Amman café, restaurant, or food spot with Zowar's guided food puzzle walks.",
      url: "https://zowar.jo/collaborate",
      images: [{ url: "/og-collaborate.jpg" }],
    },
  };
}

export default async function CollaboratePage({
  searchParams,
}: {
  searchParams: { lang?: string } | Promise<{ lang?: string }>;
}) {
  const sp = await Promise.resolve(searchParams);
  const locale = safeLocale(sp?.lang);

  return (
    <Suspense fallback={<div className="p-6">Loading…</div>}>
      <CollaborateClient locale={locale} />
    </Suspense>
  );
}