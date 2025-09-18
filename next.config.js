/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: __dirname,
  images: {
    unoptimized: true
  },
  serverExternalPackages: ['mongoose']
}

module.exports = nextConfig
