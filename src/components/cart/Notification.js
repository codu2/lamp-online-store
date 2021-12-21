import React from 'react';
import { useDispatch } from 'react-redux';

import classes from './Notification.module.css';
import { uiActions } from '../../store/ui-slice';

const Notification = props => {
    const dispatch = useDispatch();

    const closeCartHandler = () => {
        dispatch(uiActions.closeCartForm());
    };

    let statusClasses = '';

    if(props.status === 'error') {
        statusClasses = 'error';
    }

    if(props.status === 'success') {
        statusClasses = 'success';
    }

    const notificationClasses = `${classes.notification} ${statusClasses}`;

    return (
        <React.Fragment>
            <h1>Result</h1>
            <div className={notificationClasses}>
                <div className={classes.title}>{props.title}</div>
                <p className={classes.message}>{props.message}</p>
            </div>
            <button className={classes['close-button']} onClick={closeCartHandler}>Close</button>
        </React.Fragment>
    )
};

export default Notification;