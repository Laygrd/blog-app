import { memo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { ArticleRating } from '@/features/articleRating';
import { ArticleRecommendationsList } from '@/features/articleRecommendationsList';
import { Page } from "@/widgets/Page";
import { ArticleDetails, getArticleDetailsError } from '@/entities/Article';

import { VStack } from '@/shared/ui/Stack';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DynamicReducerLoader, ReducersList } from '@/shared/lib/components/DynamicReducerLoader/DynamicReducerLoader';

import cls from './ArticleDetailsPage.module.scss';
import { articleDetailsPageReducer } from '../../model/slice';
import { ArticleDetailsComments } from '../ArticleDetailsComments/ArticleDetailsComments';
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import { fetchArticleRecommendations } from '../../model/services/fetchArticleRecommendations/fetchArticleRecommendations';


interface ArticleDetailsPageProps {
   className?: string;
}

const reducers: ReducersList = {
    articleDetailsPage: articleDetailsPageReducer
}   

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
    const { className } = props;
    const { t } = useTranslation('article_details');
    const dispatch = useAppDispatch();

    const { id } = useParams<{ id: string }>();
    const articleLoadingError = useSelector(getArticleDetailsError);


    useInitialEffect(() => {
        dispatch(fetchArticleRecommendations());
    })

    if ( __PROJECT__ === 'storybook') {
        return (
            <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
                <VStack gap={'32'} max>
                    <ArticleDetailsPageHeader />
                    <ArticleDetails id={"1"}/>
                    { !articleLoadingError &&
                        <>
                            <ArticleRating articleId={'1'}/>
                            <ArticleRecommendationsList />
                            <ArticleDetailsComments id={"1"}/>
                        </>
                    }
                </VStack>
            </Page>
        );
    }

    if (!id) {
        return (
            <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
                {t('errors.INCORRECT_ARTICLE_ID')}
            </Page>
        )
    }


    return (
        <DynamicReducerLoader reducers={reducers} removeAfterUnmount>
            <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
                <VStack gap={'32'} max>
                    <ArticleDetailsPageHeader />
                    <ArticleDetails id={id}/>
                    { !articleLoadingError && 
                        <>
                            <ArticleRating articleId={id} />
                            <ArticleRecommendationsList />
                            <ArticleDetailsComments id={id}/>
                        </>
                    }
                </VStack>
            </Page>
        </DynamicReducerLoader>
    );
}

export default memo(ArticleDetailsPage);
