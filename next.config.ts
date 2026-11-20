import type { NextConfig } from "next";

/**
 * Production config for "Date Night with Engineer".
 *
 * - Vercel: works as-is (Vercel ignores `output`).
 * - Docker / Google Cloud Run: set `DOCKER_BUILD=1` at build time (the bundled
 *   Dockerfile does this) to emit `.next/standalone` with a minimal `server.js`.
 *   You can also hard-code `output: "standalone"` if you only deploy to containers.
 */
const nextConfig: NextConfig = {
  // output: "standalone",
  ...(process.env.DOCKER_BUILD === "1" ? { output: "standalone" as const } : {}),
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
  poweredByHeader: false,
  // The floating dev badge sits on top of the game's bottom action bar.
  devIndicators: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
