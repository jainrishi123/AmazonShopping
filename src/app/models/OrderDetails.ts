import { Product } from "./Product"

export interface OrderDetails {
    quantity:number
    productID?:number
    product?:Product
}
