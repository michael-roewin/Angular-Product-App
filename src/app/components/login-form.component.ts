import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../user';

@Component({
  selector: 'login-form',
  templateUrl: 'login-form.html',
  styleUrls: []
})
export class LoginForm implements OnInit {

  credentials:{
    username:string,
    password:string
  };
  
  formAlert = {
    type: 'success',
    msg: ''
  }
  
  constructor(private _authService: AuthService, private _router: Router) {

  }

  ngOnInit() {
    this.credentials = {
      username: '',
      password: ''
    }
  }

  login() {
    let credentials = {
      username: this.credentials.username,
      password: this.credentials.password
    };

    this._authService.login(credentials).subscribe(
      (response:any) => {
        localStorage.setItem('access_token', response.access_token);
        this._router.navigate(['/products']);
      },
      (response:any) => {
        this.formAlert.type = 'danger';
        this.formAlert.msg = response.error.message;
      }
    )
  }
}