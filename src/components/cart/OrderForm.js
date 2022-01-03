import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import classes from './OrderForm.module.css';
import { FaLongArrowAltLeft } from 'react-icons/fa';
import { uiActions } from '../../store/ui-slice';
import { orderActions } from "../../store/order-slice";
import { inputActions } from '../../store/input-slice';
import { cartActions } from '../../store/cart-slice';
import { sendOrderData, sendCartData } from '../../store/cart-action';

const OrderForm = () => {
    const dispatch = useDispatch();
    const order = useSelector(state => state.input.order);
    const beStoredOrder = useSelector(state => state.order);
    const touched = useSelector(state => state.input.touched);

    const [enteredPhoneNumber, setEnteredPhoneNumber] = useState('');
    const [enteredStreet, setEnteredStreet] = useState('');
    const [enteredPostalCode, setEnteredPostalCode] = useState('');
    const [enteredCity, setEnteredCity] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(true);

    const movePrevPageHandler = () => {
        dispatch(uiActions.closeOrderFrom());
    };
    
    const isNotEmpty = event => event.target.value.trim() !== '';
    const isFiveNum = /^\d{5}$/;
    const phoneNumberCheck = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;

    const phoneNumberChangedHandler = event => {
        dispatch(inputActions.phoneNumberFormIsValid(event.target.value));
        if(touched.phoneNumber) {
            if(phoneNumberCheck.test(event.target.value.trim())){
                dispatch(inputActions.touchedPhoneNumber(false));
                dispatch(inputActions.phoneNumberFormIsValid(event.target.value));
            };
        };
        if(!isSubmitted) {
            if(phoneNumberCheck.test(event.target.value.trim())){
                dispatch(inputActions.touchedPhoneNumber(false));
                dispatch(inputActions.phoneNumberFormIsValid(event.target.value));
            };
        }
        setEnteredPhoneNumber(event.target.value);
    };
    
    const streetChangedHandler = event => {
         dispatch(inputActions.touchedStreet(false));
        if(touched.street) {
            if(isNotEmpty) {
                dispatch(inputActions.streetFormIsValid(event.target.value));
            };
        };
        if(!isSubmitted) {
            if(isNotEmpty) {
                dispatch(inputActions.streetFormIsValid(event.target.value));
            };
        };
        setEnteredStreet(event.target.value);
    };
    
    const postalCodeChangedHandler = event => {
        dispatch(inputActions.postalCodeFormIsValid(event.target.value));
        if(touched.postalCode) {
            if(isFiveNum.test(event.target.value)) {
                dispatch(inputActions.touchedPostalCode(false));
                dispatch(inputActions.postalCodeFormIsValid(event.target.value));
            };
        };
        if(!isSubmitted) {
            if(isFiveNum.test(event.target.value)) {
                dispatch(inputActions.touchedPostalCode(false));
                dispatch(inputActions.postalCodeFormIsValid(event.target.value));
            };
        }
        setEnteredPostalCode(event.target.value);
    };
    
    const cityChangedHandler = event => {
        dispatch(inputActions.touchedCity(false));
        if(touched.city) {
            if(isNotEmpty) {
                dispatch(inputActions.cityFormIsValid(event.target.value));
            };
        };
        if(!isSubmitted) {
            if(isNotEmpty) {
                dispatch(inputActions.cityFormIsValid(event.target.value));
            };
        };
        setEnteredCity(event.target.value);
    }; 

    const phoneNumberBlurHandler = event => {
        if(!phoneNumberCheck.test(event.target.value.trim())){
            dispatch(inputActions.touchedPhoneNumber(true));
        } else {
            dispatch(inputActions.touchedPhoneNumber(false));
        };
        dispatch(inputActions.phoneNumberFormIsValid(event.target.value));
    };
    
    const streetBlurHandler = event => {
        if(event.target.value.trim() === '') {
            dispatch(inputActions.touchedStreet(true));
        } else {
            dispatch(inputActions.touchedStreet(false));
        };
        dispatch(inputActions.streetFormIsValid(event.target.value));
    };
    
    const postalCodeBlurHandler = event => {
         if(!isFiveNum.test(event.target.value)) {
            dispatch(inputActions.touchedPostalCode(true));
        } else {
            dispatch(inputActions.touchedPostalCode(false));
        };
        dispatch(inputActions.postalCodeFormIsValid(event.target.value));
    };
    
    const cityBlurHandler = event => {
        if(event.target.value.trim() === '') {
            dispatch(inputActions.touchedCity(true));
        } else {
            dispatch(inputActions.touchedCity(false));
        };
        dispatch(inputActions.cityFormIsValid(event.target.value));
    }; 
    
    const submitHandler = event => {
        event.preventDefault();
        
        if(!order.phoneNumberIsValid) {
            dispatch(inputActions.touchedPhoneNumber(true));
        };
        if(!order.streetIsValid) {
            dispatch(inputActions.touchedStreet(true));
        };
        if(!order.postalCodeIsValid) {
            dispatch(inputActions.touchedPostalCode(true));
        };
        if(!order.cityIsValid) {
            dispatch(inputActions.touchedCity(true));
        };
        
        dispatch(inputActions.phoneNumberFormIsValid(enteredPhoneNumber));
        dispatch(inputActions.streetFormIsValid(enteredStreet));
        dispatch(inputActions.postalCodeFormIsValid(enteredPostalCode));
        dispatch(inputActions.cityFormIsValid(enteredCity));

        dispatch(orderActions.saveOrder({
            phoneNumber: enteredPhoneNumber,
            street: enteredStreet,
            postalCode: enteredPostalCode,
            city: enteredCity
        }));

        dispatch(inputActions.orderInputFormIsValid());
        
        if(!order.formIsValid) {
            setIsSubmitted(false);
            return;
        };
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
            
            setEnteredPhoneNumber('');
            setEnteredStreet('');
            setEnteredPostalCode('');
            setEnteredCity('');
            
            dispatch(cartActions.replaceCart({
                items: [],
                totalQuantity: 0
            }));

            dispatch(sendCartData({
                items: [],
                totalQuantity: 0
            }));
        };
    }, [beStoredOrder, order.formIsValid, dispatch]);
    
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
                    <input type='text' id="name" autoComplete='off' value={enteredPhoneNumber} onChange={phoneNumberChangedHandler} onBlur={phoneNumberBlurHandler} />
                    {!order.phoneNumberIsValid || touched.phoneNumber ? <p>Please enter a valid number!</p> : null}
                </div>
                <div className={streetClasses}>
                    <label htmlFor='street'>Street</label>
                    <input type='text' id="street"  autoComplete='off' value={enteredStreet} onChange={streetChangedHandler} onBlur={streetBlurHandler} />
                    {!order.streetIsValid || touched.street ? <p>Please enter a valid street!</p> : null}
                </div>
                <div className={postalCodeClasses}>
                    <label htmlFor='postal'>Postal Code</label>
                    <input type='text' id="postal"  autoComplete='off' value={enteredPostalCode} onChange={postalCodeChangedHandler} onBlur={postalCodeBlurHandler} />
                    {!order.postalCodeIsValid || touched.postalCode ? <p>Please enter a valid postal code!(5 characters)</p> : null}
                </div>
                <div className={cityClasses}>
                    <label htmlFor='city'>City</label>
                    <input type='text' id="city"  autoComplete='off' value={enteredCity} onChange={cityChangedHandler} onBlur={cityBlurHandler} />
                    {!order.cityIsValid || touched.city ? <p>Please enter a valid city!</p> : null}
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
