import { Dispatch } from "@reduxjs/toolkit";
import type { StateSchema } from "@/app/providers/StoreProvider";
import { userActions } from "@/entities/User";
import { TestAsyncThunk } from "@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk";
import { loginByUsername } from "./loginByUsername";


describe('loginByUsername.test', () => {

    // mock dispatch and getState for action on each test case
    let dispatch: Dispatch;
    let getState: () => StateSchema;

    beforeEach(() => {
        dispatch = jest.fn();
        getState = jest.fn()

    });

    test('success login', async () => {
        const userData = {username: 'user', id: '1'};

       
        const thunk = new TestAsyncThunk(loginByUsername);
        thunk.api.post.mockReturnValue(Promise.resolve({data: userData}));
        const result = await thunk.callThunk({username: 'user', password: 'qwerty'})

        expect(thunk.dispatch).toHaveBeenCalledWith(userActions.setAuthData(userData))
        expect(thunk.dispatch).toHaveBeenCalledTimes(3);
        expect( thunk.api.post).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(userData);
    });

    test('error login', async () => {

        const thunk = new TestAsyncThunk(loginByUsername);
        thunk.api.post.mockReturnValue(Promise.resolve({status: 403}));
        const result = await thunk.callThunk({username: 'user', password: 'qwerty'})

        expect(thunk.api.post).toHaveBeenCalled();
        expect(thunk.dispatch).toHaveBeenCalledTimes(2);
        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toBe('LoginForm.errors.invalidCreds');
    });

})