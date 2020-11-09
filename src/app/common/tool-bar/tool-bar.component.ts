import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToolBarService } from './services/tool-bar-service.service';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss'],
})
export class ToolBarComponent implements OnInit {

  constructor(
    public toolbarService: ToolBarService,
    public afAuth: AngularFireAuth
  ) { }

  ngOnInit() { }

}
