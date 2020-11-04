import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailLogin, LoginService } from './services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  isNewUser: boolean = true;
  loginForm: FormGroup;

  constructor(
    public authService: LoginService,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      DisplayName: [''],
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required, Validators.minLength(4)]]
    });

    this.loginForm.reset();
  }

  handeAuthentication(formData: EmailLogin) {
    if (this.isNewUser) {
      this.handleRegistration(formData);
    } else {
      this.handelLogin(formData);
    }
  }

  handelLogin(formData: EmailLogin) {
    if (this.loginForm.valid) {
      this.authService.loginWithEmailAndPasword(formData.Email, formData.Password)
    }
  }

  async handleRegistration(formData: EmailLogin) {
    if (this.loginForm.valid) {
      const userUid = await this.authService.registerWithEmailAndPasworo(formData);
    }
  }



}
