import { ComponentType, HTMLAttributeAnchorTarget } from "react";
import { ArticleListUnvirtualized } from "./ArticleListUnvirtualized/ArticleListUnvirtualized";
import { ArticleListVirtualizedTileView } from "./ArticleListVirtualizedTileView/ArticleListVirtualizedTileView";
import { ArticleListVirtualizedListView } from "./ArticleListVirtualizedListView/ArticleListVirtualizedListView";
import { Article, ArticleListView } from "../../model/types/Article";


export interface ArticleListProps {
    className?: string;
    articles: Article[];
    isLoading?: boolean;
    view?: ArticleListView;
    target?: HTMLAttributeAnchorTarget;
    onScrollEnd?: () => void;
    onOpenArticle?: (index: number) => void;
    scrollToIndex?: number;
    Header?: ComponentType;
    virtualized?: boolean;
    virtualizationKey?: string;
}

export const ArticleList = (props: ArticleListProps) => {
    const {
        className,
        articles,
        isLoading,
        view,
        target,
        onScrollEnd,
        onOpenArticle,
        scrollToIndex,
        Header,
        virtualized=true,
        virtualizationKey,
    } = props;

    if (!virtualized) {
        return (
            <ArticleListUnvirtualized 
                className={className}
                articles={articles}
                isLoading={isLoading}
                view={view}
                target={target}
            />
        )
    }

    if (view === ArticleListView.TILE) {
        return (
            <ArticleListVirtualizedTileView
                className={className}
                articles={articles}
                isLoading={isLoading}
                target={target}
                onScrollEnd={onScrollEnd}
                onOpenArticle={onOpenArticle}
                scrollToIndex={scrollToIndex}
                Header={Header}
                virtualizationKey={virtualizationKey}
            />
        )
    }

    return (
        <ArticleListVirtualizedListView
            className={className}
            articles={articles}
            isLoading={isLoading}
            target={target}
            onScrollEnd={onScrollEnd}
            onOpenArticle={onOpenArticle}
            scrollToIndex={scrollToIndex}
            Header={Header} 
        />
    )
}
