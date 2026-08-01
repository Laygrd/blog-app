import { HTMLAttributeAnchorTarget, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui/Text/Text';
import { Article, ArticleListView } from '../../model/types/Article';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import cls from './ArticleList.module.scss';

// old variant. Require <Page /> with onScrollEnd prop 

interface ArticleListProps {
   className?: string;
   articles: Article[];
   isLoading?: boolean;
   view?: ArticleListView;
   target?: HTMLAttributeAnchorTarget;
}

export const ArticleList = (props: ArticleListProps) => {
    const {
        className,
        articles,
        isLoading,
        view = ArticleListView.TILE,
        target,
    } = props;

    const { t } = useTranslation('article', {keyPrefix: 'ArticleList'});

    const renderArticleCard = useCallback((articleData: Article, isLoading?: boolean) => {
        return (
            <ArticleListItem
                key={articleData.id}
                article={articleData}
                view={view}
                isLoading={isLoading}
                target={target}
            />
        )
    }, [view, target]);

    if (!isLoading && articles.length === 0) {
        return (
            <div className={classNames(cls.ArticleList, {}, [className])}>
                <Text
                    className={cls.emptyArticles}
                    title={t('emptyArticlesList')}
                />
            </div>
        )
    }

    return (
        <div className={classNames(cls.ArticleList, {}, [className])}>
            {   
                articles.length > 0 &&
                articles.map((articleData) => renderArticleCard(articleData))
            }
            {   isLoading && 
                new Array( view === ArticleListView.LIST ? 3 : 12).fill(0)
                    .map((_, index) => renderArticleCard({id: String(index + articles.length + 1)} as Article, true))
            }
        </div>
    );
}
