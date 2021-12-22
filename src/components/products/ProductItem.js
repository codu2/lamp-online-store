import React from 'react';
import { useDispatch } from 'react-redux';

import classes from './ProductItem.module.css';
import { cartActions } from '../../store/cart-slice';

const ProductItem = props => {
   const dispatch = useDispatch();

    const { id, name, price, color, img } = props;

    const addItemToCartHandler = () => {
        dispatch(cartActions.addItemToCart({
            id,
            name,
            price,
            color,
            img
        }))
    };
   
   return (
    <div className={classes['product-item']}>
        <img src={img} alt="lamp" />
        <div className={classes['product-box']}>
            <div className={classes.name}>{name}</div>
            <div className={classes['product-info']}>
                <span>{color}</span>
                <span>{`$${price.toFixed(2)}`}</span>
            </div>
            <button className={classes['add-button']} onClick={addItemToCartHandler}>
                Add to Cart
            </button>
        </div>
    </div>
   )
};

export default ProductItem;
