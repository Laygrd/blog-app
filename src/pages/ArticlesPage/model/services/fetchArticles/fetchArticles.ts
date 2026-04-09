import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkAPIOptions } from "app/providers/StoreProvider";
import { Article } from "entities/Article";
import { getArticlesPageLimit } from "../../selectors/getArticlesPageLimit/getArticlesPageLimit";


interface FetchArticlesOptions {
    page: number
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
        const { page = 1 } = props;

        try {

            const response = await extra.api?.get<Article[]>('/articles', {
                params: {
                    _expand: 'user',
                    _page: page,
                    _limit: limit,
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