import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  apiUrl: string = environment.apiUrl + '/orders';
  constructor(private http: HttpClient) {}

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }

  getOrder(itemId: string): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${itemId}`);
  }

  createOrder(order: any): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, order);
  }

  updateOrderStatus(
    orderItem: { status: string },
    orderId: string
  ): Observable<Order> {
    return this.http.put<Order>(`${this.apiUrl}/${orderId}`, orderItem);
  }

  deleteOrder(itemId: string): Observable<Order> {
    return this.http.delete<Order>(`${this.apiUrl}/${itemId}`);
  }
}
