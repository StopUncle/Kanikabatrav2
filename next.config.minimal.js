/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  poweredByHeader: false,
  compress: true,
  output: 'standalone',
}

module.exports = nextConfig