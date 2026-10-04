import type { StateSchema } from "app/providers/StoreProvider"
import { getProfileIsLoading } from "./getProfileIsLoading"

describe('getProfileForm.test', () => {
    test('should return profile isLoading', () => {
        const state: DeepPartial<StateSchema> = {
            profile: {
                isLoading: true
            }
        };
        expect(getProfileIsLoading(state as StateSchema)).toBe(true);
    });
    test('empty profile', () => {
        const state: DeepPartial<StateSchema> = {

        };
        expect(getProfileIsLoading(state as StateSchema)).toBe(undefined);
    })
});