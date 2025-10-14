const HtmlWebPackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./public/index.html",
  filename: "./index.html",
});
module.exports = {
  mode: "development",
  // devServer: {
  //   static: path.join(__dirname, "dist"),
  //   port: 3004,
  //   historyApiFallback: {
  //     index: "/public/index.html",
  //   },
  // },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"], // allows importing without specifying extensions
  },
  plugins: [
    htmlPlugin,
    new ModuleFederationPlugin({
      name: "Host",
      remotes: {
        MicroFrontend: "MicroFrontend@http://localhost:3005/remoteEntry.js",
      },
      shared: {
        react: { singleton: true, eager: true },
        "react-dom": { singleton: true, eager: true },
      },
    }),
  ],
};

// Checkout: "Checkout@http://localhost:3000/remoteEntry.js"
