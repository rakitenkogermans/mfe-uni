const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");
const deps = require("./package.json").dependencies;

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";
  return {
    entry: "./src/index.js",
    mode: "development",
    output: {
      publicPath: "http://localhost:3001/",
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
        name: "header",
        filename: "remoteEntry.js",
        remotes: {
          host: 'host@http://localhost:3000/remoteEntry.js',
          store: 'store@http://localhost:3003/remoteEntry.js',
        },
        exposes: {
          "./Navbar": "./src/app/Navbar.jsx",
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
  }
}
