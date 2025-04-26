import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "oaidalleapiprodscus.blob.core.windows.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "df50lbm4qcrt6.cloudfront.net",
        port: "",
        pathname: "/**",
      }
    ],
    minimumCacheTTL: 60 * 60 * 24
  }
};

export default nextConfig;
