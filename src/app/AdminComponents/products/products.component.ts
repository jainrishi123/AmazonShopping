import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { AllService } from 'src/app/service/all.service';
import Swal from 'sweetalert2';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {
  products: Product[];
  editBtnState: boolean = false;
  range: number = 0;
  product: Product = new Product();
  private productService: AllService;
  closeResult: string;


  constructor(productService: AllService, private modalService: NgbModal, private router: Router) {
    // console.log(this.router.url)

    this.productService = productService;
    console.log("product Constructor")

  }

  ngOnInit(): void {
    this.getProducts()
    this.productService.productListModified.subscribe(res => {
      this.getProducts(),
        console.log("Product Onint")
    })
  }


  getProducts() {
    this.productService.getProducts()
      .subscribe(res => {
        this.products = res;
      });
  }

  // addCart(product: Product) {
  //   this.productService.addcart(product);
  // }

  // removeCart(product: Product) {
  //   console.log("remove icon")
  //   this.productService.removeCart(product);
  // }

  addProducts() {
    this.productService.addProducts(this.product)
      .subscribe(res => {
        Swal.fire({
          showConfirmButton: false,
          timer: 3000,
          title: res,
          text: 'New Product added',
          icon: 'success'
        })
      }, (error: any) => {
        Swal.fire({
          showConfirmButton: false,
          timer: 3000,
          title: error.error,
          icon: 'error'
        })
      });
    this.product = new Product();
    this.modalService.dismissAll();
  }

  deleteProduct(id) {
    this.productService.deleteProduct(id)
      .subscribe(res => {
        Swal.fire({
          showConfirmButton: false,
          timer: 3000,
          title: res,
          icon: 'success'
        })
      }, (error) => {
        Swal.fire({
          showConfirmButton: false,
          timer: 3000,
          title: "Product cannot be deleted",
          text: 'Product Present in Orders',
          icon: 'error'
        })
      });


  }


  editProduct() {
    this.editBtnState = false
    this.productService.editProduct(this.product)
      .subscribe(res => {
        Swal.fire({
          showConfirmButton: false,
          timer: 3000,
          title: res,
          icon: 'success'
        })
        this.product = new Product();
      }, (error) => {
        Swal.fire({
          showConfirmButton: false,
          timer: 3000,
          title: error.error,
          icon: 'error'
        })
      })
    this.product = new Product();
    this.modalService.dismissAll();
  }

  setEditProductId(product: Product) {
    this.product = product
  }

  // productCartIcon(productId) {
  //   return this.productService.setCartIcon(productId);
  // }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    this.productService.productListModified.next();
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }

  }

}
