import type { StateSchema } from "@/app/providers/StoreProvider";
import { getLoginFormUsername } from "./getLoginFormUsername";


describe('getLoginFormUsername.test', () => {
    test('should return value from state', () => {
        const state: DeepPartial<StateSchema> = {
            loginForm: {
                username: 'User1'
            }
        };

        expect(getLoginFormUsername(state as StateSchema)).toEqual('User1');
    });
    test('should return default value if not set', () => {
        const state: DeepPartial<StateSchema> = {};

        expect(getLoginFormUsername(state as StateSchema)).toEqual('');
    });
});
