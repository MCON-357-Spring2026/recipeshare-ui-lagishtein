// next.config.mjs
const rawBackendUrl = process.env.BACKEND_URL || "http://localhost:5000";
const BACKEND_URL = rawBackendUrl.replace(/\/$/, "");

const nextConfig = {
  output: "standalone",   // required for the multi-stage Docker build

  async rewrites() {
    return [
      { source: "/api/:path*",  destination: `${BACKEND_URL}/api/:path*` },
      { source: "/auth/:path*", destination: `${BACKEND_URL}/auth/:path*` },
    ];
  },
};

export default nextConfig;

