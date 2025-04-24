import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
<<<<<<< HEAD
=======
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './user/home/home.component';
import { CallbackComponent } from './user/callback/callback.component';
import { SignupComponent } from './user/signup/signup.component';
import { ListWishlistComponent } from './user/list-wishlist/list-wishlist.component';
import { ProductCardComponent } from './user/product-card/product-card.component';
import { CartComponent } from './user/cart/cart.component';
import { FlashSalesComponent } from './user/flash-sales/flash-sales.component';
import { ProductListComponent } from './user/products/products.component';
import { ProductDetailsComponent } from './user/product-details/product-details.component';
>>>>>>> cfc778f37f364fcf7db95d5992eaaf16feec3956
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
<<<<<<< HEAD
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
=======
import { ProductComponent } from './admin/product/product.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';

export const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'callback', component: CallbackComponent },
>>>>>>> cfc778f37f364fcf7db95d5992eaaf16feec3956

  {
    path: 'order',
    component: OrderComponent,
    title: 'Order',
  },
<<<<<<< HEAD

  {
    path: 'admin',
    component: AdminHomeComponent,
=======
  {
    path: 'wishlist',
    component: ListWishlistComponent,
    title: 'Wishlist',
  },
  {
    path: 'products',
    component: ProductCardComponent,
    title: 'Product',
  },
  {
    path: 'products/:id',
    component: ProductCardComponent,
    title: 'Product',
  },
  {
    path: 'cart',
    component: CartComponent,
    title: 'Cart',
  },

  {
    path: 'admin',
    component: SidebarComponent,
>>>>>>> cfc778f37f364fcf7db95d5992eaaf16feec3956
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
<<<<<<< HEAD

=======
  {
    path: 'category/:categoryName',
    component: ProductListComponent,
    title: 'Category Products'
  },
  {
    path: 'userproducts/:categoryId',
    component: ProductListComponent,
    title: 'Category Products'
  },
>>>>>>> cfc778f37f364fcf7db95d5992eaaf16feec3956
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
<<<<<<< HEAD
=======
  { path: 'adminproducts', component: ProductComponent },
>>>>>>> cfc778f37f364fcf7db95d5992eaaf16feec3956
  { path: 'adminproducts/add', component: AddProductComponent },
  { path: 'adminproducts/:id', component: OneproductComponent },
  { path: 'adminproducts/delete/:id', component: DeleteproductComponent },
  { path: 'adminproducts/update/:id', component: UpdateproductComponent },
  {
    path: 'orderdetails/:id',
    component: OrderdetailsComponent,
    title: 'Order Details',
  },
<<<<<<< HEAD
=======
  { path: '', component: HomeComponent },
  { path: 'flash-sales', component: FlashSalesComponent },
  { path: 'userproducts', component: ProductListComponent },
  { path: 'userproductsdetailes/:id', component: ProductDetailsComponent },
>>>>>>> cfc778f37f364fcf7db95d5992eaaf16feec3956
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
