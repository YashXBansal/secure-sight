import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["i.pravatar.cc", "media.giphy.com"],
  },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      use: {
        loader: "file-loader",
        options: {
          publicPath: "/_next/static/media",
          outputPath: "static/media/",
          name: "[name].[hash].[ext]",
        },
      },
    });

    return config;
  },
};
export default nextConfig;
