import React, { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useNavigate, Link } from 'react-router-dom';

import classes from './MainNavigation.module.css';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { RiLoginBoxLine } from 'react-icons/ri';
import { HiOutlineMenu } from 'react-icons/hi';
import { BiUserCircle } from 'react-icons/bi';
import AuthContext from '../../store/auth-context';

const MainNavigation = () => {
    const navigate = useNavigate();
    const authCtx = useContext(AuthContext);
    const cartTotalQuantity = useSelector(state => state.cart.totalQuantity);
    
    const [toggleMenu, setToggleMenu] = useState(false);

    const toggleMenuHandler = () => {
        setToggleMenu(prev => !prev)
    };

    const menuActiveHandler = () => {
        setToggleMenu(prev => !prev)
    };

    const menuClasses = `${classes.menu} ${toggleMenu ? classes.active : ''}`;

    const activeStyle = {
        color: 'olive',
        fontWeight: 600
    };

    const loginHandler = () => {
        if(!authCtx.isLoggedIn) {
            navigate('/user');   
        } 
    }

    const logoutHandler = () => {
        if(authCtx.isLoggedIn) {
            authCtx.logout();
            navigate('/home');
        }
    }

    const profileHandler = () => {
        navigate('/profile');
    }

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
                    <li onClick={menuActiveHandler}><NavLink style={({isActive}) => isActive ? activeStyle : undefined} to="/home">Home</NavLink></li>
                    <li onClick={menuActiveHandler}><NavLink style={({isActive}) => isActive ? activeStyle : undefined} to="/products">Products</NavLink></li>
                    <li>Features</li>
                    <li>Packaging</li>
                    <li>Sale</li>
                </ul>
                <div className={classes.actions}>
                    <Link to="/cart">
                        <div className={classes.cart}>
                            <AiOutlineShoppingCart />
                            <span>Cart</span>
                            <span>{cartTotalQuantity}</span>
                        </div>
                    </Link>
                    {authCtx.isLoggedIn && (
                        <div onClick={profileHandler}>
                            <BiUserCircle />
                            <span>Profile</span>
                        </div>
                    )}
                    {!authCtx.isLoggedIn && (
                        <div onClick={loginHandler}>
                            <span>Login</span>
                            <RiLoginBoxLine />
                        </div>
                    )}
                    {authCtx.isLoggedIn && (
                        <div onClick={logoutHandler}>
                            <span>Logout</span>
                            <RiLoginBoxLine />
                        </div>
                    )}
                </div>
            </div>
        </React.Fragment>
    )
};

export default MainNavigation;
