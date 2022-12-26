export interface Shipper{
    shipperId:number
    shipperName:String
    phone:number
    }
    
    export class ShipperVo implements Shipper{
        shipperId:number
        shipperName:String
        phone:number
    }