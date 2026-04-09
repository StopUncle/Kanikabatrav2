const { withSentryConfig } = require("@sentry/nextjs");

/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
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
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
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
