import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import classes from './Header.module.css';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { RiLoginBoxLine } from 'react-icons/ri';
import User from '../user/User';
import Cart from '../cart/Cart';
import { uiActions } from '../../store/ui-slice';

const Header = () => {
    const dispatch = useDispatch();
    const cartTotalQuantity = useSelector(state => state.cart.totalQuantity);
    const userControl = useSelector(state => state.ui.formControl.user);
    const cartControl = useSelector(state => state.ui.formControl.cart);

    const toggleLoginHandler = () => {
        dispatch(uiActions.toggleUserForm());
    };

    const closeLoginHanlder = () => {
        dispatch(uiActions.closeUserForm());
    };

    const toggleCartHandler = () => {
        dispatch(uiActions.toggleCart());
    };

    const closeCartHandler = () => {
        dispatch(uiActions.closeCartForm());
    };

    return (
        <React.Fragment>
            <div className={classes.header}>
                <div className={classes.logo}>
                    <p>lumière</p>
                </div>
                <ul className={classes.menu}>
                    <li>Home</li>
                    <li>Products</li>
                    <li>Features</li>
                    <li>Packaging</li>
                    <li>Sale</li>
                </ul>
                <div className={classes.actions}>
                    <div className={classes.cart} onClick={toggleCartHandler}>
                        <AiOutlineShoppingCart />
                        <span>Cart</span>
                        <span>{cartTotalQuantity}</span>
                    </div>
                    <div className={classes.login} onClick={toggleLoginHandler}>
                        <span>Login</span>
                        <RiLoginBoxLine />
                    </div>
                </div>
            </div>
            {userControl && <User onClose={closeLoginHanlder} />}
            {cartTotalQuantity !== 0  && cartControl && <Cart onClose={closeCartHandler} />}
        </React.Fragment>
    )
};

export default Header;
