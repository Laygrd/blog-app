import { HTMLAttributes, ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Card.module.scss';

export enum CardTheme {
    DEFAULT = 'default',
    OUTLINE = 'outline',
}

interface CardProps extends HTMLAttributes<HTMLDivElement> {
   className?: string;
   children?: ReactNode;
   theme?: CardTheme;
   max?: boolean;
}

export const Card = (props: CardProps) => {
    const {
        className,
        children,
        theme = CardTheme.DEFAULT,
        max,
        ...otherProps
    } = props;

    return (
        <div
            className={classNames(cls.Card, {[cls.max]: max}, [className, cls[theme]])}
            {...otherProps}
        >
            {children}
        </div>
    );
}
