/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  reactStrictMode: true,
  images: {
    unoptimized: true, // If you're following the solution to disable image optimization
  },
  basePath: "",
  assetPrefix: "",
};

export default nextConfig;
