/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    SERVER_URL: 'http://localhost:5000',
  },
  images: {
    domains: ['upload.wikimedia.org'],
  },
}

export default nextConfig
