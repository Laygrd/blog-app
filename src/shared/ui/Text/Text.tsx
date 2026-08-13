import { memo, useMemo } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./Text.module.scss";


export enum TextTheme {
    PRIMARY = 'primary',
    INVERTED = 'inverted',
    ERROR = 'error',
}

export enum TextAlign {
    LEFT = 'left',
    CENTER = 'center',
    RIGHT = 'right'
}

export enum TextSize {
    S = "text_s",
    M = "text_m",
    L = 'text_l',
    XL = 'text_xl',
}

type HeaderTagType = 'h1' | 'h2' | 'h3' | 'div';

const headerTagMapper: Record<TextSize, HeaderTagType> = {
    'text_xl': 'div', // not used yet
    'text_l': 'h1',
    'text_m': 'h2',
    'text_s': 'h3'
}

interface TextProps {
    className?: string;
    title?: string;
    text?: string;
    theme?: TextTheme;
    align?: TextAlign;
    size?: TextSize;
}

export const Text = memo((props: TextProps) =>{
    const {
        className,
        title,
        text,
        theme = TextTheme.PRIMARY,
        align = TextAlign.LEFT,
        size = TextSize.M,
        ...otherProps
    } = props;

    const HeaderTag = headerTagMapper[size];

    return(
        <section 
            className={ classNames(cls.Text, {}, [className, cls[theme], cls[align], cls[size]]) }
            {...otherProps}
        >
            { 
                title && 
                <HeaderTag className={cls.titleBlock}>
                    {title}
                </HeaderTag>
            }
            { 
                text && 
                <p className={cls.textBlock}>
                    {text}
                </p>
            }
        </section>
    );
});
