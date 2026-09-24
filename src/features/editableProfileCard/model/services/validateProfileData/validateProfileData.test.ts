import { validateProfileData } from "./validateProfileData"
import { Profile } from 'entities/Profile'
import { Country } from "entities/Country";
import { Currency } from "entities/Currency";
import { ValidateProfileDataError } from "../../types/EditableProfileCardSchema";

const profileData: Profile = {
    username: "username1",
    firstname: "firstname1",
    lastname: "lastname1",
    age: 18,
    avatar: "some_avatar_url",
    city: "some_city",
    country: Country.Not_set,
    currency: Currency.Not_set,
};

describe('validateProfileData.test', () => {

    test('success validate', async () => {
        const result = validateProfileData(profileData)

        expect(result).toEqual([]);
    });

    test('error username', async () => {
        const result = validateProfileData(
            {
                ...profileData,
                username: ''
            }
        );

        expect(result).toEqual([ValidateProfileDataError.INCORRECT_USERNAME]);
    });

    test('error user data', async () => {
        const result = validateProfileData(
            {...profileData,
                firstname: '',
                lastname: '',
            }
        );

        expect(result).toEqual([ValidateProfileDataError.INCORRECT_USER_DATA]);
    });

    test('error age', async () => {
        const result = validateProfileData(
            {
                ...profileData,
                age: NaN,
            }
        );

        expect(result).toEqual([ValidateProfileDataError.INCORRECT_AGE]);
    });

    test('error regional data', async () => {
        const result = validateProfileData(
            {
                ...profileData,
                city: '',
                country: undefined,
                currency: undefined,
            }
        );

        expect(result).toEqual([ValidateProfileDataError.INCORRECT_REGIONAL_DATA]);
    });

    test('error all', async () => {
        const result = validateProfileData(
            {
                ...profileData,
                username: '',
                firstname: '',
                lastname: '',
                age: NaN,
                city: '',
                country: undefined,
                currency: undefined,
            }
        );

        expect(result).toEqual([
            ValidateProfileDataError.INCORRECT_USERNAME,
            ValidateProfileDataError.INCORRECT_USER_DATA,
            ValidateProfileDataError.INCORRECT_AGE,
            ValidateProfileDataError.INCORRECT_REGIONAL_DATA
        ]);
    });

    test('error no data', async () => {
        const result = validateProfileData();

        expect(result).toEqual([ValidateProfileDataError.NO_DATA]);
    });

})