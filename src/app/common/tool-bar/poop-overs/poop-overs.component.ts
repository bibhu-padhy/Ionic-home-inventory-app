import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/login/services/login.service';
import { ToolBarService } from '../services/tool-bar-service.service';

@Component({
  selector: 'app-poop-overs',
  templateUrl: './poop-overs.component.html',
  styleUrls: ['./poop-overs.component.scss'],
})
export class PoopOversComponent implements OnInit {

  constructor(
    public loginService: LoginService,
    public toolbarService: ToolBarService
  ) { }

  ngOnInit() { }

}
