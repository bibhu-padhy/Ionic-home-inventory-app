import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'items-list',
        loadChildren: () => import('src/app/items-list/items-list.module').then(m => m.ItemsListModule)
      },
      {
        path: 'inventory',
        loadChildren: () => import('src/app/inventory/inventory.module').then(m => m.InventoryModule)
      },
      {
        path: '',
        redirectTo: '/home/items-list',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/home/items-list',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }
