import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkAPIOptions } from "app/providers/StoreProvider";
import { articlesPageActions } from "../../slice/articlesPageSlice";
import { fetchArticles } from "../fetchArticles/fetchArticles";
import { getArticlesPageInited } from "../../selectors/getArticlesPageInited/getArticlesPageInited";


export const initArticlesPage = 
createAsyncThunk<
    void,
    void,
    ThunkAPIOptions<string>
>(
    'articlesPage/initArticlesPage',
    async (_, ThunkAPI) => {
        const { getState, dispatch} = ThunkAPI;
        const inited = getArticlesPageInited(getState());

        if (!inited){
            dispatch(articlesPageActions.initView());
            dispatch(fetchArticles({page: 1}));
        };
    }
)