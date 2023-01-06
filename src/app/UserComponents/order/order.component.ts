import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { AllService } from 'src/app/service/all.service';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { Product } from 'src/app/models/Product';
import { OrderDetails } from 'src/app/models/OrderDetails';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orders: Order[] = []
  private orderService: AllService;

  ngOnInit(): void {
    // this.orderService.getProducts().subscribe(res =>{
    //   this.orderService.productList=res
    this.findOrderByCustomerId();

  }

  findOrderByCustomerId() {
    this.orderService.findOrderByCustomerId().subscribe(res => {
      this.orders = res;
    });
  }

  constructor(orderService: AllService) {
    this.orderService = orderService;


  }

  getOrders() {
    this.orderService.getOrders()
      .subscribe(res => {
        this.orders = res;
      });
  }

  price(orderDetails: OrderDetails[]) {
    return orderDetails.map(ob =>
      ob.product.price).reduce((prev, curr) => prev + curr);
  }
}
