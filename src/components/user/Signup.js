import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import classes from './Signup.module.css';
import { signupActions } from '../../store/signup-slice';
import { signupRequest } from '../../store/cart-action';

const Signup = props => {
    const dispatch = useDispatch();
    const signup = useSelector(state => state.signup.input);
    const valid = useSelector(state => state.signup.valid);
    const touched = useSelector(state => state.signup.touched);
    
    const [enteredName, setEnteredName] = useState('');
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(true);
    
    const emailCheck = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    const passwordCheck = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*$?&]{8,16}$/;

    const nameChangeHandler = event => {
        setEnteredName(event.target.value);
        if(!isSubmitted) {
            if(event.target.value.trim().length !== 0) {
                dispatch(signupActions.touchedName(false));
                dispatch(signupActions.nameFormIsValid(event.target.value));
            }
        };
        if(touched.name) {
            if(event.target.value.trim().length !== 0) {
                dispatch(signupActions.nameFormIsValid(event.target.value));
            }
        };
    };

    const emailChangeHandler = event => {
        setEnteredEmail(event.target.value);
        if(!isSubmitted) {
            if(event.target.value.trim().length !== 0) {
                dispatch(signupActions.touchedEmail(false));
                dispatch(signupActions.emailFormIsValid(event.target.value));
            };
        };
        if(touched.email) {
            dispatch(signupActions.touchedEmail(false));
            dispatch(signupActions.emailFormIsValid(event.target.value));
        };
    };

    const passwordChangeHandler = event => {
        setEnteredPassword(event.target.value);
        if(!isSubmitted) {
            if(event.target.value.trim().length !== 0) {
                dispatch(signupActions.touchedPassword(false));
                dispatch(signupActions.passwordFormIsValid(event.target.value));
            };
        };
        if(touched.password) {
            dispatch(signupActions.touchedPassword(false));
            dispatch(signupActions.passwordFormIsValid(event.target.value));
        };
    };
    
    const nameBlurHandler = event => {
        if(event.target.value.trim().length === 0) {
            dispatch(signupActions.touchedName(true));
        } else {
            dispatch(signupActions.touchedName(false));
        };
    };

    const emailBlurHandler = event => {
        if(event.target.value.trim().length === 0 || !emailCheck.test(event.target.value)) {
            dispatch(signupActions.touchedEmail(true));
        } else {
            dispatch(signupActions.touchedEmail(false));
        };
    };

    const passwordBlurHandler = event => {
        if(event.target.value.trim().length === 0 || !passwordCheck.test(event.target.value)) {
            dispatch(signupActions.touchedPassword(true));
        } else {
            dispatch(signupActions.touchedPassword(false));
        };
    };

    const submitHandler = event => {
        event.preventDefault();
        
        if(!valid.nameIsValid) {
            dispatch(signupActions.touchedName(true));
        };

        if(!valid.emailIsValid) {
            dispatch(signupActions.touchedEmail(true));
        };

        if(!valid.passwordIsValid) {
            dispatch(signupActions.touchedPassword(true));
        };

        dispatch(signupActions.saveSignup({
            name: enteredName,
            email: enteredEmail,
            password: enteredPassword
        }));
        
        dispatch(signupActions.nameFormIsValid(enteredName));
        dispatch(signupActions.emailFormIsValid(enteredEmail));
        dispatch(signupActions.passwordFormIsValid(enteredPassword));

        dispatch(signupActions.signupFormIsValid());

        if(!valid.formIsValid) {
            setIsSubmitted(false);
            return;
        };
    };

    useEffect(() => {
        if(valid.formIsValid) {
            dispatch(signupActions.touchedName(false));
            dispatch(signupActions.touchedEmail(false));
            dispatch(signupActions.touchedPassword(false));

            dispatch(signupRequest(signup));

            setEnteredName('');
            setEnteredEmail('');
            setEnteredPassword('');
        };
    }, [signup, dispatch]);
    
    const nameClasses = `${classes['input-box']} ${valid.nameIsValid && !touched.name ? '' : classes.invalid}`;
    const emailClasses = `${classes['input-box']} ${valid.emailIsValid && !touched.email ? '' : classes.invalid}`;
    const passwordClasses = `${classes['input-box']} ${valid.passwordIsValid && !touched.password ? '' : classes.invalid}`;


    return (
        <form className={classes['signup-form']} onSubmit={submitHandler}>
            <h1>Signup</h1>
            <div className={nameClasses}>
                <label htmlFor='name'>Name</label>
                <input type='text' id="name" autoComplete='off' value={enteredName} onChange={nameChangeHandler} onBlur={nameBlurHandler} />
            </div>
            <div className={emailClasses}>
                <label htmlFor='email'>E-mail</label>
                <input type='text' id="email" autoComplete='off' value={enteredEmail} onChange={emailChangeHandler} onBlur={emailBlurHandler} />
            </div>
            <div className={passwordClasses}>
                <label htmlFor='password'>Password</label>
                <input type='text' id="password" autoComplete='off' value={enteredPassword} onChange={passwordChangeHandler} onBlur={passwordBlurHandler} />
            </div>
            <div className={classes['form-trans']}>
                <p>Already have an account?</p>
                <button type="button" onClick={props.onTrans}>Log in</button>
            </div>
            <div className={classes.actions}>
                <button className={classes['signup-button']}>Sign up</button>
                <button type="button" className={classes['find-button']}>Help?</button>
            </div>
        </form>
    )
};

export default Signup;
