import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import classes from './Signup.module.css';
import { signupActions } from '../../store/signup-slice';
import { signupRequest } from '../../store/cart-action';

const Signup = props => {
    const dispatch = useDispatch();
    const signup = useSelector(state => state.signup);
    const [enteredName, setEnteredName] = useState('');
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');

    const nameChangeHandler = event => {
        setEnteredName(event.target.value);
    }

    const emailChangeHandler = event => {
        setEnteredEmail(event.target.value);
    }

    const passwordChangeHandler = event => {
        setEnteredPassword(event.target.value);
    }

    const submitHandler = event => {
        event.preventDefault();

        dispatch(signupActions.saveSignup({
            name: enteredName,
            email: enteredEmail,
            password: enteredPassword
        }));
    };

    useEffect(() => {
        if(signup.name && signup.email && signup.password) {
            dispatch(signupRequest(signup))
        };

        setEnteredName('');
        setEnteredEmail('');
        setEnteredPassword('');
    }, [signup, dispatch])

    return (
        <form className={classes['signup-form']} onSubmit={submitHandler}>
            <h1>Signup</h1>
            <div className={classes['input-box']}>
                <label htmlFor='name'>Name</label>
                <input type='text' id="name" autoComplete='off' value={enteredName} onChange={nameChangeHandler} />
            </div>
            <div className={classes['input-box']}>
                <label htmlFor='email'>E-mail</label>
                <input type='text' id="email" autoComplete='off' value={enteredEmail} onChange={emailChangeHandler} />
            </div>
            <div className={classes['input-box']}>
                <label htmlFor='password'>Password</label>
                <input type='text' id="password" autoComplete='off' value={enteredPassword} onChange={passwordChangeHandler} />
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

//Already have an account? Log in
