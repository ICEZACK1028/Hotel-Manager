import { Injectable } from '@angular/core';
import { GLOBAL } from './global.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  public apiUrl: String;
  public identity;
  public token;
  public headersVar = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(public _http: HttpClient) {
    this.apiUrl = GLOBAL.url;
  }

  getHotelID(id:string): Observable<any>{
    return this._http.get(`${this.apiUrl}getHotelID/${id}`, {headers: this.headersVar});
  }

  getEvents(id:String): Observable<any>{
    return this._http.get(`${this.apiUrl}getEvents/${id}`, {headers: this.headersVar});
  }
}
