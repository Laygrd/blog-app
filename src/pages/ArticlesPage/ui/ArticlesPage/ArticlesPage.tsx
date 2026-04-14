//import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { ArticleList, ArticleListView, ArticleViewSelector } from 'entities/Article';
import { Page } from 'widgets/Page';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { DynamicReducerLoader, ReducersList } from 'shared/lib/components/DynamicReducerLoader/DynamicReducerLoader';
import { Text } from 'shared/ui/Text/Text';
import { classNames } from 'shared/lib/classNames/classNames';
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage';
import { fetchArticlesNextPart } from '../../model/services/fetchArticlesNextPart/fetchArticlesNextPart';
import { getArticlesPageIsLoading } from '../../model/selectors/getArticlesPageIsLoading/getArticlesPageIsLoading';
import { getArticlesPageError } from '../../model/selectors/getArticlesPageError/getArticlesPageError';
import { getArticlesPageView } from '../../model/selectors/getArticlesPageView/getArticlesPageView';
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
        dispatch(initArticlesPage())
    });

    return (
        <DynamicReducerLoader reducers={reducers} removeAfterUnmount={false}>
            <Page
                className={classNames(cls.ArticlesPage, {}, [className])}
                onScrollEnd={onLoadNextPart}
                restoreScroll
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