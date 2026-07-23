import { TestAsyncThunk } from "shared/lib/tests/TestAsyncThunk/TestAsyncThunk";
import { fetchArticles } from "./fetchArticles"
import { Article, ArticleListView } from "entities/Article";


const article = {
    "id": "1",
    "title": "Test article",
    "subtitle": "Test article",
    "img": "https://some_image_url.png",
    "views": 1234,
    "createdAt": "01.01.0001",
    "user": {
        'id': '1',
        'username': 'admin',
        'avatarUrl': 'https://some_image_url.png'
    },
    "type": ["IT", "Science"],
    "blocks": [
        {
            "id": "2",
            "type": "TEXT",
            "paragraphs": [
                "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
                "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
                "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas."
            ]
        }
    ]
} as Article;

describe('fetchArticles.test', () => {

    test('success fetch', async () => {
        const thunk = new TestAsyncThunk(
            fetchArticles,
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
        thunk.api.get.mockReturnValue(Promise.resolve({data: [article]}));

        const result = await thunk.callThunk({});

        expect(thunk.api.get).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual([article]);
    });

    test('error fetch', async () => {
        const thunk = new TestAsyncThunk(
            fetchArticles,
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
        thunk.api.get.mockReturnValue(Promise.resolve({status: 404}));

        const result = await thunk.callThunk({})

        expect(thunk.api.get).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toBe('errors.FAILED_TO_FETCH_ARTICLES');
    });

})