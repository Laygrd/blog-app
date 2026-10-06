import webpack from 'webpack';
import { BuildOptions } from './types/config';
import { buildScssLoader } from './loaders/buildScssLoader';
import { buildSvgLoader } from './loaders/buildSvgLoader';
import { buildBabelLoader } from './loaders/buildBabelLoader';


export function buildLoaders(buildOptions: BuildOptions): webpack.RuleSetRule[] {
    const { isDev } = buildOptions;

    // const babelLoader = buildBabelLoader(buildOptions);
    const babelCodeLoader = buildBabelLoader({...buildOptions, isTsx: false});
    const babelTsxLoader = buildBabelLoader({...buildOptions, isTsx: true});

    const svgLoader = buildSvgLoader();

    // const typescriptLoader = {
    //     test: /\.tsx?$/,
    //     use: 'ts-loader',
    //     exclude: /node_modules/,
    // };

    const scssLoader = buildScssLoader(isDev);

    return [
        svgLoader,
        babelCodeLoader,
        babelTsxLoader,
        // typescriptLoader,
        scssLoader,
    ];
}