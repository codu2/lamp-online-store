import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import classes from './UserArea.module.css';
import LoadingSpinner from '../ui/LoadingSpinner';
import AuthContext from '../../store/auth-context';
import { inputActions } from '../../store/input-slice';

const UserArea = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const authCtx = useContext(AuthContext);

    const dispatch = useDispatch();
    const login = useSelector(state => state.input.login);
    const touched = useSelector(state => state.input.touched);

    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');

    const isNotEmpty = event => event.target.value.trim() !== '';
    const emailCheck = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    const passwordCheck = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*$?&]{8,16}$/;

    const emailChangeHandler = event => {
        dispatch(inputActions.touchedEmail(false));  
        if(emailCheck.test(event.target.value.trim()) || isNotEmpty) {
            dispatch(inputActions.emailFormIsValid(event.target.value));
        };
        setEnteredEmail(event.target.value);
        dispatch(inputActions.loginInputFormIsValid());
    };

    const passwordChangeHandler = event => {
        dispatch(inputActions.touchedPassword(false));
        if(passwordCheck.test(event.target.value.trim()) || isNotEmpty) {
            dispatch(inputActions.passwordFormIsValid(event.target.value));
        };
        setEnteredPassword(event.target.value);
        dispatch(inputActions.loginInputFormIsValid());
    };

    const emailBlurHandler = event => {
        if(!emailCheck.test(event.target.value.trim())) {
            dispatch(inputActions.touchedEmail(true));
        } else {
            dispatch(inputActions.touchedEmail(false));
        };
        dispatch(inputActions.emailFormIsValid(event.target.value));
        dispatch(inputActions.loginInputFormIsValid());
    };

    const passwordBlurHandler = event => {
        if(!passwordCheck.test(event.target.value.trim())) {
            dispatch(inputActions.touchedPassword(true));
        } else {
            dispatch(inputActions.touchedPassword(false));
        };
        dispatch(inputActions.passwordFormIsValid(event.target.value));
        dispatch(inputActions.loginInputFormIsValid());
    };

    
    const transModeHandler = () => {
        setIsLogin(prev => !prev);
    }

    const submitHandler = event => {
        event.preventDefault();

        if(!login.emailIsValid) {
            dispatch(inputActions.touchedEmail(true));
        };
        if(!login.passwordIsValid) {
            dispatch(inputActions.touchedPassword(true));
        };

        dispatch(inputActions.emailFormIsValid(enteredEmail));
        dispatch(inputActions.passwordFormIsValid(enteredPassword));

        setIsLoading(true);
        
        if(login.formIsValid) {
            let url;
            if(isLogin) {
                url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]';
            } else {
                url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]';
            }

            fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                    email: enteredEmail,
                    password: enteredPassword,
                    returnSecureToken: true
                }),
                headers: {
                    'Content-Type' : 'application/json'
                }
            }).then(response => {
                setIsLoading(false);
                if(response.ok) {
                    return response.json();
                } else {
                    return response.json().then(data => {
                        let errorMessage = 'Authentication failed!';
                        if(data && data.error && data.error.message) {
                            errorMessage = data.error.message;
                        }
                        alert(errorMessage);
                    })
                }
            }).then(data => {
                console.log(data);
                const expirationTime = new Date(new Date().getTime() + (+data.expiresIn * 1000));
                authCtx.login(data.idToken, expirationTime.toISOString());
                navigate('/home');
            }).catch(error => {
                console.log(error.message);
            })
        };
    };

    
    const emailClasses = `${classes['input-box']} ${login.emailIsValid && !touched.email ? '' : classes.invalid}`;
    const passwordClasses = `${classes['input-box']} ${login.passwordIsValid && !touched.password ? '' : classes.invalid}`;

    return (
        <form className={classes['input-form']} onSubmit={submitHandler}>
            <h1>{isLogin ? 'Login' : 'Signup'}</h1>
            <div className={emailClasses}>
                <label htmlFor='email'>E-mail</label>
                <input type='text' id="email" autoComplete='off' value={enteredEmail} onChange={emailChangeHandler} onBlur={emailBlurHandler} />
                {!login.emailIsValid || touched.email ? <p>Please enter a valid email!</p> : null}
            </div>
            <div className={passwordClasses}>
                <label htmlFor='password'>Password</label>
                <input type='password' id="password" autoComplete='off' value={enteredPassword} onChange={passwordChangeHandler} onBlur={passwordBlurHandler} />
                {!login.passwordIsValid || touched.password ? <p>Password must be 8-16 characters and contain both numbers and letters/special characters.</p> : null}
            </div>
            <div className={classes['form-trans']}>
                {isLogin ? <p>Don't have an account?</p> : <p>Already have an account?</p>}
                <button type="button" onClick={transModeHandler}> 
                    {isLogin ? 'Sign up' : 'Log in'}
                </button>
            </div>
            <div className={classes.actions}>
                {!isLoading && (
                    <button className={classes['submit-button']}>
                        {isLogin ? 'Log in' : 'Sign up'}  
                    </button> 
                )}
                {isLoading && <LoadingSpinner />}
                <button type="button" className={classes['find-button']}>
                    {isLogin ? 'Forgot Password?' : 'Help?'}
                </button>
            </div>
        </form>
    )
};

export default UserArea;

