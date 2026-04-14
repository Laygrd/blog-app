import { useCallback } from 'react';
//import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Article, ArticleListView } from '../../model/types/Article';
import cls from './ArticleList.module.scss';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';


interface ArticleListProps {
   className?: string;
   articles: Article[];
   isLoading?: boolean;
   view?: ArticleListView;
}

export const ArticleList = (props: ArticleListProps) => {
    const {
        className,
        articles,
        isLoading,
        view = ArticleListView.TILE,
    } = props;
    //const { t } = useTranslation('article')

    const renderArticleCard = useCallback((articleData: Article, isLoading?: boolean) => {
        return (
            <ArticleListItem
                key={articleData.id}
                article={articleData}
                view={view}
                isLoading={isLoading}
            />
        )
    }, [view]);

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
