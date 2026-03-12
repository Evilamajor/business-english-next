/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  output: "export",

  images: {
    unoptimized: true,
  },

  // Use basePath only when deploying to GitHub Pages
  basePath: isProd ? "/business-english-next" : "",

  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;