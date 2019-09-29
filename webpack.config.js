const webpack = require('webpack');
const path = require('path');
const os = require('os');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const src = path.resolve(__dirname, 'src');
const dist = path.resolve(__dirname, 'dist');
const webpackCache = path.resolve(__dirname, '.webpack-cache');

const isProduction = process.env.NODE_ENV === 'production';

const threadLoader = {
  loader: 'thread-loader',
  options: {
    workers: Math.ceil(os.cpus() / 2),
    workerParallelJobs: 50,
    workerNodeArgs: ['--max-old-space-size=4096'],
  },
};

const cacheLoader = {
  loader: 'cache-loader',
  options: {
    cacheDirectory: webpackCache,
  },
};

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
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    splitChunks: {
      chunks: 'all',
    },
  },
  module: {
    rules: [
      {
        test: /\.(j|t)s(x?)$/,
        exclude: /node_modules/,
        use: [
          cacheLoader,
          threadLoader,
          { loader: 'babel-loader' },
          {
            loader: 'linaria/loader',
            options: {
              sourceMap: process.env.NODE_ENV !== 'production',
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV !== 'production',
            },
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: process.env.NODE_ENV !== 'production',
            },
          },
        ],
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        use: [{ loader: 'graphql-tag/loader' }],
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 2048,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      favicon: './img/favicon.ico',
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
