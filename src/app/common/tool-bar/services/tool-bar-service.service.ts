import { Injectable } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { ItemsDataModel } from 'src/app/items-list/items.model';
import { ItemsListService } from 'src/app/items-list/services/items-list.service';
import { ToastService } from '../../services/toast/toast.service';
import { AddItemsModalComponent } from '../add-items-modal/add-items-modal.component';
import { PoopOversComponent } from '../poop-overs/poop-overs.component';

@Injectable({
  providedIn: 'root'
})
export class ToolBarService {

  private formData$: BehaviorSubject<ItemsDataModel | null> = new BehaviorSubject(null);

  returnedFormData = this.formData$.asObservable();

  constructor(
    private modalController: ModalController,
    private itemsService: ItemsListService,
    private popoverController: PopoverController,
    private toastService: ToastService
  ) { }

  async presentModal() {
    const modal = await this.modalController.create({
      component: AddItemsModalComponent
    });

    modal.onDidDismiss()
      .then((dataReturned: any) => {
        if (dataReturned.data) {
          this.itemsService.storeItemsData(dataReturned.data);
          this.toastService.presentToast('Item saved successfully');
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
