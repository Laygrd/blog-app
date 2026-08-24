import { Fragment, ReactNode } from 'react';
import { Listbox as HListbox } from '@headlessui/react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from '../Button/Button';
import { HStack } from '../Stack';
import CheckIcon from '../../assets/icons/check.svg';
import cls from './ListBox.module.scss';


export enum ListBoxTheme {
    PRIMARY = 'primary',
    UNDERLINE = 'underline'
}

export type ListBoxDirection = 'top' | 'bottom';

export interface ListBoxItem {
    value: string;
    content: ReactNode;
    disabled?: boolean;
}

interface ListBoxProps {
    theme?: ListBoxTheme;
    className?: string;
    items?: ListBoxItem[];
    value?: string;
    defaultValue?: string,
    label?: string,
    onChange: (value: string) => void;
    readOnly?: boolean;
    direction?: ListBoxDirection;
    fullwidth?: boolean; 
}


export const ListBox = (props: ListBoxProps) => {
    const {
        theme = ListBoxTheme.PRIMARY,
        className,
        items,
        value,
        defaultValue,
        label,
        onChange,
        readOnly,
        direction = 'bottom',
        fullwidth = true
    } = props;
    
    return (
        <>
            <HListbox
                className={classNames(
                    cls.ListBox, 
                    {
                        [cls.labelled]: label, 
                        [cls.fullwidth]: fullwidth
                    }, [
                        className,
                        cls[theme]
                    ]
                )}
                as={'div'}
                value={value}
                onChange={onChange}
                disabled={readOnly}
            >
                { label && <span className={cls.label}>{label}</span>}
                <HListbox.Button className={cls.trigger}>
                    <Button
                        className={cls.triggerBtn}
                        theme={theme === ListBoxTheme.UNDERLINE ? ButtonTheme.CLEAR : ButtonTheme.OUTLINE}
                        disabled={readOnly}
                    >
                        { value ?? defaultValue }
                    </Button>
                </HListbox.Button>

                <HListbox.Options
                    className={classNames(cls.options, {}, [cls[direction]])}
                >
                    { items?.map((item) => (
                        <HListbox.Option 
                            key={item.value}
                            value={item.value}
                            disabled={item.disabled}
                            as={Fragment}
                        >
                            {({ active, selected }) => (
                                <li 
                                    className={classNames(
                                        cls.item, 
                                        {
                                            [cls.active]: active,
                                            [cls.disabled]: item.disabled
                                        }, []
                                    )}
                                >
                                    <HStack gap={'4'} align={'center'}>
                                        {selected && <CheckIcon />}
                                        {item.content}
                                    </HStack>
                                </li>
                            )}
                        </HListbox.Option>
                    ))}
                </HListbox.Options>
            </HListbox>
        </>
    )
}
