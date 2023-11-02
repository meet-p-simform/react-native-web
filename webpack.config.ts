const path = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const appDirectory = path.resolve(__dirname, './');
const { presets } = require(`${appDirectory}/babel.config.js`);

const compileNodeModules = ['@sentry/react-native'].map((moduleName) =>
  path.resolve(appDirectory, `node_modules/${moduleName}`)
);

const babelLoaderConfiguration = {
  test: /\.(tsx|ts|jsx|js|mjs)$/,
  // Add every directory that needs to be compiled by Babel during the build.
  include: [
    path.resolve(appDirectory, 'index.web.js'), // Entry to your application
    path.resolve(appDirectory, 'app'),
    path.resolve(appDirectory, 'node_modules/react-native-uncompiled'),
    ...compileNodeModules
  ],
  exclude: '/node_modules/',
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      // The 'metro-react-native-babel-preset' preset is recommended to match React Native's packager
      presets: presets,
      plugins: ['react-native-web']
    }
  }
};

// This is needed for webpack to import static images in JavaScript files.
const imageLoaderConfiguration = {
  test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
  type: 'asset/resource'
};

const fontLoaderConfiguration = {
  test: /\.(woff(2)?|ttf|eot|wav)(\?v=\d+\.\d+\.\d+)?$/,
  type: 'asset/resource',
  generator: {
    filename: 'assets/fonts/[hash][ext][query]'
  }
};

const isDev = process.env.NODE_ENV !== 'production';
module.exports = {
  entry: [path.resolve(appDirectory, 'index.web.js')],
  mode: isDev ? 'development' : 'production',
  // configures where the build ends up
  output: {
    filename: 'bundle.web.js',
    path: path.resolve(appDirectory, 'dist')
  },

  // ...the rest of your config
  module: {
    rules: [imageLoaderConfiguration, babelLoaderConfiguration, fontLoaderConfiguration]
  },

  resolve: {
    alias: {
      'react-native$': 'react-native-web'
    },
    // If you're working on a multi-platform React Native app, web-specific
    // module implementations should be written in files using the extension
    // `.web.js and .web.ts`.
    extensions: ['.web.js', '.js', '.ts', '.tsx', '.jsx', '.web.ts', '.web.tsx']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: appDirectory + '/public/index.html'
    }),
    new Dotenv({
      path: `./.env.${isDev ? 'development' : 'production'}`
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      __DEV__: process.env.NODE_ENV !== 'production' || true
    })
  ],
  devServer: {
    historyApiFallback: {
      disableDotRule: true
    },
    hot: true,
    port: '3000'
  }
};
