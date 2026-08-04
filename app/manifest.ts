import type { MetadataRoute } from "next";

/**
 * PWA manifest for the Consilium app.
 *
 * Every entry point is /start, the cohort router, because a manifest
 * cannot branch per user: it routes active Consilium members to their
 * feed and everyone else into the app shell. Pointing start_url at a
 * cohort's URL instead is what broke this before, when it named
 * /consilium/feed directly: the consilium layout gates on Consilium
 * membership alone and never consults pact entitlement, so a free
 * account (and, worse, a paying Blood Pact member) tapped the installed
 * icon and was bounced to the /consilium sales page, with the app
 * unreachable from the home screen.
 *
 * Scope stays root so a member who follows a link to an older surface stays
 * inside the installed window rather than getting kicked to the browser.
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
    // Shortcuts land in the app rather than /start: they name a specific
    // room, so routing them through the cohort router would collapse all
    // three onto the same destination. Every target is reachable by every
    // signed-in account; the member-only ones show their own wall to a
    // free account instead of ejecting it to another shell.
    shortcuts: [
      {
        name: "Feed",
        short_name: "Feed",
        description: "Today at the Council",
        url: "/app/feed",
      },
      {
        name: "Train",
        short_name: "Train",
        description: "Scenarios, drills, and the Lab",
        url: "/app/train",
      },
      {
        name: "Message Kanika",
        short_name: "Kanika",
        description: "Your private line",
        url: "/app/kanika",
      },
    ],
  };
}
