import { getProfileValidateErrors } from "./getProfileValidateErrors"
import { StateSchema } from "app/providers/StoreProvider"

describe('getProfileValidateErrors.test', () => {
    test('should return profile validateErrors', () => {
        const state: DeepPartial<StateSchema> = {
            profile: {
                validateErrors: []
            }
        };
        expect(getProfileValidateErrors(state as StateSchema)).toEqual([]);
    });
    test('empty profile', () => {
        const state: DeepPartial<StateSchema> = {

        };
        expect(getProfileValidateErrors(state as StateSchema)).toBe(undefined);
    })
});