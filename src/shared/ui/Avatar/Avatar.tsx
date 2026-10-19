import { CSSProperties, useMemo } from "react";
import EditIcon from '@/shared/assets/icons/edit-line-large-icon.svg';
import { classNames, Mods } from "@/shared/lib/classNames/classNames";
import cls from "./Avatar.module.scss";

import { Button, ButtonTheme } from "../Button/Button";

export enum AvatarTheme {
    DEFAULT = 'default',
    ROUNDED = 'rounded',
}

interface AvatarProps {
    className?: string;
    src?: string;
    alt?: string;
    size?: number;
    editable?: boolean;
    onEdit?: () => void;
    theme?: AvatarTheme;
    border?: boolean;
}

export const Avatar = (props: AvatarProps) => {
    const {
        className,
        src,
        alt,
        size = 100,
        editable = false,
        onEdit,
        theme = AvatarTheme.DEFAULT,
        border = true,
    } = props;

    const style: CSSProperties = useMemo(() => ({
        width: size,
        height: size,
    }), [size]);

    const mods: Mods = {
        [cls.border]: border,
    }

    if (editable) {
        return (
            <div
                className={ classNames(cls.Avatar, mods, [className, cls[theme]]) }
                style={style}
            >
                <img
                    className={cls.image}
                    src={src}
                    alt={alt}
                    style={style}
                />
                <Button
                    className={cls.editBtn}
                    theme={ButtonTheme.CLEAR}
                    style={style}
                    onClick={onEdit}
                >
                    <EditIcon />
                </Button>
            </div>
        )
    }

    return (
        <div
            className={ classNames(cls.Avatar, mods, [className, cls[theme]]) }
            style={style}
        >
            <img
                className={cls.image}
                src={src}
                alt={alt}
                style={style}
            />
        </div>
    );
};
