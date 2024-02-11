/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: "/github-pages",
  images: {
    remotePatterns: [
      {
        hostname: "images.pexels.com",
      },
      {
        hostname: "media.licdn.com",
      },
    ],
  },
  output: "export",
};

export default nextConfig;
