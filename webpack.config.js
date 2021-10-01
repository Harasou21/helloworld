module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options :{
              modules : true
            }
          },
          'postcss-loader','sass-loader'
        ],
      }
    ]
  }
}