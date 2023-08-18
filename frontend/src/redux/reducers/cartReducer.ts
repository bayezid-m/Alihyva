import { PayloadAction,  createSlice } from "@reduxjs/toolkit";

import Cart from "../../types/CartItem";

interface CartUpdateQty{
    id: number,
    quantities: number
}

const initialState: {
    cart: Cart[] 
} = {
    cart: []
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addCartItem: (state, action: PayloadAction<Cart>) => {
            const isExist = state.cart.findIndex(c => c.product.id === action.payload.product.id);
            if (isExist !== -1) {
                state.cart[isExist].quantities = state.cart[isExist].quantities + action.payload.quantities;
            } else {
                state.cart.push(action.payload);
            }
        },
        updateQuantity: (state, action: PayloadAction<CartUpdateQty>) => {
            state.cart = state.cart.map((item) => {
              if (item.id === action.payload.id) {
                item.quantities = action.payload.quantities;
              }
              return item;
            });
        },
        deleteItem: (state,action: PayloadAction<Cart>) => {
            state.cart = state.cart.filter(item => item.id !== action.payload.id);
        },
        emptyCartReducer: (state) => {
            state.cart = []
        },
    }
})

const cartReducer = cartSlice.reducer
export const
    {
        addCartItem: addCartItem,
        emptyCartReducer,
        updateQuantity,
        deleteItem
    } = cartSlice.actions
export default cartReducer 