import { configureStore } from "@reduxjs/toolkit"

import productsReducer from "../../redux/reducers/productReducer"

const store = configureStore({
    reducer: {
        productsReducer,
    }
})

export default store