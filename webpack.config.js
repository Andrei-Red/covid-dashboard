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
        filename: '[name].bundle.js'
      },
/*     module: {
      rules: [
        {
          test: /\.css$/,
          //use: MiniCssExtractPlugin('style-loader', 'css-loader')
          use: MiniCssExtractPlugin.loader('style-loader', 'css-loader')
        }
      ]
    }, */  
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
          }),
        new MiniCssExtractPlugin({
            filename: 'bundle.css'
          }),
    ],
    
}

