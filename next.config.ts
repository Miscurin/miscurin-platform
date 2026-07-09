import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Allow Replit's proxy domain so _next/* assets load in the preview pane
  allowedDevOrigins: [
    '*.replit.dev',
    '*.pike.replit.dev',
    '*.repl.co',
  ],
  reactStrictMode: false,
}

export default nextConfig
