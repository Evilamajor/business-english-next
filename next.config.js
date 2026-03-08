/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/business-english-next',
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig