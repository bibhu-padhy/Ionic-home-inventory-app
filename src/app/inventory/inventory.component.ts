import { Component, ElementRef, OnInit, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { IonItem, IonLabel, PopoverController } from '@ionic/angular';
import { ItemOptionsComponent } from '../common/components/item-options/item-options.component';
import { OnSwipeService } from '../common/services/gestures/on-swipe.service';
import { ItemsDataModel } from '../items-list/items.model';
import { ItemsListService } from '../items-list/services/items-list.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
})
export class InventoryComponent implements OnInit {

  itemsList: ItemsDataModel[] = [];
  private itemRef: QueryList<ElementRef>;
  @ViewChildren('itemRef') set content(content: QueryList<ElementRef<IonItem>>) {
    if (content) {
      this.onSwipeService.handelOnSwipe(content, this.itemsList, this.renderer, false);
    }
  }

  constructor(
    public itemsListService: ItemsListService,
    public renderer: Renderer2,
    private onSwipeService: OnSwipeService,
    private popOverService: PopoverController
  ) { }

  ngOnInit() {
    this.itemsListService.getItemsList(true)
      .subscribe(items => {
        if (items && items.length > 0) {
          this.itemsList = items;
        }
      });
  }

  async showMenu(ev: Event) {
    const popOver = await this.popOverService.create({
      component: ItemOptionsComponent,
      event: ev,
      translucent: true
    });
    return popOver.present();
  }

}
