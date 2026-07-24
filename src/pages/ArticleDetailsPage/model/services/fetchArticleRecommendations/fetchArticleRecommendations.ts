import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkAPIOptions } from "app/providers/StoreProvider";
import { Article } from "entities/Article";



export const fetchArticleRecommendations = 
createAsyncThunk<
    Article[],
    void,
    ThunkAPIOptions<string>
>(
    'articleDtailsPage/fetchArticleRecommendations',
    async (props, ThunkAPI) => {
        const { extra, rejectWithValue } = ThunkAPI;

        try {

            const response = await extra.api?.get<Article[]>('/articles', {
                params: {
                    _limit: 6,
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