const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const { ModuleFederationPlugin } = webpack.container;
const deps = require("./package.json").dependencies;

module.exports = (env, argv) => {
  const mode = env.mode || 'development';
  return {
    entry: "./src/index.js",
    mode,
    output: {
      filename: '[name].[contenthash].js',
      publicPath: "http://localhost:3000/",
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
      extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    },
    module: {
      rules: [
        {
          test: /\.(css|s[ac]ss)$/i,
          use: ["style-loader", "css-loader", "postcss-loader"],
        },
        {
          test: /\.(js|jsx|tsx|ts)$/,
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
      new ModuleFederationPlugin({
        name: "host",
        filename: "remoteEntry.js",
        remotes: {
          header: 'header@http://localhost:3001/remoteEntry.js',
          product: 'product@http://localhost:3002/remoteEntry.js',
          store: 'store@http://localhost:3003/remoteEntry.js',
          cart: 'cart@http://localhost:3004/remoteEntry.js',
          user: 'user@http://localhost:3005/remoteEntry.js',
          footer: 'footer@http://localhost:3006/remoteEntry.js',
        },
        exposes: {
          "./App": "./src/app/App.jsx",
          "./ErrorBoundary": "./src/app/ErrorBoundary.jsx"
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
        },
      }),
      new HtmlWebpackPlugin({
        template: "./public/index.html",
      }),
    ],
  };
};
