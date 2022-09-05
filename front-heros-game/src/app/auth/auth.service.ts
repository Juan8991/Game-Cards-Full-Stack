import { Injectable } from '@angular/core';
import { GoogleAuthProvider } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { JugadoresService } from '../game/create-newgame/jugadores.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  loggedIn$ = this.loggedIn.asObservable();
  constructor(
    public afAuth: AngularFireAuth,private router: Router, // Inject Firebase auth service
    private gamers$: JugadoresService

  ){}
  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new GoogleAuthProvider());
  }
  // Auth logic to run auth providers
  AuthLogin(provider: GoogleAuthProvider | firebase.auth.AuthProvider) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        console.log('You have been successfully logged in!');
        this.loggedIn.next(true);
        this.gamers$.addGamer(result.user);
        this.redirectToHome();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  logOutUser(){
    this.loggedIn.next(false);
    this.router.navigate(['']);
  }
  async getUserAuth() {
    const userData = await this.afAuth.currentUser;
    return userData;
  }
  private redirectToHome(): void {
    this.router.navigate(['/game/home']);
  }
}
