import { configureStore } from "@reduxjs/toolkit";

import cartSlice from "./cart-slice";
import uiSlice from "./ui-slice";
import orderSlice from "./order-slice";
import inputSlice from "./input-slice";
import loginSlice from "./login-slice";
import signupSlice from './signup-slice';

const store = configureStore({
    reducer: {
        cart: cartSlice.reducer,
        ui: uiSlice.reducer,
        order: orderSlice.reducer,
        input: inputSlice.reducer,
        login: loginSlice.reducer,
        signup: signupSlice.reducer
    }
});

export default store;
