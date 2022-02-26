/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'tailwindui.com',
      'images.unsplash.com',
      'muallemy-storage.s3.eu-central-1.amazonaws.com',
      'hassans.s3.eu-central-1.amazonaws.com',
    ],
  },
};

module.exports = nextConfig;
