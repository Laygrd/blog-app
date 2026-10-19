import { classNames } from '@/shared/lib/classNames/classNames';
import { FC, memo, SVGProps } from 'react';
import cls from './Icon.module.scss';


export const enum IconTheme {
    PIRMARY = 'primary',
    SECONDARY = 'sedondary',
    INVERTED_PIRMARY = 'inverted-primary',
    INVERTED_SECONDARY = 'inverted-secondary',
}

interface IconProps {
    className?: string;
    Svg: FC<SVGProps<SVGSVGElement>>;
    theme?: IconTheme;
    excludeFill?: boolean; // fill: <some_color> css-property will be excluded
    excludeColor?: boolean; // color: <some_color> css-property will be excluded
}

export const Icon = memo((props: IconProps) => {
    const {
        className,
        Svg,
        theme = IconTheme.PIRMARY,
        excludeColor = false,
        excludeFill = false,
    } = props;

    return (
        <Svg
            className={
                classNames(
                    cls.Icon, 
                    {[cls.excludeFill]: excludeFill, [cls.excludeColor]: excludeColor}, 
                    [className, cls[theme]]
                )
            } 
        />
    );
});
