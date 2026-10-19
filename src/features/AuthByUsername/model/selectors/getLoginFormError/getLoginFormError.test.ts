import type { StateSchema } from "@/app/providers/StoreProvider";
import { getLoginFormError } from "./getLoginFormError";


describe('getLoginFormError.test', () => {
    test('should return value from state', () => {
        const state: DeepPartial<StateSchema> = {
            loginForm: {
                error: 'error'
            }
        };

        expect(getLoginFormError(state as StateSchema)).toEqual('error');
    });
    test('should return default value if not set', () => {
        const state: DeepPartial<StateSchema> = {};

        expect(getLoginFormError(state as StateSchema)).toEqual(undefined);
    });
});
