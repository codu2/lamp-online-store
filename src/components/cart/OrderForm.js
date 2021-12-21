import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';

import classes from './OrderForm.module.css';
import { FaLongArrowAltLeft } from 'react-icons/fa';
import { uiActions } from '../../store/ui-slice';
import { orderActions } from "../../store/order-slice";
import { sendOrderData } from '../../store/cart-action';

const OrderForm = () => {
    const dispatch = useDispatch();

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalCodeInputRef = useRef();
    const cityInputRef = useRef();

    const submitHandler = event => {
        event.preventDefault();

        const nameInputValue = nameInputRef.current.value;
        const streetInputValue = streetInputRef.current.value;
        const postalCodeInputValue = postalCodeInputRef.current.value;
        const cityInputValue = cityInputRef.current.value;

        dispatch(orderActions.saveOrder({
            name: nameInputValue,
            street: streetInputValue,
            postalCode: postalCodeInputValue,
            city: cityInputValue
        }));

        dispatch(sendOrderData({
            name: nameInputValue,
            street: streetInputValue,
            postalCode: postalCodeInputValue,
            city: cityInputValue
        }));
    };

    const movePrevPageHandler = () => {
        dispatch(uiActions.closeOrderFrom());
    };

    return (
        <form className={classes['order-form']} onSubmit={submitHandler}>
            <h1>My Order</h1>
            <div className={classes['form-box']}>
                <div className={classes['input-box']}>
                    <label htmlFor='name'>Name</label>
                    <input type='text' id="name" autoComplete='off' ref={nameInputRef} />
                </div>
                <div className={classes['input-box']}>
                    <label htmlFor='street'>Street</label>
                    <input type='text' id="street"  autoComplete='off' ref={streetInputRef} />
                </div>
                <div className={classes['input-box']}>
                    <label htmlFor='postal'>Postal Code</label>
                    <input type='text' id="postal"  autoComplete='off' ref={postalCodeInputRef} />
                </div>
                <div className={classes['input-box']}>
                    <label htmlFor='city'>City</label>
                    <input type='text' id="city"  autoComplete='off' ref={cityInputRef} />
                </div>
            </div>
            <div className={classes.actions}>
                <button className={classes['prev-button']} onClick={movePrevPageHandler}>
                    <FaLongArrowAltLeft />
                </button>
                <button className={classes['order-button']}>Done</button>
            </div>
        </form>
    )
};

export default OrderForm;
