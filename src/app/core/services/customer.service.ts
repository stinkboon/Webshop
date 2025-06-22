import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { CustomerViewModel } from '../datacontracts/CustomerViewModel';
import { CreateCustomerModel } from '../datacontracts/CreateCustomerModel';
import { UpdateCustomerModel } from '../datacontracts/UpdateCustomerModel';



@Injectable({
  providedIn: 'root',
})
export class CustomerService{
  private url = 'http://localhost:5103/api/customer';
  constructor(private http: HttpClient) { }

public getAll(): Observable<CustomerViewModel[]> {
    return this.http.get<CustomerViewModel[]>(`${this.url}`);
  }

  public getById(id: number): Observable<CustomerViewModel> {
    return this.http.get<CustomerViewModel>(`${this.url}/${id}`);
  }

  public create(customerToCreate: CreateCustomerModel): Observable<CustomerViewModel> {
    return this.http.post<CustomerViewModel>(this.url, customerToCreate);
  }

  public update(customerToUpdate: UpdateCustomerModel): Observable<CustomerViewModel> {
    return this.http.put<CustomerViewModel>(this.url, customerToUpdate);
  }

  public delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
