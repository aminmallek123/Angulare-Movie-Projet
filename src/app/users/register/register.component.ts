import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/user';
import { AuthService } from 'src/app/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private authserv: AuthService, private router: Router) { }
  user: User = new User()
  Ajoutuser = () => {
    this.authserv.signUp(this.user).subscribe((data => {


      this.router.navigate(['login']);

    }))
  }


}
