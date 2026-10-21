import { ButtonHTMLAttributes, memo, ReactNode } from "react";
import { classNames, Mods } from "@/shared/lib/classNames/classNames";
import cls from "./Button.module.scss";


export enum ButtonTheme {
    PRIMARY = 'primary',
    CLEAR = 'clear',
    CLEAR_INVERTED = 'clear-inverted',
    ICON = 'icon',
    BACKGROUND = 'background',
    BACKGROUND_INVERTED = 'background-inverted',
    OUTLINE = 'outline',
    OUTLINE_INVERTED = 'outline-inverted',
    OUTLINE_CANCEL = 'outline-cancel'
};

export enum ButtonSize {
    SIZE_M = 'size_m',
    SIZE_L = 'size_l',
    SIZE_XL = 'size_xl'
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    className?: string;
    theme?: ButtonTheme;
    square?: boolean;
    size?: ButtonSize;
    disabled?: boolean;
    children?: ReactNode;
    fullwidth?: boolean;
};

export const Button = memo((props: ButtonProps) => {
    const {
        className,
        theme = ButtonTheme.PRIMARY,
        children,
        type = 'button',
        square = false,
        size = ButtonSize.SIZE_M,
        disabled = false,
        fullwidth,
        ...otherProps
    } = props;


    const mods: Mods = {
        [cls.square]: square,
        [cls[size]]: true,
        [cls.disabled]: disabled,
        [cls.fullwidth]: fullwidth,
    }

    return (
        <button
            className={ classNames(cls.Button, mods, [className, cls[theme]]) }
            type={type}
            disabled={disabled}
            {...otherProps}
        >
            {children}
        </button>
    );
});
