import type { StateSchema } from "@/app/providers/StoreProvider";
import { getLoginFormIsLoading } from "./getLoginFormIsLoading";


describe('getLoginFormIsLoading.test', () => {
    test('should return value from state', () => {
        const state: DeepPartial<StateSchema> = {
            loginForm: {
                isLoading: true
            }
        };

        expect(getLoginFormIsLoading(state as StateSchema)).toEqual(true);
    });
    test('should return default value if not set', () => {
        const state: DeepPartial<StateSchema> = {};

        expect(getLoginFormIsLoading(state as StateSchema)).toEqual(false);
    });
});
