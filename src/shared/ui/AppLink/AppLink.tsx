/* eslint-disable react/prop-types */
import { forwardRef, memo, ReactNode } from "react";
import { Link, LinkProps } from 'react-router-dom';
import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./AppLink.module.scss";


export enum AppLinkTheme {
    PRIMARY = 'primary',
    INVERTED = 'inverted',
    OUTLINE = 'outline',
    OUTLINE_INVERTED = 'outline_inverted',
    CLEAR = 'clear',
};

interface AppLinkProps extends LinkProps {
    className?: string;
    theme?: AppLinkTheme;
    children?: ReactNode;
    max?: boolean;
};

export const AppLink = memo(forwardRef<HTMLAnchorElement, AppLinkProps>((props, ref) => {
    const { 
        className,
        to,
        children,
        theme = AppLinkTheme.PRIMARY,
        max = false,
        ...otherProps
    } = props;

    return (
        <Link
            to={to}
            className={
                classNames(
                    cls.AppLink, 
                    {[cls.max]: max}, 
                    [className, cls[theme]]
                ) 
            }
            {...otherProps}
        >
            {children}
        </Link>
    );
}));
