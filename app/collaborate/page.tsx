// app/collaborate/page.tsx
import React, { Suspense } from "react";
import CollaborateClient from "./collaborate_client";

type Locale = "en" | "ar";

function safeLocale(x: unknown): Locale {
  return x === "ar" ? "ar" : "en";
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