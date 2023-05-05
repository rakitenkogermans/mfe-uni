import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { type BuildOptions } from './types/config';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
const { ModuleFederationPlugin } = webpack.container
import { dependencies as deps } from '../../package.json';

export const buildPlugins = ({ paths, isDev, apiUrl, project, port }: BuildOptions): webpack.WebpackPluginInstance[] => {
    const plugins = [
        new webpack.ProgressPlugin(),

        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css',
        }),

        new webpack.DefinePlugin({
            __IS_DEV__: JSON.stringify(isDev),
            __API__: JSON.stringify(apiUrl),
            __PROJECT__: JSON.stringify(project),
        }),

        new ModuleFederationPlugin({
            name: "header",
            filename: "remoteEntry.js",
            remotes: {
                // host: `host@http://localhost:${port}/remoteEntry.js`,
            },
            exposes: {
                "./App": path.resolve(paths.src, 'app', 'App.tsx'),
                "./Navbar": path.resolve(paths.src, 'app', 'Navbar.tsx')
            },
            shared: {
                ...deps,
                react: {
                    singleton: true,
                    requiredVersion: deps.react,
                },
                "react-dom": {
                    singleton: true,
                    requiredVersion: deps["react-dom"],
                },
            },
        }),

        new HtmlWebpackPlugin({ template: paths.html, excludeChunks: ['child'], }),
    ];

    if (isDev) {
        plugins.push(new ReactRefreshWebpackPlugin());
        plugins.push(new webpack.HotModuleReplacementPlugin());
        plugins.push(new BundleAnalyzerPlugin({
            openAnalyzer: false,
        }));
    }

    return plugins;
};
