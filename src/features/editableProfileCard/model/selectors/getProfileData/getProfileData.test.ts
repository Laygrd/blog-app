import { Country } from "entities/Country";
import { Currency } from "entities/Currency";
import { getProfileData } from "./getProfileData"
import { StateSchema } from "app/providers/StoreProvider"

describe('getProfileData.test', () => {

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

    test('should return profile data', () => {
        const state: DeepPartial<StateSchema> = {
            profile: {
                data: data
            }
        };
        expect(getProfileData(state as StateSchema)).toEqual(data)
    });
    test('empty profile', () => {
        const state: DeepPartial<StateSchema> = {
            profile: {}
        };
        expect(getProfileData(state as StateSchema)).toBe(undefined)
    })
});