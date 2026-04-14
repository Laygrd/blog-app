import { useParams } from 'react-router-dom';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { AddCommentForm } from 'features/addCommentForm';
import { ArticleDetails, getArticleDetailsError } from 'entities/Article';
import { CommentList } from 'entities/Comment';
import { Page } from "widgets/Page";
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { RouterPaths } from 'shared/config/router/routerVars';
import { classNames } from 'shared/lib/classNames/classNames';
import {
    DynamicReducerLoader,
    ReducersList,
} from 'shared/lib/components/DynamicReducerLoader/DynamicReducerLoader';
import {
    articleDetailsCommentsReducer,
    getArticleDetailsComments,
} from '../../model/slice/articleDetailsCommentsSlice';
import {
    getArticleDetailsCommentsIsLoading,
} from '../../model/selectors/getArticleDetailsCommentsIsLoading/getArticleDetailsCommentsIsLoading';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';
import cls from './ArticleDetailsPage.module.scss';


interface ArticleDetailsPageProps {
   className?: string;
}

const reducers: ReducersList = {articleDetailsComments: articleDetailsCommentsReducer}

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
    const { className } = props;
    const { t } = useTranslation('article_details');
    const { id } = useParams<{ id: string }>();
    const comments = useSelector(getArticleDetailsComments.selectAll);
    const articleLoadingError = useSelector(getArticleDetailsError);
    const commentsIsLoading = useSelector(getArticleDetailsCommentsIsLoading);
    const dispatch = useAppDispatch();

    const onSendComment = useCallback((text: string) => {
        dispatch(addCommentForArticle(text))
    }, [dispatch])

    useInitialEffect(() => {
        dispatch(fetchCommentsByArticleId(id));
    })

    if ( __PROJECT__ === 'storybook') {
        return (
            <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
                <ArticleDetails id={"1"}/>
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
                <AppLink
                    className={cls.backLink}
                    to={RouterPaths.articles}
                >
                    {t('backLink')}
                </AppLink>
                <ArticleDetails id={id}/>
                { !articleLoadingError && 
                    <>
                        <Text
                            size={TextSize.L}
                            className={cls.comments}
                            title={t('commentsBlock')}
                        />
                        <AddCommentForm
                            onSendComment={onSendComment}
                        />
                        <CommentList
                            className={cls.comments}
                            comments={comments}
                            isLoading={commentsIsLoading}
                        />
                    </>
                }
            </Page>
        </DynamicReducerLoader>
    );
}

export default memo(ArticleDetailsPage);