import { MutableRefObject, ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { classNames, Mods } from "shared/lib/classNames/classNames";
import cls from "./Modal.module.scss";
import { Portal } from "../Portal/Portal";
import { Overlay } from "../Overlay/Overlay";


export interface ModalProps {
    className?: string;
    children?: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
    lazy?: boolean;
}

const ANIMATION_DELAY = 50;

export const Modal = ({ className, children, isOpen, onClose, lazy=false }: ModalProps) => {

    const [isClosing, setIsClosing] = useState(false); // for closing animation
    const [isMounted, setIsMounted] = useState(false); // for lazy mounting
    const [isVisible, setIsVisible] = useState(false); // instead of isOpen controls the cls.opened
    const timerRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;

    const mods:  Mods = {
        [cls.opened]: isVisible,
        [cls.isClosing]: isClosing,
    };

    const closeHandler = useCallback(() => {
        if (onClose) {
            setIsClosing(true);
            timerRef.current = setTimeout(() => {
                onClose();
                setIsClosing(false)
                setIsVisible(false);
            }, ANIMATION_DELAY)
        }
    }, [onClose]);

    // for disable closing on content click
    const contentClickHandler = (e: React.MouseEvent) => {
        e.stopPropagation()
    };

    // escape click logic
    const keyDownHandler = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            closeHandler()
        }
    }, [closeHandler]);

    // refs and listeners apply + cleanup
    useEffect(() => {
        if (isOpen) {
            window.addEventListener('keydown', keyDownHandler);
        };

        return () => {
            window.removeEventListener('keydown', keyDownHandler);
            clearTimeout(timerRef.current);
        }
    }, [isOpen, keyDownHandler]);

   
    // lazy modal mounting logic
    useEffect(() => {
        if (isOpen) {
            setIsMounted(true)
        } else {
            setIsVisible(false);
        }
    }, [isOpen]);

    useEffect(() => {
        if (isOpen) {
            const id = setTimeout(() => setIsVisible(true), 0);
            return () => clearTimeout(id);
        }
    }, [isOpen]);

    if (!isMounted && lazy) {
        return null;
    };

    return (
        <Portal>
            <div className={ classNames(cls.Modal, mods, [className]) }>
                <Overlay onClick={closeHandler}/>
                <div 
                    className={cls.content}
                >
                    { children }
                </div>
            </div>
        </Portal>
    );
};
