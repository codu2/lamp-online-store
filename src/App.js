import React from 'react';

import './App.css';
import Header from './components/header/Header';
import Main from './components/main/Main';
import Products from './components/products/Products';
import User from './components/user/User';

function App() {
  return (
    <div className='container'>
      <Header />
      <Main />
      <Products />
      <User />
    </div>
  )
};

export default App;
