const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const CopyPlugin = require("copy-webpack-plugin");

const { ProvidePlugin} = require("webpack");
const { PurgeCSSPlugin } = require("purgecss-webpack-plugin");
const glob = require("glob");

const PATHS = {
  src: path.join(__dirname, "src"),
};

module.exports = {
  entry: {
    index: "./src/index.js",
    courses: "./src/pages/courses.js",
  },
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    port: 8888,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.s[ac]ss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpeg|jpg|gif)$/,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      chunks: ["index"],
      filename: "index.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/pages/courses.html",
      chunks: ["courses"],
      filename: "courses.html",
      base: "pages",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/assets/images/*").replace(/\\/g, "/"),
          to: path.resolve(__dirname, "dist").replace(/\\/g, "/"),
          context: "src",
        },
      ],
    }),
    new MiniCssExtractPlugin({}),
    // new BundleAnalyzerPlugin({}),
    new ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      _: "lodash",
      mnt: "moment",
    }),
    new PurgeCSSPlugin({
      paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
      safelist: ["dummy-class"], // Qorunmalı siniflər
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
};
