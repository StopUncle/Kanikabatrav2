import type { MetadataRoute } from "next";

/**
 * PWA manifest, shared by both cohorts.
 *
 * One manifest cannot branch per user, so start_url and every shortcut
 * point at /start, the cohort router: active Consilium members land on
 * /consilium/feed, everyone else lands in the app at /app. Scope stays
 * root so a member who follows a link to an older surface stays inside
 * the installed window rather than getting kicked to the browser.
 *
 * Icons are pre-rendered from the logo into /public/icons (192, 512, a
 * padded maskable for Android's circular crop, and the iOS touch icon).
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "The Consilium · Kanika Batra",
    short_name: "Consilium",
    description:
      "Read people better. Daily scenarios, Kanika's room, and your rank.",
    start_url: "/start",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#0a0908",
    theme_color: "#0a0908",
    categories: ["lifestyle", "education", "social"],
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    // One shortcut, cohort-safe. The old trio deep-linked /consilium/*,
    // which for a free app account is three doors into a sales page.
    shortcuts: [
      {
        name: "Open",
        short_name: "Open",
        description: "Pick up where you left off",
        url: "/start",
      },
    ],
  };
}
