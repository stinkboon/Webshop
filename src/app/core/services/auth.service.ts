import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { loginDto } from '../../core/datacontracts/loginDto';

interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private Url = 'http://localhost:5103/api';

  constructor(private http: HttpClient) { }

  public login(loginDto: loginDto): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.Url}/auth/login`, loginDto);

  }
  public register(data: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.Url}/auth/register`, data);
  }
  public forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.Url}/auth/forgot-password`, { email });
  }  
}
