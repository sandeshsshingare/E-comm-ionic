import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SettingService {
  URL = environment.URL;
  // URL: any = 'https://1c7e-175-100-138-135.ngrok-free.app';
  headers: any;
  // headers = new HttpHeaders().set('ngrok-skip-browser-warning', 'true');

  constructor(private httpService: HttpClient) {
    this.getHeaders();
  }

  getHeaders() {
    let token = localStorage.getItem('customerToken');
    this.headers = {
      Authorization: `Bearer ${token}`,
      'ngrok-skip-browser-warning': 'true',
    };
    return this.headers;
  }

  getProfileData() {
    this.getHeaders();
    return this.httpService.get(`${this.URL}/shop/auth/self`, {
      headers: this.headers,
    });
  }


  getSavedAddress() {
    this.getHeaders();
    return this.httpService.get(`${this.URL}/customers/address`, {
      headers: this.headers,
    });
  }

  addAddress(data:any){
    this.getHeaders();
    return this.httpService.post(`${this.URL}/customers/address`, data, {headers : this.headers})
  }

  updateAddress(data:any , id:string){
    this.getHeaders();
    return this.httpService.put(`${this.URL}/customers/address/${id}`, data, {headers :this.headers})
  }

  deleteAddress( id:string){
    this.getHeaders();
    return this.httpService.delete(`${this.URL}/customers/address/${id}`, {headers :this.headers})
  }

  chagePassword(data:any){
    this.getHeaders();
    return this.httpService.post(`${this.URL}/customers/auth/change-password`, data, {headers:this.headers})
  }

  deleteAccount (){
    this.getHeaders();
    return this.httpService.delete(`${this.URL}/customers/account`, {headers :this.headers})
  }

  updateCustomerProfile(data:any){
    this.getHeaders();
    return this.httpService.patch(`${this.URL}/customers/update-profile`,data, {headers:this.headers})
  }

  updateCustomerProfilePicture(data:any){
    this.getHeaders();
    return this.httpService.post(`${this.URL}/customers/profile-picture`, data, {headers:this.headers})
  }

  deleteCustomerProfilePicture(){
    this.getHeaders();
    return this.httpService.delete(`${this.URL}/customers/profile-picture`, {headers:this.headers})
  }

}
