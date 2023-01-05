import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { CustomerProductComponent } from './components/customer-product/customer-product.component';
import { CustomerComponent } from './components/customer/customer.component';
import { OrderComponent } from './components/order/order.component';
import { ProductsComponent } from './components/products/products.component';
import { ShipperComponent } from './components/shipper/shipper.component';

const routes: Routes = [
        {path:"shipper",component:ShipperComponent},
        {path:"admin/product",component:ProductsComponent},
        {path:"cart",component:CartComponent},
        {path:"customer",component:CustomerComponent},
        {path:"order",component:OrderComponent},
        {path:"",component:CustomerProductComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
