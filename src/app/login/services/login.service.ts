import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';


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
    private router: Router
  ) { }

  async googleSignin() {
    const credential = await this.afAuth.signInWithPopup(new auth.GoogleAuthProvider());
    if (credential) {
      this.router.navigateByUrl('/home');
    }
    if (credential.additionalUserInfo.isNewUser) {
      this.storeNewUserData({
        DisplayName: credential.user.displayName,
        Email: credential.user.email,
        PhotoUrl: credential.user.photoURL,
        Uid: credential.user.uid
      });
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
