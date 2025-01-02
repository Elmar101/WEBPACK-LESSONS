const path = require("path");
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports =  merge(common,{
  mode: "development",
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
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.s[ac]ss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      }
    ],
  },
  plugins: [
    // new BundleAnalyzerPlugin(),
  ]
});
