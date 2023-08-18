import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./reducers/productReducer";
import userReducer from "./reducers/userReducer";
import cartReducer from "./reducers/cartReducer";

const store = configureStore({
    reducer: {
        productsReducer,
        userReducer,
        cartReducer,
    },
    preloadedState: {
        productsReducer: {
            loading: false,
            error: "",
            products: [],
            updates: {
                title: '',
                price: 0,
                description: ''
            },
            deleteResponse: false
            
        },   
       // favReducer: favData
    }
})
// store.subscribe(() => {
//     localStorage.setItem("fav", JSON.stringify(store.getState().favReducer))
// })

export type GlobalState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch 
export default store