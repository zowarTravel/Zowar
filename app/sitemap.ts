import type { MetadataRoute } from "next";

const BASE = "https://zowar.net";

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
    {
      url: `${BASE}/experiences/rainbow-street`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${BASE}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE}/blog/3-days-in-amman`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: { languages: { en: `${BASE}/blog/3-days-in-amman`, es: `${BASE}/blog/es/3-dias-en-aman` } },
    },
    {
      url: `${BASE}/blog/es/3-dias-en-aman`,
      lastModified: new Date("2026-11-06"),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: { languages: { en: `${BASE}/blog/3-days-in-amman`, es: `${BASE}/blog/es/3-dias-en-aman` } },
    },
    {
      url: `${BASE}/blog/es/jordan-pass`,
      lastModified: new Date("2026-11-06"),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages: { en: `${BASE}/blog/jordan-pass`, es: `${BASE}/blog/es/jordan-pass` } },
    },
    {
      url: `${BASE}/blog/ar/best-breakfast-amman`,
      lastModified: new Date("2026-11-06"),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages: { en: `${BASE}/blog/best-breakfast-amman`, ar: `${BASE}/blog/ar/best-breakfast-amman` } },
    },
    {
      url: `${BASE}/blog/ar/best-restaurants-rainbow-street`,
      lastModified: new Date("2026-11-06"),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages: { en: `${BASE}/blog/best-restaurants-rainbow-street`, ar: `${BASE}/blog/ar/best-restaurants-rainbow-street` } },
    },
    {
      url: `${BASE}/blog/is-amman-safe`,
      lastModified: new Date("2026-10-18"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE}/blog/jordan-pass`,
      lastModified: new Date("2026-11-04"),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: { languages: { en: `${BASE}/blog/jordan-pass`, es: `${BASE}/blog/es/jordan-pass` } },
    },
    {
      url: `${BASE}/blog/amman-in-winter`,
      lastModified: new Date("2026-11-04"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE}/blog/best-breakfast-amman`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: { languages: { en: `${BASE}/blog/best-breakfast-amman`, ar: `${BASE}/blog/ar/best-breakfast-amman` } },
    },
    {
      url: `${BASE}/blog/rainbow-street-guide`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE}/blog/weibdeh-neighbourhood-guide`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE}/blog/traditional-hummus-recipe`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE}/blog/things-to-do-amman`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE}/blog/best-restaurants-rainbow-street`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
      alternates: { languages: { en: `${BASE}/blog/best-restaurants-rainbow-street`, ar: `${BASE}/blog/ar/best-restaurants-rainbow-street` } },
    },
    {
      url: `${BASE}/blog/things-to-do-amman-locals`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    },
  ];
}
