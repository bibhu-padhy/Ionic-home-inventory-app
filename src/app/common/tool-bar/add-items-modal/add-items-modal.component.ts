import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, switchMap } from 'rxjs/operators';
import { LoginService } from 'src/app/login/services/login.service';
import { ToolBarService } from '../services/tool-bar-service.service';
// import { ItemsDataModel } from 'src/app/pages/items-list/items.model';
// import { ItemsModalService } from './services/items-modal.service';


@Component({
  selector: 'app-add-items-modal',
  templateUrl: './add-items-modal.component.html',
  styleUrls: ['./add-items-modal.component.scss'],
})
export class AddItemsModalComponent implements OnInit {

  AddItemsForm: FormGroup;

  constructor(
    public toolbarService: ToolBarService,
    private fb: FormBuilder,
    private loginService: LoginService,
  ) {

    this.AddItemsForm = this.fb.group({
      ItemName: [, [Validators.required]],
      ItemQuantity: [, [Validators.required]],
      ItemPrice: [],
      CreatedAt: new Date(),
      IsCompleted: false,
      UpdatedAt: [''],
      UserId: null,
    });
  }

  ngOnInit() { }


  async onSubmit(formData) {
    this.loginService.afAuth.authState
      .pipe(
        map((user) => {
          formData.UserId = user.uid;
          console.log(user);
          return formData;
        })
      )
      .subscribe(res => {
        this.toolbarService.dismiss(res);
      });
  }

}
