import { Popover as HPopover } from '@headlessui/react';
import { classNames } from '@/shared/lib/classNames/classNames';
import popupCls from '../../common/popupStyles.module.scss';
import cls from './Popover.module.scss';
import { ReactNode, useMemo } from 'react';
import { DropdownDirection } from '@/shared/types/ui';
import { mapDirectionClass } from '../../common/consts';


interface PopoverProps {
   className?: string;
   direction?: DropdownDirection;
   trigger: ReactNode;
   children: ReactNode;
}

export const Popover = (props: PopoverProps) => {
    const {
        className,
        trigger,
        direction = 'bottom left',
        children,
    } = props;

    const optionsClasses = useMemo(() => [ mapDirectionClass[direction] ], [direction]);

    return (
        <HPopover className={classNames(popupCls.Popover, {}, [className, popupCls.Popup])}>
            <HPopover.Button className={popupCls.trigger} as='div'>
                { trigger }
            </HPopover.Button>

            <HPopover.Panel className={classNames(cls.panel, {}, optionsClasses)}>
                { children }
            </HPopover.Panel>
        </HPopover>
    );
}
