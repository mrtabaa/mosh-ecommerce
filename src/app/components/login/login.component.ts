import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  loginGoogle(): void {
    this.authService.login(new firebase.default.auth.GoogleAuthProvider());
  }

  loginFacebook(): void {
    this.authService.login(new firebase.default.auth.FacebookAuthProvider());
  }

  loginEmail(): void {
    this.authService.login(new firebase.default.auth.EmailAuthProvider());
  }
}
