import type { MetadataRoute } from "next";

/**
 * PWA manifest for the Consilium experience.
 *
 * Scope is root ("/") so the manifest applies across the marketing
 * site too, but the install prompt only appears on member pages —
 * the prompt component is mounted under the consilium layout, so
 * we don't pester non-members with "install this app" banners.
 *
 * Theme uses the existing dark luxury palette: deep-black bg,
 * accent-gold theme. Icons reference the existing logo PNG; iOS
 * Safari + Android Chrome will scale appropriately. Higher-fidelity
 * pre-rendered sizes (192/512/180/maskable) can be generated from
 * the same source later without a manifest change.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "The Consilium · Kanika Batra",
    short_name: "Consilium",
    description:
      "The Consilium membership: voice notes, classroom, simulator, and Kanika's daily psychology of power.",
    start_url: "/consilium/feed",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#050511",
    theme_color: "#050511",
    categories: ["lifestyle", "education", "social"],
    icons: [
      {
        src: "/images/kanikarose-logo.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/images/kanikarose-logo.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/images/kanikarose-logo.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    shortcuts: [
      {
        name: "Feed",
        short_name: "Feed",
        description: "Today's drop and recent posts",
        url: "/consilium/feed",
      },
      {
        name: "Voice Notes",
        short_name: "Voice",
        description: "Latest voice notes from Kanika",
        url: "/consilium/voice-notes",
      },
      {
        name: "Simulator",
        short_name: "Simulator",
        description: "The Dark Mirror Simulator",
        url: "/consilium/simulator",
      },
      {
        name: "Ask Kanika",
        short_name: "Ask",
        description: "Submit a question",
        url: "/consilium/feed",
      },
    ],
  };
}
