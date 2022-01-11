import React from 'react';
import { useSelector } from 'react-redux';
import LoadingSpinner from '../ui/LoadingSpinner';

import ProductReview from './ProductReview';
import ProductReviewForm from './ProductReviewForm';

import classes from './ProductReviewList.module.css';

const ProductReviewList = () => {
    const reviews = useSelector(state => state.ui.reviews);
    const isLoading = useSelector(state => state.ui.isLoading);
    
    let reviews_array = [];

    for(const key in reviews) {
        reviews_array.push(reviews[key])
    }

    const review_list = (
        <ul className={classes['review-align']}>
            {reviews_array.map(review => <ProductReview key={review.id} id={review.id} name={review.name} scope={review.scope} text={review.text} />)}
        </ul>
    )

    return (
        <div className={classes['review-list']}>
            <h1>Review</h1>
            <ProductReviewForm />
            {isLoading ? <LoadingSpinner /> : null}
            {reviews ? review_list : null}
        </div>
    )
};

export default ProductReviewList;

//firebase에서 데이터를 객체로 받아오므로 해당 데이터를 map 하기 위해서는 
//받아온 객체를 배열로 바꿀 필요가 있다. 따라서 for in 루프를 사용해 해당 객체 안에 있는
//객체들을 꺼내 새로운 빈 배열에 담아주고 그 배열을 map하여 review list를 렌더했다.