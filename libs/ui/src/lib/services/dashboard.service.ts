import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getProductCount(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/products/get/count`);
  }

  getOrderCount(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/orders/get/count`);
  }

  getSaleCount(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/orders/get/totalsales`);
  }
}
