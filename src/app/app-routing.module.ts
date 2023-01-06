import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './UserComponents/cart/cart.component';
import { CustomerProductComponent } from './UserComponents/product/customer-product.component';
import { CustomerComponent } from './AdminComponents/customer/customer.component';
import { OrderComponent } from './UserComponents/order/order.component';
import { ProductsComponent } from './AdminComponents/products/products.component';
import { ShipperComponent } from './AdminComponents/shipper/shipper.component';
import { AdminComponent } from './AdminComponents/admin/admin.component';
import { UserComponent } from './UserComponents/user/user.component';
import { AllService } from './service/all.service';
import { AllOrdersComponent } from './AdminComponents/all-orders/all-orders.component';

const routes: Routes = [
        {path:"admin/shipper",component:AdminComponent,data:{ component:ShipperComponent}},
        {path:"admin/product",component:ProductsComponent},
        {path:"cart",component:UserComponent,data:{component:CartComponent}},
        {path:"admin/customer",component:AdminComponent,data:{component:CustomerComponent}},
        {path:"order",component:UserComponent,data:{component:OrderComponent}},
        {path:"",component:UserComponent},
        {path:"admin/products",component:ProductsComponent},
        {path:"admin",component:AdminComponent},
        {path:"admin/orders",component:AdminComponent,data:{component:AllOrdersComponent}}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
