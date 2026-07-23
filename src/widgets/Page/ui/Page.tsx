import { MutableRefObject, ReactNode, UIEvent, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { StateSchema } from 'app/providers/StoreProvider';
import { getUIScrollByPath, uiActions } from 'features/UI';
import { classNames } from 'shared/lib/classNames/classNames';
import { useInfiniteScroll } from 'shared/lib/hooks/useInfiniteScroll/useInfiniteScroll';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import cls from './Page.module.scss';
import { useThrottle } from 'shared/lib/hooks/useThrottle/useThrottle';


interface PageProps {
   className?: string;
   children: ReactNode;
   onScrollEnd?: () => void;
   restoreScroll?: boolean;
}

export const Page = (props: PageProps) => {
    const {
        className,
        children,
        onScrollEnd,
        restoreScroll = false,
    } = props;

    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
    const location = useLocation();
    const scrollPosition = useSelector((state: StateSchema) => getUIScrollByPath(state, location.pathname));
    const dispatch = useAppDispatch();

    const onScroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
        dispatch(uiActions.setScrollPosition({
            path: location.pathname,
            position: e.currentTarget.scrollTop,
        }));
    }, 150);

    useInfiniteScroll({
        triggerRef,
        wrapperRef,
        callback: onScrollEnd,
    });

    useInitialEffect(() => {
        if (restoreScroll) {
            wrapperRef.current.scrollTop = scrollPosition;
        }
    });

    return (
        <section
            className={classNames(cls.Page, {}, [className])} 
            ref={wrapperRef}
            onScroll={restoreScroll? onScroll : undefined}
        >
            {children}
            <div 
                ref={triggerRef}
                className={classNames(cls.trigger)} 
            />
        </section>
    );
}
