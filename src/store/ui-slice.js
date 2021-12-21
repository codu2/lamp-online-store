import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        notification: null,
        formControl: {
            user: false,
            cart: false
        },
        isOrderFormVisible: false
    },
    reducers: {
        showRequestResult(state, action) {
            state.notification = {
                status: action.payload.status,
                title: action.payload.title,
                message: action.payload.message
            }
        },
        toggleUserForm(state) {
            state.formControl.user = !state.formControl.user;
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