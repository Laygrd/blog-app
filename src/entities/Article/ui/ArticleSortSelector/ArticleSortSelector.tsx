import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { SortOrder } from 'shared/types';
import { Select, SelectOption } from 'shared/ui/Select/Select';
import cls from './ArticleSortSelector.module.scss';
import { ArticleSortField } from '../../model/types/Article';


interface ArticleSortSelectorProps {
    className?: string;
    sort: ArticleSortField;
    order: SortOrder;
    onChangeSort: (newSort: ArticleSortField) => void;
    onChangeOrder: (newOrder: SortOrder) => void;
}

export const ArticleSortSelector = (props: ArticleSortSelectorProps) => {
    const {
        className,
        sort,
        order,
        onChangeSort,
        onChangeOrder,
    } = props;

    const { t } = useTranslation('article', {keyPrefix: 'ArticleSortSelector'})

    const orderOptions = useMemo<SelectOption<SortOrder>[]>(() => [
        {
            value: 'asc',
            content: t('orderOptions.asc')
        },
        {
            value: 'desc',
            content: t('orderOptions.desc')
        }
    ], [t]);

    const sortOptions = useMemo<SelectOption<ArticleSortField>[]>(() => [
        {
            value: ArticleSortField.CREATED,
            content: t('articleSortOptions.created')
        },
        {
            value: ArticleSortField.VIEWS,
            content: t('articleSortOptions.views')
        },
        {
            value: ArticleSortField.TITLE,
            content: t('articleSortOptions.title')
        },
    ], [t]);

    return (
        <div className={classNames(cls.ArticleSortSelector, {}, [className])}>
            <Select
                label={t('sortLabel')}
                options={sortOptions}
                value={sort}
                onChange={onChangeSort}
            />
            <Select
                label={t('orderLabel')}
                options={orderOptions}
                value={order}
                onChange={onChangeOrder}
            />
        </div>
    );
}
