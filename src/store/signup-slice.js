import { createSlice } from '@reduxjs/toolkit';

const signupSlice = createSlice({
    name: 'signup',
    initialState: {
       input: {
            name: null,
            email: null,
            password: null
        },
        valid: {
            nameIsValid: true,
            emailIsValid: true,
            passwordIsValid: true,
            formIsValid: false
        },
        touched: {
            name: false,
            email: false,
            password: false
        },
        exist: {
            name: false,
            email: false, 
            password: false 
        },
        users: []
    },
    reducers: {
        existingEmail(state, action) {
            state.exist.email = action.payload;
        },
        existingUser(state, action) {
            state.exist.name = action.payload;
        },
        replaceUsers(state, action) {
            state.users = action.payload;
        },
        saveSignup(state, action) {
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.password = action.payload.password;
        },
        touchedName(state, action) {
            state.touched.name = action.payload;
        },
        touchedEmail(state, action) {
            state.touched.email = action.payload;
        },
        touchedPassword(state, action) {
            state.touched.password = action.payload;
        },
        nameFormIsValid(state, action) {
            const isEmpty = value => value.trim() === '';

            if(isEmpty(action.payload)) {
                state.valid.nameIsValid = false;
            } else {
                state.valid.nameIsValid = true;
            };
        },
        emailFormIsValid(state, action) {
            const emailCheck = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

            if(!emailCheck.test(action.payload)) {
                state.valid.emailIsValid = false;
            } else {
                state.valid.emailIsValid = true;
            };
        },
        passwordFormIsValid(state, action) {
            const passwordCheck = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*$?&]{8,16}$/;

            if(!passwordCheck.test(action.payload)) {
                state.valid.passwordIsValid = false;
            } else {
                state.valid.passwordIsValid = true;
            };
        },
        signupFormIsValid(state) {
            state.valid.formIsValid = state.valid.nameIsValid && state.valid.emailIsValid && state.valid.passwordIsValid;
        }
    }
});

export const signupActions = signupSlice.actions;

export default signupSlice;
