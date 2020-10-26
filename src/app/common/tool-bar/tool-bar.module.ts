import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToolBarComponent } from './tool-bar.component';
import { IonicModule } from '@ionic/angular';
import { AddItemsModalComponent } from './add-items-modal/add-items-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ToolBarComponent,
    AddItemsModalComponent
  ],
  entryComponents: [
    AddItemsModalComponent
  ],
  exports: [
    ToolBarComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ToolBarModule { }
