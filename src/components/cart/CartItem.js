import React from 'react';
import { useDispatch } from 'react-redux';

import classes from './CartItem.module.css';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { cartActions } from '../../store/cart-slice';

const CartItem = props => {
    const dispatch = useDispatch();

    const { id, name, price, color, img, quantity, totalPrice } = props.item;

    const removeItemFromCartHandler = () => {
        dispatch(cartActions.removeItemFromCart(id));
    };

    const addItemToCartHandler = () => {
        dispatch(cartActions.addItemToCart({
            id,
            name,
            price,
            color,
            img
        }))
    };

    const quantityHandler = event => {
        event.target.value = quantity;
    };

    return (
        <div className={classes['cart-item']}>
            <img src={`../${img}`} alt="cart-item" />
            <div className={classes['item-info']}>
                <div className={classes['item-name']}>
                    {name}
                </div>
                <div className={classes['item-sub-info']}>
                    <span>{color}</span>
                    <span>{`$${totalPrice.toFixed(2)}`}</span>
                </div>
                <div className={classes.actions}>
                    <AiOutlineMinus className={classes.action} onClick={removeItemFromCartHandler} />
                    <input type="text" onChange={quantityHandler} value={quantity}/>
                    <AiOutlinePlus className={classes.action} onClick={addItemToCartHandler} />
                </div>
            </div>
        </div>
    )
};

export default CartItem;
