import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  
  basePath: '/affiliate-hygiene-dashboard',
  images: {
    unoptimized: true,
  },
  reactStrictMode: true
};

export default nextConfig;
