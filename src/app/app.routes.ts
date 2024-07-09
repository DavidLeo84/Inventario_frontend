import { Routes } from '@angular/router';
import ProductListComponent from '../componentes/product-list/product-list.component';
import PrincipalComponent from '../componentes/principal/principal.component';
import ActualizarComponent from '../componentes/actualizar/actualizar.component';

export const routes: Routes = [

    { path: '', component: ProductListComponent },
    {path: 'form', component: PrincipalComponent},
    {path: 'edit/:codigo', component: ActualizarComponent}
    // {
    //     path: '',
    //     loadComponent: () => import('../componentes/product-list/product-list.component')
    // },
    // {
    //     path: 'form',
    //     loadComponent: () => import('../componentes/principal/principal.component')
    // },
    // {
    //     path: ':codigo/edit',
    //     loadComponent: () => import('../componentes/actualizar/actualizar.component')
    // }
];
