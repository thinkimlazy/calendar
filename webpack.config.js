const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['react', 'es2015', 'stage-0']
        }
      },
        {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
        },
      {
        test: /\.html/,
        use: 'file-loader?name=/[name].[ext]'
      }
      ]
    },
    plugins: [
    new webpack.HotModuleReplacementPlugin(),
    ],

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    hot: true,
    inline: true,
    port: 3000
  }
};
