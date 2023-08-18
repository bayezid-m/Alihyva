import { NewProduct } from "../../types/NewProduct";
import { Product } from "../../types/Product";


const product1: Product = {
    id: "43t4",
    title: "a product",
    price: 100,
    description: "product1",
    url: [],
    category: "electric",
    inventory: 2
}
const product2: Product = {
    id: "derg34",
    title: "b product",
    price: 110,
    description: "product2",
    url: [],
    category: "clotch",
    inventory: 2
}
const product3: Product = {
    id: "4g3hg5h",
    title: "c product",
    price: 130,
    description: "product1",
    url: [],
    category: "electric",
    inventory: 2
}
const product4: Product = {
    id: "4gtt54",
    title: "d product",
    price: 140,
    description: "product4",
    url: [],
    category: "food",
    inventory: 2
}
const newProduct: NewProduct = {
    title: "E product",
    price: 500,
    description: "new product",
    url: [""],
    category: "food",
    inventory: 2
}
const invalidProduct: NewProduct = {
    title: "B product",
    price: 0,
    description: "new product",
    url: [],
    category: "cloth",
    inventory: 2
}
export { product1, product2, product3, product4, newProduct, invalidProduct}