module.exports = {
  entry: './src/main.js',
  output: {
      path: __dirname + '/build',
      filename: 'app.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
              presets: ["@babel/preset-env"]
          }
        }
      }
    ]
  },
  devServer: {
    port: 9001,
    publicPath: '/dinamicbuild/'
  }
};