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
        test: /\.(scss|sass)$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
          { loader: "sass-loader" },
        ],
        include:/\.module\.(scss|sass)$/,
      },
      {
        test: /\.(scss|sass)$/, // Global SCSS üçün
        exclude: /\.module\.(scss|sass)$/, // Modulları xaric edir
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "./src/index.html" }),
    new CleanWebpackPlugin(),
  ],
};
