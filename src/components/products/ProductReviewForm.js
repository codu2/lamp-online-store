import React, { useState, useContext, useCallback, useEffect } from 'react';
import { UNSAFE_NavigationContext as NavigationContext, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import classes from './ProductReviewForm.module.css';
import { FaStar } from 'react-icons/fa';
import { sendReviewData, fetchReviewData } from '../../store/cart-action';
import { uiActions } from '../../store/ui-slice';

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

const scope_array = [0, 1, 2, 3, 4];

const ProductReviewForm = () => {
    const params = useParams();
    const { productId } = params;

    const dispatch = useDispatch();
    const loggingIn = useSelector(state => state.ui.loggingIn);
    const users = useSelector(state => state.signup.users);
    const user = useSelector(state => state.login.input);
    const scope = useSelector(state => state.ui.scope);

    const [enteredText, setEnteredText] = useState('');
    const [isEntered, setIsEntering] = useState(false);
    const [clicked, setClicked] = useState([
        false, false, false, false, false
    ]);

    const focusInputHandler = () => {
        setIsEntering(true);
    }

    const textChangeHandler = event => {
        setEnteredText(event.target.value);
    };
    
    const starClickHandler = index => {
        let clickedStates = [...clicked];
        for(let i = 0; i < 5; i++) {
            clickedStates[i] = i <= index ? true : false;
        };
        setClicked(clickedStates);
    };
    
    const getScopeNum = useCallback(() => {
        let scopeNum = clicked.filter(Boolean).length;
        dispatch(uiActions.replaceScopeNum(scopeNum));
    }, [clicked, dispatch]);

    useEffect(() => {
        getScopeNum();
    }, [clicked, getScopeNum]);

    let usersName;

    for(const key in users) {
        if(users[key].email === user.email) {
            if(users[key].password === user.password) {
                usersName = users[key].name
                break;
            }
        }
    }
    
    const reviews = useSelector(state => state.ui.reviews);
    let randomId = Math.floor(Math.random() * 24);
    let id_array = [];

    for(const key in reviews) {
        id_array.push(reviews[key].id);
    };

    const existingId = id_array.find(id => id === randomId);

    if(existingId) {
        randomId = Math.floor(Math.random() * 1000);
    };

    const addReviewHandler = () => {
        if(loggingIn) {
            setEnteredText('');
            setIsEntering(false);
            dispatch(sendReviewData({
                id: randomId,
                name: usersName,
                scope: scope,
                text: enteredText
            }, productId));
            //dispatch(uiActions.changeLoadingState(true));
        };
    };

    usePrompt("Hello from usePrompt —- Are you sure you want to leave?", isEntered);

    const submitHandler = event => {
        event.preventDefault();

        setTimeout(() => {
            dispatch(fetchReviewData(productId));
        }, 800);
        
        setClicked([
            false, false, false, false, false
        ]);
    };

    return (
         <div className={classes['review-container']}>
            {!loggingIn && 
                <div className={classes['block-form']}>
                    <p>You need to log in to write a review.</p>
                </div>
            }
            <form className={classes['review-form']} onSubmit={submitHandler}>
                <div className={classes['review-form-top']}>
                    <div className={classes.reviewer}>{usersName ? usersName : null}</div>
                    <div className={classes.star}>
                        {
                            scope_array.map((el, idx) => {
                                return <FaStar key={idx} size="18" onClick={() => starClickHandler(el)} className={clicked[el] && classes.clicked} />
                            })
                        }
                    </div>
                </div>
                <div className={classes['review-form-bottom']}>
                    <textarea className={classes['text-area']} wrap='hard' rows="3" value={enteredText} onChange={textChangeHandler} onFocus={focusInputHandler} />
                    <button onClick={addReviewHandler}>Add</button>
                </div>
            </form>
         </div>
    )
};

export default ProductReviewForm;
