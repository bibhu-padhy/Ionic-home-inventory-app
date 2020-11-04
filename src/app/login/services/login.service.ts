import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { ToastController } from '@ionic/angular';

export interface EmailLogin {
  DisplayName: string;
  Email: string;
  Password: string;
}

interface UserDataModel {
  Uid: string;
  PhotoUrl: string;
  Email: string;
  DisplayName: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(
    public afAuth: AngularFireAuth,
    private fireStore: AngularFirestore,
    private router: Router,
    private googlePlus: GooglePlus,
    private toastController: ToastController
  ) { }

  async googleSignin() {
    const credential = await this.googlePlus.login({});
    alert(credential)
    // this.firebaseAuthentication.signInWithGoogle()
    // const credential = await this.afAuth.signInWithPopup(new auth.GoogleAuthProvider());
    if (credential) {
      this.router.navigateByUrl('/home');
    }

    // if (credential.additionalUserInfo.isNewUser) {
    //   this.storeNewUserData({
    //     DisplayName: credential.user.displayName,
    //     Email: credential.user.email,
    //     PhotoUrl: credential.user.photoURL,
    //     Uid: credential.user.uid
    //   });
    // }
  }

  async loginWithEmailAndPasworo(UserData: EmailLogin): Promise<string> {
    try {
      const user = await this.afAuth.createUserWithEmailAndPassword(UserData.Email, UserData.Password);
      if (user.additionalUserInfo.isNewUser) {
        this.storeNewUserData({
          DisplayName: UserData.DisplayName,
          Email: UserData.Email,
          PhotoUrl: '',
          Uid: user.user.uid
        });
      }
      if (user) {
        this.router.navigateByUrl('/home');
      }
      return user.user.uid;
    } catch (error) {
      if (error.message) {
        const toast = await this.toastController.create({
          message: error.message,
          duration: 2000
        });
        toast.present();
      }
    }

  }

  private async storeNewUserData(userData: UserDataModel) {
    if (userData) {
      return await this.fireStore.collection('users_list')
        .add(userData);
    }
  }

  async logout() {
    this.afAuth.signOut().then(() => {
      this.router.navigateByUrl('/login');
    });
  }
}
