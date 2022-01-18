import React, { useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import AuthContext from '../../store/auth-context';
import classes from './Profile.module.css';

const Profile = () => {
    const navigate = useNavigate();
    const authCtx = useContext(AuthContext);
    const newPasswordInputRef = useRef();

    const submitHandler = event => {
        event.preventDefault();

        const enteredNewPassword = newPasswordInputRef.current.value;

        fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=[API_KEY]', {
            method: 'POST',
            body: JSON.stringify({
                idToken: authCtx.token,
                password: enteredNewPassword,
                returnSecureToken: false
            }),
            headers: {
                'Content-Type' : 'application/json'
            }
        }).then(response => {
            navigate('/home');
        })
    }

    return (
        <form className={classes['new-password']} onSubmit={submitHandler}>
            <h1>Password Change</h1>
            <label htmlFor='newPassword'>Enter your New Password</label>
            <input type="password" id="newPassword" ref={newPasswordInputRef} minLength="7" />
            <button type='submit'>Change</button>
        </form>
    )
};

export default Profile;