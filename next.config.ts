import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/l-akshmikanth",
  reactCompiler: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
