import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Dangerously allows builds with ESLint errors
  },
};

export default nextConfig;
