import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductsComponent } from './AdminComponents/products/products.component';
import { CartComponent } from './UserComponents/cart/cart.component';
import { ShipperComponent } from './AdminComponents/shipper/shipper.component';
import { CustomerComponent } from './AdminComponents/customer/customer.component';
import { OrderComponent } from './UserComponents/order/order.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomerProductComponent } from './UserComponents/product/customer-product.component';
import { AdminComponent } from './AdminComponents/admin/admin.component';
import { UserComponent } from './UserComponents/user/user.component';
import { AllOrdersComponent } from './AdminComponents/all-orders/all-orders.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ProductsComponent,
    CartComponent,
    ShipperComponent,
    CustomerComponent,
    OrderComponent,
    CustomerProductComponent,
    AdminComponent,
    UserComponent,
    AllOrdersComponent,    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
