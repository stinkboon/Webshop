import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";
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
    return this.http.post<LoginResponse>(`${this.Url}/auth/login`, loginDto).pipe(
      tap(response => {
        // Token opslaan in localStorage
        localStorage.setItem('token', response.token);
      })
    );
  }

  public register(data: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.Url}/auth/register`, data);
  }

  public forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.Url}/auth/forgot-password`, { email });
  }  

  public resetPassword(token: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.Url}/auth/reset-password`, { token, newPassword });
  }

  public logout(): void {
    localStorage.removeItem('token');
  }

  public isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
