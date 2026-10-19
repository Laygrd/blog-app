import { ReactNode } from "react";
import { useModal } from "@/shared/lib/hooks/useModal/useModal";
import { classNames, Mods } from "@/shared/lib/classNames/classNames";
import { Portal } from "../Portal/Portal";
import { Overlay } from "../Overlay/Overlay";
import cls from "./Modal.module.scss";


export interface ModalProps {
    className?: string;
    children?: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
    lazy?: boolean;
}

const ANIMATION_DELAY = 50;

export const Modal = ({ className, children, isOpen, onClose, lazy=false }: ModalProps) => {

    const {
        isClosing,
        isMounted,
        isVisible,
        close
    } = useModal({
        isOpen,
        onClose,
        animationDelay: ANIMATION_DELAY
    });

    const mods:  Mods = {
        [cls.opened]: isVisible,
        [cls.isClosing]: isClosing,
    };

    if (!isMounted && lazy) {
        return null;
    };

    return (
        <Portal>
            <div className={ classNames(cls.Modal, mods, [className]) }>
                <Overlay onClick={close}/>
                <div className={cls.content} >
                    { children }
                </div>
            </div>
        </Portal>
    );
};
