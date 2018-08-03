import { Injectable, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  constructor(private cookieService: CookieService, private http: HttpClient) { }

  isLoggedIn(): boolean {
    if (this.cookieService.get('token') != null && this.cookieService.get('token') == 'authenticated') {
      return true;
    } else {
      return false;
    }
  }

  authenticate(user: any): boolean {
    // var data = "username=" + user.username + "&password=" + user.password + "&grant_type=password";
    // var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    if (user.email == 'vj@gmail.com' && user.password == "password") {
      this.cookieService.set('token', 'authenticated');
      return true;
    }else{
      return false;
    }
  }

  logout() {
    this.cookieService.delete('token');
  }

  login(user: any): Observable<any> {
    var data = "username=" + user.email + "&password=" + user.password + "&grant_type=password";
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.post<any>('' + 'token', data, { headers: reqHeader })
      .map(response => {
        if (response !== null && response.access_token !== "" && response.access_token.length > 0) {
          this.cookieService.set('user', user.username);
          this.cookieService.set('userToken', response.access_token);
        }
      });
  }

  getToken(): any {
    return this.cookieService.get('userToken');
  }

  onlogout() {
    this.cookieService.delete('user');
    this.cookieService.delete('userToken');
  }
}
