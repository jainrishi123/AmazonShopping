import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { OrderDetails } from 'src/app/models/OrderDetails';
import { AllService } from 'src/app/service/all.service';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css']
})
export class AllOrdersComponent implements  OnInit {
   orders: Order[] = []
private allOrderService: AllService;

ngOnInit(): void {

  this.getOrders()
  // this.orderService.getProducts().subscribe(res =>{
  //   this.orderService.productList=res
  // })
  

}

constructor(orderService: AllService) {
  this.allOrderService = orderService;
  
 
}

getOrders() {
  this.allOrderService.getOrders()
    .subscribe(res => {
      this.orders = res;
    });
}

price(orderDetails:OrderDetails[])
{
  return orderDetails.map(ob => 
    ob.product.price).reduce((prev,curr)=>prev+curr);
}
}
