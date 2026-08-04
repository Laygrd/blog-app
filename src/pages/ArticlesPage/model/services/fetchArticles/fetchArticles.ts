import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkAPIOptions } from "app/providers/StoreProvider";
import { Article, ArticleType } from "entities/Article";
import { getArticlesPageLimit } from "../../selectors/getArticlesPageLimit/getArticlesPageLimit";
import { getArticlesPageNumber } from "../../selectors/getArticlesPageNumber/getArticlesPageNumber";
import { getArticlesPageSort } from "../../selectors/getArticlesPageSort/getArticlesPageSort";
import { getArticlesPageOrder } from "../../selectors/getArticlesPageOrder/getArticlesPageOrder";
import { getArticlesPageSearch } from "../../selectors/getArticlesPageSearch/getArticlesPageSearch";
import { addQueryParams } from "shared/url/addQueryParams/addQueryParams";
import { getArticlesPageType } from "../../selectors/getArticlesPageType/getArticlesPageType";


interface FetchArticlesOptions {
    replace?: boolean
}

export const fetchArticles = 
createAsyncThunk<
    Article[],
    FetchArticlesOptions,
    ThunkAPIOptions<string>
>(
    'articlesPage/fetchArticles',
    async (props, ThunkAPI) => {
        const { extra, rejectWithValue, getState} = ThunkAPI;

        const limit = getArticlesPageLimit(getState());
        const page = getArticlesPageNumber(getState());
        const sort = getArticlesPageSort(getState());
        const order = getArticlesPageOrder(getState());
        const search = getArticlesPageSearch(getState());
        const type = getArticlesPageType(getState());

        try {
            /* --- ToDo ---
            *   Problem: when you go to ArticlesPage from ArticeDetailsPage
            *   search params doesnt set to search string.
            *   
            *   mb move addQuerryParams call to a separate async thunk will fix it
            * 
            * --- ---- --- */
            addQueryParams({
                sort,
                order,
                search,
                type,
            });

            const response = await extra.api?.get<Article[]>('/articles', {
                params: {
                    _expand: 'user',
                    _page: page,
                    _limit: limit,
                    _sort: sort,
                    _order: order,
                    type: type === ArticleType.ALL ? undefined : type,
                    q: search
                }
            });

            if (!response?.data) {
                throw new Error();
            };

            return response.data;

        } catch (error) {
            return rejectWithValue('errors.FAILED_TO_FETCH_ARTICLES');
        }
    }
)