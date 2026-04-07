import type { MetadataRoute } from "next";

const BASE = "https://zowar.jo";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: {
          en: `${BASE}/?lang=en`,
          ar: `${BASE}/?lang=ar`,
          es: `${BASE}/?lang=es`,
        },
      },
    },
    {
      url: `${BASE}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          en: `${BASE}/about?lang=en`,
          ar: `${BASE}/about?lang=ar`,
          es: `${BASE}/about?lang=es`,
        },
      },
    },
    {
      url: `${BASE}/booking`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: {
          en: `${BASE}/booking?lang=en`,
          ar: `${BASE}/booking?lang=ar`,
          es: `${BASE}/booking?lang=es`,
        },
      },
    },
    {
      url: `${BASE}/faq`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          en: `${BASE}/faq?lang=en`,
          ar: `${BASE}/faq?lang=ar`,
          es: `${BASE}/faq?lang=es`,
        },
      },
    },
    {
      url: `${BASE}/collaborate`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          en: `${BASE}/collaborate?lang=en`,
          ar: `${BASE}/collaborate?lang=ar`,
          es: `${BASE}/collaborate?lang=es`,
        },
      },
    },
  ];
}
