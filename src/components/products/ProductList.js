import React from 'react';

import classes from './ProductList.module.css';
import ProductItem from './ProductItem';

const DUMMY_PRODUCTS = [
    {
        id: 'p1',
        name: 'Wall Lamp',
        price: 50.07,
        img: 'img/lamp1.jpg',
        color: 'Green'
    },
    {
        id: 'p2',
        name: 'table Lamp',
        price: 30.69,
        img: 'img/lamp2.jpg',
        color: 'Yellow'
    },
    {
        id: 'p3',
        name: 'Anywhere Lamp',
        price: 40.29,
        img: 'img/lamp3.jpg',
        color: 'Orange&Silver'
    },
    {
        id: 'p4',
        name: 'Anywhere Lamp',
        price: 40.29,
        img: 'img/lamp4.jpg',
        color: 'white&Black'
    },
    {
        id: 'p5',
        name: 'Vintage Lamp',
        price: 40.85,
        img: 'img/lamp5.jpg',
        color: 'white&Black'
    },
]

const productsList = (
    <ul className={classes['products-list']}>
        {DUMMY_PRODUCTS.map(product => (
            <ProductItem key={product.id} id={product.id} name={product.name} price={product.price} color={product.color} img={product.img} />
        ))}
    </ul>
)

const ProductList = () => {
    return (
        <div className={classes['products']}>
            <h1>Products</h1>
            {productsList}
        </div>
    )
};

export default ProductList;
