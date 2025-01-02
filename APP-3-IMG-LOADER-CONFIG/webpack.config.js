const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  entry: "./src/index.js", // Başlanğıc faylı
  output: {
    filename: "bundle.js", // Çıxış fayl adı
    path: path.resolve(__dirname, "dist"), // Çıxış qovluğu
    assetModuleFilename: 'images/[hash][ext]' ,// Şəkillər "dist/images" qovluğuna köçürülür
    //images/ → şəkillərin saxlanacağı qovluqdur.
    // [hash] → unikal ad yaratmaq üçün faylın hash dəyəri əlavə olunur.
    // [ext] → faylın orijinal uzantısı saxlanılır.
    clean: true // CleanWebpackPlugin evez edir
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
          filename: 'fonts/[name][ext]', // Fontlar "dist/fonts" qovluğuna köçürülür
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "./src/index.html" }),
  ],
};
