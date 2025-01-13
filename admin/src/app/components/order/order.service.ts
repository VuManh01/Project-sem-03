import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  updateOrder(order: any): Observable<any> {
    const url = `http://localhost:5211/api/OrderBook/${order.orderId}`;
    return this.http.put(url, order);
  }


  private apiUrl = 'http://localhost:5211/api/OrderBook'; // Thay bằng URL của API

  constructor(private http: HttpClient) {}

  // Lấy tất cả đơn hàng
  getOrders(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }


  // Cập nhật trạng thái đơn hàng
  updateOrderStatus(orderId: number, status: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${orderId}`, { status });
  }
}
