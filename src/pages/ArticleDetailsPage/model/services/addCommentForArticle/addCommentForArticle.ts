import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkAPIOptions } from "app/providers/StoreProvider";
import type { Comment } from "entities/Comment";
import { getUserAuthData } from "entities/User";
import { getArticleDetailsData } from "entities/Article";
import { fetchCommentsByArticleId } from "../fetchCommentsByArticleId/fetchCommentsByArticleId";


export const addCommentForArticle = createAsyncThunk<
    Comment,
    string,
    ThunkAPIOptions<string>
>(
    'articleDetails/addCommentForArticle',
    async (commentText, ThunkAPI) => {
        const { extra, rejectWithValue, getState, dispatch} = ThunkAPI;

        try {

            const userData = getUserAuthData(getState());
            const articleData = getArticleDetailsData(getState());

            if (!commentText || !userData || !articleData) {
                return rejectWithValue('errors.ADD_COMMENT_INCORRECT_OR_MISSING_DATA');
            }

            const response = await extra.api?.post<Comment>('/comments', {
                articleId: articleData.id,
                userId: userData.id,
                text: commentText
            });

            if (!response?.data) {
                throw new Error()
            };

            dispatch(fetchCommentsByArticleId(articleData.id))

            return response.data;
        } catch (error) {
            return rejectWithValue('errors.ADD_COMMENT_REQUEST_FAILED');
        }
    }
);
