/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: __dirname,
  images: {
    domains: ['localhost'],
    unoptimized: true
  },
  serverExternalPackages: ['mongoose']
}

module.exports = nextConfig
