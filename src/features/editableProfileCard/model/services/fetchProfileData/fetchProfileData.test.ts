import { TestAsyncThunk } from "shared/lib/tests/TestAsyncThunk/TestAsyncThunk";
import { fetchProfileData } from "./fetchProfileData"
import { Profile } from 'entities/Profile'
import { Country } from "entities/Country";
import { Currency } from "entities/Currency";
import { ValidateProfileDataError } from "../../types/EditableProfileCardSchema";

const profileData: Profile = {
    username: "",
    firstname: "",
    lastname: "",
    age: "",
    avatar: "",
    city: "",
    country: Country.Not_set,
    currency: Currency.Not_set,
};

describe('fetchProfileData.test', () => {

    test('success fetch', async () => {
        const thunk = new TestAsyncThunk(fetchProfileData);
        thunk.api.get.mockReturnValue(Promise.resolve({data: profileData}));

        const result = await thunk.callThunk('1');

        expect( thunk.api.get).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(profileData);
    });

    test('error fetch', async () => {
        const thunk = new TestAsyncThunk(fetchProfileData);
        thunk.api.get.mockReturnValue(Promise.resolve({status: 404}));

        const result = await thunk.callThunk('1')

        expect(thunk.api.get).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toBe(ValidateProfileDataError.SERVER_ERROR);
    });

})