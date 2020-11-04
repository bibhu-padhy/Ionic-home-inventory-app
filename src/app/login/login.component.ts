import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../common/services/auth.service';
import { EmailLogin, LoginService } from './services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(
    public authService: LoginService,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      DisplayName: ['', [Validators.required]],
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  async handleLogin(formData: EmailLogin) {
    if (this.loginForm.valid) {
      const userUid = await this.authService.loginWithEmailAndPasworo(formData);
      if (userUid) {
        console.log(userUid);
      } else {
        console.log('login failed');
      }
    }
  }

}
