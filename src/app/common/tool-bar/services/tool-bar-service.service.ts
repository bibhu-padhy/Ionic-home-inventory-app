import { Injectable } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { ItemsDataModel } from 'src/app/items-list/items.model';
import { AddItemsModalComponent } from '../add-items-modal/add-items-modal.component';
import { PoopOversComponent } from '../poop-overs/poop-overs.component';

@Injectable({
  providedIn: 'root'
})
export class ToolBarService {

  formData$: BehaviorSubject<ItemsDataModel | null> = new BehaviorSubject(null);

  returnedFormData = this.formData$.asObservable();


  constructor(
    private modalController: ModalController,
    private popoverController: PopoverController
  ) { }

  async presentModal() {
    const modal = await this.modalController.create({
      component: AddItemsModalComponent
    });

    modal.onDidDismiss()
      .then((dataReturned: any) => {
        if (dataReturned) {
          this.formData$.next(dataReturned.data);
        } else {
          this.formData$.next(dataReturned.data);
        }
      });
    return await modal.present();
  }

  dismiss(data: ItemsDataModel | null) {
    this.modalController.dismiss(data);
  }

  async presentPopover(ev: Event) {
    const popover = await this.popoverController.create({
      component: PoopOversComponent,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }

  closePopover() {
    this.popoverController.dismiss();
  }
}
