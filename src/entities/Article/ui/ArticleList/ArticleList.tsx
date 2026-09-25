import { ComponentType, HTMLAttributeAnchorTarget } from "react";
import { Article, ArticleListView } from "../../model/types/Article";
import { ArticleListVirtualized } from "./ArticleListVirtualized";
import { ArticleListUnvirtualized } from "./ArticleListUnvirtualized";

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
    } = props;

    if (virtualized) {
        return (
            <ArticleListVirtualized
                className={className}
                articles={articles}
                isLoading={isLoading}
                view={view}
                target={target}
                onScrollEnd={onScrollEnd}
                onOpenArticle={onOpenArticle}
                scrollToIndex={scrollToIndex}
                Header={Header}
            />
        )
    } else {
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
}
