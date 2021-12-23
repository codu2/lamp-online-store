import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import classes from './Login.module.css';
import { inputActions } from '../../store/input-slice';
import { sendUserData } from '../../store/cart-action';
import { loginActions } from '../../store/login-slice';

const Login = props => {
    const dispatch = useDispatch();
    const login = useSelector(state => state.input.login);
    const beStoredLogin = useSelector(state => state.login);
    const touched = useSelector(state => state.input.touched);

    const nameInputRef = useRef();
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    
    const submitHandler = event => {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;

        dispatch(inputActions.touchedName(true));
        dispatch(inputActions.touchedEmail(true));
        dispatch(inputActions.touchedPassword(true));

        dispatch(inputActions.loginFormIsValid({
            enteredName,
            enteredEmail,
            enteredPassword
        }));

        dispatch(loginActions.saveLogin({
            name: enteredName,
            email: enteredEmail,
            password: enteredPassword
        }));

        dispatch(inputActions.loginInputFormIsValid());
    };

    useEffect(() => {
        if(login.formIsValid) {
            dispatch(inputActions.touchedName(false));
            dispatch(inputActions.touchedEmail(false));
            dispatch(inputActions.touchedPassword(false));

            dispatch(sendUserData({
                name: beStoredLogin.name,
                email: beStoredLogin.email,
                password: beStoredLogin.password
            }));
        };
    }, [beStoredLogin]);

    const isNotEmpty = event => event.target.value.trim() !== '';
    const emailCheck = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    const passwordCheck = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*$?&]{8,16}$/;

    const nameChangeHandler = () => {
        if(isNotEmpty) {
            dispatch(inputActions.touchedName(false));
        }
    };

    const emailChangeHandler = event => {
        if(emailCheck.test(event.target.value.trim()) || isNotEmpty) {
            dispatch(inputActions.touchedEmail(false));
        }
    };

    const passwordChangeHandler = event => {
        if(passwordCheck.test(event.target.value.trim()) || isNotEmpty) {
            dispatch(inputActions.touchedPassword(false));
        }
    };
    
    const nameBlurHander = event => {
        if(event.target.value.trim() === '') {
            dispatch(inputActions.touchedName(true));
        }
    };

    const emailBlurHandler = event => {
        if(!emailCheck.test(event.target.value.trim())) {
            dispatch(inputActions.touchedEmail(true));
        }
    };

    const passwordBlurHandler = event => {
        if(!passwordCheck.test(event.target.value.trim())) {
            dispatch(inputActions.touchedPassword(true));
        }
    };

    const nameClasses = `${classes['input-box']} ${login.nameIsValid && !touched.name ? '' : classes.invalid}`;
    const emailClasses = `${classes['input-box']} ${login.emailIsValid && !touched.email ? '' : classes.invalid}`;
    const passwordClasses = `${classes['input-box']} ${login.passwordIsValid && !touched.password ? '' : classes.invalid}`;
  
    return (
        <form className={classes['login-form']} onSubmit={submitHandler}>
            <h1>Login</h1>
            <div className={classes['input-box']}>
                <label htmlFor='name'>Name</label>
                <input type='text' id="name" autoComplete='off' ref={nameInputRef} onChange={nameChangeHandler} onBlur={nameBlurHander} />
                {!login.nameIsValid || touched.name && <p>Please enter a valid name!</p>}
            </div>
            <div className={classes['input-box']}>
                <label htmlFor='email'>E-mail</label>
                <input type='text' id="email" autoComplete='off' ref={emailInputRef} onChange={emailChangeHandler} onBlur={emailBlurHandler} />
                {!login.emailIsValid || touched.email && <p>Please enter a valid email!</p>}
            </div>
            <div className={classes['input-box']}>
                <label htmlFor='password'>Password</label>
                <input type='text' id="password" autoComplete='off' ref={passwordInputRef} onChange={passwordChangeHandler} onBlur={passwordBlurHandler} />
                {!login.passwordIsValid || touched.password && <p>Password must be 8-16 characters and contain both numbers and letters/special characters.</p>}
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
