import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

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
        name: 'Anywhere Lamp1',
        price: 40.29,
        img: 'img/lamp3.jpg',
        color: 'Orange&Silver'
    },
    {
        id: 'p4',
        name: 'Anywhere Lamp2',
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

const ProductList = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const queryParams = searchParams.get('sort');

    const isSortingWall = queryParams === 'wall';

    const sortProductsList = (products) => {
        const wallLamps = products.filter(product => product.sort === 'wall');
        const tableLamps = products.filter(product => product.sort === 'table');
        return isSortingWall ? wallLamps : tableLamps;
    };

    const sortedProducts = sortProductsList(DUMMY_PRODUCTS);
    
    const changeAllHandler = () => {
        navigate('/products');
    };

    const changewallHandler = () => {
        navigate('/products?sort=wall');
    };

    const changetableHandler = () => {
        navigate('/products?sort=table');
    };
    
    const sortList = (
        sortedProducts.map(product => (
            <ProductItem key={product.id} id={product.id} name={product.name} price={product.price} color={product.color} img={product.img} />
        ))
    );

    const allList = (
        DUMMY_PRODUCTS.map(product => (
            <ProductItem key={product.id} id={product.id} name={product.name} price={product.price} color={product.color} img={product.img} />
        ))
    );

    return (
        <div className={classes['products']}>
            <h1>Products</h1>
            <div className={classes.sorting}>
                <span>Sort</span>
                <button onClick={changeAllHandler}>All</button>
                <button onClick={changewallHandler}>Wall Lamps</button>
                <button onClick={changetableHandler}>Table Lamps</button>
            </div>
            <ul className={classes['products-list']}>
                {queryParams ? sortList : allList}
            </ul>
        </div>
    )
};

export default ProductList;
