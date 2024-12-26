/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
      },
      {
        protocol: 'http',
        hostname: '192.168.0.115',
        port: '9000',
      },
      {
        protocol: 'http',
        hostname: '192.168.0.120',
        port: '9000',
      },
      {
        protocol: 'http',
        hostname: '10.0.3.6',
        port: '9000',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '9000',
      },
    ],
  },
}

export default nextConfig
