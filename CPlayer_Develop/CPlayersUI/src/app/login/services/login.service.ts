import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from 'src/config/app.config';
import { Observable } from 'rxjs';
import { UserAuthentication, NewUser } from './../model/UserModel';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  endpoint: any;
  apikey: string;
  constructor(private readonly http: HttpClient) {
    this.endpoint = AppConfig.getConfig();
  }
  authenticateUser(request: UserAuthentication): Observable<any> {
    this.apikey = AppConfig.getAPIKey();
    return this.http.post<UserAuthentication>(this.endpoint.api.authenticateUser, request);
  }
  signUpNewUser(request: NewUser): Observable<any> {
    this.apikey = AppConfig.getAPIKey();
    return this.http.post<NewUser>(this.endpoint.api.registerUser, request);
  }
}
