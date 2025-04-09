/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ['pool.x-phere.com', 'testnet-pool.x-phere.com'],
  },
  devIndicators: {
    https: false, // 개발 환경에서 HTTP 허용
  },
};

module.exports = nextConfig;
