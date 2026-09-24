import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkAPIOptions } from "app/providers/StoreProvider";
import { Profile } from 'entities/Profile'
import { getProfileForm } from "../../selectors/getProfileForm/getProfileForm";
import { validateProfileData } from "../validateProfileData/validateProfileData";
import { ValidateProfileDataError } from "../../types/EditableProfileCardSchema";


export const updateProfileData = 
createAsyncThunk<
        Profile,
        void,
        ThunkAPIOptions<ValidateProfileDataError[]>
>(
    'profile/updateProfileData',
    async (_, ThunkAPI) => {
        const { extra, rejectWithValue, getState } = ThunkAPI;
        const formData = getProfileForm(getState());

        const validateErrors = validateProfileData(formData);

        if (validateErrors.length) {
            return rejectWithValue(validateErrors);
        };

        try {
            const response = await extra.api?.put<Profile>(`/profiles/${formData?.id}`, formData);
            if (!response?.data) {
                throw new Error()
            };
            return response.data;

        } catch (error) {
            return rejectWithValue([ValidateProfileDataError.SERVER_ERROR]);
        }
    }
)