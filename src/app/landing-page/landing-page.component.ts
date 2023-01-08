import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { Customer } from '../models/Customer';
import { AllService } from '../service/all.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {
formOpen:boolean=false;
closeResult: string;
customer: Customer = new Customer();

constructor( private router:Router,private modalService: NgbModal, private landingPageService:AllService){

}
fun(){
  this.formOpen=!this.formOpen
}

setCustomer(id){
  if(!id){
    Swal.fire({
      showConfirmButton: false,
      timer: 3000,
      title: "Please Enter Customer Id",
      icon: 'error'
    })
  }
  else{
  this.landingPageService.findCustomerById(id).subscribe(res =>{
    localStorage.setItem('customerId',id)
    this.router.navigate(['/user'])
  },
  (error)=>
  Swal.fire({
    showConfirmButton: false,
    timer: 3000,
    title: error.error,
    icon: 'error'
  })
  )
}
}

addCustomer() {
  this.landingPageService.addCustomer(this.customer).subscribe(res => {
    Swal.fire({
      showConfirmButton: false,
      timer: 3000,
      title: res,
      icon: 'success'
    })
  },
    (error) => {
      Swal.fire({
        showConfirmButton: false,
        timer: 3000,
        title: error.error,
        icon: 'error'
      })
    })
  this.modalService.dismissAll();

}

open(content) {
  this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}

private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return `with: ${reason}`;
  }
}

}
