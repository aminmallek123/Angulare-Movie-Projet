import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/user';
import { AuthService } from 'src/app/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(public authService: AuthService, public router: Router) { }

  email: string = ''
  password: string = ''



  loginUser() {
    const userlogin = {
      email: this.email,
      password: this.password
    }
    this.authService.signIn(userlogin);
  }

}
