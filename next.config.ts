import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/EVOLECT",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
