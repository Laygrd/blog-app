import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Tabs.module.scss';
import { ReactNode } from 'react';
import { Card, CardTheme } from '../Card/Card';

export interface TabItem {
    value: string;
    content: ReactNode;
}

interface TabsProps {
   className?: string;
   value: string;
   tabs: TabItem[];
   onTabClick?: (tab: TabItem) => void;
}

export const Tabs = (props: TabsProps) => {
    const {
        className,
        value,
        tabs,
        onTabClick,
        ...otherProps
    } = props;

    const { t } = useTranslation()

    const onHandleTabClick = (tab: TabItem) => () => {
        onTabClick?.(tab)
    }

    return (
        <div className={classNames(cls.Tabs, {}, [className])}>
            {
                tabs.map((tab) => {
                    return (
                        <Card
                            key={tab.value}
                            theme={tab.value === value ? CardTheme.OUTLINE : CardTheme.DEFAULT}
                            onClick={onHandleTabClick(tab)}
                        >
                            { tab.content }
                        </Card> 
                    )
                })
            }
        </div>
    );
}
