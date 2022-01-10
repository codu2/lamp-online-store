import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import classes from './ProductItem.module.css';
import { cartActions } from '../../store/cart-slice';
import { uiActions } from '../../store/ui-slice';

const ProductItem = props => {
   const dispatch = useDispatch();
   const products = useSelector(state => state.ui.products);

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
   
   const productClickHandler = () => {
        for(const key in products) {
            if(key === id) {
                dispatch(uiActions.replaceProductDetail({
                    id: products[key].id,
                    name: products[key].name,
                    price: products[key].price,
                    color: products[key].color,
                    img: products[key].img
                }));
            };
        };
    };
   
   return (
    <div className={classes['product-item']}>
        <img src={img} alt="lamp" />
        <div className={classes['product-box']}>
            <div className={classes.name} onClick={productClickHandler}>
                <Link to={`/products/${name.replace(/(\s*)/g, "")}`} replace={true}>{name}</Link>
            </div>
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
