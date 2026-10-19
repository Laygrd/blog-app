import type { StateSchema } from "@/app/providers/StoreProvider";
import { getLoginFormPassword } from "./getLoginFormPassword";


describe('getLoginFormPassword.test', () => {
    test('should return value from state', () => {
        const state: DeepPartial<StateSchema> = {
            loginForm: {
                password: 'qwerty'
            }
        };

        expect(getLoginFormPassword(state as StateSchema)).toEqual('qwerty');
    });
    test('should return default value if not set', () => {
        const state: DeepPartial<StateSchema> = {};

        expect(getLoginFormPassword(state as StateSchema)).toEqual('');
    });
});
