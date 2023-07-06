// const NextFederationPlugin = require('@module-federation/nextjs-mf');

module.exports = {
  reactStrictMode: true,
  // todo: fix module federation
  // webpack(config, { isServer }) {
  //   if (!isServer) {
  //     // in the browser, federate the following modules for consumption elsewhere
  //     config.plugins.push(
  //       new NextFederationPlugin({
  //         name: 'setsun_xyz',
  //         filename: 'static/chunks/remoteEntry.js',
  //         remotes: {
  //           visualizers: 'visualizers@http://localhost:3001/_next/static/chunks/remoteEntry.js',
  //         },
  //       }),
  //     );
  //   }

  //   return config;
  // }
};
