import webpack, { DefinePlugin } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { BuildOptions } from './types/config';
import CopyPlugin from 'copy-webpack-plugin';
import CircularDependencyPlugin from 'circular-dependency-plugin'



export function buildPlugins(buildOptions: BuildOptions): webpack.WebpackPluginInstance[] {
    const { paths, isDev, apiUrl, project, withAnalyzer } = buildOptions;

    const plugins = [
        new HtmlWebpackPlugin({
            template: paths.html,
        }),
        new webpack.ProgressPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css',
        }),
        new DefinePlugin({
            __IS_DEV__: JSON.stringify(isDev),
            __API__: JSON.stringify(apiUrl),
            __PROJECT__: JSON.stringify(project),
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: paths.locales,
                    to: paths.buildLocales,
                }
            ]
        }),
    ];

    // only on devserver
    if (isDev) {
        
        let numCyclesDetected = 0;
        plugins.push(new CircularDependencyPlugin({
            exclude: /node_modules/,
            failOnError: true,
            allowAsyncCycles: false,
            onStart() {
                numCyclesDetected = 0;
            },
            onDetected({ paths }) {
                numCyclesDetected++;
                console.log('\x1b[31m%s\x1b[0m', '\nCIRCULAR DEPENDENCY DETECTED:');
                console.log(paths.join(' -> '));
            },
            onEnd() {
                if (numCyclesDetected > 0) {
                    throw new Error(`Detected ${numCyclesDetected} circular dependencies`);
                }
            },  
        }));

        plugins.push(new ReactRefreshWebpackPlugin({
            overlay: false
        }));
    };

    if (withAnalyzer) {
        plugins.push(new BundleAnalyzerPlugin({openAnalyzer: true}))
    }

    return plugins;
}