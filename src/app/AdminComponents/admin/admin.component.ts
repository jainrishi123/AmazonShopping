import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsComponent } from '../products/products.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  activeTab:any=ProductsComponent;

  constructor(private route:ActivatedRoute){

  }

  ngOnInit(){
    this.route.data.subscribe(ele =>{
      if(ele && ele['component']){
        this.activeTab=ele['component']
      }
    });
  }
}
