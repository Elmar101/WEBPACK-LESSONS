const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const path = require("path");
const { split } = require("lodash");

module.exports = {
  entry: {
    index: "./src/index.js",
    courses: "./src/pages/courses.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    port: 8080,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      chunks: ["index"],
    }),
    new HtmlWebpackPlugin({
      template: "./src/pages/courses.html",
      filename: "courses.html",
      chunks: ["courses"],
    }),

    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/assets/images/*"),
          to: path.resolve(__dirname, "dist"),
          context: "src", 
          //context: Köçürmə əməliyyatı üçün başlanğıc nöqtəni müəyyən edir. onun altindakilari "to" da yazilan pathi əlave edir.
          //filter: Fayl adlarına əsasən filtr.
          // transform: Fayl məzmununu dəyişdirmək.
          // `src/assets` qovluğunu `dist/assets`-ə kop"src/assets/images/*", to: "assets" }, 
          // `src/assets` qovluğunu `dist/assets`-ə köçür
        }, 
      ],
    }),
    //new BundleAnalyzerPlugin({}),
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
    }
  },
};
