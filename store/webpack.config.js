const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = webpack.container;
const path = require("path");
const deps = require("./package.json").dependencies;

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";
  const apiUrl = env.apiUrl || 'http://localhost:8000';

  return {
    entry: "./src/index.tsx",
    mode: "development",
    devServer: {
      port: env.port,
      open: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
    },
    module: {
      rules: [
        {
          test: /\.(css|s[ac]ss)$/i,
          use: ["style-loader", "css-loader", "postcss-loader"],
        },
        {
          test: /\.(js|jsx|tsx|ts)$/,
          loader: "ts-loader",
          exclude: /node_modules/,
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        __API__: JSON.stringify(apiUrl),
      }),
      new ModuleFederationPlugin({
        name: "store",
        filename: "remoteEntry.js",
        exposes: {
          "./Store": "./src/app/context/Store.tsx",
        },
        shared: {
          ...deps,
          react: {singleton: true, eager: true, requiredVersion: deps.react},
          "react-dom": {
            singleton: true,
            eager: true,
            requiredVersion: deps["react-dom"],
          },
          "react-router-dom": {
            singleton: true,
            eager: true,
            requiredVersion: deps["react-router-dom"],
          },
          axios: {
            singleton: true,
            eager: true,
            requiredVersion: deps.axios,
          }
        },
      }),
      new HtmlWebpackPlugin({
        template: "./public/index.html",
      }),
    ],
  }
}
