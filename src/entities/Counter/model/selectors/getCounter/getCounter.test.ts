import { getCounter } from "./getCounter"
import type { StateSchema } from "app/providers/StoreProvider"


describe('getCounter.test', () => {
    test('should return counter state', () => {
        const state: DeepPartial<StateSchema> = {
            counter: {
                value: 0
            }
        };
        expect(getCounter(state as StateSchema)).toEqual({ value: 0})
    })
});
