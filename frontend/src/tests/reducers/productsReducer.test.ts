import { cleanUpProductReducer, fetchAllProducts, createNewProduct } from "../../redux/reducers/productReducer"
import { invalidProduct, newProduct } from "../data/products"
import productServer from "../servers/productServer"
import store from "../shared/store"


beforeEach(() =>{
    store.dispatch(cleanUpProductReducer())
})
beforeAll(() => {
    productServer.listen()
})
afterAll(() => {
    productServer.close()
})

describe("Test productReducers", () => {
    test("Check initial state", () => {
        expect(store.getState().productsReducer).toEqual({
            loading: false,
            error: "",
            products: []
        })
    })
    test("Check fetchAllProducts", async()=>{
        await store.dispatch(fetchAllProducts())
        expect(store.getState().productsReducer.products.length).toBe(4)
    })
    test("Check if a new product is created", async () => {
        await store.dispatch(createNewProduct({newProduct}))
        expect(store.getState().productsReducer.products.length).toBe(1)
    })
    test("Check if invalid product created", async () => {
        await store.dispatch(createNewProduct({newProduct:invalidProduct}))
        expect(store.getState().productsReducer.products.length).toBe(0)
        expect(store.getState().productsReducer.error).toBe(JSON.stringify(
            {
                statusCode: 400,
                message: [
                    "price must be a positive number",
                    "images must contain at least 1 image",
                    "category does not exist"
                ],
                error: "Bad Request"
            }
        ))
    })
})