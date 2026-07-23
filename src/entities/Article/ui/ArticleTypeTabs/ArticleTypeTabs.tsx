import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { TabItem, Tabs } from 'shared/ui/Tabs/Tabs';
import { ArticleType } from '../../model/types/Article';
import { useCallback, useMemo } from 'react';


interface ArticleTypeTabsProps {
   className?: string;
   value: ArticleType;
   onChangeType: (type: ArticleType) => void;
}

export const ArticleTypeTabs = (props: ArticleTypeTabsProps) => {
    const { className, value, onChangeType } = props;
    const { t } = useTranslation('article', {keyPrefix: 'ArticleTypeTabs'})

    const typeTabs = useMemo<TabItem[]>(() => [
        {
            value: ArticleType.ALL,
            content: t('all')
        },
        {
            value: ArticleType.IT,
            content: t('it')
        },
        {
            value: ArticleType.ECONOMICS,
            content: t('economics')
        },
        {
            value: ArticleType.SCIENCE,
            content: t('science')
        },
    ], [t]);

    const onTabClick = useCallback((tab: TabItem) => {
        onChangeType(tab.value as ArticleType)
    }, [onChangeType])

    return (
        <div className={classNames('', {}, [className])}>
            <Tabs 
                value={value}
                tabs={typeTabs}
                onTabClick={onTabClick}
            />
        </div>
    );
}
