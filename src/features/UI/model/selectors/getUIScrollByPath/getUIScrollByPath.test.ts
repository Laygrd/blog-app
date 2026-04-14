import { StateSchema } from "app/providers/StoreProvider";
import { getUIScrollByPath } from "./getUIScrollByPath";

describe('getUIScrollByPath.test', () => {
    test('should return scroll from state', () => {
        const state: DeepPartial<StateSchema> = {
            ui: {
                scroll: {'main': 100, 'about': 450}
            }
        };

        expect(getUIScrollByPath(state as StateSchema, 'main')).toEqual(100);
    });
    test('empty state', () => {
        const state: DeepPartial<StateSchema> = {
            ui: {
                scroll: {}
            }
        };

        expect(getUIScrollByPath(state as StateSchema, 'main')).toBe(0);
    });
})