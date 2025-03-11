import { Routes } from '@angular/router';
import { SidebarComponent } from './admin/sidebar/sidebar.component';

export const routes: Routes = [
    {
        path: '',
        component:SidebarComponent,
        title:'side bar'
    }
];
