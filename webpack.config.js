var webpack = require("webpack");

module.exports = {
    context: __dirname + "/public" ,
    entry: {
      app:["./main"]
    },
    resolve: {
      alias: {
        "react": __dirname + "/node_modules/react/dist/react-with-addons.js",
        'dustjs': "dustjs-linkedin",
        'dust': "dustjs-linkedin"
      },
      extensions: ['', '.js', '.json', '.jsx']
    },
    output: {
        path: __dirname + "/build",
        filename: "bundle.js"
    },
    externals:{
      'falcor': "falcor"
    },
    plugins: [
      new webpack.ProvidePlugin({
        "dust": "dustjs-linkedin"
      })
    ],
    module:{
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel'
        },
        {
          test: /\.dust?$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'dust'
        }
      ]
    }
}
