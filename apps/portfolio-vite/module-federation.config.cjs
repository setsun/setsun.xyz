const {
  withNativeFederation,
  shareAll,
  share,
} = require('@softarc/native-federation/build');

module.exports = withNativeFederation({
  name: 'host',

  shared: share({
    react: {
      singleton: true,
      requiredVersion: false,
      version: '0',
      includeSecondaries: false,
    },
    'react-dom': {
      singleton: true,
      requiredVersion: false,
      version: '0',
      includeSecondaries: false,
    }
  }),
  skip: [
    'react-dom/server',
    'react-dom/server.node',
  ],
});
