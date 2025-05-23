import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Enable compression
  compress: true,
  // Reduce bundle size by excluding certain packages from the bundle
  experimental: {
    optimizeCss: true, // Optimize CSS
    scrollRestoration: true, // Better scroll restoration
  },
};

export default nextConfig;
