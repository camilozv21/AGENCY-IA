import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.imgur.com",
        port: "",
        pathname: "/**",
      }
    ],
    minimumCacheTTL: 60 * 60 * 24
  }
};

export default nextConfig;
