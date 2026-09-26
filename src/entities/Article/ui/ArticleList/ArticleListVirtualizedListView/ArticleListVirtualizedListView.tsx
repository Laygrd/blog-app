/* eslint-disable react/prop-types */
import {
    memo,
    useCallback,
    createContext,
    useContext,
} from 'react';
import { Virtuoso } from 'react-virtuoso';
import { useTranslation } from 'react-i18next';

import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui/Text/Text';

import { Article, ArticleListView } from '../../../model/types/Article';
import { ArticleListItem } from '../../ArticleListItem/ArticleListItem';
import { ArticleListProps } from '../ArticleList';

import cls from './ArticleListVirtualizedListView.module.scss';


const LIST_SKELETONS_COUNT = 3;

const FooterContext = createContext<{
    isLoading?: boolean;
    renderSkeleton: (i: number) => JSX.Element;
        } | null>(null);

const FooterFromContext = memo(() => {
    const context = useContext(FooterContext);
    if (!context || !context.isLoading) return null;

    return (
        <div>
            {new Array(LIST_SKELETONS_COUNT)
                .fill(0)
                .map((_, index) => (
                    <div
                        key={`${index}_skeleton_wrapper`}
                    >
                        {context.renderSkeleton?.(index)}
                    </div>
                ))}
        </div>
    );
});
FooterFromContext.displayName = 'Footer';

export const ArticleListVirtualizedListView = (props: ArticleListProps) => {
    const {
        className,
        articles,
        isLoading,
        target,
        onScrollEnd,
        onOpenArticle,
        scrollToIndex,
        Header,
        ...otherProps
    } = props;

    const { t } = useTranslation('article', { keyPrefix: 'ArticleList' });

    // если уже грузим новую порцию, не триггериминовую подгрузку
    const handleEndReached = useCallback(() => {
        if (isLoading) return;
        onScrollEnd?.();
    }, [isLoading, onScrollEnd]);

    const onOpenHandler = useCallback((index: number) => 
        () => {
            onOpenArticle?.(index);
        }, [onOpenArticle]);

    const renderArticleCard = useCallback(
        (index: number, articleData: Article) => (
            // необходимо все list items класть на подложку для паддингов
            <div className={cls.listItemWrapper}>
                <ArticleListItem
                    className={cls.listItem}
                    key={articleData.id}
                    article={articleData}
                    view={ArticleListView.LIST}
                    isLoading={false}
                    target={target}
                    onOpenCb={onOpenHandler(index)}
                />
            </div>
        ),
        [ target, onOpenHandler],
    );

    const renderArticleCardSkeleton = useCallback(
        (index: number) => (
            <div className={cls.listItemWrapper}>
                <ArticleListItem
                    className={cls.listItem}
                    key={`${index}_skeleton`}
                    article={{ id: `${index}_skeleton` } as Article}
                    view={ArticleListView.LIST}
                    isLoading={true}
                />
            </div>
        ),
        [],
    );

    if (!isLoading && articles.length === 0) {
        return (
            <div className={classNames(cls.ArticleListVirtualizedListView, {}, [className])}>
                <div className={cls.emptyArticlesBlock}>
                    {Header && <Header />}
                    <Text className={cls.emptyArticlesText} title={t('emptyArticlesList')} />
                </div>
            </div>
        );
    }

    return (
        <FooterContext.Provider
            value={{ isLoading, renderSkeleton: renderArticleCardSkeleton }}
        >
            <div
                className={classNames(cls.ArticleListVirtualizedListView, {}, [className])}
                {...otherProps}
            >
                <Virtuoso
                    style={{ height: '100%', width: '100%' }}
                    data={articles}
                    itemContent={renderArticleCard}
                    endReached={handleEndReached}
                    components={{ Header, Footer: FooterFromContext }}
                    initialTopMostItemIndex={scrollToIndex ? scrollToIndex : 0}
                    atBottomThreshold={0}
                />
            </div>
        </FooterContext.Provider>
    );
};