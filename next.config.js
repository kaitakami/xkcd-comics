/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["imgs.xkcd.com"],
  },
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
