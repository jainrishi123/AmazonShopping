export interface Product{
    productID : number
    productName : string
    unit : number
    price : number
    supplierId : number
}

export class ProductVo implements Product{
    productID: number
    productName: string
    unit: number
    price: number
    supplierId: number

}