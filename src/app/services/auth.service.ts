import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private userService: UserService, private router: Router) { }

  async login(provider: firebase.default.auth.AuthProvider): Promise<void> {
    await this.afAuth.signInWithPopup(provider).then(
      credential => {
        if (credential) {
          this.userService.updateUser(credential.user);

          const returnUrl = localStorage.getItem('returnUrl');
          this.router.navigateByUrl(returnUrl);
        }
      }
    );
  }

  logout(): void {
    this.afAuth.signOut();
    localStorage.clear();
  }
}
