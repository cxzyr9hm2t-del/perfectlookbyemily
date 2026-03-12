/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'firebase-deploy',
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
