import { withContentlayer } from "next-contentlayer";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
    COOKIE_KEY: process.env.COOKIE_KEY
  }
};

export default withContentlayer(nextConfig);