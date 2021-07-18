import { Component, OnInit } from '@angular/core';

import {UserService} from "../../services/user.service";
import { FormControl } from '@angular/forms';
import { userModel } from "../../models/user.model";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {
  public user: userModel;
  public form = new FormControl();
  public Today = new Date().getFullYear();

  constructor(private _userService: UserService) {
    this.user = new userModel("","","","","","","","","","");
   }

  ngOnInit(): void {
    console.log(this.Today);

  }

  register(){
    this._userService.register(this.user).subscribe(
      response =>{
        console.log(response);
      },
      error=>{
        console.log(<any>error);
      }
    )
  }

}
