import { ElementRef, Injectable, QueryList } from '@angular/core';
import { Gesture, GestureController, IonItem } from '@ionic/angular';
import { ItemsDataModel } from 'src/app/items-list/items.model';
import { ItemsListService } from 'src/app/items-list/services/items-list.service';

@Injectable({
  providedIn: 'root'
})
export class OnSwipeService {

  constructor(
    public itemsListService: ItemsListService,
    public gestureCtrl: GestureController,
  ) { }

  handelOnSwipe(
    elemnet: QueryList<ElementRef<IonItem>>,
    itemsList: ItemsDataModel[],
    renderer, moveToInventory: boolean) {
    if (elemnet) {
      elemnet.forEach((item: any, index) => {
        const gesture: Gesture = this.gestureCtrl.create({
          el: item.el,
          gestureName: `swipeable-card${index}`,
          onMove: ev => {
            renderer.setStyle(
              item.el,
              'transform',
              `translateX(${ev.deltaX}px)`
            );
            renderer.setStyle(item.el, 'background-color', 'black');
          },
          onStart: ev => {
            if (ev.deltaX > 1) {
              renderer.setStyle(item.el, 'border-top-left-radius', '10px');
              renderer.setStyle(item.el, 'border-bottom-left-radius', '10px');
            } else if (ev.deltaX < 1) {
              renderer.setStyle(item.el, 'border-top-right-radius', '10px');
              renderer.setStyle(item.el, 'border-bottom-right-radius', '10px');
            }
          },
          onEnd: ev => {
            if (ev.deltaX > 135 || ev.deltaX < -135) {
              this.itemsListService.changeItemState(itemsList[index].ItemId, moveToInventory);
              renderer.setStyle(
                item.el,
                'display',
                `none`,
              );
            } else {
              renderer.setStyle(
                item.el,
                'transform',
                `translateX(0px)`
              );
            }
            renderer.setStyle(item.el, 'border-radius', '0px');
          },
        });
        gesture.enable();
      });

    }
  }

}