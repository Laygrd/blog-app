import { getProfileError } from "./getProfileError"
import { StateSchema } from "app/providers/StoreProvider"

describe('getProfileError.test', () => {
    test('should return profile error', () => {
        const state: DeepPartial<StateSchema> = {
            profile: {
                error: 'error'
            }
        };
        expect(getProfileError(state as StateSchema)).toBe('error')
    });
    test('empty profile', () => {
        const state: DeepPartial<StateSchema> = {
            profile: {}
        };
        expect(getProfileError(state as StateSchema)).toBe(undefined)
    })
});