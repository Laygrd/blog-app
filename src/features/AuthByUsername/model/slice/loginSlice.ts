import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { LoginSchema } from '../types/LoginSchema';
import { loginByUsername } from '../services/loginByUsername';

const initialState: LoginSchema = {
    username: '',
    password: '',
    isLoading: false,
}

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginByUsername.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(loginByUsername.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(loginByUsername.fulfilled, (state) => {
                state.isLoading = false;
            })
    },
})

export const { actions: loginActions } = loginSlice;
export const { reducer: loginReducer } = loginSlice;