import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {API} from "./API";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  get1Book():Observable<any>{
    return this.http.get(`http://localhost:5211/${API.GET_LIMIT_1_BOOK}`);
  }
}
