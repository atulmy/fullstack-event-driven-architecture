/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: process.env.BUILD_DIR || '.next',

  devIndicators: false,

  poweredByHeader: false,
}

export default nextConfig
