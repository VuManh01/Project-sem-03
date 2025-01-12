import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private apiUrl = 'http://localhost:5211/api/account'; // Thay URL phù hợp với backend

  constructor(private http: HttpClient) {}

  getAllAccounts(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }

  updateAccount(account: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update`, account);
  }
}
