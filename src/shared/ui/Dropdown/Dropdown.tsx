/* eslint-disable i18next/no-literal-string */
import { Fragment } from 'react/jsx-runtime';
import { Menu } from '@headlessui/react'
import { ReactNode, useMemo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Dropdown.module.scss';
import { DropdownDirection } from 'shared/types/ui';
import { AppLink } from '../AppLink/AppLink';


export interface DropdownItem {
    content?: ReactNode;
    onClick?: () => void;
    href?: string;
    disabled?: boolean;
};

interface DropdownProps {
   className?: string;
   items: DropdownItem[];
   trigger: ReactNode;
   direction?: DropdownDirection;
   fullwidth?: boolean;
};

export const mapDirectionClass: Record<DropdownDirection, string> = {
    'top left': cls.topLeftDirection,
    'top right': cls.topRightDirection,
    'bottom right': cls.bottomRightDirection,
    'bottom left': cls.bottomLeftDirection,
}

export const Dropdown = (props: DropdownProps) => {
    const {
        className,
        items,
        trigger,
        direction = 'bottom left',
        fullwidth = true,
    } = props;

    const menuClasses = useMemo(() => [ mapDirectionClass[direction] ], [direction]);

    return (
        <Menu as={'div'} className={classNames(cls.Dropdown, {[cls.fullwidth]: fullwidth}, [className])} >
            <Menu.Button className={cls.trigger} as={'div'}>
                { trigger }
            </Menu.Button>

            <Menu.Items className={classNames(cls.menu, {}, menuClasses)} >
                { items.map(item => {

                    const content = (
                        ({ active }: { active: boolean}) => (
                            <button
                                type='button'
                                disabled={item.disabled}
                                className={classNames(
                                    cls.item, 
                                    { [cls.itemActive]: active, [cls.itemDisabled]: item.disabled },
                                    []
                                )}
                                onClick={item.onClick}
                            >
                                { item.content }
                            </button> 
                        ));

                    if (item.href) {
                        return (
                            <Menu.Item as={AppLink} to={item.href} disabled={item.disabled}>
                                { content }
                            </Menu.Item>
                        )
                    }

                    return (
                        // eslint-disable-next-line react/jsx-key
                        <Menu.Item as={Fragment} disabled={item.disabled}>
                            { content }
                        </Menu.Item>
                    )
                }) }
            </Menu.Items>

        </Menu>
    );
}
