import { StateSchema } from "app/providers/StoreProvider";
import { getUIScroll } from "./getUIScroll";

describe('getUIScroll.test', () => {
    test('should return scroll from state', () => {
        const state: DeepPartial<StateSchema> = {
            ui: {
                scroll: {'main': 100, 'about': 450}
            }
        };

        expect(getUIScroll(state as StateSchema)).toEqual({'main': 100, 'about': 450});
    });
    test('empty state', () => {
        const state: DeepPartial<StateSchema> = {};

        expect(getUIScroll(state as StateSchema)).toBe(undefined);
    });
});