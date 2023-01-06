import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/Customer';
import { AllService } from 'src/app/service/all.service';
import Swal from 'sweetalert2';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customerService: AllService
  customers: Customer[]
  customer: Customer = new Customer();
  closeResult: string;

  constructor(customerService: AllService, private modalService: NgbModal) {
    this.customerService = customerService
  }

  ngOnInit(): void {
    this.getCustomers()
    this.customerService.customerListModified.subscribe(res => {
      this.getCustomers()
    })
  }

  getCustomers() {
    this.customerService.getCustomers()
      .subscribe(res => {
        this.customers = res;
      });
  }

  deleteCustomer(id) {
    this.customerService.deleteCustomer(id).subscribe(res => {
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
          text: "Customer Order is Present",
          title: "Customer Cannot be Deleted",
          icon: 'error'
        })
      })
  }

  addCustomer() {
    this.customerService.addCustomer(this.customer).subscribe(res => {
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

  editCustomer() {
    this.customerService.editCustomer(this.customer)
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
          title: error.error,
          icon: 'error'
        })
      })
    this.customer = new Customer();
    this.modalService.dismissAll();
  }

  setEditCustomerId(customer: Customer) {
    this.customer = customer
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
