import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { Customer } from '../models/Customer';
import { Order } from '../models/order';
import { Product } from '../models/Product';
import { Shipper } from '../models/shipper';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AllService {
  private base_product:string = 'http://localhost:9086/v1/products'
  private base_shipper = 'http://localhost:9086/v1/shipper'
  private base_customer = 'http://localhost:9086/v1/customer'
  private base_order = 'http://localhost:9086/v1/order'

  cartProductList: any; 


  private _productListModified = new Subject<void>();
  private _shipperListModified = new Subject<void>();
  private _customerListModified = new Subject<void>();
  // private _orderListModified=new Subject<void>();
  _cartListModified = new Subject<void>();


  constructor(private httpClient: HttpClient) {
    this.getProducts().subscribe();
    
    if(localStorage.getItem("cartProducts")!=undefined){
    this.cartProductList = JSON.parse(localStorage.getItem('cartProducts'))
    }
    
  }

  get productListModified() {
    return this._productListModified;
  }

  get shipperListModified() {
    return this._shipperListModified;
  }

  get customerListModified() {
    return this._customerListModified;
  }

  get CartListModified() {
    return this._cartListModified;
  }
  // get orderListModified(){
  //   return this._orderListModified
  // }

  getShippers(): Observable<Shipper[]> {
    console.log("on getShippers")
    return this.httpClient.get<[Shipper]>(this.base_shipper)
  }

 public getProducts(): Observable<Product[]> {
    console.log("on getProducts")
    return this.httpClient.get<[Product]>(this.base_product)
  }

  getCustomers(): Observable<Customer[]> {
    console.log("on getCustomers")
    return this.httpClient.get<[Customer]>(this.base_customer)
  }

  getOrders(): Observable<Order[]> {
    console.log("on order");
    return this.httpClient.get<[Order]>(this.base_order)
    
  }

  addProducts(product: Product): any {
    return this.httpClient.post(this.base_product, [product], { responseType: 'text' }).pipe(
      tap(() => {
        this._productListModified.next();
      })
    );
  }

  addOrder(order: Order) {
    return this.httpClient.post(this.base_order, order, { responseType: 'text' }).pipe(
      tap(() => {
        this._cartListModified.next();
      })
    );
  }

  addCustomer(customer:Customer){
    return this.httpClient.post(this.base_customer,customer,{ responseType: 'text' }).pipe(
      tap(() => {
        this._customerListModified.next();
      })
    );
  }

  findProductById(id) {
    return this.httpClient.get<Product>(this.base_product + '/' + id)
  }

  deleteProduct(id) {
    return this.httpClient.delete(this.base_product + '/' + id, { responseType: 'text' }).pipe(
      tap(() => {
        this._productListModified.next();
      })
    );
  }

  deleteCustomer(id){
    return this.httpClient.delete(this.base_customer + '/' + id, { responseType: 'text'}).pipe(
      tap(() =>{
        this._customerListModified.next();
      })
    )
  }

  editProduct(product: Product) {
    return this.httpClient.put(this.base_product, [product], { responseType: 'text' }).pipe(
      tap(() => {
        this._productListModified.next();
      })
    );
  }

  editCustomer(customer: Customer) {
    return this.httpClient.put(this.base_customer, customer, { responseType: 'text' }).pipe(
      tap(() => {
        this._customerListModified.next();
      })
    );
  }

  addcart(product:Product){
    this.cartProductList.push(product.productID);
        Swal.fire({
          showConfirmButton: false,
          timer: 2000,
          title: 'Product Added To Cart',
          text: "Product Name:" + product.productName,
          icon: 'success'
        })
      
      localStorage.setItem('cartProducts', JSON.stringify(this.cartProductList))
      this._cartListModified.next();
  }

  removeCart(product:Product){
    this.cartProductList = this.cartProductList.filter(product1 => product1 !== product.productID)
        Swal.fire({
          showConfirmButton: false,
          timer: 2000,
          title: 'Product Removed from cart',
          text: "Product Name:" + product.productName,
          icon: 'success'
        })
        localStorage.setItem('cartProducts', JSON.stringify(this.cartProductList))
        this._cartListModified.next();
  }

  setCartIcon(productId) {
    return ! JSON.parse(localStorage.getItem('cartProducts')).includes(productId);
    }
}

