import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemsListRoutingModule } from './items-list-routing.module';
import { ItemsListComponent } from './items-list.component';
import { ToolBarModule } from '../common/tool-bar/tool-bar.module';


@NgModule({
  declarations: [
    ItemsListComponent
  ],
  imports: [
    CommonModule,
    ItemsListRoutingModule,
    ToolBarModule
  ]
})
export class ItemsListModule { }
