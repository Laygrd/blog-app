import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkAPIOptions } from "app/providers/StoreProvider";
import { getArticlesPageNumber } from "../../selectors/getArticlesPageNumber/getArticlesPageNumber";
import { getArticlesPageHasMore } from "../../selectors/getArticlesPageHasMore/getArticlesPageHasMore";
import { getArticlesPageIsLoading } from "../../selectors/getArticlesPageIsLoading/getArticlesPageIsLoading";
import { articlesPageActions } from "../../slice/articlesPageSlice";
import { fetchArticles } from "../fetchArticles/fetchArticles";


export const fetchArticlesNextPart = 
createAsyncThunk<
    void,
    void,
    ThunkAPIOptions<string>
>(
    'articlesPage/fetchArticlesNextPart',
    async (_, ThunkAPI) => {
        const { getState, dispatch} = ThunkAPI;

        const page = getArticlesPageNumber(getState());
        const hasMore = getArticlesPageHasMore(getState());
        const isLoading = getArticlesPageIsLoading(getState());

        if (hasMore && !isLoading) {
            dispatch(articlesPageActions.setPage(page + 1));
            dispatch(fetchArticles({}));
        }

    }
)