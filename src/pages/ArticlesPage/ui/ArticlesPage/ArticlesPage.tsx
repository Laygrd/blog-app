//import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { ArticleList, ArticleListView, ArticleViewSelector } from 'entities/Article';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { DynamicReducerLoader, ReducersList } from 'shared/lib/components/DynamicReducerLoader/DynamicReducerLoader';
import { Text } from 'shared/ui/Text/Text';
import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'shared/ui/Page/Page';
import { fetchArticles } from '../../model/services/fetchArticles/fetchArticles';
import { fetchArticlesNextPart } from '../../model/services/fetchArticlesNextPart/fetchArticlesNextPart';
import { getArticlesPageIsLoading } from '../../model/selectors/getArticlesPageIsLoading/getArticlesPageIsLoading';
import { getArticlesPageError } from '../../model/selectors/getArticlesPageError/getArticlesPageError';
import { getArticlesPageView } from '../../model/selectors/getArticlesPageView/getArticlesPageView';
import { getArticlesPageNumber } from '../../model/selectors/getArticlesPageNumber/getArticlesPageNumber';
import { getArticlesPageHasMore } from '../../model/selectors/getArticlesPageHasMore/getArticlesPageHasMore';
import { articlesPageActions, articlesPageReducer, getArticles } from '../../model/slice/articlesPageSlice';
import cls from './ArticlesPage.module.scss';


interface ArticlesPageProps {
   className?: string;
}

const reducers: ReducersList = {
    articlesPage: articlesPageReducer
}

const ArticlesPage = (props: ArticlesPageProps) => {
    const { className } = props;
    const dispatch = useAppDispatch();
    const isLoading = useSelector(getArticlesPageIsLoading);
    const error = useSelector(getArticlesPageError);
    const view = useSelector(getArticlesPageView);
    const articles = useSelector(getArticles.selectAll);
    //const { t } = useTranslation()

    const onViewChange = useCallback((newView: ArticleListView) => {
        dispatch(articlesPageActions.setView(newView))
    }, [dispatch]);

    const onLoadNextPart = useCallback(() => {
        dispatch(fetchArticlesNextPart());
    }, [dispatch]);

    useInitialEffect(() => {
        dispatch(articlesPageActions.initView());
        dispatch(fetchArticles({page: 1}));
    });

    return (
        <DynamicReducerLoader reducers={reducers} removeAfterUnmount>
            <Page
                className={classNames(cls.ArticlesPage, {}, [className])}
                onScrollEnd={onLoadNextPart}
            >
                <ArticleViewSelector
                    view={view}
                    onViewChange={onViewChange}
                />

                {error && <Text title={error}/>}

                <ArticleList 
                    className={cls.articlesList}
                    isLoading={isLoading}
                    articles={articles}
                    view={view}
                />
            </Page>
        </DynamicReducerLoader>
    );
};

export default memo(ArticlesPage);