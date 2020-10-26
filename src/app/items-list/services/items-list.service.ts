import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ItemsDataModel } from '../items.model';

@Injectable({
  providedIn: 'root'
})
export class ItemsListService {

  constructor(
    private fireStore: AngularFirestore
  ) { }


  async storeItemsData(data: ItemsDataModel) {
    const response = await this.fireStore.collection('items_list').add(data);
    return { ItemId: response.id };
  }

  getItemsList() {
    return this.fireStore.collection('items_list')
      .valueChanges({ idField: 'ItemId' });
  }
}
