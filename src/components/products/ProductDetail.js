import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

import classes from './ProductDetail.module.css';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { cartActions } from '../../store/cart-slice';

const ProductDetail = () => {
    const { productId } = useParams();
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const productDetail = useSelector(state => state.ui.productDetail);

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
        </React.Fragment>
    )
};

export default ProductDetail;

//productId 값을 얻기 위해 react-router-dom의 component인 useParams를 사용함
//각 productItem 들의 title에 제품 상세 페이지 역할을 할 ProductDetail 링크를 걸고
//클릭된 item의 정보를 받아 제품 상세 페이지를 자동으로 구성할 수 있도록 ProductItem.js에서 ui-slice.js로 클릭된 item의
//id, name, price, color, img, quantity 값을 보내주는 함수를 onClick으로 구성함.
//ProductDetail.js에서는 해당 정보를 useSelector를 이용해 가져와 페이지와 cart를 위한 함수들을 구성하도록 하였음.
//그러나 ProductPage에서 새로고침 하게 되면 그 값이 넘어오지 않으므로 렌더되지 않는 문제가 발생함
//fetch하는 방법을 구상해봐야할 듯함.

//firebase에 미리 products 들의 key와 value 값들을 입력해놓고
//클릭된 item과 일치하는 product의 정보를 가져오는 로직을 cart-action.js에 추가하고
//ui-slice.js의 productDetail에 replace 시켜 사용하는 방안
//productItem.js에서 useSelector를 사용해 products 객체를 가져오고 
//for in loop를 사용해 이중 클릭된 item과 일치하는 item을 찾아서 해당 아이템의 정보를 얻을 것임.

//해결 안됨. 차라리 productId를 가지고 products 들에서 찾아서 정보를 얻는 방안이 좋을 듯.
//useEffect를 사용하여 products 중에서 찾아 해당 item을 얻는 방안도 새로고침을 했을 때 오류가 남
//그때마다 fetch 하는 것이 가장 좋을 듯함.