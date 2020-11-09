import { Component, ElementRef, OnInit, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { Gesture, GestureController, IonItem } from '@ionic/angular';
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
      content.forEach((item: ElementRef<IonItem>, index) => {
        console.log(item.el);

        const gesture: Gesture = this.gestureCtrl.create({
          el: item.el,
          gestureName: `swipeable-card${index}`,
          onMove: ev => {
            this.renderer.setStyle(
              item.el,
              'transform',
              `translateX(${ev.deltaX}px)`
            );
          },
          onStart: ev => {
            this.renderer.setStyle(
              item.el,
              'border',
              'dashed 4px #000'
            );
          },
          onEnd: ev => {
            this.renderer.removeStyle(
              item.el,
              'border'
            );
            if (ev.deltaX > 135 || ev.deltaX < -135) {
              console.log(this.itemsList[index].ItemId);
              this.itemsListService.changeItemState(this.itemsList[index].ItemId, false);
              this.renderer.setStyle(
                item.el,
                'display',
                `none`,
              );
            } else {
              this.renderer.setStyle(
                item.el,
                'transform',
                `translateX(0px)`
              );
            }
          },
        });

        gesture.enable();
      });

    }
  }

  constructor(
    public itemsListService: ItemsListService,
    public gestureCtrl: GestureController,
    public renderer: Renderer2
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
