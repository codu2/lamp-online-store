import React from 'react';

import classes from './ProductItem.module.css';

const ProductItem = props => {
   return (
    <div className={classes['product-item']}>
        <img src={props.img} alt="lamp" />
        <div className={classes['product-box']}>
            <div className={classes.name}>{props.name}</div>
            <div className={classes['product-info']}>
                <span>{props.color}</span>
                <span>{`$${props.price}`}</span>
            </div>
            <button className={classes['add-button']}>
                Add to Cart
            </button>
        </div>
    </div>
   )
};

export default ProductItem;