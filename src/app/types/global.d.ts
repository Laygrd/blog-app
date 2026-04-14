declare module '*.scss' {
  interface IClassNames {
    [className: string]: string
  }
  const classNames: IClassNames;
  export = classNames;
}

declare module "*.svg" {
    import React from "react";
    const SVG: React.VFC<React.SVGProps<SVGSVGElement>>;
    export default SVG;
}

declare module "*.jpg";
declare module "*.jpeg";
declare module "*.png";

declare const __IS_DEV__: boolean;
declare const __API__: string;
declare const __PROJECT__: 'frontend' | 'storybook' | 'jest';

// Source - https://stackoverflow.com/a/61132308
// Posted by Terry, modified by community. See post 'Timeline' for change history
// Retrieved 2026-02-02, License - CC BY-SA 4.0

type DeepPartial<T> = T extends object ? {
    [P in keyof T]?: DeepPartial<T[P]>;
} : T;

type OptionalRecord<K extends keyof any, T> = {
    [P in K]?: T;
};