import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateProductModel } from '../datacontracts/CreateProductModel';
import { ProductViewModel } from '../datacontracts/ProductViewModel';
import { Observable } from 'rxjs';
import { UpdateProductModel } from '../datacontracts/UpdateProductModel';


@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private url = 'http://localhost:5103/api/product';
  constructor(private http: HttpClient) {}

  public getAll(): Observable<ProductViewModel[]> {
    return this.http.get<ProductViewModel[]>(this.url);
  }

  public getById(id: number): Observable<ProductViewModel> {
    return this.http.get<ProductViewModel>(`${this.url}/${id}`); 
  }

  public create(productToCreate: CreateProductModel): Observable<ProductViewModel> {
    return this.http.post<ProductViewModel>(this.url, productToCreate); 
  }

  public update(productToUpdate: UpdateProductModel): Observable<ProductViewModel> {
    return this.http.put<ProductViewModel>(this.url, productToUpdate); 
  }

  public delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`); 
  }
}
