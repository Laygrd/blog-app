import type { Comment } from "@/entities/Comment";
import { TestAsyncThunk } from "@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk";
import { fetchCommentsByArticleId } from "./fetchCommentsByArticleId";


const comments: Comment[] = [
    {
        id: '1',
        user: {id: '1', username: 'username1'},
        text: 'some comment'
    },
    {
        id: '2',
        user: {id: '1', username: 'username2'},
        text: 'some comment2'
    },
    {
        id: '3',
        user: {id: '1', username: 'username1'},
        text: 'some comment3'
    },
]

describe('fetchCommentsByArticleId.test', () => {

    test('success fetch', async () => {
        const thunk = new TestAsyncThunk(fetchCommentsByArticleId);
        thunk.api.get.mockReturnValue(Promise.resolve({data: comments}));

        const result = await thunk.callThunk("1");

        expect( thunk.api.get).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(comments);
    });

    test('error fetch (failed fetch error)', async () => {
        const thunk = new TestAsyncThunk(fetchCommentsByArticleId);
        thunk.api.get.mockReturnValue(Promise.resolve({status: 404}));

        const result = await thunk.callThunk("1")

        expect(thunk.api.get).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toBe('errors.FAILED_TO_FETCH_ARTICLE_COMMENTS');
    });

    test('error fetch (empty article id error)', async () => {
        const thunk = new TestAsyncThunk(fetchCommentsByArticleId);
        thunk.api.get.mockReturnValue(Promise.resolve({status: 404}));

        const result = await thunk.callThunk(undefined)

        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toBe('errors.INCORRECT_ARTICLE_ID');
    });

});
