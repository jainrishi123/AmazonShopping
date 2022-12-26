import { Component, OnInit } from '@angular/core';
import { Product, ProductVo } from 'src/app/models/Product';
import { AllService } from 'src/app/service/all.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {
  products: Product[];
  addBtnState: boolean = false;
  editBtnState: boolean = false;
  range: number = 0;
  productVo: ProductVo = new ProductVo();
  private productService: AllService;
  constructor(productService: AllService) {
    productService.productList=productService.productList.filter(product1 => product1 !== null)
    this.productService = productService;
  }

  ngOnInit(): void {
    this.getProducts()
    this.productService.productListModified.subscribe(res => {
      this.getProducts()
    })
  }


  getProducts() {
    this.productService.getProducts()
      .subscribe(res => {
        this.products = res;
      });
  }

  addCart(product: Product) {

    this.productService.addCart(product)
    
  }



  addProducts() {
    console.log(this.productVo)
    this.addBtnState=false
    this.editBtnState=false
    // this.changeAddBtnState()
    // this.changeEditBtnState()
    this.productService.addProducts(this.productVo)
      .subscribe(res => {
        alert(res)
      },
        (error: any) => {
          console.log(error)
          alert(error.error)
        });
    this.productVo = new ProductVo();
  }

  openAddBtnState(){
    this.addBtnState=!this.addBtnState
    this.editBtnState=false
  }

  openEditBtnState(){
    this.editBtnState=!this.editBtnState
    this.addBtnState=false
  }

  // changeAddBtnState() {
  //   this.addBtnState = !this.addBtnState
  //   if (this.addBtnState) {
  //     this.editBtnState = false
  //   }
  // }

  // changeEditBtnState() {
  //   this.editBtnState = !this.editBtnState
  //   if (this.addBtnState) {
  //     this.addBtnState = false
  //   }
  // }

  deleteProduct(id) {
    this.productService.deleteProduct(id)
      .subscribe(res => {
        alert(res)
      }, (error) => {
        alert(error)
      });

  }


  editProduct() {
    this.editBtnState=false
    console.log(this.productVo)
    this.productService.editProduct(this.productVo)
      .subscribe(res => {
        alert(res)
      }, (error) => {
        alert(error.error)
      })

  }

  setEditProductId(product: Product) {
    // this.changeEditBtnState()
    this.editBtnState=true
    this.productVo = product
  }


}
