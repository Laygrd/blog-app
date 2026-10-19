import { ReactNode, useCallback, useEffect } from 'react';

import { useAnimationLibs } from '@/shared/lib/components/AnimationProvider';
import { classNames } from '@/shared/lib/classNames/classNames';
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

const height = window.innerHeight - 100;

const DrawerContent = (props: DrawerProps) => {
    const {
        className,
        children,
        onClose,
        isOpen,
        lazy=false
    } = props;
    
    const { Gesture, Spring} = useAnimationLibs();

    const [{ y }, api] = Spring.useSpring(() => ({ y: height }))

    const openDrawer = useCallback(() => {
        api.start({ y: 0, immediate: false })
    }, [api]);

    const closeDrawer = useCallback((velocity = 0) => {
        api.start({
            y: height,
            immediate: false,
            config: {
                ...Spring.config.stiff,
                velocity,
            },
            onRest: (result) => {
                // вызываем onClose только если пружина реально в нижней точке и не была прервана
                if (!result.cancelled && result.value?.y === height) {
                    onClose?.();
                }
            },
        })
    }, [api, onClose, Spring.config.stiff]);

    const bind = Gesture.useDrag(
        ({
            last,
            velocity: [, vy],
            direction: [, dy],
            offset: [, oy],
            cancel,
        }) => {
            if (oy < -70) cancel()

            if (last) {
                if (oy > height * 0.5 || (vy > 0.5 && dy > 0)) {
                    closeDrawer(vy);
                } else {
                    openDrawer();
                } 
            } else {
                api.start({ y: oy, immediate: true })
            }
        },
        {
            from: () => [0, y.get()],
            filterTaps: true,
            preventDefault: true,
            bounds: { top: 0 },
            rubberband: true,
        }
    )

    
    useEffect(() => {
        if (isOpen) {
            openDrawer();
        }
    }, [isOpen, openDrawer]);
    
    const display = y.to((py) => (py < height ? 'block' : 'none'))

    if (!isOpen) {
        return null;
    }

    return (
        <Portal>
            <div className={classNames(cls.Drawer, {}, [className])} >
                <Overlay onClick={() => closeDrawer()} />
                <Spring.a.div
                    className={cls.sheet}
                    style={{ display, bottom: `calc(-100vh + ${height - 100}px)`, y }}
                    
                >
                    <div
                        className={cls.handle}
                        {...bind()}
                    />
                    {children}
                </Spring.a.div>
            </div>
        </Portal>
    );
};

export const Drawer = (props: DrawerProps) => {
    const { isLoaded } = useAnimationLibs();

    if (!isLoaded) {
        return null
    };

    return <DrawerContent {...props} />
};
