const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const { ModuleFederationPlugin } = webpack.container;
const deps = require("./package.json").dependencies;
const CopyPlugin = require("copy-webpack-plugin");

module.exports = (env, argv) => {
  const mode = env.mode || 'development';
  const isDev = mode === 'development';

  return {
    entry: "./src/index.js",
    mode,
    output: {
      filename: '[name].[contenthash].js',
      publicPath: isDev ? "http://localhost:3000/" : "https://mfe-uni.germans.dev/",
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
      new ModuleFederationPlugin({
        name: "host",
        filename: "remoteEntry.js",
        remotes: {
          header: isDev ? 'header@http://localhost:3001/remoteEntry.js' : 'header@https://header.mfe-uni.germans.dev/remoteEntry.js',
          product: isDev ? 'product@http://localhost:3002/remoteEntry.js' : 'product@https://product.mfe-uni.germans.dev/remoteEntry.js',
          store: isDev ? 'store@http://localhost:3003/remoteEntry.js' : 'store@https://store.mfe-uni.germans.dev/remoteEntry.js',
          cart: isDev ? 'cart@http://localhost:3004/remoteEntry.js' : 'cart@https://cart.mfe-uni.germans.dev/remoteEntry.js',
          user: isDev ? 'user@http://localhost:3005/remoteEntry.js' : 'user@https://user.mfe-uni.germans.dev/remoteEntry.js',
          footer: isDev ? 'footer@http://localhost:3006/remoteEntry.js': 'footer@https://footer.mfe-uni.germans.dev/remoteEntry.js',
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
      new CopyPlugin({
        patterns: [
          { from: "./public/assets", to: "./assets" },
        ],
      }),
    ],
  };
};
