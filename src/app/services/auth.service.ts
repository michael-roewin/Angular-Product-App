import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { apiUrl } from '../constants';

@Injectable({
  'providedIn': 'root'
})
export class AuthService {

  private apiUrl = apiUrl;

  constructor(private http: HttpClient, private _router: Router) {

  }

  login(credentials):Observable<any> {
    return this.http.post(this.apiUrl + '/auth', credentials);
  }

  isLoggedIn() {
    return !!localStorage.getItem('access_token');
  }

  logout() {
    localStorage.removeItem('access_token');
    this._router.navigate(['/login']);
  }
}
