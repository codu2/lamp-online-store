import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import classes from './ProductList.module.css';
import '../../App.css';
import ProductItem from './ProductItem';

const ProductList = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const queryParams = searchParams.get('sort');
    
    const products = useSelector(state => state.ui.products);

    let products_array = [];
    const isSortingWall = queryParams === 'wall';

    for(const key in products) {
        products_array.push(products[key]);
    };

    const sortProductsList = (products) => {
        const wallLamps = products.filter(product => product.sort === 'wall');
        const tableLamps = products.filter(product => product.sort === 'table');
        return isSortingWall ? wallLamps : tableLamps;
    };

    const sortedProducts = sortProductsList(products_array);
    
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
        products_array.map(product => (
            <ProductItem key={product.id} id={product.id} name={product.name} price={product.price} color={product.color} img={product.img} />
        ))
    );

    const allClasses = `${queryParams === null ? classes.active : ''}`;
    const wallClasses = `${queryParams === 'wall' ? classes.active : ''}`;
    const tableClasses = `${queryParams === 'table' ? classes.active : ''}`;

    return (
        <div className={classes['products']}>
            <h1>Products</h1>
                <TransitionGroup>
                    <CSSTransition key={queryParams} timeout={300} classNames="fade">
                        <div className={classes.sorting}>
                            <button onClick={changeAllHandler} className={allClasses}>All</button>
                            <button onClick={changewallHandler} className={wallClasses}>Wall Lamps</button>
                            <button onClick={changetableHandler} className={tableClasses}>Table Lamps</button>
                        </div>
                    </CSSTransition>
                </TransitionGroup>        
            <ul className={classes['products-list']}>
                {queryParams ? sortList : allList}
            </ul>
        </div>
    )
};

export default ProductList;
