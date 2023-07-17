/**
 * @type {import('next').NextConfig}
 */
const config = {
  reactStrictMode: true,
  webpack: (config) => {
    // shader support
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      exclude: /node_modules/,
      use: ['raw-loader', 'glslify-loader'],
    });

    return config;
  }
};

export default config;
