const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = webpack.container;
const deps = require("./package.json").dependencies;

module.exports = (env, argv) => {
  const mode = env.mode || 'development';
  const isDev = mode === 'development';
  const apiUrl = env.apiUrl || 'http://localhost:8000';

  return {
    entry: "./src/index.js",
    mode,
    output: {
      filename: '[name].[contenthash].js',
      publicPath: isDev ? "http://localhost:3003/" : "https://store.mfe-uni.germans.dev/",
      clean: true
    },
    devServer: {
      port: env.port,
      open: true,
      historyApiFallback: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    },
    resolve: {
      extensions: [".jsx", ".js", ".json"],
    },
    module: {
      rules: [
        {
          test: /\.(css|s[ac]ss)$/i,
          use: ["style-loader", "css-loader", "postcss-loader"],
        },
        {
          test: /\.(js|jsx)$/,
          loader: "babel-loader",
          exclude: /node_modules/,
          options: {
            cacheDirectory: true,
            babelrc: false,
            presets: [
              [
                "@babel/preset-env",
                { targets: { browsers: "last 2 versions" } },
              ],
              ["@babel/preset-react", {"runtime": "automatic"}],
            ],
          },
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
          "./Store": "./src/app/context/Store.jsx",
        },
        shared: {
          ...deps,
          react: {
            singleton: true,
            // eager: true,
            requiredVersion: deps.react
          },
          "react-dom": {
            singleton: true,
            // eager: true,
            requiredVersion: deps["react-dom"],
          },
          "react-router-dom": {
            singleton: true,
            // eager: true,
            requiredVersion: deps["react-router-dom"],
          },
          axios: {
            singleton: true,
            // eager: true,
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
