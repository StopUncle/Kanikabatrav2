import { MetadataRoute } from "next";

const BASE_URL = "https://kanikarose.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/dashboard",
          "/login",
          "/register",
          "/success",
          "/cancel",
          "/coaching/success",
          "/coaching/cancel",
          // Member-gated Consilium surfaces — no public value indexing these
          "/consilium/feed",
          "/consilium/voice-notes",
          "/consilium/classroom",
          "/consilium/simulator",
          "/consilium/previews",
          "/consilium/profile",
          "/consilium/chat",
          "/consilium/forum",
          // Internal prototype route — not for public traffic
          "/simulator-demo",
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
