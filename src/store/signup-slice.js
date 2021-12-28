import { createSlice } from '@reduxjs/toolkit';

const signupSlice = createSlice({
    name: 'signup',
    initialState: {
        name: null,
        email: null,
        password: null
    },
    reducers: {
        saveSignup(state, action) {
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.password = action.payload.password;
        }
    }
});

export const signupActions = signupSlice.actions;

export default signupSlice;