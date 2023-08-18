import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { Product } from "../../types/Product";
import axios, { AxiosError } from "axios";
import { NewProduct } from "../../types/NewProduct";
import { UpdateSingleProduct } from "../../types/UpdateProduct";



interface ProductReducer {
    loading: boolean
    error: string
    products: Product[]
    updates: UpdateSingleProduct,
    deleteResponse: boolean,
}
const initialState: ProductReducer = {
    loading: false,
    error: "",
    products: [],
    updates: {
        title: '',
        price: 0,
        description: ''
    },
    deleteResponse: false
}
export const fetchAllProducts = createAsyncThunk(
    "fetchAllProducts",
    async () => {
        try {
            const result = await axios.get<Product[]>("http://localhost:5296/api/v1/products/all")
            return result.data
        } catch (e) {
            const error = e as AxiosError
            return error.message
        }
    }
)
// export const fetchRangeProduct = createAsyncThunk(
//     "fetchRangeProduct",
//     async ({min,max, categoryId}: { min?:number, max?:number, categoryId?:number}) => {
//         try {
//             console.log(categoryId);
//             if(categoryId===100){
//                 const result = await axios.get<Product[]>(`https://api.escuelajs.co/api/v1/products/?price_min=${min}&price_max=${max}`);
//                 return result.data
//             }
//             else{
//                 const result = await axios.get<Product[]>(`https://api.escuelajs.co/api/v1/products/?price_min=${min}&price_max=${max}&categoryId=${categoryId}`);
//                 return result.data
//             }
           
           
//         } catch (e) {
//             const error = e as AxiosError
//             return error.message
//         }
//     }
// )
export const createNewProduct = createAsyncThunk(
    "createNewProduct",
    async ({ newProduct }: { newProduct: NewProduct }) => {
        try {
            console.log(newProduct);
            const result = await axios.post<Product>("http://localhost:5296/api/v1/products", newProduct)
            return result.data
        } catch (e) {
            const error = e as AxiosError
            if (error.response) {
                return JSON.stringify(error.response.data)
            }
            return error.message
        }
    }
)
export const updateSingleProduct = createAsyncThunk(
    'updateAProduct',
    async ({ productData, productId }: { productData: UpdateSingleProduct, productId: string }) => {
        try {
            const result = await axios.patch<Product>(`http://localhost:5296/api/v1/products/${productId}`, productData);
            return result.data;
        } catch (e) {
            const error = e as AxiosError;
            return error;
        }
    }
)
export const deleteSingleProduct = createAsyncThunk(
    'deleteAProduct',
    async ({ productId}: { productId: string}) => {
      try {
        const result = await axios.delete(`http://localhost:5296/api/v1/products/${productId}`);
        return result.data; 
      } catch (e) {
        const error = e as AxiosError;
        return error;
      }
    }
)
export const fetchFromCategory = createAsyncThunk(
    'fetchACategory',
    async ({ categoryId}: { categoryId: number }) => {
      try {
        const result = await axios.get<Product[]>(`https://api.escuelajs.co/api/v1/products/?categoryId=${categoryId}`);
        return result.data
      } catch (e) {
        const error = e as AxiosError;
        return error;
      }
    }
)

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        cleanUpProductReducer: (state) => {
            return initialState
        },
        sortByPrice: (state, action: PayloadAction<"Low" | "High">) => {
            if (action.payload === "Low") {
                state.products.sort((a, b) => b.price - a.price)
            } else {
                state.products.sort((a, b) => a.price - b.price)
            }
        },

    }, // list of methods to modify the state,
    extraReducers: (build) => {
        build
            .addCase(fetchAllProducts.pending, (state, action) => {
                state.loading = true
            })
            .addCase(fetchAllProducts.rejected, (state, action) => {
                state.loading = false
                state.error = "Cannot perform this action. Please try again later"
            })
            .addCase(fetchAllProducts.fulfilled, (state, action) => {
                state.loading = false
                if (typeof action.payload === "string") {
                    state.error = action.payload
                } else {
                    state.products = action.payload
                }
            })
            .addCase(createNewProduct.fulfilled, (state, action) => {
                if (typeof action.payload === "string") {
                    state.error = action.payload
                } else {
                    state.products.push(action.payload)
                }
                state.loading = false
            })
            .addCase(updateSingleProduct.fulfilled, (state, action) => {
                console.log(action);
                if (action.payload instanceof AxiosError) {
                    state.error = action.payload.message
                } else {
                    state.updates = action.payload
                }
                state.loading = false
              })
              .addCase(updateSingleProduct.pending, (state, action) => {
                state.loading = true
              })
              .addCase(updateSingleProduct.rejected, (state, action) => {
                state.error = "Cannot fetch data"
              })
              .addCase(deleteSingleProduct.fulfilled, (state, action) => {
                if (action.payload instanceof AxiosError) {
                  state.error = action.payload.message
                } else {
                  state.deleteResponse = action.payload;
                }
                state.loading = false
              })
              .addCase(deleteSingleProduct.pending, (state, action) => {
                state.loading = true;
              })
              .addCase(deleteSingleProduct.rejected, (state, action) => {
                state.error = "Cannot fetch data";
              })
              .addCase(fetchFromCategory.fulfilled, (state, action) => {
                if (action.payload instanceof AxiosError) {
                    state.error = action.payload.message
                } else {
                    state.products = action.payload
                }
                state.loading = false
            })
            .addCase(fetchFromCategory.pending, (state, action) => {
                state.loading = true
            })
            .addCase(fetchFromCategory.rejected, (state, action) => {
                state.error = "Couldn't fetch data"
            })
            // .addCase(fetchRangeProduct.pending, (state, action) => {
            //     state.loading = true
            // })
            // .addCase(fetchRangeProduct.rejected, (state, action) => {
            //     state.loading = false
            //     state.error = "Cannot perform this action. Please try again later"
            // })
            // .addCase(fetchRangeProduct.fulfilled, (state, action) => {
            //     state.loading = false
            //     if (typeof action.payload === "string") {
            //         state.error = action.payload
            //     } else {
            //         state.products = action.payload
            //     }
            // })
    }
})
const productsReducer = productsSlice.reducer
export const { cleanUpProductReducer, sortByPrice } = productsSlice.actions
export default productsReducer