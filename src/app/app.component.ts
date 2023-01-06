import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AllService } from './service/all.service';
import Swal from 'sweetalert2';
import { Customer } from './models/Customer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angularapp';
  router:Router;
  closeResult: string;
  appService: AllService
  customer:Customer=new Customer();
  customerId:number=1

  constructor( router: Router,private modalService: NgbModal,appService:AllService) {
    this.router=router
    console.log(this.getCurrentPage())
    this.appService=appService;
  }

  getCurrentPage(){
    if(this.router.url.startsWith("/admin")){
      return true
    }
    return false
  }
  
  ngOnInit() {}
  
  displayStyle = "none";
  
  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }

  // addCustomer(){
  //   this.appService.addCustomer(this.customer).subscribe(res=>{
  //     Swal.fire({
  //       showConfirmButton: false,
  //       timer: 3000,
  //       title: res,
  //       icon: 'success'
  //     })
  //   },
  //   (error)=>{
  //     Swal.fire({
  //       showConfirmButton: false,
  //       timer: 3000,
  //       title:error.error,
  //       icon: 'error'
  //     })
  //   })
  //   this.modalService.dismissAll();

  // }

  // open(content) {
  //   this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
  //     this.closeResult = `Closed with: ${result}`;
  //   }, (reason) => {
  //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //   });
  // }
  
  // private getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     return 'by pressing ESC';
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return 'by clicking on a backdrop';
  //   } else {
  //     return `with: ${reason}`;
  //   }
  // }

  setCustomerId(){
    localStorage.setItem('customerId',"");
    localStorage.setItem('customerId',JSON.stringify(this.customerId));
  }
}
