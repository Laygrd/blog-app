import { RatingCard } from '@/entities/Rating';
import { useTranslation } from 'react-i18next';
import { useGetArticleRating, useRateArticle } from '../../api/articleRatingApi';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { useCallback } from 'react';


export interface ArticleRatingProps {
   className?: string;
   articleId: string;
};

const ArticleRating = (props: ArticleRatingProps) => {
    const { className, articleId } = props;
    const { t } = useTranslation('article_details');
    const user = useSelector(getUserAuthData);

    const { data, isLoading } = useGetArticleRating({ userId: user?.id ?? '' , articleId  })
    const [ rateArticleMutation ] = useRateArticle();

    const rateArticleHandler = useCallback((starsCount: number, feedback?: string) => {
        try {
            rateArticleMutation({
                userId: user?.id ?? '',
                articleId,
                rate: starsCount,
                feedback,
            })
        } catch (e) {
            console.log(e)
        };
    }, [rateArticleMutation, articleId, user?.id]);

    const onAcceptHandler = useCallback((starsCount: number, feedback?: string) => {
        rateArticleHandler(starsCount, feedback)
    }, [rateArticleHandler]);

    const onCancelHandler = useCallback((starsCount: number) => {
        rateArticleHandler(starsCount)
    }, [rateArticleHandler]);

    if (isLoading) {
        return <Skeleton width={'100%'} height={'120px'} border={'8px'} />
    };

    const rating = data?.[0];

    return (
        <RatingCard
            rate={ rating?.rate }
            className={ className }
            title={ t('ArticleRating.title') }
            feedbackTitle={ t('ArticleRating.feedbackTitle') }
            hasFeedback
            onAccept={onAcceptHandler}
            onCancel={onCancelHandler}
        />
    );
};

export default ArticleRating;
