import React, { useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import './App.css';
import Layout from './components/header/Layout';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductPage from './pages/ProductPage';
import NotFound from './pages/NotFound';
import { fetchCartData, sendCartData, fetchUsersData, fetchLoginData, fetchProductsData } from './store/cart-action';
import UserArea from './components/user/UserArea';
import Profile from './components/user/Profile';
import AuthContext from './store/auth-context';
import CartPage from './components/cart/CartPage';
import OrderForm from './components/cart/OrderForm';

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const authCtx = useContext(AuthContext);
  const location = useLocation();
  
  useEffect(() => {
    dispatch(fetchProductsData());
    dispatch(fetchCartData());
    dispatch(fetchUsersData());
    dispatch(fetchLoginData());
  }, [dispatch])

  useEffect(() => {
    if(isInitial) {
      isInitial = false;
      return;
    }

    if(cart.changed) {
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch])
  
  return (
    <div className='container'>
      <TransitionGroup>
        <CSSTransition key={location.pathname} timeout={300} classNames="fade">
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate replace to="/home" />} />
              <Route path="/home" element={<Home />} />
              <Route path="/products" element={<Products />}>
                <Route path=":productId" element={<ProductPage />} />
              </Route>
              {!authCtx.isLoggedIn && <Route path="/user" element={<UserArea />} />}
              {authCtx.isLoggedIn && <Route path="/profile" element={<Profile />} />}
              {!authCtx.isLoggedIn && <Route path="/profile" element={<Navigate replace to="/user" />} />}
              <Route path="/cart" element={<CartPage />} />
              {authCtx.isLoggedIn && <Route path="/order" element={<OrderForm />} />}
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
    </div>
  )
};

export default App;
