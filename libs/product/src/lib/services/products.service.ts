import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { Product } from '../models/product.mode';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  apiUrl = environment.apiUrl + '/products';
  constructor(private http: HttpClient) {}

  getProducts(categoryId?: string): Observable<Product[]> {
    let param = new HttpParams();
    if (categoryId) {
      param = param.append('categories', categoryId);
    }
    return this.http.get<Product[]>(this.apiUrl, { params: param });
  }

  searchProduct(name?: string): Observable<Product[]> {
    let param = new HttpParams();
    if (name) {
      param = param.append('name', name);
    }
    return this.http.get<Product[]>(`${this.apiUrl}/search`, { params: param });
  }

  getProduct(itemId: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${itemId}`);
  }

  getProductsFeature(count: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/get/featured`);
  }

  createProduct(data: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  updateProduct(data: FormData, itemId: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${itemId}`, data);
  }

  deleteProduct(itemId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${itemId}`);
  }
}
