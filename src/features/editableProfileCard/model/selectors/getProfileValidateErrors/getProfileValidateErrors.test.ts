import type { StateSchema } from "@/app/providers/StoreProvider";
import { getProfileValidateErrors } from "./getProfileValidateErrors";


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