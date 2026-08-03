import {
    createEntityAdapter,
    createSlice,
    PayloadAction,
} from "@reduxjs/toolkit";
import { StateSchema } from "app/providers/StoreProvider";
import { Article, ArticleListView, ArticleSortField, ArticleType } from "entities/Article";
import { ArticlesPageSchema } from "../types/ArticlesPageSchema";
import { fetchArticles } from "../services/fetchArticles/fetchArticles";
import { ARTICLE_LIST_VIEW_LOCALSTORAGE_KEY } from "shared/const/localStorage";
import { SortOrder } from "shared/types";


const articlesAdapter = createEntityAdapter<Article>({
    selectId: (article: Article) => article.id,
});

export const getArticles = articlesAdapter.getSelectors<StateSchema>(
    (state) => state.articlesPage || articlesAdapter.getInitialState()
);

const articlesPageSlice = createSlice({
    name: 'articlesPage',
    initialState: articlesAdapter.getInitialState<ArticlesPageSchema>({
        ids: [],
        entities: {},
        error: undefined,
        isLoading: false,

        page: 1,
        limit: 8,
        hasMore: true,

        view: ArticleListView.LIST,
        sort: ArticleSortField.TITLE,
        order: 'asc',
        search: '',
        type: ArticleType.ALL,

        _inited: false,
    }),
    reducers: {
        setView: (state, action: PayloadAction<ArticleListView>) => {
            state.view = action.payload;
            localStorage.setItem(ARTICLE_LIST_VIEW_LOCALSTORAGE_KEY, action.payload)
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        initView: (state) => {
            const view = localStorage.getItem(ARTICLE_LIST_VIEW_LOCALSTORAGE_KEY) as ArticleListView;
            state.view = view;
            state.limit = view === ArticleListView.LIST ? 4 : 8;
            state._inited = true;
        },
        setOrder: (state, action: PayloadAction<SortOrder>) => {
            state.order = action.payload;
        },
        setSort: (state, action: PayloadAction<ArticleSortField>) => {
            state.sort = action.payload;
        },
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
        setType: (state, action: PayloadAction<ArticleType>) => {
            state.type = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticles.pending, (state, action) => {
                state.isLoading = true;
                state.error = undefined;

                if (action.meta?.arg?.replace) {
                    articlesAdapter.removeAll(state);
                }

            })
            .addCase(fetchArticles.fulfilled, (state, action) => {
                state.isLoading = false;
                state.hasMore = action.payload.length >= state.limit;

                if (action.meta.arg.replace) {
                    articlesAdapter.setAll(state, action.payload);
                } else {
                    articlesAdapter.addMany(state, action.payload);
                }

            })
            .addCase(fetchArticles.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    },
});

export const { reducer: articlesPageReducer } = articlesPageSlice;
export const { actions: articlesPageActions } = articlesPageSlice;