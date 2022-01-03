import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
    name: 'login',
    initialState: {
       input: {
            email: null,
            password: null
        },
        exist: {
            name: false,
            email: true, // login을 위해 초기 설정을 false가 아닌 true로 함
            password: true // login 시 검증을 위해 true로 설정
        },
    },
    reducers: {
        replaceLogin(state, action) {
            state.input.email = action.payload.email;
            state.input.password = action.payload.password;
        },
        saveLogin(state, action) {
            state.email = action.payload.email;
            state.password = action.payload.password;
        },
        matchingPassword(state, action) {
            state.exist.password = action.payload;
        },
        existingEmail(state, action) {
            state.exist.email = action.payload;
        }
    }
});

export const loginActions = loginSlice.actions;

export default loginSlice;
