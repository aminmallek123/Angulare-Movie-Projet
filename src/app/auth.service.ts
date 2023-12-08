import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from './user';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseurl = "http://localhost:3001/api/users"
  private apiURL = "http://localhost:3001/api";
  constructor(private http: HttpClient, public router: Router) { }
  name:string
  // Sign-up
  signUp(user: User): Observable<any> {

    return this.http.post(this.baseurl + '/register/', user);
  }
  httpOptions = {
    headers: new HttpHeaders({
    'Content-Type': 'application/json'
    })
    }

  sendPayment(data:any): Observable<any> {
    return this.http.post(this.apiURL + '/payment/', 
    JSON.stringify(data), this.httpOptions)
    } 
  // Sign-in
  signIn(user: any) {
    return this.http
      .post<any>(this.baseurl + "/login/", user)
      .subscribe(
    res => {
          localStorage.setItem('access_token', res.token);
          localStorage.setItem('name',res.user.lastname);
          localStorage.setItem('img',res.user.avatar);
          localStorage.setItem('admin', res.user.role);
          console.log(this.getAdmin());
          if(this.getAdmin()==="admin") {
          this.router.navigate(['/cc']);
        }
          else this.router.navigate(['']);
        },
      );
  }
  getToken() {
    return localStorage.getItem('access_token');
  }
  getAdmin():string{
    let authToken = localStorage.getItem('admin');
    return authToken as string;
  }
  getisLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null ? true : false;
  }
  getUser(): string {
    let a = localStorage.getItem('name');
    return a as string;
  }

  getImg(): string {
    let a = localStorage.getItem('img');
    return a as string;
  }


  doLogout() {
    console.log(this.getToken())
    let removeToken = localStorage.removeItem('access_token');
    console.log(removeToken);
    let removeUser = localStorage.removeItem('user');
    let removeAdmin = localStorage.removeItem('name');
    if (removeToken == null && removeUser== null && removeAdmin == null) {
      this.router.navigate(['']);
    }
  }

}

