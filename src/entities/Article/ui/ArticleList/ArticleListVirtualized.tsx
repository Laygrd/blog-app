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
    Virtuoso,
    VirtuosoGrid,
    VirtuosoGridHandle,
} from 'react-virtuoso';
import { useTranslation } from 'react-i18next';

import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui/Text/Text';
import { Article, ArticleListView } from '../../model/types/Article';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListProps } from './ArticleList';
import cls from './ArticleList.module.scss';


const INITIAL_TILE_SKELETONS_COUNT = 8;
const LIST_SKELETONS_COUNT = 3;
const TILE_SKELETONS_COUNT = 8;

// Ширины, при которых меняется число колонок.
// Совпадают с брейкпоинтами в SCSS.
const MIN_CARD_WIDTH = 260; // минимальная желаемая ширина карточки
const MAX_COLUMNS = 4;
const GAP = 30;

/** Считает, сколько карточек влезает в ряд при данной ширине. */
function computeItemsPerRow(width: number): number {
    if (width <= 0) return 1;
    // n колонок: n * MIN + (n - 1) * GAP <= width
    // n <= (width + GAP) / (MIN + GAP)
    const n = Math.floor((width + GAP) / (MIN_CARD_WIDTH + GAP));
    return Math.max(1, Math.min(MAX_COLUMNS, n));
}

/** Хук, возвращающий ширину элемента и число колонок. */
function useContainerColumns() {
    const ref = useRef<HTMLDivElement | null>(null);
    const [itemsPerRow, setItemsPerRow] = useState(MAX_COLUMNS);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const update = () => {
            // берём реальную ширину с padding
            const width = el.clientWidth;
            const n = computeItemsPerRow(width);
            setItemsPerRow(n);
            el.style.setProperty('--items-per-row', String(n));
        };

        update();

        const ro = new ResizeObserver(update);
        ro.observe(el);

        // на всякий случай — ресайз окна
        window.addEventListener('resize', update);
        return () => {
            ro.disconnect();
            window.removeEventListener('resize', update);
        };
    }, []);

    return { ref, itemsPerRow };
}

const FooterContext = createContext<{
    isLoading?: boolean;
    view: ArticleListView;
    renderSkeleton: (i: number) => JSX.Element;
        } | null>(null);

const FooterFromContext = memo(() => {
    const context = useContext(FooterContext);
    if (!context || !context.isLoading) return null;

    return (
        <div
            className={
                context.view === ArticleListView.TILE ? cls.tileSkeletonsFooter : ''
            }
        >
            {new Array(
                context.view === ArticleListView.LIST
                    ? LIST_SKELETONS_COUNT
                    : TILE_SKELETONS_COUNT,
            )
                .fill(0)
                .map((_, index) => (
                    <div
                        key={`${index}_skeleton_wrapper`}
                        className={
                            context.view === ArticleListView.TILE
                                ? cls.tileSkeletonWrapper
                                : ''
                        }
                    >
                        {context.renderSkeleton?.(index)}
                    </div>
                ))}
        </div>
    );
});
FooterFromContext.displayName = 'Footer';

export const ArticleListVirtualized = (props: ArticleListProps) => {
    const {
        className,
        articles,
        isLoading,
        view = ArticleListView.TILE,
        target,
        onScrollEnd,
        onOpenArticle,
        scrollToIndex,
        Header,
        ...otherProps
    } = props;

    const { t } = useTranslation('article', { keyPrefix: 'ArticleList' });
    const virtuosoGridRef = useRef<VirtuosoGridHandle>(null);

    // ширина контейнера → itemsPerRow
    const { ref: containerRef, itemsPerRow } = useContainerColumns();

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
        if (view === ArticleListView.TILE) {
            const timerId = setTimeout(() => {
                virtuosoGridRef.current?.scrollToIndex(
                    scrollToIndex ? scrollToIndex : 0,
                );
            }, 0);
            return () => clearTimeout(timerId);
        }
    }, [scrollToIndex, view]);

    const renderArticleCard = useCallback(
        (index: number, articleData: Article) => (
            // необходимо все list items класть на подложку для паддингов
            <div className={view === ArticleListView.LIST ? cls.listItemWrapper : ''}>
                <ArticleListItem
                    className={cls.listItem}
                    key={articleData.id}
                    article={articleData}
                    view={view}
                    isLoading={false}
                    target={target}
                    onOpenCb={onOpenHandler(index)}
                />
            </div>
        ),
        [view, target, onOpenHandler],
    );

    const renderArticleCardSkeleton = useCallback(
        (index: number) => (
            <div className={view === ArticleListView.LIST ? cls.listItemWrapper : ''}>
                <ArticleListItem
                    className={cls.listItem}
                    key={`${index}_skeleton`}
                    article={{ id: `${index}_skeleton` } as Article}
                    view={view}
                    isLoading={true}
                />
            </div>
        ),
        [view],
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

    // ширина карточки в зависимости от числа колонок
    const itemWidth = useMemo(
        () => `calc(${100 / itemsPerRow}% - ${((itemsPerRow - 1) * GAP) / itemsPerRow}px)`,
        [itemsPerRow],
    );

    const GridComponents = useMemo<GridComponents>(
        () => ({
            Header,
            Footer: FooterFromContext,
            ScrollSeekPlaceholder,
            Item: ({ children, ...rest }) => (
                <div
                    className={cls.gridListItem}
                    {...rest}
                    style={{width: itemWidth}}
                >
                    {children}
                </div>
            ),
        }),
        [Header, ScrollSeekPlaceholder, itemWidth],
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
            <div className={classNames(cls.ArticleListVirtualized, {}, [className])}>
                {Header && <Header />}
                <Text className={cls.emptyArticles} title={t('emptyArticlesList')} />
            </div>
        );
    }

    if (view === ArticleListView.LIST) {
        return (
            <FooterContext.Provider
                value={{ isLoading, view, renderSkeleton: renderArticleCardSkeleton }}
            >
                <div
                    className={classNames(cls.ArticleListVirtualized, {}, [className])}
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
    }

    return (
        <FooterContext.Provider
            value={{ isLoading, view, renderSkeleton: renderArticleCardSkeleton }}
        >
            <div
                ref={containerRef}
                className={classNames(cls.ArticleListVirtualized, {}, [className])}
                {...otherProps}
            >
                <VirtuosoGrid
                    className={cls.tileList}
                    ref={virtuosoGridRef}
                    style={{ width: '100%', height: '100%' }}
                    totalCount={tileTotalCount}
                    data={tileDisplayData}
                    itemContent={tileItemContent}
                    endReached={handleEndReached}
                    components={GridComponents}
                    listClassName={cls.itemsWrapper}
                    scrollSeekConfiguration={{
                        enter: (velocity) => Math.abs(velocity) > 450,
                        exit: (velocity) => Math.abs(velocity) < 30,
                    }}
                    useWindowScroll={false}
                />
            </div>
        </FooterContext.Provider>
    );
};