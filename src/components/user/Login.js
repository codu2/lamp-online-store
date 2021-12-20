import React from 'react';

import classes from './Login.module.css';

const Login = () => {
    return (
        <div className={classes['login-form']}>
            <h1>Login</h1>
            <div className={classes['input-box']}>
                <label htmlFor='name'>Name</label>
                <input type='text' id="name" autoComplete='off' />
            </div>
            <div className={classes['input-box']}>
                <label htmlFor='email'>E-mail</label>
                <input type='text' id="email" autoComplete='off' />
            </div>
            <div className={classes['input-box']}>
                <label htmlFor='password'>Password</label>
                <input type='text' id="password" autoComplete='off' />
            </div>
            <div className={classes['form-trans']}>
                <p>Don't have an account?</p>
                <button>Sign up</button>
            </div>
            <div className={classes.actions}>
                <button className={classes['login-button']}>Log in</button>
                <button className={classes['find-button']}>Forgot Password?</button>
            </div>
        </div>
    )
};

export default Login;

//Already have an account? Log in