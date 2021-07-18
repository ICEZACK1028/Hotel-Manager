import { Component, OnInit } from '@angular/core';
import { hotelModel } from 'src/app/models/hotel.model';
import { userModel } from 'src/app/models/user.model';
import { HotelService } from 'src/app/services/hotel.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss'],
  providers: [HotelService, UserService]
})
export class HotelsComponent implements OnInit {
  public hotelsList;
  public identity;
  public user: userModel;
  public hotel: hotelModel;

  constructor(private _hotelService: HotelService,
    public _userService: UserService) {
    this.hotel = new hotelModel("","","","","","");
    this.identity = this._userService.getProfile();
  }

  ngOnInit(): void {
    this.getHotels();
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

  getHotelID(idHotel){
    this._hotelService.getHotelID(idHotel).subscribe(
      response=>{
        this.hotel = response.hotelFound;
        console.log(response.hotelFound);
      },
      error=>{
        console.log(<any>error);
      }
    )
  }

  editHotel(){
    this._hotelService.editHotel(this.hotel).subscribe(
      response=>{
        console.log(response);
        this.getHotels();
      },
      error=>{
        console.log(<any>error);
      }
    )
  }

  deleteHotel(idHotel){
    this._hotelService.deleteHotel(idHotel).subscribe(
      response=>{
        console.log(response);
        this.getHotels();
      },error=>{
        console.log(error);
      }
    )
  }

  // addHotel(){
  //   this._hotelService.addHotel(this.hotel, this.user).subscribe(
  //     response=>{

  //     },error=>{

  //     }
  //   )
  // }

}
