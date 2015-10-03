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
        },
        { test: /bootstrap\/js\//, loader: 'imports?jQuery=jquery' },

        // Needed for the css-loader when [bootstrap-webpack](https://github.com/bline/bootstrap-webpack)
        // loads bootstrap's css.
        { test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&minetype=application/font-woff" },
        { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&mimetype=application/octet-stream" },
        { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,    loader: "file" },
        { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&mimetype=image/svg+xml" }
      ]
    }
}
