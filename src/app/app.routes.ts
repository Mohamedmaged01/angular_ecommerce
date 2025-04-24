import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { SidebarComponent } from './admin/sidebar/sidebar.component';
import { CategoryComponent } from './admin/category/category.component';
import { AddcategoryComponent } from './admin/addcategory/addcategory.component';
import { CategorydetailsComponent } from './admin/categorydetails/categorydetails.component';
import { CustomerComponent } from './admin/customer/customer.component';
import { CustomerdetailsComponent } from './admin/customerdetails/customerdetails.component';
import { UpdatecustomerComponent } from './admin/updatecustomer/updatecustomer.component';
import { OrderComponent } from './admin/order/order.component';
import { OrderdetailsComponent } from './admin/orderdetails/orderdetails.component';
import { AddProductComponent } from './admin/addproduct/addproduct.component';
import { AllProductsComponent } from './admin/allproducts/allproducts.component';
import { OneproductComponent } from './admin/oneproduct/oneproduct.component';
import { DeleteproductComponent } from './admin/deleteproduct/deleteproduct.component';
import { UpdateproductComponent } from './admin/updateproduct/updateproduct.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  {
    path: 'order',
    component: OrderComponent,
    title: 'Order',
  },

  {
    path: 'admin',
    component: AdminHomeComponent,
    title: 'Home page',
  },
  {
    path: 'adminHome',
    component: AdminHomeComponent,
    title: 'admin Home page',
  },
  {
    path: 'category',
    component: CategoryComponent,
    title: 'Category',
  },
  {
    path: 'addcategory',
    component: AddcategoryComponent,
    title: 'Add Category',
  },
  {
    path: 'categorydetails/:id',
    component: CategorydetailsComponent,
    title: 'Category Details',
  },

  {
    path: 'customer',
    component: CustomerComponent,
    title: 'Customer',
  },
  {
    path: 'customerdetails/:id',
    component: CustomerdetailsComponent,
    title: 'Customer Details',
  },
  {
    path: 'updatecustomer/:id',
    component: UpdatecustomerComponent,
    title: 'Update Customer',
  },
  {
    path: 'order',
    component: OrderComponent,
    title: 'Order',
  },
  { path: 'adminproducts/add', component: AddProductComponent },
  { path: 'adminproducts/:id', component: OneproductComponent },
  { path: 'adminproducts/delete/:id', component: DeleteproductComponent },
  { path: 'adminproducts/update/:id', component: UpdateproductComponent },
  {
    path: 'orderdetails/:id',
    component: OrderdetailsComponent,
    title: 'Order Details',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
