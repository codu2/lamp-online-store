import React from 'react';
import { Outlet } from 'react-router-dom';

import ProductList from '../components/products/ProductList';

const Products = () => {
    return (
        <section>
            <Outlet />
            <ProductList />
        </section>
    )
};

export default Products;
