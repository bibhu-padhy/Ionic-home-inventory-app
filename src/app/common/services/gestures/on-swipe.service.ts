import { ElementRef, Injectable, QueryList, Renderer2 } from '@angular/core';
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
    renderer: Renderer2, moveToInventory: boolean) {
    if (elemnet) {
      elemnet.forEach((item: any, index) => {
        const gesture: Gesture = this.gestureCtrl.create({
          el: item.el,
          gestureName: `swipeable-card${index}`,
          onMove: ev => {
            renderer.removeStyle(item.el, 'transition')
            if (ev.deltaX > -150) {
              renderer.setStyle(
                item.el,
                'transform',
                `translateX(${ev.deltaX}px)`
              );
            }

          },
          onStart: ev => {
            if (ev.deltaX > 1) {
              renderer.setStyle(item.el, 'border-top-left-radius', '20px');
              renderer.setStyle(item.el, 'border-bottom-left-radius', '20px');
            } else if (ev.deltaX < 1) {
              renderer.setStyle(item.el, 'border-right', 'none');
              // renderer.setStyle(item.el, 'border-bottom-right-radius', '10px');
              // const deleteBtn = renderer.createElement('button', 'delete');
              // renderer.appendChild(deleteBtn, renderer.createText('delete'));
              // renderer.appendChild(item.el, deleteBtn);
            }
          },
          onEnd: ev => {
            if (ev.deltaX < -70 && ev.deltaX > -150) {
              renderer.setStyle(
                item.el,
                'transform',
                `translateX(-150px)`
              );
              renderer.setStyle(
                item.el,
                'transition',
                `all 200ms ease-in`
              );
            } else if (ev.deltaX > 150) {
              this.itemsListService.changeItemState(itemsList[index].ItemId, moveToInventory);
              renderer.setStyle(
                item.el,
                'display',
                `none`,
              );
            } else {
              renderer.setStyle(
                item.el,
                'transition',
                `all 200ms ease-in`
              );
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
