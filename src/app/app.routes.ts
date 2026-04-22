import { Routes } from '@angular/router';
import { AddPropertyComponent } from './property/add-property/add-property.component';
import { PropertyListComponent } from './property/property-list/property-list.component';
import { PropertyDetailComponent } from './property/property-detail/property-detail.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';

export const routes: Routes = [
    { path: '', component: PropertyListComponent },
    // Current (Eager loading)
    // This loads component immediately ❌
    { path: 'add-property', component: AddPropertyComponent },
    { path: 'rent-property', component: PropertyListComponent },
    { path: 'property-detail/:id', component: PropertyDetailComponent },
    { path: 'user/login', component: UserLoginComponent },
    { path: 'user/register', component: UserRegisterComponent },
    { path: '**', component: PropertyListComponent },
    //-----------------------------------------------------------
    //     Lazy load component (BEST for standalone)
    //     That’s it — no module needed

    // ✔ Works with standalone components
    // ✔ Modern Angular approach
    // ✔ Faster loading
    // {
    //     path: 'add-property',
    //     loadComponent: () =>
    //         import('./property/add-property/add-property.component')
    //             .then(m => m.AddPropertyComponent)
    // }


];
