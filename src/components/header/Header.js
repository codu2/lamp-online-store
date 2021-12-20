import React from 'react';
import { useSelector } from 'react-redux';

import classes from './Header.module.css';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { RiLoginBoxLine } from 'react-icons/ri';

const Header = () => {
    const cartTotalQuantity = useSelector(state => state.cart.totalQuantity);

    return (
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
                <div className={classes.cart}>
                    <AiOutlineShoppingCart />
                    <span>Cart</span>
                    <span>{cartTotalQuantity}</span>
                </div>
                <div className={classes.login}>
                    <span>Login</span>
                    <RiLoginBoxLine />
                </div>
            </div>
        </div>
    )
};

export default Header;