const webpack = require('webpack');
const path = require('path');
const config = require('webpack-config-setsun');
const src = path.resolve(__dirname, 'src');
const dist = path.resolve(__dirname, 'dist');
const cache = path.resolve(__dirname, '.webpack-cache');

module.exports = config.create({
  entry: 'index.tsx',
  src,
  dist,
  cache,
});
