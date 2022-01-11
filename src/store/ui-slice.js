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
        loggingIn: false,
        productDetail: {
            id: null,
            name: null,
            price: null,
            color: null,
            img: null,
            quantity: 1
        },
        products: {},
        reviews: {},
        isLoading: false
    },
    reducers: {
        changeLoadingState(state, action) {
            state.isLoading = action.payload;
        },
        getReviews(state, action) {
            state.reviews = action.payload;
        },
        getProducts(state, action) {
            state.products = action.payload;
        },
        replaceProductDetail(state, action) {
            state.productDetail.id = action.payload.id;
            state.productDetail.name = action.payload.name;
            state.productDetail.price = action.payload.price;
            state.productDetail.color = action.payload.color;
            state.productDetail.img = action.payload.img;
        },
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
