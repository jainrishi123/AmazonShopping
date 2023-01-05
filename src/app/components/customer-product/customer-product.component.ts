import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Product } from 'src/app/models/Product';
import { AllService } from 'src/app/service/all.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer-product',
  templateUrl: './customer-product.component.html',
  styleUrls: ['./customer-product.component.css']
})
export class CustomerProductComponent implements OnInit {
  products: Product[];
  editBtnState: boolean = false;
  range: number = 0;
  product: Product = new Product();
  private customerProductService: AllService;
  closeResult: string;


  constructor(customerProductService: AllService, private modalService: NgbModal) {
    this.customerProductService = customerProductService;
    console.log("product Constructor")

  }

  ngOnInit(): void {
    this.getProducts()
    this.customerProductService.productListModified.subscribe(res => {
      this.getProducts(),
        console.log("Product Onint")
    })


  }


  getProducts() {
    this.customerProductService.getProducts()
      .subscribe(res => {
        this.products = res;
      });
  }

  addCart(product: Product) {
    this.customerProductService.addcart(product);
  }

  removeCart(product: Product) {
    console.log("remove icon")
    this.customerProductService.removeCart(product);
  }
  

  productCartIcon(productId) {
    return this.customerProductService.setCartIcon(productId);
  }

  

}

