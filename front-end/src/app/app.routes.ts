import { Routes } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './user/home/home.component';
import { CallbackComponent } from './user/callback/callback.component';
import { SignupComponent } from './user/signup/signup.component'; // Assume you create this
import { OrderComponent } from './user/order/order.component';
import { ListWishlistComponent } from './user/list-wishlist/list-wishlist.component';
// import { ForgotPasswordComponent } from './forgot-password.component';
export const routes: Routes = [
    { path: 'signup', component: SignupComponent }, 
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent },
    { path: 'callback', component: CallbackComponent }
   
    // { path: 'forgot-password', component: ForgotPasswordComponent }

    ,{
        path:'order',
        component:OrderComponent,
        title:'Order'
    },
    {
        path: 'wishlist',
        component:ListWishlistComponent,
        title: 'Wishlist'
    }
];
