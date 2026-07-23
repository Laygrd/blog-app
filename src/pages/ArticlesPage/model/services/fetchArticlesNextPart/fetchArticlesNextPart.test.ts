import { TestAsyncThunk } from "shared/lib/tests/TestAsyncThunk/TestAsyncThunk";
import { fetchArticlesNextPart } from "./fetchArticlesNextPart";
import { fetchArticles } from "../fetchArticles/fetchArticles";
import { ArticleListView } from "entities/Article";


jest.mock('../fetchArticles/fetchArticles');

describe('fetchArticlesNextPart.test', () => {

    test('success fetch', async () => {
        const thunk = new TestAsyncThunk(
            fetchArticlesNextPart,
            {
                articlesPage: {
                    limit: 4,
                    page: 2,
                    hasMore: true,
                    ids: [],
                    entities: {},
                    isLoading: false,
                    error: undefined,
                    view: ArticleListView.LIST,
                }
            },
        );
        
        const result = await thunk.callThunk();

        expect( fetchArticles ).toHaveBeenCalled();
        expect( thunk.dispatch ).toHaveBeenCalledTimes(4);
        expect(result.meta.requestStatus).toBe('fulfilled');
    });

    test('error fetch', async () => {
        const thunk = new TestAsyncThunk(
            fetchArticlesNextPart,
            {
                articlesPage: {
                    limit: 4,
                    page: 2,
                    hasMore: false,
                    ids: [],
                    entities: {},
                    isLoading: false,
                    error: undefined,
                    view: ArticleListView.LIST,
                }
            }
        );
        await thunk.callThunk()

        expect(thunk.api.get).not.toHaveBeenCalled();
        expect( thunk.dispatch ).toHaveBeenCalledTimes(2);

    });

})