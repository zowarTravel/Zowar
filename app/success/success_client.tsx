"use client";

import React from "react";
import { useRouter } from "next/navigation";

type Locale = "en" | "ar";

const copy = {
  en: {
    title: "Payment successful 🎉",
    body: "Your Portal is now unlocked.",
    button: "Enter the Portal",
  },
  ar: {
    title: "تم الدفع بنجاح 🎉",
    body: "تم فتح البوابة الخاصة بك.",
    button: "الدخول إلى البوابة",
  },
} as const;

export default function SuccessClient({
  locale,
  sessionId,
}: {
  locale: Locale;
  sessionId?: string;
}) {
  const router = useRouter();
  const isAr = locale === "ar";
  const t = copy[locale];

  React.useEffect(() => {
    localStorage.setItem("zowar_unlocked", "1");
    if (sessionId) localStorage.setItem("zowar_session_id", sessionId);
  }, [sessionId]);

  return (
    <main dir={isAr ? "rtl" : "ltr"} className="min-h-screen bg-neutral-950 text-white">
      <div className="mx-auto max-w-2xl px-6 py-16">
        <h1 className="text-3xl font-semibold">{t.title}</h1>
        <p className="mt-3 text-white/70">{t.body}</p>

        <button
          onClick={() => router.push(`/portal?lang=${isAr ? "ar" : "en"}`)}
          className="mt-8 rounded-2xl bg-orange-500 px-5 py-4 font-semibold text-neutral-950 hover:bg-orange-400"
        >
          {t.button}
        </button>
      </div>
    </main>
  );
}
