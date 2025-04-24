import { Routes } from '@angular/router';
import { HomeComponent } from './user/home/home.component';
import { HomePageComponent } from './user/home-page/home-page.component';
import {ChatComponent} from './user/chat/chat.component';
import{DetailesComponent} from './user/detailes/detailes.component';
import{WishlistComponent} from './user/wishlist/wishlist.component';
import{CartComponent} from './user/cart/cart.component';
export const routes: Routes = [
    {
        path: '',
        component:HomePageComponent,
        title: 'Home'
    },
    {
        path: 'usercategory',
        component:HomeComponent,
        title: 'Category'
    },
    {
        path: 'chat',
        component:ChatComponent,
        title: 'chatbot'
    },
    {
        path: 'detailes/:id',
        component:DetailesComponent,
        title: 'detailes'
    }, {
        path: 'wishlist',
        component:WishlistComponent,
        title: 'wishlist'
    },

    {
        path: 'cart',
        component:CartComponent,
        title: 'cart'
    }
];
