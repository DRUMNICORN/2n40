/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    // reactStrictMode: true,
    // swcMinify: true,
    // webpack: (config, { isServer }) => {
    //     if (!isServer) {
    //         config.resolve.fallback.fs = false;
    //     }
    //     return config;
    // },
    // experimental: {
    //     webpackBuildWorker: true,
    // },
};

module.exports = nextConfig;
