import { type Configuration as WebpackConfiguration } from 'webpack';
import { type Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';

import { buildPlugins } from './buildPlugins';
import { buildLoaders } from './buildLoaders';
import { buildResolvers } from './buildResolvers';
import { type BuildOptions } from './types/config';
import { buildDevServer } from './buildDevServer';

interface Configuration extends WebpackConfiguration {
    devServer?: WebpackDevServerConfiguration
}

export const buildWebpackConfig = (options: BuildOptions): Configuration => {
    const { mode, paths, isDev } = options;
    return {
        mode,
        entry: paths.entry,
        output: {
            path: paths.build,
            filename: '[name].[contenthash].js',
            publicPath: '/',
            clean: true,
        },
        plugins: buildPlugins(options),
        module: {
            rules: buildLoaders(options),
        },
        resolve: buildResolvers(options),
        devtool: isDev ? 'inline-source-map' : false,
        devServer: isDev ? buildDevServer(options) : undefined,
    };
};
