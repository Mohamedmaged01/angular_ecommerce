import { Routes } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './user/home/home.component';
import { CallbackComponent } from './user/callback/callback.component';
import { SignupComponent } from './user/signup/signup.component'; // Assume you create this
import { OrderComponent } from './user/order/order.component';
// import { ForgotPasswordComponent } from './forgot-password.component';
export const routes: Routes = [
    { path: 'signup', component: SignupComponent }, 
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent },
    { path: 'callback', component: CallbackComponent }
   
    // { path: 'forgot-password', component: ForgotPasswordComponent }

];
