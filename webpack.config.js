const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  context: path.resolve(__dirname, './public/assets/js'),
  entry: {
    app: './app.js',
  },
  output: {
    path: path.resolve(__dirname, './public/assets/js'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
        {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
              fallback: "style-loader",
              use: "css-loader"
            })
        },
        {
          test: /\.(png|jpg|gif|woff|woff2|eot|ttf|svg)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192
              }
            }
          ]
        }
      ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
     minimize: true,
     compress: false,
     exclude: [/\.min\.js$/gi]
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin({
        filename: "main.css"
    }),
    new webpack.ProvidePlugin({
        $: "./jquery.min",
        jQuery: "./jquery.min",
        "window.jQuery": "./jquery.min"
    })
  ],
};