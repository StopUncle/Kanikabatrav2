import type { MetadataRoute } from "next";

/**
 * PWA manifest for the Consilium app.
 *
 * Installed members land in the app shell at /app, not on a website page.
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
    start_url: "/consilium/feed",
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
    shortcuts: [
      {
        name: "Feed",
        short_name: "Feed",
        description: "Today at the Council",
        url: "/consilium/feed",
      },
      {
        name: "Simulator",
        short_name: "Simulator",
        description: "Scenarios, drills, and the Lab",
        url: "/consilium/simulator",
      },
      {
        name: "Message Kanika",
        short_name: "Kanika",
        description: "Your private line",
        url: "/consilium/messages",
      },
    ],
  };
}
