import { AfterViewInit, Component, ElementRef, OnInit, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { Gesture, GestureController, IonItem, IonLabel } from '@ionic/angular';
import { Observable } from 'rxjs';
import { OnSwipeService } from '../common/services/gestures/on-swipe.service';
import { ItemsDataModel } from './items.model';
import { ItemsListService } from './services/items-list.service';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss'],
})
export class ItemsListComponent implements OnInit, AfterViewInit {

  itemsList$: Observable<ItemsDataModel[]> = this.itemsListService.getItemsList(false);
  itemsList: ItemsDataModel[];
  private itemRef: QueryList<ElementRef>;
  @ViewChildren('itemRef') set content(content: QueryList<ElementRef<IonItem>>) {

    if (content) {
      this.onSwipeService.handelOnSwipe(
        content, this.itemsList,
        this.renderer, true
      );
    }
  }

  constructor(
    public itemsListService: ItemsListService,
    public gestureCtrl: GestureController,
    public renderer: Renderer2,
    private onSwipeService: OnSwipeService
  ) { }

  async ngAfterViewInit() { }

  ngOnInit() {

    this.itemsListService.getItemsList(false)
      .subscribe(items => {
        console.log(items);
        if (items && items.length > 0) {
          this.itemsList = [...items];
        }
      });
  }


}
