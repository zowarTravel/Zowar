import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/", "/portal/"],
      },
    ],
    sitemap: "https://zowar.net/sitemap.xml",
    host: "https://zowar.net",
  };
}
