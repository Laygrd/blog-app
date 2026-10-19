import { InputHTMLAttributes, memo } from "react";
import { classNames, Mods } from "@/shared/lib/classNames/classNames";
import cls from "./Input.module.scss";


export enum InputTheme {
    DEFAULT = 'default',
    CLEAR = 'clear',
    UNDERLINE = 'underline',
}

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'id' | 'readOnly'> {
    id: string;
    className?: string;
    value?: string | number;
    onChange?: (value: string) => void;
    readOnly?: boolean;
    theme?: InputTheme;
}

export const Input = memo((props: InputProps) =>{

    const {
        id,
        className,
        value,
        onChange,
        type,
        placeholder,
        readOnly = false,
        theme = InputTheme.DEFAULT,
        ...otherProps
    } = props;


    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        return onChange?.(e.target.value)
    };

    const mods: Mods = {
        [cls.readonly]: readOnly,
    }

    return(
        <div 
            className={ classNames(cls.Input, mods, [className, cls[theme]]) }
        >
            <input
                id={id}
                className={cls.inputField}
                data-testid="input"
                type={type}
                value={value}
                placeholder="" // for .inputField:not(:placeholder-shown) selector
                onChange={onChangeHandler}
                readOnly={readOnly}
                {...otherProps}
            />
            <label htmlFor={id} className={cls.placeholder}>{placeholder}</label>
        </div>
    );
});
