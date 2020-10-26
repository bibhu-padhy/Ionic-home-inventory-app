import { Component, OnInit } from '@angular/core';
import { EMPTY } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ToastService } from '../common/services/toast/toast.service';
import { ToolBarService } from '../common/tool-bar/services/tool-bar-service.service';
import { ItemsListService } from './services/items-list.service';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss'],
})
export class ItemsListComponent implements OnInit {

  constructor(
    private toolbarService: ToolBarService,
    private itemsService: ItemsListService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.toolbarService.returnedFormData
      .pipe(
        switchMap(data => {
          if (data) {
            return this.itemsService.storeItemsData(data);
          } else {
            return EMPTY;
          }
        })
      ).subscribe(res => {
        if (res.ItemId) {
          this.toastService.presentToast('Item has been created successfully');
        }
      });
  }

}
