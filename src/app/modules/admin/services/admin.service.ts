import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { StorageService } from '../../../auth/services/storage/storage.service';

const BASE_URL = 'https://soft-dulci-wathila-5310731b.koyeb.app';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient, private storage: StorageService) {}

  postCar(carDto: any): Observable<any> {
    return this.checkToken() ? 
      this.http.post(BASE_URL + "/api/admin/car", carDto, { headers: this.createAuthorizationHeader() }) : 
      of(null);
  }

  getAllCarts(): Observable<any> {
    return this.checkToken() ? 
      this.http.get(BASE_URL + "/api/admin/car", { headers: this.createAuthorizationHeader() }) : 
      of(null);
  }

  getAllBookings(): Observable<any> {
    return this.checkToken() ? 
      this.http.get(BASE_URL + "/api/admin/car/bookings", { headers: this.createAuthorizationHeader() }) : 
      of(null);
  }

  changeStatus(bookingId: number, status: string): Observable<any> {
    return this.checkToken() ? 
      this.http.get(BASE_URL + "/api/admin/car/booking/" + bookingId + "/" + status, { headers: this.createAuthorizationHeader() }) : 
      of(null);
  }

  deleteCar(id: number): Observable<any> {
    return this.checkToken() ? 
      this.http.delete(BASE_URL + "/api/admin/car/" + id, { headers: this.createAuthorizationHeader() }) : 
      of(null);
  }

  getCarById(id: number): Observable<any> {
    return this.checkToken() ? 
      this.http.get(BASE_URL + "/api/admin/car/" + id, { headers: this.createAuthorizationHeader() }) : 
      of(null);
  }

  updateCar(carId: number, carDto: any): Observable<any> {
    return this.checkToken() ? 
      this.http.put(BASE_URL + "/api/admin/car/" + carId, carDto, { headers: this.createAuthorizationHeader() }) : 
      of(null);
  }

  postAdmin(adminRequest: any): Observable<any> {
    return this.checkToken() ? 
      this.http.post(BASE_URL + "/api/admin/admin", adminRequest, { headers: this.createAuthorizationHeader() }) : 
      of(null);
  }

  deleteAdmin(email: string): Observable<any> {
    return this.checkToken() ? 
      this.http.delete(BASE_URL + '/api/admin/admin/' + email, { headers: this.createAuthorizationHeader() }) : 
      of(null);
  }

  private createAuthorizationHeader(): HttpHeaders {
    const token = StorageService.getToken();
    return new HttpHeaders({ 'Authorization': 'Bearer ' + token });
  }

  private checkToken(): boolean {
    return !!StorageService.getToken(); // Returns true if token exists, otherwise false
  }
}
