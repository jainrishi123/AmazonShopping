import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { OrderDetails } from 'src/app/models/OrderDetails';
import { Product } from 'src/app/models/Product';
import { AllService } from 'src/app/service/all.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartProducts: Product[] = []
  private cartService: AllService
  buyBtnState: boolean = false
  order: Order = new Order()
  orderDetails: OrderDetails[] = []
  amount: number = 0

  ngOnInit(): void {
    this.getCartProducts()
    this.totalAmount();
    console.log("cart oninit")

  }

  totalAmount() {
    this.amount = 0
    this.cartService.cartProductList.forEach(id => {
      this.cartService.findProductById(id).subscribe(product1 => {
        this.amount = this.amount + product1.price * 1
      })
    })

  }


  getCartProducts() {
    if (this.cartService.cartProductList != undefined) {
      this.cartProducts = []
      this.cartService.cartProductList.forEach(id => {
        this.cartService.findProductById(id).subscribe(product1 => {
          this.cartProducts.push(product1)
        })
      })
    }
  }

  constructor(cartService: AllService) {
    console.log("cart constructor")
    this.cartService = cartService
    const now = new Date();
    this.order.date = now.toISOString().slice(0, 10);
    this.order.shipperID = 101;
    this.order.customerID = parseInt(localStorage.getItem("customerId"));
    this.cartService._cartListModified.subscribe(res => {
      this.getCartProducts()
    })
  }


  removeCart(product: Product) {
    this.cartService.removeCart(product)
    this.totalAmount();

  }

  BuyProducts() {
    this.orderDetails = [];

    this.cartProducts.forEach(element => {
      this.orderDetails.push({
        productID: element.productID,
        quantity: 1
      })
    });
    this.order.orderDetails = this.orderDetails;
    this.cartService.addOrder(this.order).subscribe(res =>
      Swal.fire({
        showConfirmButton: false,
        timer: 3000,
        title: res,
        icon: 'success'
      }).then(() => {
        this.emptyCart()
      })
      ,
      (error) => {
        Swal.fire({
          showConfirmButton: false,
          timer: 3000,
          title: error.error,
          icon: 'error'
        })
      }
    );


  }
  emptyCart() {
    this.cartProducts = []
    this.cartService.cartProductList = [];
    this.orderDetails = [];
    localStorage.setItem("cartProducts", JSON.stringify(this.cartProducts));
  }

  buyBtnStateChange() {
    this.buyBtnState = !this.buyBtnState;
  }
}
