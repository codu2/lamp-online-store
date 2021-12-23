import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        phoneNumber: null,
        street: null,
        postalCode: null,
        city: null
    },
    reducers: {
        saveOrder(state, action) {
            state.phoneNumber = action.payload.phoneNumber;
            state.street = action.payload.street;
            state.postalCode = action.payload.postalCode;
            state.city = action.payload.city;
        }
    }
});

export const orderActions = orderSlice.actions;

export default orderSlice;
