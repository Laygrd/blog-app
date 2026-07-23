import { ArticlesPageSchema } from "../types/ArticlesPageSchema";
import { articlesPageActions, articlesPageReducer } from "./articlesPageSlice";
import { fetchArticles } from "../services/fetchArticles/fetchArticles";
import { Article, ArticleListView } from "entities/Article";


const article = {
    "id": "1",
    "title": "Test article",
    "subtitle": "Test article",
    "img": "http://some_image_url.jpeg",
    "views": 1234,
    "createdAt": "01.01.0001",
    "user": {
        'id': '1',
        'username': 'admin',
        'avatarUrl': 'http://some_image_url.png'
    },
    "type": ["IT", "Science"],
    "blocks": [{
        "id": "1",
        "type": "CODE",
        "code": "some code..."
    }]
} as Article


describe('articlesPageSlice.test', () => {

    // simple reducers
    test('should setView work', () => {
        const state: DeepPartial<ArticlesPageSchema> = {
            view: ArticleListView.LIST,
        };
        expect(
            articlesPageReducer(state as ArticlesPageSchema, articlesPageActions.setView(ArticleListView.TILE))
        ).toEqual({ view: ArticleListView.TILE })
    });

    test('should setPage work', () => {
        const state: DeepPartial<ArticlesPageSchema> = {
            page: 2,
        };
        expect(
            articlesPageReducer(state as ArticlesPageSchema, articlesPageActions.setPage(2))
        ).toEqual({ page: 2 })
    });

    test('should initView work', () => {
        const state: DeepPartial<ArticlesPageSchema> = {
            view: undefined,
            limit: undefined,
        };

        // mocking localStorage
        const localStorageMock = {
            getItem: jest.fn(),
        };
        Object.defineProperty(window, 'localStorage', {
            value: localStorageMock,
            writable: true,
        });
        localStorageMock.getItem.mockReturnValue(ArticleListView.LIST)

        expect(
            articlesPageReducer(state as ArticlesPageSchema, articlesPageActions.initView())
        ).toEqual({ view: ArticleListView.LIST, limit: 4, _inited: true })
    });

    //extra reducers (btw it tested in fetchArticles.test.ts)
    test('should fetchArticles.pending change isLoading', () => {
        const state: DeepPartial<ArticlesPageSchema> = {
            isLoading: false,
        };
        expect(
            articlesPageReducer(state as ArticlesPageSchema, fetchArticles.pending)
        ).toEqual({
            error: undefined,
            isLoading: true
        })
    });

});
