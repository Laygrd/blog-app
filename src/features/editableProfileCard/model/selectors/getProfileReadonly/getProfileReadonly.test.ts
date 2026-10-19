import type { StateSchema } from "@/app/providers/StoreProvider"
import { getProfileReadonly } from "./getProfileReadonly"


describe('getProfileReadonly.test', () => {
    test('should return profile readonly', () => {
        const state: DeepPartial<StateSchema> = {
            profile: {
                readonly: true
            }
        };
        expect(getProfileReadonly(state as StateSchema)).toBe(true);
    });
    test('empty profile', () => {
        const state: DeepPartial<StateSchema> = {

        };
        expect(getProfileReadonly(state as StateSchema)).toBe(undefined);
    })
});