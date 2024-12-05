import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname:"s3-alpha-sig.figma.com",
        protocol :"https",
      }
    ]
  }
};

export default nextConfig;
