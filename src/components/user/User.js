import React, { useState } from 'react';

import classes from './User.module.css';
import Login from './Login';
import Signup from './Signup';

const Backdrop = props => {
  return <div className={classes.backdrop} onClick={props.onClose} />
};

const User = () => {
  const [loginForm, setLoginForm] = useState(true);

  const transFormHandler = () => {
    setLoginForm(prev => !prev);
  };

  return (
      <React.Fragment>
        <Backdrop onClose={props.onClose} />
        <div className={classes.user}>
          {loginForm && <Login onTrans={transFormHandler} />}
          {!loginForm && <Signup onTrans={transFormHandler} />}
        </div>
      </React.Fragment>
  )
};

export default User;
