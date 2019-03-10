const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const src = path.resolve(__dirname, 'src');
const dist = path.resolve(__dirname, 'dist');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  target: 'web',
  mode: isProduction ? 'production' : 'development',
  context: src,
  entry: 'index.tsx',
  output: {
    path: dist,
    filename: '[name]-[hash].js',
    chunkFilename: '[id].[hash].bundle.js',
    publicPath: '/',
  },
  resolve: {
    modules: [path.resolve('./node_modules'), path.resolve('./src')],
    extensions: ['*', '.js', '.jsx', '.ts', '.tsx', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [{ loader: 'babel-loader' }],
      },
      {
        test: /\.js(x?)$/,
        exclude: /(node_modules)/,
        use: [{ loader: 'babel-loader' }],
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        use: [{ loader: 'graphql-tag/loader' }],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devtool: 'cheap-module-source-map',
  devServer: {
    port: 8888,
    hot: true,
    inline: true,
    historyApiFallback: true,
  },
};
