import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { ArticleList, ArticleListView} from 'entities/Article';
import { Page } from 'widgets/Page';

import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { DynamicReducerLoader, ReducersList } from 'shared/lib/components/DynamicReducerLoader/DynamicReducerLoader';
import { classNames } from 'shared/lib/classNames/classNames';

import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage';
import { fetchArticlesNextPart } from '../../model/services/fetchArticlesNextPart/fetchArticlesNextPart';
import { getArticlesPageIsLoading } from '../../model/selectors/getArticlesPageIsLoading/getArticlesPageIsLoading';
import { getArticlesPageError } from '../../model/selectors/getArticlesPageError/getArticlesPageError';
import { getArticlesPageView } from '../../model/selectors/getArticlesPageView/getArticlesPageView';
import { articlesPageReducer, getArticles } from '../../model/slice/articlesPageSlice';
import cls from './ArticlesPage.module.scss';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Text } from 'shared/ui/Text/Text';
import { ArticlesPageFilters } from '../ArticlesPageFilters/ArticlesPageFilters';


interface ArticlesPageProps {
   className?: string;
}

const reducers: ReducersList = {
    articlesPage: articlesPageReducer
}

const ArticlesPage = (props: ArticlesPageProps) => {
    const { className } = props;
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();
    const { t } = useTranslation('article');

    const isLoading = useSelector(getArticlesPageIsLoading);
    const error = useSelector(getArticlesPageError);
    const view = useSelector(getArticlesPageView);
    const articles = useSelector(getArticles.selectAll);

    const onLoadNextPart = useCallback(() => {
        dispatch(fetchArticlesNextPart());
    }, [dispatch]);

    useInitialEffect(() => {
        dispatch(initArticlesPage(searchParams))
    });

    return (
        <DynamicReducerLoader reducers={reducers} removeAfterUnmount={false}>
            <Page
                className={classNames(cls.ArticlesPage, {}, [className])}
                //onScrollEnd={!error ? onLoadNextPart : undefined}
                //restoreScroll
            >
                
                {error && 
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
                    //className={cls.articlesList}
                    isLoading={isLoading}
                    articles={articles}
                    view={view}
                    onScrollEnd={onLoadNextPart}
                />
            </Page>
        </DynamicReducerLoader>
    );
};

export default memo(ArticlesPage);