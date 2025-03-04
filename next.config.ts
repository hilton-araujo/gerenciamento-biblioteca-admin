import { withContentlayer } from 'next-contentlayer';
import type { Configuration } from 'webpack';
import type { NextConfig } from 'next';

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
    COOKIE_KEY: process.env.COOKIE_KEY
  },
  swcMinify: true,
  poweredByHeader: false,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  typescript: {
    ignoreBuildErrors: false,
    tsconfigPath: './tsconfig.json'
  },
  webpack: (config: Configuration, { dev, isServer }: { dev: boolean; isServer: boolean }) => {
    // Enable SWC for faster builds
    config.experiments = { ...config.experiments, topLevelAwait: true };

    // Production optimizations
    if (!dev) {
      // Enable tree shaking
      config.optimization = {
        ...config.optimization,
        usedExports: true
      };
    }

    return config;
  }
};

export default withContentlayer(nextConfig);
