import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { CommentList } from 'entities/Comment';
import { AddCommentForm } from 'features/addCommentForm';
import { VStack } from 'shared/ui/Stack';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { useCallback } from 'react';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';
import { useDispatch, useSelector } from 'react-redux';
import { getArticleDetailsComments } from '../../model/slice/articleDetailsCommentsSlice';
import { getArticleDetailsCommentsIsLoading } 
    from  '../../model/selectors/comments/getArticleDetailsCommentsIsLoading/getArticleDetailsCommentsIsLoading';
import cls from './ArticleDetailsComments.module.scss';


interface ArticleDetailsCommentsProps {
   className?: string;
   id: string;
}

export const ArticleDetailsComments = (props: ArticleDetailsCommentsProps) => {
    const { className, id } = props;
    const { t } = useTranslation('article_details');
    const dispatch = useDispatch();
    
    const comments = useSelector(getArticleDetailsComments.selectAll);
    const commentsIsLoading = useSelector(getArticleDetailsCommentsIsLoading);

    const onSendComment = useCallback((text: string) => {
        dispatch(addCommentForArticle(text))
    }, [dispatch])

    useInitialEffect(() => {
        dispatch(fetchCommentsByArticleId(id));
    })

    return (
        <div className={classNames(cls.ArticleDetailsComments, {}, [className])}>
            <VStack max gap={'16'}>
                <Text
                    size={TextSize.M}
                    title={t('commentsBlock')}
                />
                <AddCommentForm
                    onSendComment={onSendComment}
                />
            </VStack>
            <CommentList
                className={cls.comments}
                comments={comments}
                isLoading={commentsIsLoading}
            />
        </div>
    );
}
