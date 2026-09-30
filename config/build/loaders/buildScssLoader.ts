import MiniCssExtractPlugin from "mini-css-extract-plugin";

export const buildScssLoader = (isDev: boolean) => {
    return {
        test: /\.s[ac]ss$/i,
        use: [
            // sass -> css -> CommonJs -> styleLoader or MiniCssExtractPlugin
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
                loader: 'css-loader',
                options: {
                    modules: {
                        auto: (resPath: string) => Boolean(resPath.includes('.module.')),
                        localIdentName: isDev
                            ? '[path][name]__[local]--[hash:base64:5]'
                            : '[hash:base64:8]',
                    },
                },
            },
            {
                loader: 'sass-loader',
                options: {
                    sassOptions: {
                        // Отключает предупреждения об устаревании из зависимостей (node_modules)
                        quietDeps: true,
                        // Опционально: можно точечно заглушить конкретные категории предупреждений
                        silenceDeprecations: ['legacy-js-api', 'import', 'global-builtin', 'color-functions'],
                    },
                }
            }
            
        ],
    };
};
