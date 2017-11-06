import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class AuthService {

  authToken: any;
  user: any;

  constructor(private http:Http) { }

  registerUser(user)
  {
    let headers = new Headers();
    headers.append('Content-Type','application/json')
    return this.http.post('http://localhost:3000/user/registration',user,{headers : headers})
    .map(res => res.json());
  }
  authenticateUser(user)
  {
    let headers = new Headers();
    headers.append('Content-Type','application/json')
    return this.http.post('http://localhost:3000/user/authenticate',user,{headers : headers})
    .map(res => res.json());
  }

  getProfile(user)
  {
    let headers = new Headers();
    headers.append('Content-Type','application/json')
    return this.http.post('http://localhost:3000/user/profile',{headers : headers})
    .map(res => res.json());
  }

  storeUserData(token,user)
  {
    debugger;
    localStorage.setItem('id_token',token);
    localStorage.setItem('user',JSON.stringify(user));
    this.authToken = token;
    this.user=user;
  }
  logout()
  {
    debugger;
    this.authToken = null;
    this.user=null;
    localStorage.clear();
  }
}
