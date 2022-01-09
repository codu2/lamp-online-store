import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';

import './App.css';
import Layout from './components/header/Layout';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductPage from './pages/ProductPage';
import NotFound from './pages/NotFound';
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
      <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Navigate replace to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/products" element={<Products />}>
              <Route path=":productId" element={<ProductPage />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
};

export default App;
