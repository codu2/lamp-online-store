import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        notification: null,
        formControl: {
            user: false,
            cart: false
        },
        isOrderFormVisible: false,
        loggingIn: false
    },
    reducers: {
        toggleLoggingIn(state, action) {
            state.loggingIn = action.payload;
        },
        showRequestResult(state, action) {
            state.notification = {
                status: action.payload.status,
                title: action.payload.title,
                message: action.payload.message
            }
        },
        toggleUserForm(state, action) {
            state.formControl.user = action.payload;
        },
        toggleCart(state) {
            state.formControl.cart = !state.formControl.cart;
        },
        closeUserForm(state) {
            state.formControl.user = false;
        },
        closeCartForm(state) {
            state.formControl.cart = false;
        },
        showOrderForm(state) {
            state.isOrderFormVisible = true;
        },
        closeOrderFrom(state) {
            state.isOrderFormVisible = false;
        }
    }
});

export const uiActions = uiSlice.actions;

export default uiSlice;
