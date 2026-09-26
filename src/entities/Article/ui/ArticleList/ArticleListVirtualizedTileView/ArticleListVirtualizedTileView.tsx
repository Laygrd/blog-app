/* eslint-disable react/prop-types */
import {
    memo,
    useCallback,
    FC,
    useRef,
    useMemo,
    useEffect,
    useState,
    createContext,
    useContext,
} from 'react';
import {
    GridComponents,
    VirtuosoGrid,
    VirtuosoGridHandle,
} from 'react-virtuoso';
import { useTranslation } from 'react-i18next';

import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui/Text/Text';
import { Article, ArticleListView } from '../../../model/types/Article';
import { ArticleListItem } from '../../ArticleListItem/ArticleListItem';
import { ArticleListProps } from '../ArticleList';

import cls from './ArticleListVirtualizedTileView.module.scss';


const INITIAL_TILE_SKELETONS_COUNT = 8;
const TILE_SKELETONS_COUNT = 8;


const FooterContext = createContext<{
    isLoading?: boolean;
    renderSkeleton: (i: number) => JSX.Element;
        } | null>(null);

const FooterFromContext = memo(() => {
    const context = useContext(FooterContext);
    if (!context || !context.isLoading) return null;

    return (
        <div className={cls.tileSkeletonsFooter} >
            {new Array(TILE_SKELETONS_COUNT,)
                .fill(0)
                .map((_, index) => (
                    <div
                        key={`${index}_skeleton_wrapper`}
                        className={cls.tileSkeletonWrapper}
                    >
                        {context.renderSkeleton?.(index)}
                    </div>
                ))}
        </div>
    );
});
FooterFromContext.displayName = 'Footer';

export const ArticleListVirtualizedTileView = (props: ArticleListProps) => {
    const {
        className,
        articles,
        isLoading,
        target,
        onScrollEnd,
        onOpenArticle,
        scrollToIndex,
        Header,
        virtualizationKey,
        ...otherProps
    } = props;

    const { t } = useTranslation('article', { keyPrefix: 'ArticleList' });
    const virtuosoGridRef = useRef<VirtuosoGridHandle>(null);

    const handleEndReached = useCallback(() => {
        if (isLoading) return;
        onScrollEnd?.();
    }, [isLoading, onScrollEnd]);

    const onOpenHandler = useCallback(
        (index: number) => () => {
            onOpenArticle?.(index);
        },
        [onOpenArticle],
    );

    useEffect(() => {
        const timerId = setTimeout(() => {
            virtuosoGridRef.current?.scrollToIndex(
                scrollToIndex ? scrollToIndex : 0,
            );
        }, 0);
        return () => clearTimeout(timerId);
    }, [scrollToIndex]);

    const renderArticleCard = useCallback(
        (index: number, articleData: Article) => (
            // необходимо все list items класть на подложку для паддингов
            <div>
                <ArticleListItem
                    className={cls.listItem}
                    key={articleData.id}
                    article={articleData}
                    view={ArticleListView.TILE}
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
            <div>
                <ArticleListItem
                    className={cls.listItem}
                    key={`${index}_skeleton`}
                    article={{ id: `${index}_skeleton` } as Article}
                    view={ArticleListView.TILE}
                    isLoading={true}
                />
            </div>
        ),
        [],
    );

    const ScrollSeekPlaceholder: FC<{ index: number }> = useCallback(
        ({ index }) => (
            <div className={cls.tileSkeletonWrapper}>
                {renderArticleCardSkeleton(index)}
            </div>
        ),
        [renderArticleCardSkeleton],
    );
    ScrollSeekPlaceholder.displayName = 'ScrollSeekPlaceholder';

    const GridComponents = useMemo<GridComponents>(
        () => ({
            Header,
            Footer: FooterFromContext,
            ScrollSeekPlaceholder,
            
        }),
        [Header, ScrollSeekPlaceholder],
    );

    const showInitialTileSkeletons = isLoading && articles?.length === 0;

    const tileDisplayData = useMemo(() => {
        if (showInitialTileSkeletons) return [];
        return articles;
    }, [articles, showInitialTileSkeletons]);

    const tileTotalCount = useMemo(() => {
        if (showInitialTileSkeletons) return INITIAL_TILE_SKELETONS_COUNT;
        return articles.length;
    }, [showInitialTileSkeletons, articles.length]);

    const tileItemContent = useCallback(
        (index: number) => {
            const article = articles[index];
            if (showInitialTileSkeletons || !article) {
                return renderArticleCardSkeleton(index);
            }
            return renderArticleCard(index, article);
        },
        [articles, showInitialTileSkeletons, renderArticleCard, renderArticleCardSkeleton],
    );

    if (!isLoading && articles.length === 0) {
        return (
            <div className={classNames(cls.ArticleListVirtualizedTileView, {}, [className])}>
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

                className={classNames(cls.ArticleListVirtualizedTileView, {}, [className])}
                {...otherProps}
            >
                <VirtuosoGrid
                    key={virtualizationKey}
                    className={cls.tileList}
                    ref={virtuosoGridRef}
                    style={{ width: '100%', height: '100%' }}
                    totalCount={tileTotalCount}
                    data={tileDisplayData}
                    itemContent={tileItemContent}
                    endReached={handleEndReached}
                    components={GridComponents}
                    scrollSeekConfiguration={{
                        enter: (velocity) => Math.abs(velocity) > 450,
                        exit: (velocity) => Math.abs(velocity) < 30,
                    }}
                    useWindowScroll={false}
                    listClassName={cls.itemsWrapper}
                    itemClassName={cls.gridListItem}
                />
            </div>
        </FooterContext.Provider>
    );
};