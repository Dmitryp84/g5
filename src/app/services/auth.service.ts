import { IUser } from './../interfaces/user';
import { StorageService } from './storage.service';
import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  isLoggedIn$ = new BehaviorSubject<IUser>(this.isLoggedIn);

  constructor(
    public afs: AngularFirestore,   
    public afAuth: AngularFireAuth, 
    public router: Router,  
    public storageService: StorageService
  ) {    
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.storageService.set('user', user);
        this.isLoggedIn$.next(user);
        console.log('login');
      } else {
        this.storageService.set('user', null);
        this.isLoggedIn$.next(null);
        console.log('logout');
      }
    })
  }

  SignIn(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((result) => {
             this.router.navigate(['dashboard']);
          this.SetUserData(result.user);
      }).catch((error) => {
        alert(error.message)
      })
  }

  SignUp(email, password) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
      //this.SendVerificationMail();
        this.SetUserData(result.user);
        this.router.navigate(['dashboard']);
      }).catch((error) => {
        console.log(error.message)
      })
  }

  SendVerificationMail() {
    return this.afAuth.auth.currentUser.sendEmailVerification()
    .then(() => {
      this.router.navigate(['verify-email-address']);
    })
  }

  ForgotPassword(passwordResetEmail) {
    return this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      alert('Password reset email sent, check your inbox.');
    }).catch((error) => {
      console.log(error)
    })
  }

  get isLoggedIn(): IUser {
    const user = this.storageService.get<IUser>('user');
    return (user !== null) ? user : null;
  }
  
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  FacebookAuth() {
    return this.AuthLogin(new auth.FacebookAuthProvider());
  }

  AuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
    .then((result) => {
      this.router.navigate(['dashboard']);
      this.SetUserData(result.user);
    }).catch((error) => {
      alert(error)
    })
  }

  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: IUser = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    return userRef.set(userData, {
      merge: true
    })
  }

  SignOut() {
    return this.afAuth.auth.signOut().then(() => {
      this.storageService.remove('user');
      this.router.navigate(['sign-in']);
    })
  }

}