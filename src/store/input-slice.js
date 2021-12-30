import { createSlice } from '@reduxjs/toolkit';

const inputSlice = createSlice({
    name: 'input',
    initialState: {
        login: {
            nameIsValid: true, //input은 에러 메시지를 표시해야 하는데 처음부터 에러 메시지를 표시할 수는 없으므로 초기에는 true
            emailIsValid: true,
            passwordIsValid: true,
            formIsValid: false // form의 input 중 하나라도 유효하지 않으면 버튼을 disabled 할 것이므로 false로 지정해줌
        },
        order: {
            phoneNumberIsValid: true,
            streetIsValid: true,
            postalCodeIsValid: true,
            cityIsValid: true,
            formIsValid: false
        },
        touched: {
            name: false,
            email: false,
            password: false,
            phoneNumber: false,
            street: false,
            postalCode: false,
            city: false
        }
    },
    reducers: {
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
                state.login.nameIsValid = false;
            } else {
                state.login.nameIsValid = true;
            };
        },
        emailFormIsValid(state, action) {
            const emailCheck = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

            if(!emailCheck.test(action.payload)) {
                state.login.emailIsValid = false;
            } else {
                state.login.emailIsValid = true;
            };
        },
        passwordFormIsValid(state, action) {
            const passwordCheck = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*$?&]{8,16}$/;

            if(!passwordCheck.test(action.payload)) {
                state.login.passwordIsValid = false;
            } else {
                state.login.passwordIsValid = true;
            };
        },
        loginFormIsValid(state, action) {
            const isEmpty = value => value.trim() === '';

            if(isEmpty(action.payload.enteredName)) {
                state.login.nameIsValid = false;
            } else {
                state.login.nameIsValid = true;
            };

            const emailCheck = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

            if(!emailCheck.test(action.payload.enteredEmail)) {
                state.login.emailIsValid = false;
            } else {
                state.login.emailIsValid = true;
            };

            const passwordCheck = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*$?&]{8,16}$/;

            if(!passwordCheck.test(action.payload.enteredPassword)) {
                state.login.passwordIsValid = false;
            } else {
                state.login.passwordIsValid = true;
            };
        },
        loginInputFormIsValid(state) {
            state.login.formIsValid = state.login.emailIsValid && state.login.passwordIsValid;
        },
        touchedPhoneNumber(state, action) {
            state.touched.phoneNumber = action.payload;
        },
        touchedStreet(state, action) {
            state.touched.street = action.payload;
        },
        touchedPostalCode(state, action) {
            state.touched.postalCode = action.payload;
        },
        touchedCity(state, action) {
            state.touched.city = action.payload;
        },
        phoneNumberFormIsValid(state, action) {
            const isEmpty = value => value.trim() === '';
            const phoneNumberCheck = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;

            if(!phoneNumberCheck.test(action.payload) || isEmpty(action.payload)) {
                state.order.phoneNumberIsValid = false;
            } else {
                state.order.phoneNumberIsValid = true;
            };
        },
        streetFormIsValid(state, action) {
            const isEmpty = value => value.trim() === '';

            if(isEmpty(action.payload)) {
                state.order.streetIsValid = false;
            } else {
                state.order.streetIsValid = true;
            };
        },
        postalCodeFormIsValid(state, action) {
            const isEmpty = value => value.trim() === '';
            const isFiveNum = /^\d{5}$/;

            if(!isFiveNum.test(action.payload)|| isEmpty(action.payload)) {
                state.order.postalCodeIsValid = false;
            } else {
                state.order.postalCodeIsValid = true;
            };
        },
        cityFormIsValid(state, action) {
            const isEmpty = value => value.trim() === '';

            if(isEmpty(action.payload)) {
                state.order.cityIsValid = false;
            } else {
                state.order.cityIsValid = true;
            };  
        },
        orderFormIsValid(state, action) {
            const isEmpty = value => value.trim() === '';

            const phoneNumberCheck = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;

            if(!phoneNumberCheck.test(action.payload.enteredPhoneNumber) || isEmpty(action.payload.enteredPhoneNumber)) {
                state.order.phoneNumberIsValid = false;
            } else {
                state.order.phoneNumberIsValid = true;
            };

            if(isEmpty(action.payload.enteredStreet)) {
                state.order.streetIsValid = false;
            } else {
                state.order.streetIsValid = true;
            };

            const isFiveNum = /^\d{5}$/;

            if(!isFiveNum.test(action.payload.enteredPostalCode) || isEmpty(action.payload.enteredPostalCode)) {
                state.order.postalCodeIsValid = false;
            } else {
                state.order.postalCodeIsValid = true;
            };

            if(isEmpty(action.payload.enteredCity)) {
                state.order.cityIsValid = false;
            } else {
                state.order.cityIsValid = true;
            };    
        },
        orderInputFormIsValid(state) {
            state.order.formIsValid = state.order.phoneNumberIsValid && state.order.streetIsValid && state.order.postalCodeIsValid && state.order.cityIsValid;
        }
    }
});

export const inputActions = inputSlice.actions;

export default inputSlice;
