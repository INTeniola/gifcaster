import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.giphy.com',
        pathname: '/media/**',
      },
      {
        protocol: 'https',
        hostname: 'media0.giphy.com',
        pathname: '/media/**',
      },
      {
        protocol: 'https',
        hostname: 'media1.giphy.com',
        pathname: '/media/**',
      },
      {
        protocol: 'https',
        hostname: 'media2.giphy.com',
        pathname: '/media/**',
      },
      {
        protocol: 'https',
        hostname: 'media3.giphy.com',
        pathname: '/media/**',
      },
      {
        protocol: 'https',
        hostname: 'media4.giphy.com',
        pathname: '/media/**',
      }
    ],
    deviceSizes: [320, 420, 768, 1024, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 3600,
  },
  experimental: {
    optimizeCss: true
  },
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default nextConfig;