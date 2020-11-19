import { Component, ElementRef, OnInit, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { IonLabel } from '@ionic/angular';
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
  @ViewChildren('itemRef') set content(content: QueryList<ElementRef<IonLabel>>) {
    if (content) {
      this.onSwipeService.handelOnSwipe(content, this.itemsList, this.renderer, false);
    }
  }

  constructor(
    public itemsListService: ItemsListService,
    public renderer: Renderer2,
    private onSwipeService: OnSwipeService
  ) { }

  ngOnInit() {
    this.itemsListService.getItemsList(true)
      .subscribe(items => {
        if (items && items.length > 0) {
          this.itemsList = items;
        }
      });

  }

}
