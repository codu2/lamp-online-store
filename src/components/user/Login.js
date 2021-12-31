import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import classes from './Login.module.css';
import { inputActions } from '../../store/input-slice';
import { sendUserData } from '../../store/cart-action';
import { loginActions } from '../../store/login-slice';
import { uiActions } from '../../store/ui-slice';

const Login = props => {
    const dispatch = useDispatch();
    const login = useSelector(state => state.input.login);
    const beStoredLogin = useSelector(state => state.login.input);
    const touched = useSelector(state => state.input.touched);
    const users = useSelector(state => state.signup.users);
    const exist = useSelector(state => state.login.exist);

    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(true);
    
    const isNotEmpty = event => event.target.value.trim() !== '';
    const emailCheck = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    const passwordCheck = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*$?&]{8,16}$/;

    const emailChangeHandler = event => {
        dispatch(inputActions.touchedEmail(false));  
        if(touched.email) {
            if(isNotEmpty) {
                dispatch(inputActions.emailFormIsValid(event.target.value));
            };
        };
        if(!isSubmitted) {
            if(emailCheck.test(event.target.value.trim()) || isNotEmpty) {
                dispatch(inputActions.emailFormIsValid(event.target.value));
            };
        };
        setEnteredEmail(event.target.value);
    };

    const passwordChangeHandler = event => {
        dispatch(inputActions.touchedPassword(false));
        if(touched.password) {
            if(isNotEmpty) {
                dispatch(inputActions.passwordFormIsValid(event.target.value));
            };
        };
        if(!isSubmitted) {
            if(passwordCheck.test(event.target.value.trim()) || isNotEmpty) {
                dispatch(inputActions.passwordFormIsValid(event.target.value));
            };
        };
        setEnteredPassword(event.target.value);
    };

    const emailBlurHandler = event => {
        if(!emailCheck.test(event.target.value.trim())) {
            dispatch(inputActions.touchedEmail(true));
        } else {
            dispatch(inputActions.touchedEmail(false));
        };
        dispatch(inputActions.emailFormIsValid(event.target.value));
    };

    const passwordBlurHandler = event => {
        if(!passwordCheck.test(event.target.value.trim())) {
            dispatch(inputActions.touchedPassword(true));
        } else {
            dispatch(inputActions.touchedPassword(false));
        };
        dispatch(inputActions.passwordFormIsValid(event.target.value));
    };

    const submitHandler = event => {
        event.preventDefault();

        if(!login.emailIsValid) {
            dispatch(inputActions.touchedEmail(true));
        };
        
        if(!login.passwordIsValid) {
            dispatch(inputActions.touchedPassword(true));
        };
        
        for(const key in users) {
            if(users[key].email === enteredEmail) {
                dispatch(loginActions.existingEmail(true));
                if(users[key].password === enteredPassword) {
                    dispatch(loginActions.matchingPassword(true));
                    break;
                } else {
                    dispatch(loginActions.matchingPassword(false));
                };   
            } else {
                dispatch(loginActions.existingEmail(false));
            };
        };

        dispatch(inputActions.emailFormIsValid(enteredEmail));
        dispatch(inputActions.passwordFormIsValid(enteredPassword));

        dispatch(loginActions.saveLogin({
            email: enteredEmail,
            password: enteredPassword
        }));

        dispatch(inputActions.loginInputFormIsValid());
        
        if(!login.formIsValid) {
            setIsSubmitted(false);
            return;
        }
    };

    useEffect(() => {
        if(login.formIsValid && exist.email && exist.password) {
            dispatch(inputActions.touchedEmail(false));
            dispatch(inputActions.touchedPassword(false));

            dispatch(sendUserData({
                email: beStoredLogin.email,
                password: beStoredLogin.password
            }));
            
            setEnteredEmail('');
            setEnteredPassword('');
            
            dispatch(uiActions.toggleUserForm(false));
            dispatch(uiActions.toggleLoggingIn(true));
        };
    }, [beStoredLogin]);
    
    const emailClasses = `${classes['input-box']} ${login.emailIsValid && !touched.email ? '' : classes.invalid}`;
    const passwordClasses = `${classes['input-box']} ${login.passwordIsValid && !touched.password ? '' : classes.invalid}`;
  
    return (
        <form className={classes['login-form']} onSubmit={submitHandler}>
            <h1>Login</h1>
            <div className={classes['input-box']}>
                <label htmlFor='email'>E-mail</label>
                <input type='text' id="email" autoComplete='off' value={enteredEmail} onChange={emailChangeHandler} onBlur={emailBlurHandler} />
                {!login.emailIsValid || touched.email ? <p>Please enter a valid email!</p> : null}
                {login.emailIsValid && !exist.email && <p>That account doesn't exist. Enter a different account or get a new one.</p>}
            </div>
            <div className={classes['input-box']}>
                <label htmlFor='password'>Password</label>
                <input type='text' id="password" autoComplete='off' value={enteredPassword} onChange={passwordChangeHandler} onBlur={passwordBlurHandler} />
                {!login.passwordIsValid || touched.password ? <p>Password must be 8-16 characters and contain both numbers and letters/special characters.</p> : null}
                {login.passwordIsValid && !exist.password && <p>Password incorrect. Forgot password?</p>}
            </div>
            <div className={classes['form-trans']}>
                <p>Don't have an account?</p>
                <button type="button" onClick={props.onTrans}>Sign up</button>
            </div>
            <div className={classes.actions}>
                <button className={classes['login-button']}>Log in</button>
                <button type="button" className={classes['find-button']}>Forgot Password?</button>
            </div>
        </form>
    )
};

export default Login;

//disabled={!login.formIsValid}
