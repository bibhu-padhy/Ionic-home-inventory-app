import { AfterViewInit, Component, ElementRef, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { Gesture, GestureController, IonCard } from '@ionic/angular';
import { ItemsListService } from './services/items-list.service';

interface PeopleDataModal {
  name: string;
  age: number;
  isEligible: boolean;
  id: number;
}

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss'],
})
export class ItemsListComponent implements OnInit, AfterViewInit {

  public Peoples: PeopleDataModal[] = [
    {
      id: 1,
      name: 'bibhu',
      age: 25,
      isEligible: true
    },

    {
      id: 2,
      name: 'shyam',
      age: 17,
      isEligible: false
    },
    {
      id: 3,
      name: 'ram',
      age: 26,
      isEligible: true
    },
    {
      id: 4,
      name: 'test user',
      age: 25,
      isEligible: true
    },
  ];

  @ViewChildren(IonCard, { read: ElementRef }) itemRef: QueryList<ElementRef>;

  constructor(
    public itemsListService: ItemsListService,
    public gestureCtrl: GestureController,
    public renderer: Renderer2
  ) { }

  async ngAfterViewInit() {
    console.log(this.itemRef.forEach(console.log));
    this.itemRef.forEach((item, index) => {
      const gesture: Gesture = this.gestureCtrl.create({
        el: item.nativeElement,
        gestureName: `swipeable-card${index}`,
        onMove: ev => {
          this.renderer.setStyle(
            item.nativeElement,
            'transform',
            `translateX(${ev.deltaX}px)`
          );
        },
        onStart: ev => {
          this.renderer.setStyle(
            item.nativeElement,
            'border',
            'dashed 4px #000'
          );
        },
        onEnd: ev => {
          this.renderer.removeStyle(
            item.nativeElement,
            'border'
          );
          if (ev.deltaX > 135 || ev.deltaX < -135) {
            const selectedItem = this.Peoples.find(i => i.id === index + 1);
            selectedItem.isEligible = false;
            if (selectedItem) {
              this.renderer.setStyle(
                item.nativeElement,
                'display',
                `none`,
              );
            }
            this.Peoples = [...this.Peoples];
            console.log(this.Peoples);
          } else {
            this.renderer.setStyle(
              item.nativeElement,
              'transform',
              `translateX(0px)`
            );
          }
        },
      });
      gesture.enable();
    });

  }

  ngOnInit() { }


}
