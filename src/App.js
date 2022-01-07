import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';

import './App.css';
import Header from './components/header/Header';
import Main from './components/main/Main';
import Products from './components/products/Products';
import { fetchCartData, sendCartData, fetchUsersData, fetchLoginData } from './store/cart-action';

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  
  useEffect(() => {
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
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Navigate replace to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </main>
    </div>
  )
};

export default App;
