import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/categories`);
  }

  getCategory(categoryId: string): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/categories/${categoryId}`);
  }

  createCategory(formData: Category): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/categories`, formData);
  }

  updateCategory(formData: Category): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/categories/${formData.id}`,
      formData
    );
  }

  deleteCategory(categoryId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/categories/${categoryId}`);
  }
}
