import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { GLOBAL }  from './global.service';
import { Observable } from 'rxjs';
import { hotelModel } from '../models/hotel.model';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  public apiUrl: string;
  public headersVar = new HttpHeaders().set('Content-Type', 'application/json')

  constructor(public _http: HttpClient  ) {
    this.apiUrl = GLOBAL.url;
  }

  JsonConvert(Var){
    let convertVar = JSON.stringify(Var);
    return convertVar;
  }

  getHotels(): Observable<any>{
    return this._http.get(`${this.apiUrl}getHotels`, {headers: this.headersVar});
  }

  getHotelID(id:string): Observable<any>{
    return this._http.get(`${this.apiUrl}getHotelID/${id}`, {headers: this.headersVar});
  }

  addHotel(hotel: hotelModel, manager: String): Observable<any>{
    return this._http.post(`${this.apiUrl}addHotel/${manager}`, this.JsonConvert(hotel), {headers: this.headersVar})
  }

  editHotel(hotel: hotelModel): Observable<any>{
    return this._http.put(`${this.apiUrl}editHotel/${hotel._id}`, this.JsonConvert(hotel), { headers: this.headersVar});
  }

  deleteHotel(id: String): Observable<any>{
    return this._http.delete(`${this.apiUrl}deleteHotel/${id}`, {headers: this.headersVar});
  }

}
