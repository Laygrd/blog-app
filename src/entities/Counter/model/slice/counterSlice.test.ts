import { counterActions, counterReducer } from "./counterSlice"
import type { CounterSchema } from "../types/CounterSchema";


describe('CounterSlice.test', () => {
    test('should decrement work', () => {
        const state: CounterSchema = {
            value: 10,
        };
        expect(counterReducer(state, counterActions.decrement())).toEqual({value: 9})
    });
    test('should increment work', () => {
        const state: CounterSchema = {
            value: 10,
        };
        expect(counterReducer(state, counterActions.increment())).toEqual({value: 11})
    });
    test('should work with empty state', () => {
        expect(counterReducer(undefined, counterActions.increment())).toEqual({value: 1})
    });
});
