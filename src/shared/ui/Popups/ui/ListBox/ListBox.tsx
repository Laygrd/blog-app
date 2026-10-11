import { Fragment, ReactNode, useMemo } from 'react';
import { Listbox as HListbox } from '@headlessui/react';
import { classNames } from 'shared/lib/classNames/classNames';
import { DropdownDirection } from 'shared/types/ui';

import { Button, ButtonTheme } from '../../../Button/Button';
import CheckIcon from '../../../../assets/icons/check.svg';
import { Icon, IconTheme } from '../../../Icon/Icon';
import { HStack } from '../../../Stack';
import cls from './ListBox.module.scss';
import popupCls from '../../common/popupStyles.module.scss';
import { mapDirectionClass } from '../../common/consts';


export enum ListBoxTheme {
    PRIMARY = 'primary',
    UNDERLINE = 'underline'
}


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
    direction?: DropdownDirection;
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
        direction = 'bottom left',
        fullwidth = true
    } = props;
    
    const optionsClasses = useMemo(() => [ mapDirectionClass[direction] ], [direction]);

    return (
        <>
            <HListbox
                className={classNames(
                    popupCls.Popup, 
                    {
                        [cls.labelled]: label, 
                        [popupCls.fullwidth]: fullwidth
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
                <HListbox.Button className={popupCls.trigger} as={'div'}>
                    <Button
                        className={cls.triggerBtn}
                        theme={theme === ListBoxTheme.UNDERLINE ? ButtonTheme.CLEAR : ButtonTheme.OUTLINE}
                        disabled={readOnly}
                    >
                        { value ?? defaultValue }
                    </Button>
                </HListbox.Button>

                <HListbox.Options
                    className={classNames(cls.options, {}, optionsClasses)}
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
                                            [popupCls.itemActive]: active,
                                            [popupCls.itemDisabled]: item.disabled
                                        }, []
                                    )}
                                >
                                    <HStack gap={'4'} align={'center'}>
                                        {selected && 
                                            <Icon 
                                                theme={IconTheme.PIRMARY} 
                                                Svg={CheckIcon}
                                            />
                                        }
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