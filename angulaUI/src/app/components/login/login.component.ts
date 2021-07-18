import { Component, OnInit } from '@angular/core';
import { userModel } from 'src/app/models/user.model';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  public user: userModel;
  public token;
  public identity;

  constructor(
    private _userService: UserService,
    private _router: Router) {
    this.user = new userModel("", "", "", "", "", "", "", "", "", "");
  }

  ngOnInit(): void {
  }

  getToken() {
    this._userService.login(this.user, 'true').subscribe(
      response => {
        this.token = response.Token;
        sessionStorage.setItem('token', this.token);
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  login() {
    this._userService.login(this.user).subscribe(
      response => {
        this.identity = response.userFound;
        sessionStorage.setItem('identity', this._userService.JsonConvert(this.identity));
        this.getToken();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: `Bienvenido`,
          showConfirmButton: false,
          timer: 1500
        })

        this._router.navigate(['/hotels']);
      },
      error => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: `Usuario o contraseña
                    incorrectos`,
          showConfirmButton: false,
          timer: 1500
        })
      }
    )
  }

}
