import { type BuildOptions } from '../types/config';

export const buildBabelLoader = ({ isDev }: BuildOptions) => (
    {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env'],
                plugins: [
                    // [
                    //     'i18next-extract',
                    //     {
                    //         locales: ['en', 'lv'],
                    //         nsSeparator: '_',
                    //         outputPath: 'public/locales/{{locale}}/{{ns}}.json',
                    //         keyAsDefaultValue: true,
                    //         discardOldKeys: true,
                    //     },
                    // ],
                    isDev && require.resolve('react-refresh/babel'),
                ].filter(Boolean),
            },
        },
    }
);
