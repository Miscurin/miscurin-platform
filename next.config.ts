import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Allow Replit's proxy domain so _next/* assets load in the preview pane
  allowedDevOrigins: [
    '*.replit.dev',
    '*.pike.replit.dev',
    '*.repl.co',
  ],
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
}

export default nextConfig
