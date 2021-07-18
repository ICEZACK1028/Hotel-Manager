import { Component, OnInit } from '@angular/core';
import { userModel } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [UserService]
})
export class ProfileComponent implements OnInit {

  public users;
  public identity;
  public idUserModal: userModel;

  constructor(private _userService: UserService) {
    this.idUserModal = new userModel("","","","","","","","","","");
    this.identity = _userService.getProfile();
   }

  ngOnInit(): void {

  }

  getUserID(idUser){
    this._userService.getUserID(idUser).subscribe(
      response=>{
        this.idUserModal = response.userFound;
        console.log(response);
      },
      error =>{
        console.log(<any>error);
      }
    )
  }

  getUsers(){
    this._userService.getUsers().subscribe(
      res => {
        this.users = res.usersFound;
      },
      err => {
        console.log(<any>err);
      }
    )
  }

  editUserLog(){
    this._userService.editUserLog(this.idUserModal).subscribe(
      response=>{
        console.log(response);

      },
      error=>{
        console.log(<any>error);
      }
    )
  }

  logOut(){
    sessionStorage.clear();
  }

  deleteUser(){
    this._userService.deleteUserLog(this.identity._id).subscribe(
      Response=>{
        location.reload();
        this.logOut();
        console.log(Response);
      }
    )
  }


}
