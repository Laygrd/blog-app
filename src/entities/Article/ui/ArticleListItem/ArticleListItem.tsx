import { HTMLAttributeAnchorTarget, memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { classNames } from 'shared/lib/classNames/classNames';

import { Article, ArticleListView } from '../../model/types/Article';
import { ArticleListItemList } from './ArticleListItemList/ArticleListItemList';
import { ArticleListItemTile } from './ArticleListItemTile/ArticleListItemTile';


interface ArticleListItemProps {
    className?: string;
    article?: Article;
    view?: ArticleListView;
    isLoading?: boolean;
    target?: HTMLAttributeAnchorTarget;
    onOpenCb?: () => void;
}

export const ArticleListItem = memo((props: ArticleListItemProps) => {
    const {
        className,
        article,
        view = ArticleListView.LIST,
        isLoading = false,
        target,
        onOpenCb
    } = props;
    const { t } = useTranslation('article');



    if (!article) {
        return (
            <article className={classNames('', {}, [className])}>
                <Text 
                    theme={TextTheme.ERROR}
                    text={t('errors.ARTICLE_NOT_FOUND')}
                    size={TextSize.M}
                />
            </article>
        )
    }


    if (view == ArticleListView.LIST) {
        return (
            <ArticleListItemList 
                article={article}
                isLoading={isLoading}
                onOpenCb={onOpenCb}
                target={target}
            />
        )
    }
    
    else { // if (view == ArticleListView.LIST)
        return ( 
            <ArticleListItemTile 
                article={article}
                isLoading={isLoading}
                onOpenCb={onOpenCb}
                target={target}
            />
        )
    }
})