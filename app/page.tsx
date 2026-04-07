import type { Metadata } from "next";
import HomeClient from "./home_client";

export const metadata: Metadata = {
  title: "Zowar | Food Puzzle Walks in Amman",
  description:
    "A self-guided city experience in Amman, Jordan. Solve puzzles, taste iconic bites, and discover the city at your own pace.",
  alternates: {
    canonical: "https://zowar.jo",
    languages: {
      en: "https://zowar.jo/?lang=en",
      ar: "https://zowar.jo/?lang=ar",
      es: "https://zowar.jo/?lang=es",
    },
  },
  openGraph: {
    title: "Zowar | Food Puzzle Walks in Amman",
    description:
      "A self-guided city experience in Amman, Jordan. Solve puzzles, taste iconic bites, and discover the city at your own pace.",
    url: "https://zowar.jo",
    images: [{ url: "/og-home.jpg", width: 1200, height: 630 }],
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Zowar",
  description:
    "Self-guided food puzzle walks in Amman, Jordan. Solve clues, taste iconic bites, and discover the city at your own pace.",
  url: "https://zowar.jo",
  logo: "https://zowar.jo/logo.png",
  image: "https://zowar.jo/og-home.jpg",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Amman",
    addressCountry: "JO",
  },
  sameAs: ["https://www.instagram.com/zowar.jo/"],
  priceRange: "$$",
  currenciesAccepted: "USD",
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <HomeClient />
    </>
  );
}
