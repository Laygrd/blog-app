import webpack from 'webpack';
import { BuildOptions } from './types/config';

export function buildResolvers(buildOptions: BuildOptions): webpack.ResolveOptions {
    return {
        extensions: ['.tsx', '.ts', '.js'],
        modules: [buildOptions.paths.src, 'node_modules'],
        preferAbsolute: true,
        alias: {
            '@': buildOptions.paths.src,
        },
    }
}