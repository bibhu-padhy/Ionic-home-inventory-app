import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemsListRoutingModule } from './items-list-routing.module';
import { ItemsListComponent } from './items-list.component';
import { ToolBarModule } from '../common/tool-bar/tool-bar.module';
import { ItemComponent } from './item/item.component';
import { IonicModule } from '@ionic/angular';
import { OnSwipeService } from '../common/services/gestures/on-swipe.service';


@NgModule({
  declarations: [
    ItemsListComponent,
    ItemComponent
  ],
  imports: [
    CommonModule,
    ItemsListRoutingModule,
    ToolBarModule,
    IonicModule,
  ],
  providers: [{ provide: OnSwipeService, useClass: OnSwipeService }]
})
export class ItemsListModule { }
