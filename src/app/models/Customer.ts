export interface Customer{
    customerId:number
    postalCode:number
    customerName:string
    address:string
    city:string
    country:string
}
export class CustomerVo implements Customer{
    customerId:number
    postalCode:number
    customerName:string
    address:string
    city:string
    country:string

}