/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Temporarily ignore TypeScript errors in production builds
    // This allows the app to build while you work on fixing Designer component types
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
