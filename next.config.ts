/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
    COOKIE_KEY: process.env.COOKIE_KEY
  }
};

export default nextConfig;
