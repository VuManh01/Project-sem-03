import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MembershipPurchaseDTO} from "../dto/membershipPurchaseDTO";
import {Observable} from "rxjs";
import {API} from "./API";
import {BookPurchaseDTO} from "../dto/bookPurchaseDTO";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http:HttpClient) { }

  purchaseMembership(membership: MembershipPurchaseDTO): Observable<any> {
    return this.http.post(`http://localhost:5211/${API.PURCHASE_MEMBERSHIP}`, membership);
  }
  purchaseBook(bookRequest: BookPurchaseDTO): Observable<any> {
    return this.http.post(`http://localhost:5211/${API.PURCHASE_BOOK}`, bookRequest);
  }

  checkMembership(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get<any>(`http://localhost:5211/${API.CHECK_MEMBERSHIP}?orderId=${id}`, { headers });
  }

  checkBook(orderId:number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get<any>(`http://localhost:5211/${API.CHECK_BOOK}?orderId=${orderId}`, { headers });

  }
}
