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
export const routes: Routes = [
  {
    path: '',
    component: SidebarComponent,
    title: 'Home page',
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
  {
    path: 'orderdetails/:id',
    component: OrderdetailsComponent,
    title: 'Order Details',
  },
  {
    path: 'addproduct',
    component: AddProductComponent,
    title: 'Add Product',
  },
];
