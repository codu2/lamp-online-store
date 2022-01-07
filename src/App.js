import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';

import './App.css';
import Header from './components/header/Header';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductPage from './pages/ProductPage';
import { fetchCartData, sendCartData, fetchUsersData, fetchLoginData, fetchProductsData } from './store/cart-action';

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  
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
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Navigate replace to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:productId" element={<ProductPage />} />
        </Routes>
      </main>
    </div>
  )
};

export default App;
