const path = require('path');
 const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: "development",
  entry: './code/index.js',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    chunkFilename: "[chunkhash:8].chunk.js"
  },
  devtool: 'eval-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      title: "day day up",
      template: "public/index.html"
    })
  ],
  optimization: {
    chunkIds: 'named',
    splitChunks:{
      chunks: "all"
    }
  }
};