import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { Routes } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './user/home/home.component';
import { CallbackComponent } from './user/callback/callback.component';
import { SignupComponent } from './user/signup/signup.component';
import { OrderComponent } from './user/order/order.component';
import { ListWishlistComponent } from './user/list-wishlist/list-wishlist.component';
import { ProductCardComponent } from './user/product-card/product-card.component';
import { CartComponent } from './user/cart/cart.component';
import { FlashSalesComponent } from './user/flash-sales/flash-sales.component';
import { ProductListComponent } from './user/products/products.component';
import {ProductDetailsComponent} from './user/product-details/product-details.component';

export const routes: Routes = [
    { path: 'signup', component: SignupComponent }, 
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent },
    { path: 'callback', component: CallbackComponent }

    ,{
        path:'order',
        component:OrderComponent,
        title:'Order'
    },
    {
        path: 'wishlist',
        component: ListWishlistComponent,
        title: 'Wishlist'
    },
    {
        path:'products',
        component:ProductCardComponent,
        title:'Product'
    },
    {
        path: 'products/:id',
        component: ProductCardComponent,
        title: 'Product'
    },
    {
        path:'cart',
        component:CartComponent,
        title:'Cart'
    },

    { path: 'flash-sales', component: FlashSalesComponent },
    { path: 'products', component: ProductListComponent },
    { path: 'products/:id', component: ProductDetailsComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
