import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";
import { signupActions } from "./signup-slice";
import { loginActions } from "./login-slice";

const httpURL = 'YOUR FIREBASE URL';

export const fetchReviewData = (productId) => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch(`${httpURL}/review/${productId}.json`);

            if(!response.ok) {
                throw new Error ('Fetching review data failed!');
            };

            const data = response.json();

            return data;
        };

        try {
            const reviews = await fetchData();

            dispatch(uiActions.getReviews(reviews));
            console.log(reviews)
        } catch (error) {
            console.log(error);
        };
    };
};

export const sendReviewData = (review, productId) => {
    return async (dispatch) => {
        const sendRequest = async () => {
            const response = await fetch(`${httpURL}/review/${productId}.json`, {
                method: "POST",
                body: JSON.stringify({
                    id: Math.floor(Math.random() * 10),
                    name: review.name,
                    scope: review.scope,
                    text: review.text
                })
            });

            if(!response.ok) {
                throw new Error ('Sending review data failed!');
            };
        };

        try {
            dispatch(uiActions.changeLoadingState(true));
            await sendRequest();

            dispatch(uiActions.changeLoadingState(false));
        } catch (error) {
            console.log(error);
        };
    };
};

export const fetchProductsData = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch(`${httpURL}/products.json`);
        
            if(!response.ok) {
                throw new Error ('Fetching products data failed!');
            };

            const data = await response.json();

            return data;
        }

        try {
            const products = await fetchData();

            dispatch(uiActions.getProducts(products));
        } catch (error) {
            console.log(error)
        };
    };
};

export const fetchLoginData = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch(`${httpURL}/user.json`);

            if(!response.ok) {
                throw new Error ('Fetching login data failed!');
            };

            const data = await response.json();

            return data;
        };

        try {
            const loginData = await fetchData();

            if(loginData) {
                dispatch(uiActions.toggleLoggingIn(true));
            };
            
            dispatch(loginActions.replaceLogin({
                email: loginData.email || null,
                password: loginData.password || null
            }));
        } catch (error) {
            console.log(error);
        };
    };
};

export const fetchUsersData = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch(`${httpURL}/users.json`);

            if(!response.ok) {
                throw new Error ('Fetching users data failed!');
            };

            const data = response.json();

            return data;
        };

        try {
            const users = await fetchData();

            dispatch(signupActions.replaceUsers(users));
        } catch (error) {   
            console.log(error)
        };
    };
};

export const signupRequest = user => {
    return async () => {
        const sendRequest = async () => {
            const response = await fetch(`${httpURL}/users.json`, {
                method: 'POST',
                body: JSON.stringify({
                    name: user.name,
                    email: user.email,
                    password: user.password
                })
            });
            
            if(!response.ok) {
                throw new Error ('Error');
            };
        };

        try {
            await sendRequest();
        } catch (error) {
            console.log(error);
        };
    };
};


export const sendUserData = user => {
    return async (dispatch) => {
        const sendRequest = async () => {
            const response = await fetch(`${httpURL}/user.json`, {
                method: 'PUT',
                body: JSON.stringify({
                    email: user.email,
                    password: user.password
                })
            });

            if(!response.ok) {
                throw new Error ('Sending user data failed.');
            };
        };

        try {
            await sendRequest();
        } catch(error) {
            console.log(error);
        };
    };
};

export const fetchCartData = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch(`${httpURL}/cart.json`);

            if(!response.ok) {
                throw new Error ('Could not fetch cart data!');
            }

            const data = await response.json();

            return data;
        };

        try {
            const cartData = await fetchData();

            dispatch(cartActions.replaceCart({
                items: cartData.items || [],
                totalQuantity: cartData.totalQuantity
            }))
        } catch(error) {
            dispatch(uiActions.showRequestResult({
                status: 'error',
                title: 'Error',
                message: 'Fetching cart data failed. Please reloading page.'
            }));
        };
    };
};

export const sendOrderData = order => {
    return async (dispatch) => {
        const sendRequest = async () => {
            dispatch(uiActions.showRequestResult({
                status: 'loading',
                title: 'Loading...',
                massage: 'Sending order data...'
            }));

            const response = await fetch(`${httpURL}/order.json`, {
                method: "PUT",
                body: JSON.stringify({
                    name: order.name,
                    street: order.street,
                    postalCode: order.postalCode,
                    city: order.city
                })
            });

            if(!response.ok) {
                throw new Error ('Sending order data failed.')
            };
        };

        try {
            await sendRequest();

            dispatch(uiActions.showRequestResult({
                status: 'success',
                title: 'Success!',
                message: 'Sending order data successfully!'
            }));
        } catch (error) {
            dispatch(uiActions.showRequestResult({
                status: 'error',
                title: 'Error',
                message: 'Sending order data failed.'
            }));
        };
    };
};

export const sendCartData = cart => {
    return async (dispatch) => {
        const sendRequest = async () => {
            const response = await fetch(`${httpURL}/cart.json`, {
                method: 'PUT',
                body: JSON.stringify({
                    items: cart.items,
                    totalQuantity: cart.totalQuantity
                })
            });

            if(!response.ok) {
                throw new Error ('Sending cart data failed.');
            };
        };

        try {
            await sendRequest();
        } catch (error) {
            dispatch(uiActions.showRequestResult({
                status: 'error',
                title: 'Error',
                message: 'Sending cart data failed.'
            }));
        };
    };
} ;
