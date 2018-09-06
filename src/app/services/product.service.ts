import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { apiUrl } from '../constants';

@Injectable({
  'providedIn': 'root'
})
export class ProductService {

  private apiUrl = apiUrl + '/product';

  constructor(private http: HttpClient) {

  }

  getProducts(params): Observable<any> {
    return this.http.get<any>(this.apiUrl, {params});
  }

  getProduct(productID): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/' + productID);
  }

  createProduct(product): Observable<any> {
    return this.http.post<any>(this.apiUrl, product);
  }

  updateProduct(product): Observable<any> {
    return this.http.put<any>(this.apiUrl + '/' + product.id, product);
  };

  deleteProduct(productID): Observable<any> {
    return this.http.delete(this.apiUrl + '/' + productID);
  }
}