import React from 'react';
import Login from './Login';

import classes from './User.module.css';

const User = () => {
  return (
      <div className={classes.user}>
        <Login />
      </div>
  )
};

export default User;