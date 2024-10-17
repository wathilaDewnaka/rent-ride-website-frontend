import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASE_URL = ['http://localhost:8080']

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private http: HttpClient) { }

  register(signupRequest: any): Observable<any>{
    return this.http.post(BASE_URL + "/api/auth/signup", signupRequest)
  }

  login(loginRequest: any): Observable<any>{
    return this.http.post(BASE_URL + "/api/auth/login", loginRequest)
  }

  register2(signupRequest: any): Observable<any>{
    return this.http.post(BASE_URL + "/api/auth/register", signupRequest)
  }

  forget(forgetRequest: any): Observable<any>{
    return this.http.post(BASE_URL + "/api/auth/forget", forgetRequest)
  }

  forget2(forgetRequest: any): Observable<any>{
    return this.http.post(BASE_URL + "/api/auth/reset", forgetRequest)
  }
}
