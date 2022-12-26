import { Component, OnInit } from '@angular/core';
import { timeout } from 'rxjs';
import { Product, ProductVo } from 'src/app/models/Product';
import { AllService } from 'src/app/service/all.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartProducts: Product[] = []
  private productService: AllService


  ngOnInit(): void {
    this.getCartProducts()
    this.productService._cartListModified.subscribe(res => {
      this.getCartProducts()
    })
  }

  getCartProducts() {
    this.cartProducts = []
    this.productService.productList.forEach(id => {
      this.productService.findProductById(id).subscribe(product1 =>{ this.cartProducts.push(product1) 
      })
    })

  }

  constructor(productService: AllService) {
    this.productService = productService
    // this.cartProducts=JSON.parse(localStorage.getItem('cartProducts'))
    this.productService.productList=JSON.parse(localStorage.getItem('cartProducts'))
  }

  
  removeCart(product: Product) {
    this.productService.addCart(product)
  }
}
