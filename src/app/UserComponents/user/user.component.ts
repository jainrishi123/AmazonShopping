import { Component } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Customer } from 'src/app/models/Customer';
import { AllService } from 'src/app/service/all.service';
import Swal from 'sweetalert2';
import { CustomerProductComponent } from '../product/customer-product.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  closeResult: string;
  userService: AllService
  customer:Customer=new Customer();
  customerName:Customer=new Customer();

  activeTab:any=CustomerProductComponent;
  constructor(private route:ActivatedRoute,private modalService: NgbModal,userService:AllService){
    this.userService=userService
  }
  ngOnInit(){
    this.route.data.subscribe(ele =>{
      if(ele && ele['component']){
        this.activeTab=ele['component']
      }
    });
  }

  getCustomerName(){
    this.userService.findCustomerById().subscribe(res=>{
     this.customerName= res
  })
  return this.customerName.customerName;
  }
  addCustomer(){
    this.userService.addCustomer(this.customer).subscribe(res=>{
      Swal.fire({
        showConfirmButton: false,
        timer: 3000,
        title: res,
        icon: 'success'
      })
    },
    (error)=>{
      Swal.fire({
        showConfirmButton: false,
        timer: 3000,
        title:error.error,
        icon: 'error'
      })
    })
    this.modalService.dismissAll();

  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
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
