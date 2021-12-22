import React from 'react';

import classes from './Signup.module.css';

const Signup = props => {
    return (
        <div className={classes['signup-form']}>
            <h1>Signup</h1>
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
                <p>Already have an account?</p>
                <button onClick={props.onTrans}>Log in</button>
            </div>
            <div className={classes.actions}>
                <button className={classes['signup-button']}>Sign up</button>
                <button className={classes['find-button']}>Help?</button>
            </div>
        </div>
    )
};

export default Signup;

//Already have an account? Log in