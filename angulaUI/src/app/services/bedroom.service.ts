import { Injectable } from '@angular/core';
import { GLOBAL } from './global.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { hotelModel } from '../models/hotel.model';

@Injectable({
  providedIn: 'root'
})
export class BedroomService {
  public apiUrl: String;
  public headersVar = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(public _http: HttpClient) {
    this.apiUrl = GLOBAL.url;
  }

  getBedrooms(id: String): Observable<any>{
    return this._http.get(`${this.apiUrl}getBedroom/${id}`, {headers: this.headersVar})
  }
}
