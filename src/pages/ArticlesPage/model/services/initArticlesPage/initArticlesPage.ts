import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkAPIOptions } from "app/providers/StoreProvider";
import { articlesPageActions } from "../../slice/articlesPageSlice";
import { fetchArticles } from "../fetchArticles/fetchArticles";
import { getArticlesPageInited } from "../../selectors/getArticlesPageInited/getArticlesPageInited";
import { SortOrder } from "shared/types";
import { ArticleSortField, ArticleType } from "entities/Article";


export const initArticlesPage = 
createAsyncThunk<
    void,
    URLSearchParams,
    ThunkAPIOptions<string>
>(
    'articlesPage/initArticlesPage',
    async (searchParams, ThunkAPI) => {
        const { getState, dispatch} = ThunkAPI;
        const inited = getArticlesPageInited(getState());

        if (!inited){

            const sort = searchParams.get('sort') as ArticleSortField;
            const order = searchParams.get('order') as SortOrder;
            const search = searchParams.get('search');
            const type = searchParams.get('type') as ArticleType;

            if (sort !== null) {
                dispatch(articlesPageActions.setSort(sort));
            }
            if (order !== null) {
                dispatch(articlesPageActions.setOrder(order));
            }
            if (search !== null) {
                dispatch(articlesPageActions.setSearch(search));
            }
            if (type !== null) {
                dispatch(articlesPageActions.setType(type));
            }

            dispatch(articlesPageActions.initView());
            dispatch(fetchArticles({}));
        };


    }
)