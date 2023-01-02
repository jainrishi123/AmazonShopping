import { Customer } from "./Customer"
import { OrderDetails } from "./OrderDetails"
import { Shipper } from "./shipper"

export class Order{
    orderId:number
    date:string
    customerID:number
    customer:Customer
    shipperID:number
    shipper:Shipper
    orderDetails:OrderDetails[]
}