/** @type {import('next').NextConfig} */
const nextConfig = {
  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 60,
  },

  // React optimization
  reactStrictMode: true,

  // Performance monitoring and package optimization
  experimental: {
    optimizePackageImports: ['framer-motion', 'react-icons'],
  },

  // Enable SWC minification
  swcMinify: true,

  // Production optimizations
  poweredByHeader: false,
};

export default nextConfig;
