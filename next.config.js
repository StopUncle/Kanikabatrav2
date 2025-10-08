/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable Pages Router completely
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
  // Force App Router
  trailingSlash: false,
}

module.exports = nextConfig