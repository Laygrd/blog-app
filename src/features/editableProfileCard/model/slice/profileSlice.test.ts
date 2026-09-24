import { Country } from "entities/Country";
import { Currency } from "entities/Currency";
import { Profile } from "entities/Profile";
import { profileActions, profileReducer } from "./profileSlice";
import { fetchProfileData } from "../services/fetchProfileData/fetchProfileData";
import { updateProfileData } from "../services/updateProfileData/updateProfileData";
import { ProfileSchema } from "../types/EditableProfileCardSchema";

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

describe('profileSlice.test', () => {

    // simple reducers
    test('should setReadonly work', () => {
        const state: DeepPartial<ProfileSchema> = {
            readonly: false,
        };
        expect(
            profileReducer(state as ProfileSchema, profileActions.setReadonly(true))
        ).toEqual({ readonly: true})
    });

    test('should cancelEdit work', () => {
        const state: DeepPartial<ProfileSchema> = {
            data: profileData,
            form: { username: '' }
        };
        expect(
            profileReducer(state as ProfileSchema, profileActions.cancelEdit())
        ).toEqual({
            readonly: true,
            validateErrors: undefined,
            data: profileData,
            form: profileData,
        })
    });

    test('should updateFormData work', () => {
        const state: DeepPartial<ProfileSchema> = {
            form: { ...profileData, username: '' }
        };
        expect(
            profileReducer(state as ProfileSchema, profileActions.updateFormData({username: "username1"}))
        ).toEqual({
            form: { ...profileData }
        })
    });
    

    //extra reducers (btw it tested in loginByUsername.test.ts)
    test('should fetchProfileData.pending change isLoading', () => {
        const state: DeepPartial<ProfileSchema> = {
            isLoading: false,
        };
        expect(
            profileReducer(state as ProfileSchema, fetchProfileData.pending)
        ).toEqual({
            error: undefined,
            isLoading: true
        })
    });

    test('should fetchProfileData.fulfilled change state', () => {
        const state: DeepPartial<ProfileSchema> = {
            isLoading: true,
            data: undefined,
            form: undefined,
        };
        expect(
            profileReducer(state as ProfileSchema, fetchProfileData.fulfilled(profileData, '', ''))
        ).toEqual({
            isLoading: false,
            data: profileData,
            form: profileData,
        })
    });

    test('should fetchProfileData.rejected change state', () => { // fix later
        const state: DeepPartial<ProfileSchema> = {
            isLoading: true,
            error: undefined,
        };
        expect(
            profileReducer(
                state as ProfileSchema,
                fetchProfileData.rejected)
        ).toEqual({
            isLoading: false,
            error: undefined,
        })
    });

    test('should updateProfileData.pending change isLoading', () => {
        const state: DeepPartial<ProfileSchema> = {
            isLoading: false,
            validateErrors: [],
        };
        expect(
            profileReducer(state as ProfileSchema, updateProfileData.pending)
        ).toEqual({
            isLoading: true,
            validateErrors: undefined,
        })
    });

    test('should updateProfileData.fullfilled change state', () => {
        const state: DeepPartial<ProfileSchema> = {
            isLoading: true,
            readonly: false,
            data: { ...profileData, username: 'user'},
            form: profileData,
        };
        expect(
            profileReducer(state as ProfileSchema, updateProfileData.fulfilled(profileData, ''))
        ).toEqual({
            isLoading: false,
            readonly: true,
            data: profileData,
            form: profileData,
        })
    });

    test('should updateProfileData.rejected change state', () => {
        const state: DeepPartial<ProfileSchema> = {
            isLoading: true,
            validateErrors: undefined
        };
        expect(
            profileReducer(state as ProfileSchema, updateProfileData.rejected)
        ).toEqual({
            isLoading: false,
            validateErrors: undefined,
        })
    });

});
