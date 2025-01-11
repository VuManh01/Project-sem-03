import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {API} from "./API";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http:HttpClient) { }

  sendFeedback(fullname:string, email:string, title:string, content:string): Observable<any>{
   return this.http.post(`http://localhost:5211/${API.SEND_FEEDBACK}`, {fullname, email, title, content});
  }
}
