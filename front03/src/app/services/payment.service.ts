import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
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

  checkMembership(): Observable<any> {
    return this.http.get(`http://localhost:5211/${API.CHECK_MEMBERSHIP}`);
  }

  checkBook(): Observable<any> {
    return this.http.get(`http://localhost:5211/${API.CHECK_BOOK}`);
  }
}
