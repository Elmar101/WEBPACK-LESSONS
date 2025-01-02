const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { PurgeCSSPlugin } = require("purgecss-webpack-plugin");
const glob = require("glob");

const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

const PATHS = {
  src: path.join(__dirname, "src"),
};

module.exports = merge(common, {
mode: "production",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.s[ac]ss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      }
    ],
  },
  plugins: [
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

    new PurgeCSSPlugin({
      paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
      safelist: ["dummy-class"], // Qorunmalı siniflər
    }),
  ]
});
