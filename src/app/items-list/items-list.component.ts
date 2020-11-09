import { AfterViewInit, Component, ElementRef, OnInit, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { Gesture, GestureController, IonItem, IonLabel } from '@ionic/angular';
import { ItemsDataModel } from './items.model';
import { ItemsListService } from './services/items-list.service';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss'],
})
export class ItemsListComponent implements OnInit, AfterViewInit {


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
              this.itemsListService.changeItemState(this.itemsList[index].ItemId, true);
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

  async ngAfterViewInit() { }

  ngOnInit() {

    this.itemsListService.getItemsList(false)
      .subscribe(items => {
        console.log(items);
        if (items && items.length > 0) {
          this.itemsList = items;
        }
      });
  }


}
