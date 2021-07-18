import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { hotelModel } from 'src/app/models/hotel.model';
import { BedroomService } from 'src/app/services/bedroom.service';
import { HotelService } from 'src/app/services/hotel.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-bedrooms',
  templateUrl: './bedrooms.component.html',
  styleUrls: ['./bedrooms.component.scss'],
  providers: [BedroomService, HotelService, UserService]
})
export class BedroomsComponent implements OnInit {
  public hotelsList;
  public bedroomsList;
  public idHotel
  public hotel: hotelModel;

  constructor(private _hotelService: HotelService,
    private _bedroomsService: BedroomService,
    public _activatedRoute: ActivatedRoute,
    public _userService: UserService) {
    this.hotel = new hotelModel("","","","","","");
   }

  ngOnInit(): void {
      this._activatedRoute.paramMap.subscribe(dataRuta =>{
      this.idHotel = dataRuta.get('idHotel');
    });
    this.getBedrooms();
  }

  getHotels(){
    this._hotelService.getHotels().subscribe(
      response =>{
        this.hotelsList = response.hotelsFound;
      },
      error=>{
        console.log(<any>error);
      }
    )
  }

  getBedrooms(){
    this._bedroomsService.getBedrooms(this.idHotel).subscribe(
      response=>{
        this.bedroomsList = response.bedroomsFound
        console.log(response);
      }
    )
  }

}
