import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // URL: any = '';
  URL = environment.URL;
  constructor(private http: HttpClient) {}
  headers = new HttpHeaders().set('ngrok-skip-browser-warning', 'true');
  login(data: any) {
    return this.http.post(`${this.URL}/shop/auth/login`, data, {
      headers: this.headers,
    });
  }

  register(data: any) {
    return this.http.post(`${this.URL}/shop/auth/register`, data, {
      headers: this.headers,
    });
  }
}
