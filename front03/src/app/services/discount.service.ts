import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {API} from "./API";

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  constructor(private http: HttpClient) {
  }

  findDiscount(name: string): Observable<any> {
    const params = new HttpParams().set('name', name);
    return this.http.get(`http://localhost:5211/${API.GET_DISCOUNT_BY_NAME}`, {params});
  };
}
