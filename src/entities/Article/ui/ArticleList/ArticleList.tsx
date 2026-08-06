/* eslint-disable react/prop-types */
import { HTMLAttributeAnchorTarget, memo, useCallback, FC, useRef, useMemo, useEffect, ReactNode, ComponentType } from 'react';
import { GridComponents, Virtuoso, VirtuosoGrid, VirtuosoGridHandle } from 'react-virtuoso';
import { useTranslation } from 'react-i18next';

import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui/Text/Text';
import { Article, ArticleListView } from '../../model/types/Article';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import cls from './ArticleList.module.scss';


interface ArticleListProps {
   className?: string;
   articles: Article[];
   isLoading?: boolean;
   view?: ArticleListView;
   target?: HTMLAttributeAnchorTarget;
   onScrollEnd?: () => void;
   onOpenArticle?: (index: number) => void;
   scrollToIndex?: number;
   Header?: ComponentType;
}


const INITIAL_TILE_SKELETONS_COUNT = 8;
const LIST_SKELETONS_COUNT = 3;
const TILE_SKELETONS_COUNT = 8;
const TILES_PER_ROW = 4;
const TILE_SKELETONS_GAP = 30;

export const ArticleList = (props: ArticleListProps) => {
    const {
        className,
        articles,
        isLoading,
        view = ArticleListView.TILE,
        target,
        onScrollEnd,
        onOpenArticle,
        scrollToIndex,
        Header
    } = props;

    const { t } = useTranslation('article', {keyPrefix: 'ArticleList'});
    const virtuosoGridRef = useRef<VirtuosoGridHandle>(null);

    // cb for scroll restoration
    const onOpenHandler = useCallback((index: number) => () => {
        onOpenArticle?.(index)
    }, [onOpenArticle]);

    useEffect(() => {
        if (view === ArticleListView.TILE) {
            const timerId = setTimeout(() => {
                virtuosoGridRef.current?.scrollToIndex(scrollToIndex ? scrollToIndex : 0)
            }, 0);

            return () => {
                clearTimeout(timerId);
            }
        };
    }, [scrollToIndex, view]);

    const renderArticleCard = useCallback((index, articleData: Article) => {

        return (
            <ArticleListItem
                key={articleData.id}
                article={articleData}
                view={view}
                isLoading={false}
                target={target}
                onOpenCb={onOpenHandler(index)}
            />
        )
    }, [view, target, onOpenHandler]);

    const renderArticleCardSkeleton = useCallback((index: number) => {
        return (
            <ArticleListItem
                key={`${index}_skeleton`}
                article={{id: `${index}_skeleton`} as Article}
                view={view}
                isLoading={true}
            />
        )
    }, [view]);

    const Footer = memo(() => {
        if (!isLoading) return null;

        return (
            <div className={view === ArticleListView.TILE ? cls.tileSkeletonsFooter : ''}>
                {
                    new Array(view === ArticleListView.LIST ? LIST_SKELETONS_COUNT : TILE_SKELETONS_COUNT).fill(0)
                        .map((_, index) => 
                            (
                                <div 
                                    key={`${index}_skeleton_wrapper`}
                                    className={view === ArticleListView.TILE ? cls.tileSkeletonWrapper : ''}
                                >
                                    {renderArticleCardSkeleton(index)}
                                </div>
                            )
                        )
                }
            </div>
        )
    });
    Footer.displayName = 'Footer';

    // VirtuosoGrid logic
    const ScrollSeekPlaceholder: FC<{index: number}> = useCallback(({index}) => {
        return (
            <div className={cls.tileSkeletonWrapper}>
                { renderArticleCardSkeleton(index) }
            </div>
        );
    }, [renderArticleCardSkeleton]);
    ScrollSeekPlaceholder.displayName = 'ScrollSeekPlaceholder';

    const GridComponents = useMemo<GridComponents>(() => ({
        Header,
        Footer,
        ScrollSeekPlaceholder,
        Item: ({children, ...props}) => (
            <div
                className={cls.gridListItem}
                style={{
                    width: `calc(${100 / TILES_PER_ROW}% - ${TILE_SKELETONS_GAP}px)`,
                    height: '300px'
                }}
                {...props}
            >
                { children }
            </div>
        ),
    }), [Header, Footer, ScrollSeekPlaceholder]);

    const showInitialTileSkeletons = isLoading && articles.length === 0;

    const tileDisplayData = useMemo(() => {
        if (showInitialTileSkeletons) {
            return [];
        }
        return articles;
    }, [articles, showInitialTileSkeletons]);

    const tileTotalCount = useMemo(() => {
        if (showInitialTileSkeletons) {
            return INITIAL_TILE_SKELETONS_COUNT;
        }
        return articles.length;
    }, [showInitialTileSkeletons, articles.length]);

    const tileItemContent = useCallback((index: number) => {
        const article = articles[index];
        if (showInitialTileSkeletons || !article) {
            return renderArticleCardSkeleton(index);
        }

        return renderArticleCard(index, article)
    }, [articles, showInitialTileSkeletons, renderArticleCard, renderArticleCardSkeleton]);
    // render options

    if (!isLoading && articles.length === 0) {
        return (
            <div className={classNames(cls.ArticleList, {}, [className])}>
                { Header && <Header />}
                <Text
                    className={cls.emptyArticles}
                    title={t('emptyArticlesList')}
                />
            </div>
        )
    };

    if (view === ArticleListView.LIST) {
        return (
            <div className={classNames(cls.ArticleList, {}, [className])}>
                <Virtuoso
                    style={{height: '100%', width: '100%'}}
                    data={articles}
                    totalCount={articles.length}
                    itemContent={renderArticleCard}
                    endReached={onScrollEnd}
                    components={{
                        Header,
                        Footer
                    }}
                    initialTopMostItemIndex={scrollToIndex ? scrollToIndex : 0}
                />
            </div>
        )
    }

    return (
        <div className={classNames(cls.ArticleList, {}, [className])}>
            <VirtuosoGrid 
                className={cls.tileList}
                ref={virtuosoGridRef}
                style={{width: '100%', height: '100%'}}
                totalCount={tileTotalCount}
                data={tileDisplayData}
                itemContent={tileItemContent}
                endReached={onScrollEnd}
                components={GridComponents}
                listClassName={cls.itemsWrapper}
                scrollSeekConfiguration={{
                    enter: (velocity) => Math.abs(velocity) > 200,
                    exit: (velocity) => Math.abs(velocity) < 30,
                }}
                useWindowScroll={false}
                
            />
        </div>
    )
}


