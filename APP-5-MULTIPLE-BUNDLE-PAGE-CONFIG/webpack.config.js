const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  entry: {
    index: "./src/index.js",
    product: "./src/products.js",
  },
  output: {
    filename: "[name].bundle.js", 
    path: path.resolve(__dirname, "dist"), 
    // assetModuleFilename: 'images/[hash][ext]' ,
    clean: true 
  },
  devServer: {
    static: "./dist", // Serverin xidmət edəcəyi qovluq
    open: true, // Brauzeri avtomatik aç
    port: 8080, // Server portu
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
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/, // Şəkil formatlarını müəyyən edir
        type: 'asset/resource', // Şəkilləri "dist" qovluğuna köçürür
      },
      {
        test: /\.(woff|woff2|ttf|otf|eot)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name][ext]', // Fontlar "dist/fonts" qovluğuna köçürülür
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      chunks: ["index"],
      inject: true
    }),
    new HtmlWebpackPlugin({
      template: "./src/products.html",
      filename: "products.html",
      chunks: ["product"],
      inject: true
    }),
  ],
};
