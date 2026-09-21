import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { ArticleList } from 'entities/Article';

import { Text, TextSize } from 'shared/ui/Text/Text';
import { HStack, VStack } from 'shared/ui/Stack';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Loader } from 'shared/ui/Loader/Loader';
import { classNames } from 'shared/lib/classNames/classNames';

import { useGetArticlesRecommendationsList } from '../../api/recommendationsApi';


interface ArticleRecommendationsListProps {
    className?: string;
}

export const ArticleRecommendationsList = memo((props: ArticleRecommendationsListProps) => {
    const { className } = props;
    const { t } = useTranslation('article_details');
    
    const { data: articles, isLoading, error, refetch } = useGetArticlesRecommendationsList(3);

    const onRetry = useCallback(() => refetch(), [refetch]);

    if (isLoading || error ) {

        return (
            <VStack 
                className={classNames('', {}, [className])}
                gap={'8'} max
            >
                <Text
                    size={TextSize.L}
                    title={t('recommendationsList.title')}
                />
                { isLoading &&
                    <VStack 
                        style={{ height: 320  }}
                        max
                        align='center'
                        justify='center'
                    >
                        <Loader />
                    </VStack>
                }
                { error &&
                    <HStack 
                        style={{ height: 320 }}
                        max
                        align='center'
                        justify='center'
                    >
                        {t('recommendationsList.error', { error })}
                        <Button 
                            theme={ButtonTheme.OUTLINE}
                            onClick={onRetry}
                        >
                            {t('recommendationsList.retry')}
                        </Button>
                    </HStack>
                }
            </VStack>
        )
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

            <div style={{ height: 320, width: '100%', overflowY: 'scroll' }}>
                <ArticleList
                    articles={articles}
                    isLoading={isLoading}
                    target={'_blank'}
                />
            </div>
        </VStack>
    );
});
