import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {API} from "./API";

@Injectable({
  providedIn: 'root'
})
export class MembershipService {

  constructor(private http:HttpClient) { }

  getMembership(): Observable<any> {
    return this.http.get(`http://localhost:5211/${API.GET_MEMBERSHIP}`);
  }
}
