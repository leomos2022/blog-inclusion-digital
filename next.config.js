/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true
  },
  serverExternalPackages: ['mongoose'],
  experimental: {
    serverComponentsExternalPackages: ['mongoose']
  }
}

module.exports = nextConfig
