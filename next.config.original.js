/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  poweredByHeader: false,
  compress: true,

  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },

  // Optimize CSS
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },

  // Fix for Railway deployment
  output: 'standalone',

  // Headers for security and performance
  async headers() {
    // Only apply CSP in production to avoid webpack dev issues
    const cspHeader = process.env.NODE_ENV === 'production' ? {
      key: 'Content-Security-Policy',
      value: [
        "default-src 'self' data:",
        "script-src 'self' 'unsafe-eval' 'unsafe-inline' *.paypal.com *.paypalobjects.com *.venmo.com",
        "style-src 'self' 'unsafe-inline' *.paypal.com *.paypalobjects.com *.venmo.com",
        "img-src 'self' data: https: blob: *.paypal.com *.paypalobjects.com",
        "font-src 'self' data:",
        "connect-src 'self' *.paypal.com *.paypalobjects.com api.paypal.com api-m.paypal.com",
        "frame-src 'self' *.paypal.com *.paypalobjects.com",
        "child-src 'self' *.paypal.com *.paypalobjects.com",
        "object-src 'none'",
      ].join('; ')
    } : null

    const headers = [
      {
        key: 'X-DNS-Prefetch-Control',
        value: 'on'
      },
      {
        key: 'X-Frame-Options',
        value: 'SAMEORIGIN'
      },
      {
        key: 'X-Content-Type-Options',
        value: 'nosniff'
      },
      {
        key: 'Referrer-Policy',
        value: 'origin-when-cross-origin'
      },
    ]

    if (cspHeader) {
      headers.push(cspHeader)
    }

    return [
      {
        source: '/:path*',
        headers,
      },
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig