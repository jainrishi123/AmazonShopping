import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { CustomerComponent } from './components/customer/customer.component';
import { OrderComponent } from './components/order/order.component';
import { ProductsComponent } from './components/products/products.component';
import { ShipperComponent } from './components/shipper/shipper.component';

const routes: Routes = [
        {path:"shipper",component:ShipperComponent},
        {path:"",component:ProductsComponent},
        {path:"cart",component:CartComponent},
        {path:"customer",component:CustomerComponent},
        {path:"order",component:OrderComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
