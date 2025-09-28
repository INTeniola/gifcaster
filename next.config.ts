import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'media.giphy.com', 
      'media0.giphy.com', 
      'media1.giphy.com',
      'media2.giphy.com',
      'media3.giphy.com',
      'media4.giphy.com'
    ],
  },
  // Remove the experimental optimizeCss for now
  // experimental: {
  //   optimizeCss: true,
  // }
};

export default nextConfig;