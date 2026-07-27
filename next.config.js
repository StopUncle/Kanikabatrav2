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

      // The cutover. Member surfaces rebuilt under /app send their old
      // /consilium URL to the new one, so a bookmark, an old email link or
      // a stale nav row lands in the app instead of the surface it replaced.
      //
      // 302 and not 301 on purpose. A 301 is cached by the browser more or
      // less forever, which would make backing this out require every member
      // to clear their history. Promote to 301 once the app has held for a
      // few weeks.
      //
      // Only member surfaces appear below. The /consilium sales page and the
      // join funnel (apply, claim, success, invite, voices, initiation) are
      // public and must keep resolving, because they are where non-members
      // arrive and buy.
      //
      // Sources are exact unless they carry :params, so /consilium/simulator
      // moves while /consilium/simulator/[scenarioId] (the runner) does not.
      { source: "/consilium/chamber", destination: "/app", permanent: false },
      { source: "/consilium/feed", destination: "/app/feed", permanent: false },
      {
        source: "/consilium/feed/:postId",
        destination: "/app/feed/:postId",
        permanent: false,
      },
      {
        source: "/consilium/messages",
        destination: "/app/kanika",
        permanent: false,
      },
      { source: "/consilium/path", destination: "/app/path", permanent: false },
      { source: "/consilium/book", destination: "/app/book", permanent: false },
      {
        source: "/consilium/videos",
        destination: "/app/videos",
        permanent: false,
      },
      {
        source: "/consilium/voice-notes",
        destination: "/app/voice-notes",
        permanent: false,
      },
      {
        source: "/consilium/profile",
        destination: "/app/profile",
        permanent: false,
      },
      {
        source: "/consilium/quiz",
        destination: "/app/quizzes",
        permanent: false,
      },
      {
        source: "/consilium/games",
        destination: "/app/play",
        permanent: false,
      },
      {
        source: "/consilium/games/speed-drill",
        destination: "/app/play/drill",
        permanent: false,
      },
      {
        source: "/consilium/instincts/today",
        destination: "/app/play/tell",
        permanent: false,
      },
      // The badge wall moved onto the You tab wholesale, so this one is a
      // true replacement.
      {
        source: "/consilium/badges",
        destination: "/app/you",
        permanent: false,
      },
      {
        source: "/consilium/simulator/leaderboard",
        destination: "/app/ranks",
        permanent: false,
      },

      // Deliberately NOT redirected, because /app has no equivalent yet and
      // sending a member somewhere that merely looks similar is worse than
      // leaving them on the old page that actually works:
      //
      //   /consilium/simulator            the scenario catalog. /app/train is
      //                                   a recommendation surface (next up +
      //                                   your tracks), not a browse-and-filter
      //                                   catalog, and it has no ?track= view.
      //   /consilium/simulator/[id]       the runner. Untouched by design.
      //   /consilium/simulator/achievements
      //   /consilium/instincts/score      the instinct hex. The Mark reports in
      //                                   sentences and deliberately shows no
      //                                   axis scores, so it does not replace it.
      //   /consilium/instincts/history
      //   /consilium/adventures/**        no /app version built
      //   /consilium/lab                  no /app version built
      //   /consilium/receipts             no /app version built
      //   /consilium/previews/**          no /app version built

      // Forum, Chat and Classroom went dormant in the 2026-04-30 audit and
      // have redirected to the feed since 2026-07-02. Point that existing
      // redirect at the app's feed rather than the old one, so a dormant
      // surface no longer drops a member back into the old skin. The routes
      // and their data stay intact for a future revival.
      {
        source: "/consilium/forum/:path*",
        destination: "/app/feed",
        permanent: false,
      },
      {
        source: "/consilium/forum",
        destination: "/app/feed",
        permanent: false,
      },
      {
        source: "/consilium/chat/:path*",
        destination: "/app/feed",
        permanent: false,
      },
      {
        source: "/consilium/chat",
        destination: "/app/feed",
        permanent: false,
      },
      {
        source: "/consilium/classroom/:path*",
        destination: "/app/feed",
        permanent: false,
      },
      {
        source: "/consilium/classroom",
        destination: "/app/feed",
        permanent: false,
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
