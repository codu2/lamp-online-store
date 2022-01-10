import React from 'react';

import classes from './Confirm.module.css';

const Confirm = props => {
    return (
        <div className={classes.confirm}>
            <div className={classes['confirm-form']}>
                <h1>{props.username}</h1>
                <p>Do you really want to log out?</p>
                <button onClick={props.onLogout}>OK</button>
            </div>
        </div>
    )
};

export default Confirm;