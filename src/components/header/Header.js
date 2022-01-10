import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import classes from './Header.module.css';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { RiLoginBoxLine } from 'react-icons/ri';
import User from '../user/User';
import Cart from '../cart/Cart';
import { uiActions } from '../../store/ui-slice';
import { RiUserSmileLine } from 'react-icons/ri';
import { sendUserData } from '../../store/cart-action';
import { HiOutlineMenu } from 'react-icons/hi';
import Confirm from './Confirm';

const Header = () => {
    const dispatch = useDispatch();
    const cartTotalQuantity = useSelector(state => state.cart.totalQuantity);
    const userControl = useSelector(state => state.ui.formControl.user);
    const cartControl = useSelector(state => state.ui.formControl.cart);
    const loggingIn = useSelector(state => state.ui.loggingIn);
    const users = useSelector(state => state.signup.users);
    const entered = useSelector(state => state.login.input);
    
    const [toggleMenu, setToggleMenu] = useState(false);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    
    const toggleMenuHandler = () => {
        setToggleMenu(prev => !prev)
    };
    
     const logoutHandler = () => {
        dispatch(uiActions.toggleLoggingIn(false));
        dispatch(sendUserData({
            email: null,
            password: null
        }));
        setShowLogoutConfirm(false);
        setTimeout(() => window.location.replace("/"), 1000)
    };

    const toggleLoginHandler = () => {
        if(loggingIn) {
            dispatch(uiActions.toggleUserForm(false));
            setShowLogoutConfirm(true);
        } else {
            dispatch(uiActions.toggleUserForm(true));
        };
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
    
    let usersName;

    for(const key in users) {
        if(users[key].email === entered.email) {
            if(users[key].password === entered.password) {
                usersName = users[key].name
                break;
            };
        };
    };
    
    const userUi = loggingIn ? 'Logout' : 'Login';
    
    const profile = (
        <div className={classes.profile}>
            <RiUserSmileLine />
            <span>{usersName}</span>
        </div>
    );

    const showProfile = loggingIn ? profile : null;

    const menuClasses = `${classes.menu} ${toggleMenu ? classes.active : ''}`;

    const activeStyle = {
        color: 'olive',
        fontWeight: 600
    };

    return (
        <React.Fragment>
            <div className={classes.header}>
                <div className={classes.toggle} onClick={toggleMenuHandler}>
                    <HiOutlineMenu />
                </div>
                <div className={classes.logo}>
                    <p>lumière</p>
                </div>
                <ul className={classes.menu}>
                    <li><NavLink style={({isActive}) => isActive ? activeStyle : undefined} to="/home">Home</NavLink></li>
                    <li><NavLink style={({isActive}) => isActive ? activeStyle : undefined} to="/products">Products</NavLink></li>
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
                    {showProfile}
                    <div className={classes.login} onClick={toggleLoginHandler}>
                        <span>{userUi}</span>
                        <RiLoginBoxLine />
                    </div>
                </div>
            </div>
            {userControl && <User onClose={closeLoginHanlder} />}
            {cartTotalQuantity !== 0  && cartControl && <Cart onClose={closeCartHandler} />}
            {showLogoutConfirm && <Confirm onLogout={logoutHandler} username={usersName}/>}
        </React.Fragment>
    )
};

export default Header;
