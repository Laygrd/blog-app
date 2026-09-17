import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { ArticleListVirtOff } from 'entities/Article';

import { Text, TextSize } from 'shared/ui/Text/Text';
import { VStack } from 'shared/ui/Stack';
import { classNames } from 'shared/lib/classNames/classNames';
import { rtkApi } from 'shared/api/rtkApi';


interface ArticleRecommendationsListProps {
    className?: string;
}

const recommendationsApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getArticleRecommendationsList: build.query({
            query: (limit) => ({
                url: '/articles',
                params: {
                    _limit: limit
                }
            }),
        }),
    })
})

const useGetArticlesRecommendationsList = recommendationsApi.useGetArticleRecommendationsListQuery;

export const ArticleRecommendationsList = memo((props: ArticleRecommendationsListProps) => {
    const { className } = props;
    const { t } = useTranslation('article_details');
    
    const { data: articles, isLoading, error } = useGetArticlesRecommendationsList(3);

    if (isLoading || error ) {
        // eslint-disable-next-line i18next/no-literal-string
        return <div>Loading</div>
    }

    return (
        <VStack 
            className={classNames('', {}, [className])}
            gap={'8'} max
        >
            <Text
                size={TextSize.L}
                title={t('recommendationsBlock')}
            />
            <ArticleListVirtOff
                articles={articles}
                isLoading={isLoading}
                target={'_blank'}
            />
        </VStack>
    );
});
