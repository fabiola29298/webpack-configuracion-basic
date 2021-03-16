const HtmlWebPackPlugin = require('html-webpack-plugin');
const MinicssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
module.exports = {

  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /styles\.css$/i,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /styles\.css$/,
        use: [
          MinicssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
        options: {
          minimize: false,
          sources: false,
        },
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use:[
        {
          loader: 'file-loader',
          options:{
            esModule: false,
            name: 'assets/[name].[ext]'
          }
        }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html'
    }),
    new MinicssExtractPlugin({
      filename: '[name].css',
      ignoreOrder: false
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.optimize\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }],
      },
      canPrint: true
    }),
    new CopyPlugin({
      patterns: [
        { from: 'src/assets', to: 'assets/' },
      ]
    })
  ]

}
