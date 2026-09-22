import type { Metadata } from "next";
import HomeClient from "./home_client";

export const metadata: Metadata = {
  title: "Zowar | Self-Guided Food & Puzzle Experience in Amman",
  description:
    "Explore Amman's iconic Rainbow Street on a self-guided food and puzzle adventure. Discover local restaurants, solve clues, and taste Jordanian flavors. From 25 JOD per person.",
  alternates: {
    canonical: "https://zowar.net",
    languages: {
      "x-default": "https://zowar.net",
      en: "https://zowar.net/?lang=en",
      ar: "https://zowar.net/?lang=ar",
      es: "https://zowar.net/?lang=es",
    },
  },
  openGraph: {
    title: "Zowar | Self-Guided Food & Puzzle Experience in Amman",
    description:
      "Explore Amman's iconic Rainbow Street on a self-guided food and puzzle adventure. Discover local restaurants, solve clues, and taste Jordanian flavors.",
    url: "https://zowar.net",
    images: [{ url: "/logo.png", width: 1200, height: 630 }],
  },
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "TouristAttraction"],
      "@id": "https://zowar.net/#business",
      name: "Zowar",
      description:
        "Self-guided food and puzzle walk through Amman's iconic Rainbow Street. Discover local restaurants, solve clues, and experience Jordanian culture.",
      url: "https://zowar.net",
      logo: "https://zowar.net/logo.png",
      image: "https://zowar.net/logo.png",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Rainbow Street",
        addressLocality: "Amman",
        addressRegion: "Amman Governorate",
        addressCountry: "JO",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 31.9539,
        longitude: 35.9106,
      },
      areaServed: { "@type": "City", name: "Amman" },
      sameAs: ["https://www.instagram.com/zowar.jo/"],
      priceRange: "$$",
      currenciesAccepted: "JOD",
      paymentAccepted: "Credit Card",
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          opens: "09:30",
          closes: "19:00",
        },
      ],
      hasMap: "https://maps.app.goo.gl/X4rE5Tv96jMD7aDw9",
      touristType: ["Tourists", "Locals", "Couples", "Families", "Groups"],
      keywords:
        "things to do in Amman, Jordan travel, food tour Amman, Rainbow Street, self-guided tour Jordan, things to do in Jordan, Amman food walk, puzzle tour",
    },
    {
      "@type": "Product",
      "@id": "https://zowar.net/#experience",
      name: "Zowar Rainbow Street Experience",
      description:
        "A self-guided food and puzzle walk through Amman's Rainbow Street. Explore 7 curated stops, solve clues, and taste iconic Jordanian bites. Takes 3–4 hours — a half day on Rainbow Street.",
      brand: { "@type": "Brand", name: "Zowar" },
      category: "Tours & Experiences",
      offers: {
        "@type": "Offer",
        price: "25",
        priceCurrency: "JOD",
        availability: "https://schema.org/InStock",
        url: "https://zowar.net/booking",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://zowar.net/#website",
      url: "https://zowar.net",
      name: "Zowar",
      description: "Self-guided food and puzzle walks in Amman, Jordan",
      inLanguage: ["en", "ar", "es"],
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <HomeClient />
    </>
  );
}
