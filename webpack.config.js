const path = require('path');
const config = require('webpack-config-setsun');
const CoreJsUpgradeWebpackPlugin = require('corejs-upgrade-webpack-plugin')
  .default;
const src = path.resolve(__dirname, 'src');
const dist = path.resolve(__dirname, 'dist');
const cache = path.resolve(__dirname, '.webpack-cache');
const node_modules = path.resolve(__dirname, 'node_modules');

module.exports = config.create({
  port: 8800,
  paths: {
    entry: 'index.tsx',
    src,
    dist,
    cache,
    node_modules,
  },
});
