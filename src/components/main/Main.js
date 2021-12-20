import React from 'react';

import classes from './Main.module.css';

const Main = () => {
    return (
        <div className={classes['main-container']}>
            <div className={classes['left-section']}>
                <img src='img/main.jpg' alt='main-img'/>
            </div>
            <div className={classes.paragraph}>
                <h1>Light Up Your Life.</h1>
                <p>Visit our online store to see different and stylish lamps.</p>
                <p>You can visit our products page for new designs.</p>
                <button className={classes['more-button']}>Learn More</button>
            </div>
        </div>
    )
};

export default Main;