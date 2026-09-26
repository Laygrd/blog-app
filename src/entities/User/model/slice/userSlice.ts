import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User, UserSchema } from '../types/UserSchema';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localStorage';


const initialState: UserSchema = {
    _inited: false
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuthData: (state, action: PayloadAction<User>) => {
            state.authData = action.payload;
        },
        // token imitation
        initAuthData: (state) => {
            const user = localStorage.getItem(USER_LOCALSTORAGE_KEY);
            if (user) {
                state.authData = JSON.parse(user);
            }
            state._inited = true;
        }, 
        // logout imitation
        clearAuthData: (state) => {
            localStorage.removeItem(USER_LOCALSTORAGE_KEY);
            state.authData = undefined;

            // fix later
            // manually delete aut-header from api config after logout
            // $api.defaults.headers = {
            //     ...$api.defaults.headers,
            //     // @ts-ignore
            //     authorization: ''
            // }
            // // fix later
        }
    },
})

// Action creators are generated for each case reducer function
export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;