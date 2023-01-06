import { Component, OnInit } from '@angular/core';
import { Shipper } from 'src/app/models/shipper';
import { AllService } from 'src/app/service/all.service';

@Component({
  selector: 'app-shipper',
  templateUrl: './shipper.component.html',
  styleUrls: ['./shipper.component.css']
})
export class ShipperComponent  implements OnInit{
  shippers:Shipper[]
  private shipperService:AllService;
  
  
  constructor(service : AllService) { 
    this.shipperService = service;
  }
  
  ngOnInit(): void {
    this.getShippers()
    this.shipperService.shipperListModified.subscribe(res => {
      this.getShippers()
    })
  }
  
  getShippers() {
    this.shipperService.getShippers()
      .subscribe(res => {
        this.shippers = res;
      });
  }
  
  
  }