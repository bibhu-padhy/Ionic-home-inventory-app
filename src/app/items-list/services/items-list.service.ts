import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { ToastService } from 'src/app/common/services/toast/toast.service';
import { ItemsDataModel } from '../items.model';

@Injectable({
  providedIn: 'root'
})
export class ItemsListService {

  constructor(
    private fireStore: AngularFirestore,
    private auth: AngularFireAuth,
    private toastService: ToastService
  ) { }


  async storeItemsData(data: ItemsDataModel) {
    const response = await this.fireStore.collection('items_list').add(data);
    return { ItemId: response.id };
  }

  getItemsList(isCompletedValue: boolean): Observable<any> {
    const items = this.auth.authState
      .pipe(
        switchMap(user => {
          if (user) {
            return this.fireStore.collection('items_list',
              (collectionRef) =>
                collectionRef
                  .orderBy('CreatedAt', 'desc')
                  .where('UserId', '==', user?.uid)
                  .where('IsCompleted', '==', isCompletedValue)
            ).valueChanges({ idField: 'ItemId' });
          }
        })
        , tap(data => console.log(data))
      );
    return items;
  }

  changeItemState(docId: string, isCompletedValue: boolean) {
    this.fireStore.doc(`items_list/${docId}`)
      .update({ IsCompleted: isCompletedValue })
      .then(item => {
        this.toastService.presentToast(`Item has been moved to the ${isCompletedValue ? 'Inventory' : 'Items List'}`);
      })
      .catch(error => {
        this.toastService.presentToast('Please refresh');
      });
  }
}
