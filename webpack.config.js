const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
      main: './src/index.js',
      graph: './src/js/graph/Chart.bundle.min.js'
    },
    output: {
        path: path.join(__dirname, '/dist/'),
        filename: '[name].bundle.js',
      },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader']
        },
        {
          test: /\.(png|jpg)$/,
          loader: 'url-loader'
        },
        {
          test: /\.(?:|png|jpg|svg|jpeg)$/,
          use: [{
            loader: 'file-loader',
            options: {
              name: `./assets/[name].[ext]`
            }
          }]
          
        }
      ]
    },  
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
          }),
        new MiniCssExtractPlugin({
            filename: `./css/[name].bundle.css`
          }),
    ],    
}