import classes from './ProductReview.module.css';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const ProductReview = props => {
    return (
        <div className={classes.review}>
            <div className={classes['review-top']}>
                <div className={classes.reviewer}>
                    {props.name}
                </div>
                    <ul className={classes.scope}>
                    <li><FaStar /></li>
                    <li><FaStar /></li>
                    <li><FaStar /></li>
                    <li><FaStarHalfAlt /></li>
                    <li><FaRegStar /></li>
                </ul>
            </div>
            <p>{props.text}</p>
        </div>
    )
};

export default ProductReview;