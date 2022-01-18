import React, { useRef, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import classes from './UserArea.module.css';
import LoadingSpinner from '../ui/LoadingSpinner';
import AuthContext from '../../store/auth-context';

const UserArea = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const authCtx = useContext(AuthContext);

    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    const transModeHandler = () => {
        setIsLogin(prev => !prev);
    }

    const submitHandler = event => {
        event.preventDefault();

        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;

        setIsLoading(true);

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
                    throw new Error(errorMessage);
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
    }

    
    //const emailClasses = `${classes['input-box']} ${login.emailIsValid && !touched.email ? '' : classes.invalid} ${login.emailIsValid &&!exist.email ? classes.exist : ''}`;
    //const passwordClasses = `${classes['input-box']} ${login.passwordIsValid && !touched.password ? '' : classes.invalid} ${login.passwordIsValid && !exist.password ? classes.exist : ''}`;

    return (
        <form className={classes['input-form']} onSubmit={submitHandler}>
            <h1>{isLogin ? 'Login' : 'Signup'}</h1>
            <div className={classes['input-box']}>
                <label htmlFor='email'>E-mail</label>
                <input type='text' id="email" autoComplete='off' ref={emailInputRef} />
            </div>
            <div className={classes['input-box']}>
                <label htmlFor='password'>Password</label>
                <input type='password' id="password" autoComplete='off' ref={passwordInputRef} />
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

