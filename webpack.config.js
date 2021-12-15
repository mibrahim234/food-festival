const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin");
 const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require('path');

const config = {
  entry: {
    app: './assets/js/script.js',
    events: './assets/js/events.js',
    schedule: './assets/js/schedule.js',
    tickets: './assets/js/tickets.js'
  },
  output: {
    //The name of each attribute in the entry object will be used in place of [name] in each bundle.js file that is created
    filename: '[name].bundle.js',
    path: __dirname + '/dist'
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            // options object that can rename our files and change the output path.
            options: {
              esModule: false,
              name(file) {
                return '[path][name].[ext]';
              },
              publicPath(url) {
                return url.replace('../', '/assets/');
              }
            }
          },
          {
            loader: 'image-webpack-loader'
          }
        ]
      }
    ]
  },
  // new keyword invokes a constructor function
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static'
    }),
    new WebpackPwaManifest({
      name: "Food Event",
      short_name: "Foodies",
      description: "An app that allows you to view upcoming food events.",
      start_url: "../index.html", //to specify the homepage for the PWA relative to the location of the manifest file 
  background_color: "#01579b",
  theme_color: "#ffffff",
      fingerprints: false,
      // Fingerprints tell webpack whether or not it should generate unique fingerprints so that each time a new manifest is generated, it looks like this: manifest.lhge325d.json. Because we do not want this feature, we set fingerprints to be false.
      inject: false,
      // The inject property determines whether the link to the manifest.json is added to the HTML. Because we are not using fingerprints, we can also set inject to be false. 
      
      // sizes of the icons 
      icons: [{
        src: path.resolve("assets/img/icons/icon-512x512.png"),
        sizes: [96, 128, 192, 256, 384, 512],
        destination: path.join("assets", "icons")
      }]
    })
  ],
  mode: 'development'
};

module.exports = config;
