import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

export const fetchCartData = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch('YOUR FIREBASE URL/cart.json');

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
                message: 'Fetching cart data failed.'
            }));
        }
    }
}

export const sendOrderData = order => {
    return async (dispatch) => {
        const sendRequest = async () => {
            dispatch(uiActions.showRequestResult({
                status: 'loading',
                title: 'Loading...',
                massage: 'Sending order data...'
            }));

            const response = await fetch('YOUR FIREBASE URL/users.json', {
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
        }

    }
}

export const sendCartData = cart => {
    return async (dispatch) => {
        const sendRequest = async () => {
            const response = await fetch('YOUR FIREBASE URL/cart.json', {
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
        }
    }
} 
