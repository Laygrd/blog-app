import { TestAsyncThunk } from "shared/lib/tests/TestAsyncThunk/TestAsyncThunk";
import { updateProfileData } from "./updateProfileData"
import { Profile } from 'entities/Profile'
import { Country } from "entities/Country";
import { Currency } from "entities/Currency";
import { ValidateProfileDataError } from "../../types/EditableProfileCardSchema";

const profileData: Profile = {
    id: '1',
    username: "username1",
    firstname: "firstname1",
    lastname: "lastname1",
    age: 18,
    avatar: "some_avatar_url",
    city: "some_city",
    country: Country.Not_set,
    currency: Currency.Not_set,
};

describe('fetchProfileData.test', () => {

    test('success update', async () => {
        const thunk = new TestAsyncThunk(
            updateProfileData,
            { 
                profile: { form: profileData }
            }
        );
        thunk.api.put.mockReturnValue(Promise.resolve({data: profileData}));

        const result = await thunk.callThunk();

        expect(thunk.api.put).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(profileData);
    });

    test('server error', async () => {
        const thunk = new TestAsyncThunk(
            updateProfileData,
            { 
                profile: { form: profileData }
            }
        );

        thunk.api.put.mockReturnValue(Promise.resolve({status: 403}));

        const result = await thunk.callThunk()

        expect(thunk.api.put).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toEqual([ValidateProfileDataError.SERVER_ERROR]);
    });

    test('validate error', async () => {
        const thunk = new TestAsyncThunk(
            updateProfileData,
            { 
                profile: { form: { ...profileData, username: ''} }
            }
        );

        const result = await thunk.callThunk()

        expect(thunk.api.put).not.toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toEqual([ValidateProfileDataError.INCORRECT_USERNAME]);
    });

})