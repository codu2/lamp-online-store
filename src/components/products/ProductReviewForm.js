import React, { useState, useContext, useCallback, useEffect } from 'react';
import { UNSAFE_NavigationContext as NavigationContext, useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import classes from './ProductReviewForm.module.css';
import { FaStar } from 'react-icons/fa';
import { sendReviewData } from '../../store/cart-action';
//import { uiActions } from '../../store/ui-slice';

export function useBlocker(blocker, when = true) {
    const { navigator } = useContext(NavigationContext);
  
    useEffect(( ) => {
      if(!when) return;
      
      const unblock = navigator.block((tx) => {
        const autoUnblockingTx = {
          ...tx,
          retry( ) {
            unblock( );
            tx.retry( );
          },
        };
        blocker(autoUnblockingTx);
      });
      return unblock;
    }, [navigator, blocker, when]);
};
  
export function usePrompt(message, when = true) {
    const blocker = useCallback((tx) => {
        // eslint-disable-next-line no-alert
        if(window.confirm(message)) tx.retry( );
    }, [message]);
      
    useBlocker(blocker, when);
};

const ProductReviewForm = () => {
    const navigate = useNavigate();
    const params = useParams();
    console.log(params.productId)

    const dispatch = useDispatch();
    const loggingIn = useSelector(state => state.ui.loggingIn);
    const users = useSelector(state => state.signup.users);
    const user = useSelector(state => state.login.input);

    const [enteredScope, setEnteredScope] = useState(5);
    const [enteredText, setEnteredText] = useState('');
    const [isEntered, setIsEntering] = useState(false);

    const focusInputHandler = () => {
        setIsEntering(true);
    }

    const scopeChangeHandler = event => {
        setEnteredScope(event.target.value);
    };

    const textChangeHandler = event => {
        setEnteredText(event.target.value);
    };

    let usersName;

    for(const key in users) {
        if(users[key].email === user.email) {
            if(users[key].password === user.password) {
                usersName = users[key].name
                break;
            }
        }
    }

    const addReviewHandler = () => {
        console.log(enteredScope, enteredText);
        if(loggingIn) {
            setEnteredScope(5);
            setEnteredText('');
            setIsEntering(false);
            dispatch(sendReviewData({
                id: Math.floor(Math.random() * 10),
                name: usersName,
                scope: enteredScope,
                text: enteredText
            }, params.productId));
            //dispatch(uiActions.changeLoadingState(true));
        } else {
            //dispatch(uiActions.toggleUserForm(true));
            setEnteredText('You need to log in to write a review.');
        };
    };

    usePrompt("Hello from usePrompt —- Are you sure you want to leave?", isEntered);

    const submitHandler = event => {
        event.preventDefault();

        setTimeout(() => {
            navigate('/products');
            navigate(`/products/${params.productId}`);
        }, 800);
    };

    return (
        <form className={classes['review-form']} onSubmit={submitHandler}>
            <div className={classes['review-form-top']}>
                <div className={classes.reviewer}>{usersName ? usersName : null}</div>
                <label htmlFor='scope'><FaStar /></label>
                <input type="number" min="1" max="5" step="0.5" id="scope" value={enteredScope} onChange={scopeChangeHandler} onFocus={focusInputHandler} />
            </div>
            <div className={classes['review-form-bottom']}>
                <textarea className={classes['text-area']} wrap='hard' rows="3" value={enteredText} onChange={textChangeHandler} onFocus={focusInputHandler} />
                <button onClick={addReviewHandler}>Add</button>
            </div>
        </form>
    )
};

export default ProductReviewForm;

//리뷰를 등록한 다음 해당 페이지를 벗어나지 않고 등록된 리뷰를 loaindSpinner를 보여준 다음 바로 보여주고 싶은데
//navigate(`/products/${params.productId}`);만 했을 때는 페이지가 움직이지 않아 등록된 리뷰들이 fetch되지 않아서 
//새로 등록한 리뷰를 볼 수 없었다.
//navigate(`/products/${params.productId}`);하기전에 products 페이지에 잠깐 갔다가 바로 해당 페이지로 돌아오니 
//등록된 리뷰가 fetch 되어 바로 볼 수 있는 것처럼 되었다.
//그러나 더 연구해봐야 할 듯 싶다. 
//setTimeout을 사용한 이유는 사용자에게 loadingSpinner를 무조건적으로 보여주기 위해서이다.