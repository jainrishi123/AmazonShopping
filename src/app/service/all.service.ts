import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, empty, Observable, Subject, tap } from 'rxjs';
import { Customer } from '../models/Customer';
import { Product, ProductVo } from '../models/Product';
import { Shipper } from '../models/shipper';


@Injectable({
  providedIn: 'root'
})
export class AllService {
  private base_product = 'http://localhost:9086/v1/products'
  private base_shipper = 'http://localhost:9086/v1/shipper'
  private base_customer = 'http://localhost:9086/v1/customer'
  productList: number[] = [null]


  httpClient: any;
  private _productListModified = new Subject<void>();
  private _shipperListModified = new Subject<void>();
  private _customerListModified = new Subject<void>();
  _cartListModified = new Subject<void>();


  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  get productListModified() {
    return this._productListModified;
  }

  get shipperListModified() {
    return this._shipperListModified;
  }

  get customerListModified(){
    return this._customerListModified;
  }

  getShippers(): Observable<Shipper[]> {
    console.log("on getShippers")
    return this.httpClient.get(this.base_shipper)
  }

  getProducts(): Observable<Product[]> {
    console.log("on getProducts")
    return this.httpClient.get(this.base_product)
  }

  getCustomers(): Observable<Customer[]> {
    console.log("on getCustomers")
    return this.httpClient.get(this.base_customer)
  }

  addProducts(product: ProductVo): any {
    return this.httpClient.post(this.base_product, [product], { responseType: 'text' }).pipe(
      tap(() => {
        this._productListModified.next();
      })
    );
  }

  findProductById(id) {
    return this.httpClient.get(this.base_product + '/' + id)
  }

  deleteProduct(id) {
    return this.httpClient.delete(this.base_product + '/' + id, { responseType: 'text' }).pipe(
      tap(() => {
        this._productListModified.next();
      })
    );
  }

  editProduct(product: ProductVo) {
    return this.httpClient.put(this.base_product, [product], { responseType: 'text' }).pipe(
      tap(() => {
        this._productListModified.next();
      })
    );
  }

  addCart(product: Product) {
    if (this.productList.includes(product.productID)) {
      this.productList = this.productList.filter(product1 => product1 !== product.productID)
    }
    else {
      this.productList.push(product.productID);
    }
    localStorage.setItem('cartProducts',JSON.stringify(this.productList))
    this._cartListModified.next();
  }

}

