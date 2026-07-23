import { ChangeEvent, memo, useMemo } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./Select.module.scss";

export interface SelectOption<T extends string> {
    value: T;
    content: string;
}

export enum SelectTheme {
    PRIMARY = 'primary',
    UNDERLINE = 'underline',
}

interface SelectProps<T extends string> {
    id?: string;
    className?: string;
    label?: string;
    options?: SelectOption<T>[];
    value?: T;
    onChange?: (value: T) => void;
    readOnly?: boolean;
    theme?: SelectTheme;
}

export const Select = <T extends string>(props: SelectProps<T>) =>{
    const {
        id,
        className,
        label,
        options,
        value,
        onChange,
        readOnly = false,
        theme = SelectTheme.PRIMARY,
        ...otherProps
    } = props;
    
    const optionsList = useMemo(() => {
        return options?.map((opt) => (
            <option
                className={cls.option}
                key={opt.value}
                value={opt.value}
            >
                {opt.content}
            </option>
        ))
    }, [options]);

    const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        onChange?.(e.target.value as T)
    }

    return(
        <div 
            className={ classNames(cls.Select, {}, [className, cls[theme]]) }
            {...otherProps}
        >
            { 
                label &&
                <span
                    className={cls.label}
                >
                    {label}
                </span>
            }
            <select
                id={id}
                className={cls.selector}
                disabled={readOnly}
                value={value}
                onChange={onChangeHandler}
            >
                { optionsList }
            </select>
        </div>
    );
};
