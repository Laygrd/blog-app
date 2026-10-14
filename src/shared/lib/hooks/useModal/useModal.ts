import { MutableRefObject, useCallback, useEffect, useRef, useState } from "react";


interface UseModalProps {
    isOpen?: boolean;
    onClose?: () => void;
    animationDelay?: number;
}

export function useModal(props: UseModalProps) {
    const {
        isOpen,
        onClose,
        animationDelay,
    } = props;

    const [isClosing, setIsClosing] = useState(false); // for closing animation
    const [isMounted, setIsMounted] = useState(false); // for lazy mounting
    const [isVisible, setIsVisible] = useState(false); // instead of isOpen controls the cls.opened
    const timerRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;


    const close = useCallback(() => {
        if (onClose) {
            setIsClosing(true);
            timerRef.current = setTimeout(() => {
                onClose();
                setIsClosing(false)
                setIsVisible(false);
            }, animationDelay)
        }
    }, [onClose, animationDelay]);

    // escape keydown logic
    const keyDownHandler = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            close()
        }
    }, [close]);

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


    return {
        isClosing,
        isMounted,
        isVisible,
        close,
    }
}