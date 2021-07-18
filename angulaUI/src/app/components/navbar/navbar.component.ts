import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [UserService]
})
export class NavbarComponent implements OnInit {
  public identity;

  constructor(public _userService: UserService) {
    this.identity = this._userService.getProfile();
  }

  ngOnInit(): void {
    console.log(this.identity);
  }

  logOut(){
    sessionStorage.clear();
  }

}
