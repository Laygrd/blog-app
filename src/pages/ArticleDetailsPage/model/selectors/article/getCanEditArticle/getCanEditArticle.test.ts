import { StateSchema } from "app/providers/StoreProvider"
import { getCanEditArticle } from "./getCanEditArticle"


describe('getCanEditArticle.test', () => {

    test('should return true', () => {
        const state: DeepPartial<StateSchema> = {
            articleDetails: {
                data: {
                    user: {
                        id: '1'
                    }
                }
            },
            user: {
                authData: {
                    id: '1'
                }
            }
        };
        expect(getCanEditArticle(state as StateSchema)).toBe(true)
    });

    test('should return false', () => {
        const state: DeepPartial<StateSchema> = {
            articleDetails: {
                data: {
                    user: {
                        id: '1'
                    }
                }
            },
            user: {
                authData: {
                    id: '2'
                }
            }
        };
        expect(getCanEditArticle(state as StateSchema)).toBe(false)
    });

    test('with missing article data', () => {
        const state: DeepPartial<StateSchema> = {
            
            user: {
                authData: {
                    id: '1'
                }
            }
        };
        expect(getCanEditArticle(state as StateSchema)).toBe(false)
    });

    test('with missing user data', () => {
        const state: DeepPartial<StateSchema> = {

            articleDetails: {
                data: {
                    user: {
                        id: '1'
                    }
                }
            },
        };
        expect(getCanEditArticle(state as StateSchema)).toBe(false)
    });
});