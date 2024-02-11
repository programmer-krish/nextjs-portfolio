/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: "/github-pages",
  images: {
    remotePatterns: ["images.pexels.com", "media.licdn.com"],
  },
};

export default nextConfig;
