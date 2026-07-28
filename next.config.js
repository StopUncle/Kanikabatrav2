const { withSentryConfig } = require("@sentry/nextjs");

/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  // Lock in barrel-import tree-shaking regardless of Next's shifting defaults.
  // lucide-react is imported as named icons in ~220 files; without this a
  // change to Next's built-in default list could silently pull the whole
  // icon set into client bundles.
  experimental: {
    optimizePackageImports: ["framer-motion", "lucide-react"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.youtube.com",
        pathname: "/vi/**",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        pathname: "/**",
      },
      // Cloudflare R2 — voice notes, course thumbnails, member avatars
      {
        protocol: "https",
        hostname: "*.r2.dev",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.r2.cloudflarestorage.com",
        pathname: "/**",
      },
      // Legacy avatar hosts — can be pruned once all avatars are R2-hosted
      {
        protocol: "https",
        hostname: "ui-avatars.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            // microphone=(self) — the admin voice-note recorder uses
            // MediaRecorder + getUserMedia, which the response header
            // enforces in Chrome/Safari. microphone=() silently blocks
            // recording even on same-origin and produces a confusing
            // "NotAllowedError" in the admin console. Camera and
            // geolocation stay empty-allowlist — nothing on the site
            // needs them.
            key: "Permissions-Policy",
            value: "camera=(), microphone=(self), geolocation=()",
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        // The member app shell lives at app/hub on disk but serves at /app.
        // The route directory cannot be named app/app: a segment folder
        // literally named "app" breaks Linux builds (Railway) — every page
        // loses static prerendering and renders through the shell layout,
        // which auth-redirects the whole site (including /login) into a
        // loop. Windows builds are unaffected, so this only surfaced on
        // deploy. Public URLs stay /app/*; only the folder name changed.
        source: "/app",
        destination: "/hub",
      },
      {
        source: "/app/:path*",
        destination: "/hub/:path*",
      },
    ];
  },
  async redirects() {
    return [
      {
        // Canonicalize direct /hub hits back to /app so the shell has one
        // public URL. Runs before the rewrite above, which then maps /app
        // back onto the hub files internally (no loop: rewrites are
        // server-internal).
        source: "/hub",
        destination: "/app",
        permanent: false,
      },
      {
        source: "/hub/:path*",
        destination: "/app/:path*",
        permanent: false,
      },
      // Six member surfaces moved out of /consilium and into the app: they
      // are the ones the July cutover left behind, so the app had entrances
      // that handed the member back to the old shell. The page files now
      // live under app/hub, so these paths have nothing left to serve and
      // these redirects catch bookmarks, emails and any link still in the
      // wild. 302 for the same reason the cutover used 302: a 301 is cached
      // ~forever and backing out would need every member to clear history.
      // Query strings carry over, so ?track= survives the hop.
      {
        source: "/consilium/adventures/:path*",
        destination: "/app/adventures/:path*",
        permanent: false,
      },
      { source: "/consilium/adventures", destination: "/app/adventures", permanent: false },
      { source: "/consilium/lab", destination: "/app/lab", permanent: false },
      { source: "/consilium/receipts", destination: "/app/receipts", permanent: false },
      {
        source: "/consilium/previews/:path*",
        destination: "/app/previews/:path*",
        permanent: false,
      },
      { source: "/consilium/previews", destination: "/app/previews", permanent: false },
      {
        source: "/consilium/instincts/:path*",
        destination: "/app/instincts/:path*",
        permanent: false,
      },
      // Order matters: the two named simulator children must be matched
      // before :scenarioId swallows them. The leaderboard has no app twin
      // of its own because /app/ranks already renders the same XP board
      // (plus Standing), so it lands there rather than on a second copy.
      {
        source: "/consilium/simulator/achievements",
        destination: "/app/train/achievements",
        permanent: false,
      },
      {
        source: "/consilium/simulator/leaderboard",
        destination: "/app/ranks?board=xp",
        permanent: false,
      },
      {
        source: "/consilium/simulator/:scenarioId",
        destination: "/app/train/:scenarioId",
        permanent: false,
      },
      { source: "/consilium/simulator", destination: "/app/train/browse", permanent: false },
      {
        // dark-psychology-beginners-guide was promoted from a blog post to a
        // pillar guide, moving its URL from /blog to /guide. 301 so the
        // ranking URL and any inbound backlinks follow to the new location.
        source: "/blog/dark-psychology-beginners-guide",
        destination: "/guide/dark-psychology-beginners-guide",
        permanent: true,
      },
      {
        // /courses is a Coming Soon placeholder that still earns branded
        // SERP impressions. 301 to Consilium so that visibility lands on a
        // page that sells something. Exact match only: legacy member course
        // routes under /courses/[slug] keep resolving (they redirect here
        // server-side and then follow this 301).
        source: "/courses",
        destination: "/consilium",
        permanent: true,
      },
    ];
  },
};

// Wrap with Sentry only if SENTRY_DSN is configured — avoids build-time
// warnings when running locally or on deploys that haven't finished Sentry
// setup. The wrapper also uploads source maps to Sentry during build when
// SENTRY_AUTH_TOKEN is set.
const sentryWebpackOptions = {
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  authToken: process.env.SENTRY_AUTH_TOKEN,
  // Suppress source-map upload noise when auth token is missing
  silent: !process.env.SENTRY_AUTH_TOKEN,
  // Tunnel client requests through a same-origin route to bypass adblock
  tunnelRoute: "/monitoring",
  // Hide source maps from the public bundle after upload
  hideSourceMaps: true,
  // Don't fail the build if Sentry is down
  disableLogger: true,
};

module.exports = process.env.SENTRY_DSN
  ? withSentryConfig(nextConfig, sentryWebpackOptions)
  : nextConfig;
