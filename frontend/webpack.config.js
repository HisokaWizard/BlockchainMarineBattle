const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  // entry points (maybe more than one)
  entry: path.resolve(__dirname, "./src/App.tsx"),
  // directory and general file with application
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "frontend/dist"),
  },
  resolve: {
    extensions: [".js", ".json", ".css", ".ts", ".tsx", ".jsx"],
  },
  // optimization of the build, with vendor, where we have libraries.
  devServer: {
    port: 7777,
    hot: true,
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, "/"),
    },
  },
  devtool: "source-map",
  plugins: [
    // update index.html after rebuild automatically
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./index.html"),
    }),
  ],
  // implement loaders for different files except of js
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
};
