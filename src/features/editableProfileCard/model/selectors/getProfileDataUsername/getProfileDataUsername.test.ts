import { Country } from "entities/Country";
import { Currency } from "entities/Currency";
import { getProfileDataUsername } from "./getProfileDataUsername"
import { StateSchema } from "app/providers/StoreProvider"

describe('getProfileDataUsername.test', () => {

    const data = {
        username: 'username1',
        firstname: 'firstname1',
        lastname: 'lastname1',
        age: '18',
        city: 'default_city',
        country: Country.Not_set,
        currency: Currency.Not_set,
        avatar: ''
    }

    test('should return profile data username', () => {
        const state: DeepPartial<StateSchema> = {
            profile: {
                data: data
            }
        };
        expect(getProfileDataUsername(state as StateSchema)).toBe('username1')
    });
    test('empty profile', () => {
        const state: DeepPartial<StateSchema> = {
            profile: {}
        };
        expect(getProfileDataUsername(state as StateSchema)).toBe(undefined)
    })
});