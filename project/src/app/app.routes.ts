import { Routes } from '@angular/router';
import { HomeComponent } from './user/home/home.component';
import { HomePageComponent } from './user/home-page/home-page.component';
import {ChatComponent} from './user/chat/chat.component';

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
    }
];
