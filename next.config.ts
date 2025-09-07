import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname, ".."),
  },
  images: {
    domains: ["loremflickr.com", "picsum.photos", "placekitten.com"],
  },
};

export default nextConfig;
