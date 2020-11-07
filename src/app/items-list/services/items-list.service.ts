import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { switchMap, tap } from 'rxjs/operators';
import { ItemsDataModel } from '../items.model';

@Injectable({
  providedIn: 'root'
})
export class ItemsListService {

  constructor(
    private fireStore: AngularFirestore,
    private auth: AngularFireAuth
  ) { }


  async storeItemsData(data: ItemsDataModel) {
    const response = await this.fireStore.collection('items_list').add(data);
    return { ItemId: response.id };
  }

  getItemsList() {
    const items = this.auth.authState
      .pipe(
        switchMap(user => {
          if (user) {
            return this.fireStore.collection('items_list',
              (collectionRef) =>
                collectionRef
                  .orderBy('CreatedAt', 'desc')
                  .where('UserId', '==', user?.uid)
                  .where('IsCompleted', '==', false)
            )
              .valueChanges({ idField: 'ItemId' });
          }
        })
        , tap(console.log)
      );
    return items;

  }
}
