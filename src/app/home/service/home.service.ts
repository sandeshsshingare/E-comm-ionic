import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class HomeService {
  // URL: any = 'https://1c7e-175-100-138-135.ngrok-free.app';

  URL: string = environment.URL;
  headers: any;
  constructor(private httpService: HttpClient) {}
  getProductList(data?: any) {
    return this.httpService.get(`${this.URL}/shop/products`, {
      params: data,
      headers: this.headers,
    });
  }
  getProductDetails(productId: any) {
    return this.httpService.get(`${this.URL}/products/${productId}`, {
      headers: this.headers,
    });
  }

  getHeaders() {
    let token = localStorage.getItem("customerToken");
    this.headers = {
      Authorization: `Bearer ${token}`,
      "ngrok-skip-browser-warning": "true",
    };
    return this.headers;
  }

  getProfileData() {
    this.getHeaders();
    return this.httpService.get(`${this.URL}/shop/auth/self`, {
      headers: this.headers,
    });
  }

  isCustomerLogin(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getProfileData().subscribe({
        next: (data) => {
          resolve(true);
        },
        error: (error) => {
          reject(false);
        },
      });
    });
  }
}
