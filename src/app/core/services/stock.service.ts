import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private apiUrl = '/api'; // Pas aan op basis van je backend

  constructor(private http: HttpClient) {}

  getTotalProducts(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/products/count`);
  }

  getTotalCustomers(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/customers/count`);
  }

  getActiveUsers(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/users/active-count`);
  }
}
