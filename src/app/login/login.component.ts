import { Component, OnInit } from '@angular/core';
import { AuthService } from '../common/services/auth.service';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  constructor(
    public authService: LoginService,
  ) { }

  ngOnInit() { }

}
