import { Product } from "./Product";


export default interface Cart {
    id: number,
    product: Product,
    quantities: number
}