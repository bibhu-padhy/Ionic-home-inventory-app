import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryRoutingModule } from './inventory-routing.module';
import { InventoryComponent } from './inventory.component';
import { ToolBarModule } from '../common/tool-bar/tool-bar.module';


@NgModule({
  declarations: [
    InventoryComponent
  ],
  imports: [
    CommonModule,
    InventoryRoutingModule,
    ToolBarModule
  ]
})
export class InventoryModule { }
