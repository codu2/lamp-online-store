import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import classes from './Cart.module.css';
import CartItem from './CartItem';
import AuthContext from '../../store/auth-context';

const Cart = props => {
   const navigate = useNavigate();
    const authCtx = useContext(AuthContext);
    const cartItems = useSelector(state => state.cart.items);

    const showOrderFormHandler = () => {
        if(authCtx.isLoggedIn) {
            navigate('/order');
        } else {
            navigate('/user');
        };
    };

    const CartList = (
        <React.Fragment>
            <ul className={classes['cart-item-list']}>
                {cartItems.map(item => (
                    <CartItem key={item.id} item={{id: item.id, name: item.name, price: item.price, color: item.color, img: item.img, quantity: item.quantity, totalPrice: item.totalPrice}} />
                ))}
            </ul>
            <div className={classes.action}>
                <button className={classes['order-button']} onClick={showOrderFormHandler}>Order</button>    
            </div>
        </React.Fragment>
    );

    return (
        <React.Fragment>
            <div className={classes.cart}>
                <h1>Your Cart</h1>
                {cartItems.length !== 0 ? CartList : <p>Empty Cart!</p>}
            </div>
        </React.Fragment>    
    )
};

export default Cart;
