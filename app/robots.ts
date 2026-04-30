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
          "/admin",
          "/admin/",
          "/dashboard",
          "/profile",
          "/login",
          "/register",
          "/forgot-password",
          "/reset-password",
          "/success",
          "/cancel",
          "/coaching/success",
          "/coaching/cancel",
          // Member-gated Consilium surfaces, no public value indexing these
          "/consilium/feed",
          "/consilium/voice-notes",
          "/consilium/classroom",
          "/consilium/simulator",
          "/consilium/previews",
          "/consilium/profile",
          "/consilium/chat",
          "/consilium/forum",
          "/consilium/book",
          "/consilium/quiz",
          "/consilium/badges",
          // Magic-claim landing, the URL contains a JWT in the query
          // string; indexing even the bare path would archive inbound
          // referrers/backlinks and risk replays.
          "/consilium/claim",
          "/consilium/success",
          // Quiz result pages are personal and occasionally contain email
          // in the URL query; no search-engine value indexing them.
          "/quiz/results",
          // Internal prototype route, not for public traffic
          "/simulator-demo",
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
