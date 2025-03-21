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
  
  { path: 'products', component: AllProductsComponent },
  { path: 'products/add', component: AddProductComponent },
  { path: 'products/:id', component: OneproductComponent },
  { path: 'products/delete/:id', component: DeleteproductComponent },
  { path: 'products/update/:id', component: UpdateproductComponent },
];
