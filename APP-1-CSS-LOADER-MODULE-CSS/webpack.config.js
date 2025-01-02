const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");

module.exports = {
  entry: "./src/index.js", // Başlanğıc faylı
  output: {
    filename: "bundle.js", // Çıxış fayl adı
    path: path.resolve(__dirname, "dist"), // Çıxış qovluğu
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        rules: [
            {
              test: /\.css$/,
              use: [
                "style-loader",
                {
                  loader: "css-loader",
                  options: {
                    modules: true,
                  },
                },
              ],
              include: /\.module\.css$/,
            },
            {
              test: /\.css$/,
              use: ["style-loader", "css-loader"],
              exclude: /\.module\.css$/,
            },
          ]
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({template: "./src/index.html"}),
    new CleanWebpackPlugin(),
  ],
  
};
