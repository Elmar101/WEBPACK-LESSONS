const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin(),
    new ESLintPlugin(),
  ],
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    port: 9000,
    open: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: 'defaults' }],
              '@babel/preset-react',
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  ['postcss-preset-env', {}], // PostCSS konfiqurasiyası
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  ['postcss-preset-env', {}], // PostCSS konfiqurasiyası
                ],
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        loader: 'eslint-loader',
        options: {
          fix: true, // Avtomatik düzəliş
          fixType: 'problem', // Yalnız problemli hissələri düzəliş et
          failOnError: false, // Hər hansı bir hərəkətə çatışsa həll etmək
          failOnWarning: false, // Hər hansı bir hərəkətə qarşılıq vermək
          emitWarning: true, // Xəbərdarlıq göstərmək
          emitError: true, // Xəta göstərmək
          cache: true, // Həll etmək üçün cache
          cacheLocation: path.resolve(__dirname, 'eslint-cache'), // Cache yerləşdirilməsi
          context: path.resolve(__dirname, 'src'), // Nəyə əsasən yoxlama etmək
        },
      },
      {
        test: /\.(jpg|png|jpeg|gif)$/,
        type: 'asset/resource',
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
};
