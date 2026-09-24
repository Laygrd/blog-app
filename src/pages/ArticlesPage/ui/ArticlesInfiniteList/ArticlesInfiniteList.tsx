import { useCallback, ComponentType } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { ArticleList } from 'entities/Article';

import { Text } from 'shared/ui/Text/Text';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';

import { getArticles, articlesPageActions } from '../../model/slice/articlesPageSlice';
import { getArticlesPageIsLoading } from '../../model/selectors/getArticlesPageIsLoading/getArticlesPageIsLoading';
import { getArticlesPageError } from '../../model/selectors/getArticlesPageError/getArticlesPageError';
import { fetchArticlesNextPart } from '../../model/services/fetchArticlesNextPart/fetchArticlesNextPart';
import { getArticlesPageView } from '../../model/selectors/getArticlesPageView/getArticlesPageView';
import { getArticlesPageLastVisitedIndex } 
    from '../../model/selectors/getArticlesPageLastVisitedIndex/getArticlesPageLastVisitedIndex';
import { ArticlesPageFilters } from '../ArticlesPageFilters/ArticlesPageFilters';
import cls from './ArticlesInfiniteList.module.scss';


interface ArticlesInfiniteListProps {
   className?: string;
}

export const ArticlesInfiniteList = (props: ArticlesInfiniteListProps) => {
    const { className } = props;
    const dispatch = useAppDispatch();
    const { t } = useTranslation('article');

    const isLoading = useSelector(getArticlesPageIsLoading);
    const error = useSelector(getArticlesPageError);
    const view = useSelector(getArticlesPageView);
    const articles = useSelector(getArticles.selectAll);
    const scrollToIndex = useSelector(getArticlesPageLastVisitedIndex);

    const onLoadNextPart = useCallback(() => {
        dispatch(fetchArticlesNextPart());
    }, [dispatch]);

    const onSaveLastVisitedArticle = useCallback((index: number) => {
        dispatch(articlesPageActions.setLastVisitedIndex(index))
    }, [dispatch])

    return (
        <div className={classNames(cls.ArticlesInfiniteList, {}, [className])}>
            { error && 
                <div className={cls.errorBlock}>
                    <Text title={t(error)}/>
                    <Button
                        theme={ButtonTheme.OUTLINE}
                        onClick={onLoadNextPart}
                    >
                        {t('retryBtn')}
                    </Button>
                </div>
            }

            <ArticleList
                isLoading={isLoading}
                articles={articles}
                view={view}
                onScrollEnd={onLoadNextPart}
                onOpenArticle={onSaveLastVisitedArticle}
                scrollToIndex={scrollToIndex}
                Header={ArticlesPageFilters as ComponentType}
            />
        </div>
    );
}
