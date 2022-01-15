import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import classes from './ProductReviewList.module.css';
import ProductReview from './ProductReview';
import ProductReviewForm from './ProductReviewForm';
import LoadingSpinner from '../ui/LoadingSpinner';

const ProductReviewList = () => {
    const reviews = useSelector(state => state.ui.reviews);
    const isLoading = useSelector(state => state.ui.isLoading);
    
    const [sortingState, setSortingState] = useState(null);
    
    let reviews_array = [];
    let reviews_list = [];

    for(const key in reviews) {
        reviews_array.push(reviews[key])
    };
    
    let sortLatestReviews = [...reviews_array];
    let sortAscendingReviews = [...reviews_array];
    let sortDescendingReviews = [...reviews_array];

    if(sortingState === 'latest') {
        reviews_list = sortLatestReviews.reverse(); 
    };

    if(sortingState === 'ascending') {
        reviews_list = sortAscendingReviews.sort(function(a, b) {
            if(a.scope > b.scope) return 1;
            if(a.scope === b.scope) return 0;
            if(a.scope < b.scope) return -1;
        })
    };

    if(sortingState === "descending") {
        reviews_list = sortDescendingReviews.sort(function(a, b) {
            if(b.scope > a.scope) return 1;
            if(b.scope === a.scope) return 0;
            if(b.scope < a.scope) return -1;
        })
    };

    const sortLatestHandler = () => {
        setSortingState('latest');
    };

    const sortAscendingHandler = () => {
        setSortingState('ascending');
    };
    
    const sortDescendingHandler = () => {
        setSortingState('descending');
    }  ;

    const review_list = (
        <ul className={classes['review-align']}>
            {reviews_array.map(review => <ProductReview key={review.id} id={review.id} name={review.name} scope={review.scope} text={review.text} />)}
        </ul>
    )
    
    const sortedReview_list = (
        <ul className={classes['review-align']}>
            {reviews_list.map(review => <ProductReview key={review.id} id={review.id} name={review.name} scope={review.scope} text={review.text} />)}
        </ul>
    )

    return (
        <div className={classes['review-list']}>
            <h1>Review</h1>
            <ProductReviewForm />
            {isLoading ? <LoadingSpinner /> : null}
            <div className={classes['sort-button']}>
                <button onClick={sortLatestHandler} className={latestButtonClasses}>Latest</button>
                <button onClick={sortAscendingHandler} className={ascendingButtonClasses}>Ascending</button>
                <button onClick={sortDescendingHandler} className={descendingButtonClasses}>Descending</button>
            </div>
            {sortingState ? sortedReview_list : review_list}
        </div>
    )
};

export default ProductReviewList;
