import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private apiUrl = 'http://localhost:5211/api/account'; // Replace with correct URL for accounts
  private subscriptionUrl = 'http://localhost:5211/api/subcription'; // Replace with correct URL for subscriptions

  constructor(private http: HttpClient) {}

  getAllAccounts(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }

  getAllSubscriptions(): Observable<any> {
    return this.http.get<any>(`${this.subscriptionUrl}`);
  }

  updateAccount(account: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update`, account);
  }
}
