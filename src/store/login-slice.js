import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
    name: 'login',
    initialState: {
        name: null,
        email: null,
        password: null
    },
    reducers: {
        saveLogin(state, action) {
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.password = action.payload.password;
        }
    }
});

export const loginActions = loginSlice.actions;

export default loginSlice;