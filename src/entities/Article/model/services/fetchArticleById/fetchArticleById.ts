import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkAPIOptions } from "app/providers/StoreProvider";
import { Article } from "../../types/Article";


export const fetchArticleById = createAsyncThunk<
    Article,
    string,
    ThunkAPIOptions<string>
>(
    'articleDetails/fetchArticleById',
    async (articleId, ThunkAPI) => {
        const { extra, rejectWithValue} = ThunkAPI;

        try {
            const response = await extra.api?.get<Article>('/articles/' + articleId, {
                params: {
                    _expand: 'user'
                }
            });
            if (!response?.data) {
                throw new Error();
            };
            return response.data;

        } catch (error) {
            return rejectWithValue('error');
        }
    }
)