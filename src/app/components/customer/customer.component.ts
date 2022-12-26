import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/Customer';
import { AllService } from 'src/app/service/all.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customerService: AllService
  customers: Customer[]

  constructor(customerService: AllService) {

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

}
