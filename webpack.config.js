const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './public/script.js', // Entry point for your JavaScript file
  output: {
    filename: 'bundle.js', // Output bundle name
    path: path.resolve(__dirname, 'public'), // Output directory
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Apply the loader to all .js files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Use Babel for JavaScript transpilation
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/, // Apply the loader to all .css files
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles.css', // Output CSS filename
    }),
  ],
};
