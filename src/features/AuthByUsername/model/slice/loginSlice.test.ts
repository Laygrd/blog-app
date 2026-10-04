import type { LoginSchema } from "../types/LoginSchema";
import { loginActions, loginReducer } from "./loginSlice";
import { loginByUsername } from "../services/loginByUsername";


describe('loginSlice.test', () => {

    // simple reducers
    test('should setUsername work', () => {
        const state: DeepPartial<LoginSchema> = {
            username: '',
        };
        expect(
            loginReducer(state as LoginSchema, loginActions.setUsername('user1'))
        ).toEqual({username: 'user1'})
    });

    test('should setPassword work', () => {
        const state: DeepPartial<LoginSchema> = {
            password: '',
        };
        expect(
            loginReducer(state as LoginSchema, loginActions.setPassword('qwerty'))
        ).toEqual({password: 'qwerty'})
    });

    // extra reducers (btw it tested in loginByUsername.test.ts)
    test('should isLoading change', () => {
        const state: DeepPartial<LoginSchema> = {
            isLoading: false,
        };
        expect(
            loginReducer(state as LoginSchema, loginByUsername.pending)
        ).toEqual({error: undefined, isLoading: true})
    });

    test('should error change', () => {
        const state: DeepPartial<LoginSchema> = {
            error: undefined,
        };
        expect(
            loginReducer(state as LoginSchema, loginByUsername.rejected)
        ).toEqual({error: undefined, isLoading: false})
    });

});
