import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import classes from './Cart.module.css';
import CartItem from './CartItem';
import { uiActions } from '../../store/ui-slice';
import OrderForm from './OrderForm';
import Notification from './Notification';

const Backdrop = props => {
    return <div className={classes.backdrop} onClick={props.onClose} />
  }

const Cart = props => {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);
    const notification = useSelector(state => state.ui.notification);
    const isOrderFormVisible = useSelector(state => state.ui.isOrderFormVisible);

    const showOrderFormHandler = () => {
        dispatch(uiActions.showOrderForm());
    };

    const CartList = () => {
        return (
            <React.Fragment>
                <h1>Your Cart</h1>
                <ul className={classes['cart-item-list']}>
                    {cartItems.map(item => (
                        <CartItem key={item.id} item={{id: item.id, name: item.name, price: item.price, color: item.color, img: item.img, quantity: item.quantity, totalPrice: item.totalPrice}} />
                    ))}
                </ul>
                <button className={classes['order-button']} onClick={showOrderFormHandler}>Order</button>    
            </React.Fragment>
        )
    };

    //<Notification status={notification.status} title={notification.title} message={notification.message} />

    return (
        <React.Fragment>
            <Backdrop onClose={props.onClose} />
            <div className={classes.cart}>
                {!isOrderFormVisible && <CartList />}
                {isOrderFormVisible && !notification && <OrderForm />}
                {isOrderFormVisible && notification && <Notification status={notification.status} title={notification.title} message={notification.message} />}
            </div>
        </React.Fragment>
    )
};

export default Cart;