var path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

var config = {
  entry: ["./src/index.tsx"],
  output: {
    path: path.resolve(__dirname, "../resources/static/dist"),
    filename: "bundle.js"
  },
  externals: {
    "antd": "antd",
    "moment": "moment",
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, "./src"),
    }
  },
  mode: "development",
  devtool: "source-map",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
    modules: [
      path.resolve(__dirname, './src'),
      path.resolve(__dirname, './node_modules')
    ]
  },
  module: {
    rules: [{
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader",
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        use: ["source-map-loader"],
        enforce: "pre",
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", {
          loader: "less-loader",
          options: {
            javascriptEnabled: true
          }
        }]
      }
    ]
  },
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({}),
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: false,
        terserOptions: {}
      }),
    ]
  },
  plugins: [
    new MiniCssExtractPlugin()
  ]
};

module.exports = config;
