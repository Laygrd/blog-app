export type BuildMode = 'production' | 'development';

export interface BuildPaths {
    entry: string;
    build: string;
    html: string;
    src: string;
    locales: string;
    buildLocales: string;
};

export interface BuildEnv {
    mode: BuildMode;
    withAnalyzer?: boolean;
    port: number;
    apiUrl?: string;
};

export interface BuildOptions {
    mode: BuildMode;
    withAnalyzer: boolean;
    paths: BuildPaths;
    isDev: boolean;
    port: number;
    apiUrl: string;
    project: 'frontend' | 'storybook' | 'jest'
};