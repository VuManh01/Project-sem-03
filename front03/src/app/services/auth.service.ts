import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {RegisterDTO} from "../dto/RegisterDTO";
import {API} from "./API";
import {LoginDTO} from "../dto/LoginDTO";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  register(registerDTO: RegisterDTO):Observable<any> {
    return this.http.post(`http://localhost:5211/${API.REGISTER}`, registerDTO);
  }

  login(loginDTO: LoginDTO):Observable<any> {
    return this.http.post(`http://localhost:5211/${API.LOGIN}`, loginDTO);
  }
  logout():Observable<any> {
    return this.http.post(`http://localhost:5211/${API.LOGOUT}`,{});
  }
}
