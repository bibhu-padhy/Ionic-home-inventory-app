import { Component, OnInit } from '@angular/core';
import { ToolBarService } from './services/tool-bar-service.service';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss'],
})
export class ToolBarComponent implements OnInit {

  constructor(
    public toolbarService: ToolBarService
  ) { }

  ngOnInit() { }

}
