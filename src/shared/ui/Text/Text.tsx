import { classNames } from "shared/lib/classNames/classNames";
import cls from "./Text.module.scss";
import { memo } from "react";


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

    return(
        <div 
            className={ classNames(cls.Text, {}, [className, cls[theme], cls[align], cls[size]]) }
            {...otherProps}
        >
            { 
                title && 
                <p className={cls.titleBlock}>
                    {title}
                </p>
            }
            { 
                text && 
                <p className={cls.textBlock}>
                    {text}
                </p>
            }
        </div>
    );
});
