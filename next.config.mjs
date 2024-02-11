/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // If you're following the solution to disable image optimization
  },
  basePath: "/nextjs-portfolio",
  assetPrefix: "/nextjs-portfolio/",
  output: "export",
};

export default nextConfig;
