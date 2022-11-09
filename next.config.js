/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  rewrites: async () => {
    return [
      {
        source: "/api/weather/:path*",
        destination: "https://api.weatherapi.com/v1/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
