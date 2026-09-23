import type { NextConfig } from "next";

// ponytail: static export for GitHub Pages. If repo is <user>.github.io/<repo>/,
// uncomment basePath below (and keep it in links). Add when deploying to subpath.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: "/EVOLECT",
};

export default nextConfig;
