import { Country } from "entities/Country";
import { getProfileForm } from "./getProfileForm"
import { StateSchema } from "app/providers/StoreProvider"
import { Currency } from "entities/Currency";

describe('getProfileForm.test', () => {

    const form = {
        username: 'username1',
        firstname: 'firstname1',
        lastname: 'lastname1',
        age: '18',
        city: 'default_city',
        country: Country.Not_set,
        currency: Currency.Not_set,
        avatar: ''
    }

    test('should return profile form', () => {
        const state: DeepPartial<StateSchema> = {
            profile: {
                form: form
            }
        };
        expect(getProfileForm(state as StateSchema)).toEqual(form);
    });
    test('empty profile', () => {
        const state: DeepPartial<StateSchema> = {
            profile: {}
        };
        expect(getProfileForm(state as StateSchema)).toBe(undefined);
    })
});