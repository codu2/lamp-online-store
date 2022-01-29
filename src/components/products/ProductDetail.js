import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

import classes from './ProductDetail.module.css';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { cartActions } from '../../store/cart-slice';
import ProductReviewList from './ProductReviewList';
import { fetchReviewData } from '../../store/cart-action';
import { FaStar } from 'react-icons/fa';
import { uiActions } from '../../store/ui-slice';

const scope_array = [0, 1, 2, 3, 4];

const ProductDetail = () => {
    const { productId } = useParams();
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const productDetail = useSelector(state => state.ui.productDetail);
    const products = useSelector(state => state.ui.products);
    const reviews = useSelector(state => state.ui.reviews);
    const [quantity, setQuantity] = useState(1);
    const [clicked, setClicked] = useState([
        false, false, false, false, false
    ]);
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    
    useEffect(() => {
        dispatch(fetchReviewData(productId))
    }, [productId, dispatch])

    for(const key in products) {
        if(products[key].name.replace(/(\s*)/g, "") === productId) {
            dispatch(uiActions.replaceProductDetail({
                id: products[key].id,
                name: products[key].name,
                price: products[key].price,
                color: products[key].color,
                img: products[key].img
            }));
        };
    };

    const quantityHandler = event => {
        event.target.value = quantity;
    };

    const minusQuantityHandler = () => {
        if(quantity > 1) {
            setQuantity(prev => prev - 1);
        }; 
    };

    const plusQuantityHandler = () => {
        setQuantity(prev => prev + 1);
    };

    const addItemToCartHandler = () => {
        dispatch(cartActions.addProductDetailItemToCart({
            id : productDetail.id,
            name: productDetail.name,
            price: productDetail.price,
            color: productDetail.color,
            img: productDetail.img,
            quantity,
        }));
        setQuantity(1);
    };

    const goHomeHandler = () => {
        navigate('/');
    };

    const goProductsHandler = () => {
        navigate('/products');
    };

    let scopeNums = [];
    let totalNum = 0;
    let reviews_length = 0;
    
    if(reviews) {
        reviews_length = Object.keys(reviews).length;
    } else {
        reviews_length = 0;
    }

    for(const key in reviews) {
        scopeNums.push(reviews[key].scope)
    };

    for(let i = 0; i < scopeNums.length; i++) {
        totalNum += scopeNums[i];
    }

    let average = (totalNum / reviews_length);

    useEffect(() => {
        clickedStar(average);
    }, [average])

    const clickedStar = index => {
        let clickedStates = [...clicked];
        for(let i = 0; i < 5; i++) {
            clickedStates[i] = i < index ? true : false;
        };
        setClicked(clickedStates);
    };   

    return (
        <React.Fragment>
            <div className={classes['navigate-buttons']}>
                <button onClick={goHomeHandler}>Home</button>
                <button onClick={goProductsHandler}>products</button>
            </div>
            <div className={classes.productDetail}>
                <div className={classes['product-img']}>
                    <img src={`../${productDetail.img}`} alt='product-detail' />
                </div>
                <div className={classes['product-box']}>
                    <h1>{productDetail.name}</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <div className={classes['product-info']}>
                        <p>{productDetail.color}</p>
                        <div>
                        {scope_array.map((el, idx) => {
                            return <FaStar key={idx} className={clicked[el] && classes.clicked} />
                        })}
                        {`(${reviews_length})`}
                        </div>
                    </div>
                    <div className={classes['product-info']}>
                        <div className={classes.actions}>
                            <AiOutlineMinus className={classes.action} onClick={minusQuantityHandler} />
                            <input type="text" onChange={quantityHandler} value={quantity}/>
                            <AiOutlinePlus className={classes.action} onClick={plusQuantityHandler} />
                        </div>
                        <p>{`$${productDetail.price}`}</p>
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
