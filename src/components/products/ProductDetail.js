import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

import classes from './ProductDetail.module.css';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { cartActions } from '../../store/cart-slice';
import ProductReviewList from './ProductReviewList';
import { fetchReviewData } from '../../store/cart-action';

const ProductDetail = () => {
    const { productId } = useParams();
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const productDetail = useSelector(state => state.ui.productDetail);
    
     useEffect(() => {
        dispatch(fetchReviewData(productId))
    }, [productId, dispatch])

    const removeItemFromCartHandler = () => {
        dispatch(cartActions.removeItemFromCart(productDetail.id));
    };

    const addItemToCartHandler = () => {
        dispatch(cartActions.addItemToCart({
            id : productDetail.id,
            name: productDetail.name,
            price: productDetail.price,
            color: productDetail.color,
            img: productDetail.img
        }));
    };

    const quantityHandler = event => {
        event.target.value = productDetail.quantity;
    };

    const goPrevPageHandler = () => {
        navigate(-1);
    };

    const goProductsHandler = () => {
        navigate('/products');
    };

    return (
        <React.Fragment>
            <div className={classes['navigate-buttons']}>
                <button onClick={goPrevPageHandler}>prev</button>
                <button onClick={goProductsHandler}>products</button>
            </div>
            <div className={classes.productDetail}>
                <div className={classes['product-img']}>
                    <img src={`../${productDetail.img}`} alt='product-detail' />
                </div>
                <div className={classes['product-box']}>
                    <h1>{productDetail.name}</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <p>{productDetail.color}</p>
                    <div className={classes['product-info']}>
                        <div className={classes.actions}>
                            <AiOutlineMinus className={classes.action} onClick={removeItemFromCartHandler} />
                            <input type="text" onChange={quantityHandler} value={productDetail.quantity}/>
                            <AiOutlinePlus className={classes.action} onClick={addItemToCartHandler} />
                        </div>
                        <p>{`$${productDetail.price.toFixed(2)}`}</p>
                    </div>
                    <button className={classes['cart-button']} onClick={addItemToCartHandler}>Add To Cart</button>
                </div>
            </div>
            <div className={classes['product-desc']}>
                <h1>Features</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
            <ProductReviewList />
        </React.Fragment>
    )
};

export default ProductDetail;
