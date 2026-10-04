import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkAPIOptions } from "app/providers/StoreProvider";
import type { Profile } from "entities/Profile";
import { ValidateProfileDataError } from "../../consts/consts";


export interface FetchProfileDataProps {};

export const fetchProfileData = 
createAsyncThunk<
    Profile,
    string,
    ThunkAPIOptions<string>
>(
    'profile/fetchProfileData',
    async (profileId, ThunkAPI) => {
        const { extra, rejectWithValue} = ThunkAPI;

        try {
            const response = await extra.api?.get<Profile>(`/profiles/${profileId}`);
            if (!response?.data) {
                throw new Error();
            };
            return response.data;

        } catch (error) {
            return rejectWithValue(ValidateProfileDataError.SERVER_ERROR);
        }
    }
)