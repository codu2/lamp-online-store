import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalQuantity: 0,
        changed: false
    },
    reducers: {
        addProductDetailItemToCart(state, action) {
            const detailItem = action.payload;
            const existingItem = state.items.find(item => item.id === detailItem.id);
            if(!existingItem) {
                state.items.push({
                    id: detailItem.id,
                    name: detailItem.name,
                    price: detailItem.price,
                    img: detailItem.img,
                    color: detailItem.color,
                    quantity: detailItem.quantity,
                    totalPrice: detailItem.price * detailItem.quantity
                });
                state.totalQuantity = state.totalQuantity + detailItem.quantity;
            } else {
                state.totalQuantity = state.totalQuantity + detailItem.quantity;
                existingItem.totalQuantity = existingItem.totalQuantity + detailItem.quantity;
                existingItem.totalPrice = existingItem.totalPrice + detailItem.price * detailItem.quantity;
            };
        },
        replaceCart(state, action) {
            state.items = action.payload.items;
            state.totalQuantity = action.payload.totalQuantity;
        },
        addItemToCart(state, action) {
            const newItem = action.payload; //object
            const existingItem = state.items.find(item => item.id === newItem.id); 
            //새로 추가하려는 item이 이미 cart의 items 배열에 존재하는지 확인
            state.totalQuantity++; //새로운 item이던 아니던 일단 추가되면 전체 수량을 하나 증가시킴
            if(!existingItem) { // item이 cart의 items에 존재하지 않는다면
                state.items.push({
                    id: newItem.id,
                    name: newItem.name,
                    price: newItem.price,
                    img: newItem.img,
                    color: newItem.color,
                    quantity: 1, // cart items에 처음 추가하는 것이므로 수량은 1로 정함
                    totalPrice: newItem.price 
                    // 일단 수량이 하나이므로 price 값으로 함. 이 items는 cart 안에 있는 것이므로 totalPrice가 필요함
               });
            } else {
               existingItem.quantity++; 
               existingItem.totalPrice = existingItem.totalPrice + newItem.price; 
            };
            state.changed = true;
        },
        removeItemFromCart(state, action) {
            const newItemId = action.payload; //이번에는 cart에서 삭제하려는 item의 id를 받음
            const existingItem = state.items.find(item => item.id === newItemId);
            state.totalQuantity--; // 삭제하려는 item의 수량이 1이건 1보다 많건 일단 전체 수량 중 하나를 빼줌
            if(existingItem.quantity === 1) { // cart에 존재하는 해당 item의 수량이 1이면
                state.items = state.items.filter(item => item.id !== newItemId);
            } else {
                existingItem.quantity--;
                existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
            };
            state.changed = true;
        }
    }
});

export const cartActions = cartSlice.actions;

export default cartSlice; 
