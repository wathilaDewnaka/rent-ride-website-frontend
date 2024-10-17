import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { StorageService } from '../../../auth/services/storage/storage.service';

const BASE_URL = 'https://soft-dulci-wathila-5310731b.koyeb.app';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  cars: any;

  constructor(private http: HttpClient, private storage: StorageService) {}

  getAllCarts(): Observable<any> {
    return this.checkToken() ? 
      this.http.get(BASE_URL + "/api/customer/cars", { headers: this.createAuthorizationHeader() }) : 
      of(null); // Return observable with null if token is absent
  }

  getCarById(carId: number): Observable<any> {
    return this.checkToken() ? 
      this.http.get(BASE_URL + "/api/customer/cars/" + carId, { headers: this.createAuthorizationHeader() }) : 
      of(null);
  }

  getBookingsByUserId(): Observable<any> {
    return this.checkToken() ? 
      this.http.get(BASE_URL + "/api/customer/bookings/" + StorageService.getUserId(), { headers: this.createAuthorizationHeader() }) : 
      of(null);
  }

  bookACar(bookACarDto: any): Observable<any> {
    return this.checkToken() ? 
      this.http.post(BASE_URL + "/api/customer/car/book", bookACarDto, { headers: this.createAuthorizationHeader() }) : 
      of(null);
  }

  searchACar(searchACarDto: any): Observable<any> {
    return this.checkToken() ? 
      this.http.post(BASE_URL + "/api/customer/search/car", searchACarDto, { headers: this.createAuthorizationHeader() }) : 
      of(null);
  }

  chatBot(prompt: string): Observable<any> {
    return this.http.post("http://127.0.0.1:5000/chatbot", { message: prompt });
  }

  setSearchedCars(res: any) {
    console.log(res);
    this.cars = res;
  }

  getSearchedCars() {
    return this.cars;
  }

  private createAuthorizationHeader(): HttpHeaders {
    const token = StorageService.getToken();
    return new HttpHeaders({ 'Authorization': 'Bearer ' + token });
  }

  private checkToken(): boolean {
    return !!StorageService.getToken(); // Returns true if token exists, otherwise false
  }
}
