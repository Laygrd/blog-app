import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkAPIOptions } from "@/app/providers/StoreProvider";
import type { Comment } from '@/entities/Comment';


export const fetchCommentsByArticleId = 
createAsyncThunk<
    Comment[],
    string | undefined,
    ThunkAPIOptions<string>
>(
    'articleDetailsComments/fetchCommentsByArticleId',
    async (articleId, ThunkAPI) => {
        const { extra, rejectWithValue} = ThunkAPI;

        try {

            if (!articleId) {
                return rejectWithValue('errors.INCORRECT_ARTICLE_ID');
            };

            const response = await extra.api?.get<Comment[]>('/comments', {
                params: {
                    articleId,
                    _expand: 'user'
                }
            });

            if (!response?.data) {
                throw new Error();
            };

            return response.data;

        } catch (error) {
            return rejectWithValue('errors.FAILED_TO_FETCH_ARTICLE_COMMENTS');
        }
    }
);
