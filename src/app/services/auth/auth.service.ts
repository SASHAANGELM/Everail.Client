import { Injectable } from '@angular/core';
import { Router } from  "@angular/router";
import firebase from 'firebase/app';
import { AngularFireAuth } from  "@angular/fire/auth";
import { combineLatest } from 'rxjs';

import { db } from '../../db/db';

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: User;
  public token: string;

  public get authorized(): boolean {
    return this.user != null;
  }

  constructor(public angularFireAuth: AngularFireAuth, public router: Router) {
    combineLatest([
      this.angularFireAuth.authState,
      this.angularFireAuth.idToken
    ]).subscribe({
      next: (auth) => {
        this.user = auth[0];
        this.token = auth[1];
        if (this.user){
          localStorage.setItem('user', JSON.stringify(this.user));
        } else {
          localStorage.setItem('user', null);
        }
        // console.log('user, token', this.user, this.token);
        db.setAuth({
          user: this.user,
          token: this.token
        });
      }
    });
  }

  async login() {
    await this.angularFireAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  async logout(){
    await this.angularFireAuth.signOut();
    // localStorage.removeItem('user');
}
}
