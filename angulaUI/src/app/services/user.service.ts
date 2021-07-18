import { Injectable } from '@angular/core';

import { GLOBAL } from './global.service';
import { userModel } from '../models/user.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ //Es un decorador, que permite inyectarlo
  providedIn: 'root'
})
export class UserService {
  public apiUrl: String;
  public identity;
  public token;
  public headersVar = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(public _http: HttpClient) {
    this.apiUrl = GLOBAL.url;
  }

  JsonConvert(Var){
    let convertVar = JSON.stringify(Var);
    return convertVar;
  }

  register(user: userModel): Observable<any>{
    return this._http.post(`${this.apiUrl}registerUser`, this.JsonConvert(user), {headers: this.headersVar})
  }

  login(user, getToken = null): Observable<any>{
    if(getToken != null){
      user.getToken = getToken;
    }
    return this._http.post(`${this.apiUrl}login`, this.JsonConvert(user), {headers: this.headersVar});
  }

  getUsers(): Observable<any>{
    return this._http.get(`${this.apiUrl}getUsers`, {headers: this.headersVar});
  }

  getUserID(id:string): Observable<any>{
    return this._http.get(`${this.apiUrl}getUserID/${id}`, {headers: this.headersVar});
  }

  editUser(user: userModel): Observable<any>{
    let headersToken = this.headersVar.set('Authorization', this.getToken());

    return this._http.put(`${this.apiUrl}editUser2/${user._id}`, this.JsonConvert(user), {headers: headersToken});
  }

  editUserLog(user: userModel): Observable<any>{
    let headersToken = this.headersVar.set('Authorization', this.getToken());

    return this._http.put(`${this.apiUrl}editUser`, this.JsonConvert(user), {headers: headersToken});
  }

  deleteUser(id: String): Observable<any>{
    let headersToken = this.headersVar.set('Authorization', this.getToken());

    return this._http.delete(`${this.apiUrl}deleteUser/${id}`, {headers: headersToken});
  }

  deleteUserLog(id: String): Observable<any>{
    let headersToken = this.headersVar.set('Authorization', this.getToken());

    return this._http.delete(`${this.apiUrl}deleteUserLog/${id}`, {headers: headersToken});
  }

  getProfile(){
    var identity2 = JSON.parse(sessionStorage.getItem('identity'));
    if(identity2 != undefined){
      this.identity = identity2;
    }else{
      this.identity = null;
    }
    return this.identity;
  }

  getToken(){
    var token2 = sessionStorage.token;
    if(token2 != undefined){
      this.token = token2;
    }else{
      this.token = null;
    }
    return this.token;
  }
}

//Observable, no sabe el array. Espera datos a leer simepre que sea un array, prácticamente se le puede enviar cualquier dato
//Es un array de objetos que sabe que recibirá datos.
