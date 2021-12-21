import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        name: null,
        street: null,
        postalCode: null,
        city: null
    },
    reducers: {
        saveOrder(state, action) {
            state.name = action.payload.name;
            state.street = action.payload.street;
            state.postalCode = action.payload.postalCode;
            state.city = action.payload.city;
        }
    }
});

export const orderActions = orderSlice.actions;

export default orderSlice;