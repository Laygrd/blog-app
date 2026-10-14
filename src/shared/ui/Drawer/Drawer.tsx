import { ReactNode } from 'react';
import { useModal } from 'shared/lib/hooks/useModal/useModal';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { Overlay } from '../Overlay/Overlay';
import { Portal } from '../Portal/Portal';
import cls from './Drawer.module.scss';


interface DrawerProps {
    className?: string;
    children: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
    lazy?: boolean;
}

export const Drawer = (props: DrawerProps) => {
    const {
        className,
        children,
        onClose,
        isOpen,
        lazy=false
    } = props;

    const {
        close,
        isMounted,
        isVisible,
        isClosing
    } = useModal({
        onClose,
        isOpen,
        animationDelay: 300
    })

    const mods: Mods = {
        [cls.opened]: isVisible,
        [cls.isClosing]: isClosing,
    };

    if (!isMounted && lazy) {
        return null;
    };

    return (
        <Portal>
            <div className={classNames(cls.Drawer, mods, [className])}>
                <Overlay onClick={close} />
                <div
                    className={cls.content}
                >
                    {children}
                </div>
            </div>
        </Portal>
    );
};
