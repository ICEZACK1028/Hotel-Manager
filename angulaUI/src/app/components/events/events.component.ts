import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { hotelModel } from 'src/app/models/hotel.model';
import { EventService } from 'src/app/services/event.service';
import { HotelService } from 'src/app/services/hotel.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
  providers: [HotelService, UserService]
})
export class EventsComponent implements OnInit {
  public hotelsList;
  public eventList;
  public idHotel
  public hotel: hotelModel;

  constructor(private _hotelService: HotelService,
    private _eventService: EventService,
    public _activatedRoute: ActivatedRoute,
    public _userService: UserService) { }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(dataRuta =>{
      this.idHotel = dataRuta.get('idHotel');
    });
    this.getEvents();
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

  getEvents(){
    this._eventService.getEvents(this.idHotel).subscribe(
      response=>{
         this.eventList = response.eventsFound;
        console.log(response);
      }
    )
  }

}
