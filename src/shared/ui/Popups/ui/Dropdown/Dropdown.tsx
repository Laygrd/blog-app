/* eslint-disable i18next/no-literal-string */
import { Fragment, ReactNode, useMemo } from 'react';
import { Menu } from '@headlessui/react'
import { DropdownDirection } from 'shared/types/ui';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink } from '../../../AppLink/AppLink';
import cls from './Dropdown.module.scss';
import popupCls from '../../common/popupStyles.module.scss';
import { mapDirectionClass } from '../../common/consts';


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
        <Menu 
            as={'div'}
            className={classNames(
                popupCls.Popup,
                {
                    [popupCls.fullwidth]: fullwidth
                },
                [className]
            )} 
        >
            <Menu.Button className={popupCls.trigger} as={'div'}>
                { trigger }
            </Menu.Button>

            <Menu.Items className={classNames(cls.menu, {}, menuClasses)} >
                { items.map((item, index) => {

                    const content = (
                        ({ active }: { active: boolean}) => (
                            <button
                                type='button'
                                disabled={item.disabled}
                                className={classNames(
                                    cls.item, 
                                    {
                                        [popupCls.itemActive]: active,
                                        [popupCls.itemDisabled]: item.disabled,
                                    },
                                    []
                                )}
                                onClick={item.onClick}
                            >
                                { item.content }
                            </button> 
                        ));

                    if (item.href) {
                        return (
                            <Menu.Item 
                                as={AppLink} 
                                to={item.href} 
                                disabled={item.disabled} 
                                key={`dropdown_item_${index}`}
                            >
                                { content }
                            </Menu.Item>
                        )
                    }

                    return (
                        // eslint-disable-next-line react/jsx-key
                        <Menu.Item 
                            as={Fragment}
                            disabled={item.disabled}
                            key={`dropdown_item_${index}`}
                        >
                            { content }
                        </Menu.Item>
                    )
                }) }
            </Menu.Items>

        </Menu>
    );
}
