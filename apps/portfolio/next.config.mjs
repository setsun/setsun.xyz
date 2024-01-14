import { NextFederationPlugin } from '@module-federation/nextjs-mf';
import path from 'path';

/**
 * @type {import('next').NextConfig}
 */
const config = {
  reactStrictMode: true,
  webpack: (config, context) => {
    const { isServer } = context;

    // shader support
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      exclude: /node_modules/,
      use: ['raw-loader', 'glslify-loader'],
    });

    // module federation
    if (isServer) {
      config.plugins.push(
        new NextFederationPlugin({
          name: 'host',
          filename: 'static/chunks/remoteEntry.js',
          exposes: {},
          remotes: {
            remote: 'sketchbook-mfe@https://sketchbook.setsun.xyz/remoteEntry.json',
          },
          extraOptions: {
            exposePages: true
          },
          shared: {
            'react': {
              singleton: true,
              requiredVersion: false,
              version: '0',
            },
            'react-dom': {
              singleton: true,
              requiredVersion: false,
              version: '0',
            }
          },
        }),
      );
    }

    return config;
  }
};

export default config;
