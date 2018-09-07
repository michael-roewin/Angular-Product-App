import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { apiUrl } from '../constants';

@Injectable({
  'providedIn': 'root'
})
export class CategoryService {

  private apiUrl = apiUrl + '/category';

  constructor(private http: HttpClient) {

  }

  getCategories(params): Observable<any> {
    return this.http.get<any>(this.apiUrl, {params});
  }

  getCategory(categoryID): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/' + categoryID);
  }

  createCategory(category): Observable<any> {
    return this.http.post<any>(this.apiUrl, category);
  }

  updateCategory(category): Observable<any> {
    return this.http.put<any>(this.apiUrl + '/' + category.id, category);
  };

  deleteCategory(categoryID): Observable<any> {
    return this.http.delete(this.apiUrl + '/' + categoryID);
  }
}