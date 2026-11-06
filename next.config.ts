import type { NextConfig } from "next";

// ponytail: static export for GitHub Pages. If repo is <user>.github.io/<repo>/,
// uncomment basePath below (and keep it in links). Add when deploying to subpath.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: "/EVOLECT",
  // keep the workspace root pinned to this project (a stray lockfile in the
  // user's home directory otherwise makes Turbopack pick the wrong root)
  turbopack: { root: __dirname },
};

export default nextConfig;
