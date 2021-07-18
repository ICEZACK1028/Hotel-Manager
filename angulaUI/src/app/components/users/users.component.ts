import { Component, OnInit } from '@angular/core';
import { userModel } from 'src/app/models/user.model';
import { UserService} from '../../services/user.service'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [UserService]
})
export class UsersComponent implements OnInit {
  public users;
  public idUserModal: userModel;

  constructor(private _userService: UserService) {
    this.idUserModal = new userModel("","","","","","","","","","");
  }

  ngOnInit(): void {
    this.getUsers();
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

  editUser(){
    this._userService.editUser(this.idUserModal).subscribe(
      response=>{
        console.log(response);
        this.getUsers();
      },
      error=>{
        console.log(<any>error);
      }
    )
  }

  deleteUser(idUser){
    this._userService.deleteUser(idUser).subscribe(
      Response=>{
        console.log(Response);
        this.getUsers();
      }
    )
  }

}
