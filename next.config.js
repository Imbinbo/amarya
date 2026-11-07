/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  webpack: (config) => {
    // Silence the "Critical dependency: the request of a dependency is an
    // expression" warning emitted by @supabase/realtime-js's dynamic require.
    // It is a benign warning from a third-party library and does not affect
    // runtime behavior.
    config.ignoreWarnings = [
      ...(config.ignoreWarnings || []),
      { module: /node_modules\/@supabase\/realtime-js/ },
    ];
    return config;
  },
};

module.exports = nextConfig;
