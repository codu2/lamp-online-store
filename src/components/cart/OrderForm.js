import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import classes from './OrderForm.module.css';
import { FaLongArrowAltLeft } from 'react-icons/fa';
import { uiActions } from '../../store/ui-slice';
import { orderActions } from "../../store/order-slice";
import { inputActions } from '../../store/input-slice';
import { sendOrderData } from '../../store/cart-action';

const OrderForm = () => {
    const dispatch = useDispatch();
    const order = useSelector(state => state.input.order);
    const beStoredOrder = useSelector(state => state.order);
    const touched = useSelector(state => state.input.touched);

    const phoneNumberInputRef = useRef();
    const streetInputRef = useRef();
    const postalCodeInputRef = useRef();
    const cityInputRef = useRef();

    const submitHandler = event => {
        event.preventDefault();

        const enteredPhoneNumber = phoneNumberInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostalCode = postalCodeInputRef.current.value;
        const enteredCity = cityInputRef.current.value;
        
        dispatch(inputActions.touchedPhoneNumber(true));
        dispatch(inputActions.touchedStreet(true));
        dispatch(inputActions.touchedPostalCode(true));
        dispatch(inputActions.touchedCity(true));

        dispatch(inputActions.orderFormIsValid({
            enteredPhoneNumber,
            enteredStreet,
            enteredPostalCode,
            enteredCity
        }));

        dispatch(orderActions.saveOrder({
            phoneNumber: enteredPhoneNumber,
            street: enteredStreet,
            postalCode: enteredPostalCode,
            city: enteredCity
        }));

        dispatch(inputActions.orderInputFormIsValid());
    };
    
    useEffect(() => {
        if(order.formIsValid) {
            dispatch(inputActions.touchedPhoneNumber(false));
            dispatch(inputActions.touchedStreet(false));
            dispatch(inputActions.touchedPostalCode(false));
            dispatch(inputActions.touchedCity(false));

            dispatch(sendOrderData({
                phoneNumber: beStoredOrder.phoneNumber,
                street: beStoredOrder.street,
                postalCode: beStoredOrder.postalCode,
                city: beStoredOrder.city
            }));  
        };
    }, [beStoredOrder]);

    const movePrevPageHandler = () => {
        dispatch(uiActions.closeOrderFrom());
    };
    
    const isNotEmpty = event => event.target.value.trim() !== '';
    const isFiveNum = /^\d{5}$/;
    const phoneNumberCheck = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;

    const phoneNumberChangedHandler = event => {
        if(phoneNumberCheck.test(event.target.value.trim()) || isNotEmpty){
            dispatch(inputActions.touchedPhoneNumber(false));
        }
    };
    const streetChangedHandler = () => {
        if(isNotEmpty) {
            dispatch(inputActions.touchedStreet(false));
        }
    };
    const postalCodeChangedHandler = event => {
        if(isFiveNum.test(event.target.value.trim()) || isNotEmpty) {
            dispatch(inputActions.touchedPostalCode(false));
        }
    };
    const cityChangedHandler = () => {
        if(isNotEmpty) {
            dispatch(inputActions.touchedCity(false));
        }
    }; 

    const phoneNumberBlurHandler = event => {
        if(!phoneNumberCheck.test(event.target.value.trim())){
            dispatch(inputActions.touchedPhoneNumber(true));
        }
    };
    const streetBlurHandler = event => {
        if(event.target.value.trim() === '') {
            dispatch(inputActions.touchedStreet(true));
        }
    };
    const postalCodeBlurHandler = event => {
        if(!isFiveNum.test(event.target.value.trim())) {
            dispatch(inputActions.touchedPostalCode(true));
        }
    };
    const cityBlurHandler = event => {
        if(event.target.value.trim() === '') {
            dispatch(inputActions.touchedCity(true));
        }
    }; 
    
    const phoneNumberClasses = `${classes['input-box']} ${order.phoneNumberIsValid && !touched.phoneNumber ? '' : classes.invalid}`;
    const streetClasses = `${classes['input-box']} ${order.streetIsValid && !touched.street ? '' : classes.invalid}`;
    const postalCodeClasses = `${classes['input-box']} ${order.postalCodeIsValid && !touched.postalCode ? '' : classes.invalid}`;
    const cityClasses = `${classes['input-box']} ${order.cityIsValid && !touched.city ? '' : classes.invalid}`;


    return (
        <form className={classes['order-form']} onSubmit={submitHandler}>
            <h1>My Order</h1>
            <div className={classes['form-box']}>
                <div className={phoneNumberClasses}>
                    <label htmlFor='name'>Name</label>
                    <input type='text' id="name" autoComplete='off' ref={phoneNumberInputRef} onChange={phoneNumberChangedHandler} onBlur={phoneNumberBlurHandler} />
                    {!order.phoneNumberIsValid || touched.phoneNumber && <p>Please enter a valid number!</p>}
                </div>
                <div className={streetClasses}>
                    <label htmlFor='street'>Street</label>
                    <input type='text' id="street"  autoComplete='off' ref={streetInputRef} onChange={streetChangedHandler} onBlur={streetBlurHandler} />
                    {!order.streetIsValid || touched.street && <p>Please enter a valid street!</p>}
                </div>
                <div className={postalCodeClasses}>
                    <label htmlFor='postal'>Postal Code</label>
                    <input type='text' id="postal"  autoComplete='off' ref={postalCodeInputRef} onChange={postalCodeChangedHandler} onBlur={postalCodeBlurHandler} />
                    {!order.postalCodeIsValid || touched.postalCode && <p>Please enter a valid postal code!(5 characters)</p>}
                </div>
                <div className={cityClasses}>
                    <label htmlFor='city'>City</label>
                    <input type='text' id="city"  autoComplete='off' ref={cityInputRef} onChange={cityChangedHandler} onBlur={cityBlurHandler} />
                    {!order.cityIsValid || touched.city && <p>Please enter a valid city!</p>}
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
