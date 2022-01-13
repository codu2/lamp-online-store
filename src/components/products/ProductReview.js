import React, { useState, useEffect } from 'react';

import classes from './ProductReview.module.css';
import { FaStar } from 'react-icons/fa';

const scope_array = [0, 1, 2, 3, 4];

const ProductReview = props => {
    const [clicked, setClicked] = useState([
        false, false, false, false, false
    ]);

    useEffect(() => {
        clickedStar(props.scope);
    }, [])

    const clickedStar = index => {
        let clickedStates = [...clicked];
        for(let i = 0; i < 5; i++) {
            clickedStates[i] = i < index ? true : false;
        };
        setClicked(clickedStates);
    }    
    
    return (
        <div className={classes.review}>
            <div className={classes['review-top']}>
                <div className={classes.reviewer}>
                    {props.name}
                </div>
                <ul className={classes.scope}>
                    {scope_array.map((el, idx) => {
                        return <FaStar key={idx} className={clicked[el] && classes.clicked} />
                    })}
                </ul>
            </div>
            <p>{props.text}</p>
        </div>
    )
};

export default ProductReview;
