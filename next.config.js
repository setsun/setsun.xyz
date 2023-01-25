const { NextFederationPlugin } = require('@module-federation/nextjs-mf');

module.exports = {
  compiler: {
    removeConsole: {
      exclude: ['error'],
    },
    styledComponents: true,
  },
  swcMinify: true,
  webpack: (config, options) => {
    // Docs for implementing module federation:
    // https://github.com/module-federation/universe/tree/main/packages/nextjs-mf#implementing-the-plugin
    // const { isServer } = options;

    // config.plugins.push(
    //   new NextFederationPlugin({
    //     name: 'host',
    //     remotes: {
    //       experiments: `experiments@http://localhost:5173/remoteEntry.js`,
    //     },
    //     shared: {
    //       react: {
    //         singleton: true,
    //         version: '0'
    //       }
    //     }
    //   })
    // );

    // Important: return the modified config
    return config
  }
}