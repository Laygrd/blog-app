import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
    ArticleListView, 
    ArticleSortField, 
    ArticleSortSelector, 
    ArticleType, 
    ArticleTypeTabs, 
    ArticleViewSelector,
} from 'entities/Article';

import { Card } from 'shared/ui/Card/Card';
import { Input } from 'shared/ui/Input/Input';
import { SortOrder } from 'shared/types';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useDebounce } from 'shared/lib/hooks/useDebounce/useDebounce';

import { articlesPageActions } from '../../model/slice/articlesPageSlice';
import { fetchArticles } from '../../model/services/fetchArticles/fetchArticles';

import { getArticlesPageType } from '../../model/selectors/getArticlesPageType/getArticlesPageType';
import { getArticlesPageView } from '../../model/selectors/getArticlesPageView/getArticlesPageView';
import { getArticlesPageSort } from '../../model/selectors/getArticlesPageSort/getArticlesPageSort';
import { getArticlesPageOrder } from '../..//model/selectors/getArticlesPageOrder/getArticlesPageOrder';
import { getArticlesPageSearch } from '../..//model/selectors/getArticlesPageSearch/getArticlesPageSearch';
import cls from './ArticlesPageFilters.module.scss';


interface ArticlesPageFiltersProps {
   className?: string;
}

export const ArticlesPageFilters = (props: ArticlesPageFiltersProps) => {
    const { className } = props;
    const { t } = useTranslation('article')
    const dispatch = useAppDispatch();

    const view = useSelector(getArticlesPageView);
    const sort = useSelector(getArticlesPageSort);
    const order = useSelector(getArticlesPageOrder);
    const search = useSelector(getArticlesPageSearch);
    const type = useSelector(getArticlesPageType)


    const fetchData = useCallback(() => {
        dispatch(fetchArticles({ replace: true }))
    }, [dispatch]);

    const debouncedFetchData = useDebounce(fetchData, 300);

    const onViewChange = useCallback((newView: ArticleListView) => {
        dispatch(articlesPageActions.setView(newView));
    }, [dispatch]);
    
    const onSortChange = useCallback((newSort: ArticleSortField) => {
        dispatch(articlesPageActions.setSort(newSort));
        dispatch(articlesPageActions.setPage(1));
        fetchData();
    }, [dispatch, fetchData]);

    const onOrderChange = useCallback((newOrder: SortOrder) => {
        dispatch(articlesPageActions.setOrder(newOrder));
        dispatch(articlesPageActions.setPage(1));
        fetchData();
    }, [dispatch, fetchData]);

    const onSearchChange = useCallback((newSearch: string) => {
        dispatch(articlesPageActions.setSearch(newSearch));
        dispatch(articlesPageActions.setPage(1));
        debouncedFetchData();
    }, [dispatch, debouncedFetchData]);

    const onTypeChange = useCallback((newType: ArticleType) => {
        dispatch(articlesPageActions.setType(newType));
        dispatch(articlesPageActions.setPage(1));
        fetchData();
    }, [dispatch, fetchData]);


    return (
        <div className={classNames(cls.ArticlesPageFilters, {}, [className])}>
            <div className={cls.sortWrapper}>
                <ArticleSortSelector
                    sort={sort}
                    order={order}
                    onChangeSort={onSortChange}
                    onChangeOrder={onOrderChange}
                />
                <ArticleViewSelector
                    view={view}
                    onViewChange={onViewChange}
                />
            </div>
            <Card>
                <Input
                    id={'articlesPageSearchInput'}
                    placeholder={t('searchPlaceholder', {keyPrefix: "ArticlesPageFilters"})}
                    value={search}
                    onChange={onSearchChange}
                />
            </Card>
            <ArticleTypeTabs 
                value={type}
                onChangeType={onTypeChange}
            />
        </div>
    );
}
