import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { User, UserCheck, UserInfo } from '../interfaces/user.interface';
import { ApiResponse } from 'src/app/interfaces/api-response.interface';
import { Login } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl: string = `${environment.api}/users`;

  constructor(private http: HttpClient) {}

  private checkUserInfo(
    url: string,
    params?: any
  ): Observable<ApiResponse<UserCheck>> {
    const options = params ? { params } : {};
    return this.http.get<UserCheck>(url, options).pipe(
      map((response) => ({ status: true, response })),
      catchError(() => of({ status: false, message: 'Error de conexion' }))
    );
  }

  existsUsername(name: string): Observable<ApiResponse<UserCheck>> {
    const url = `${this.authUrl}/exist-name/${name}`;
    return this.checkUserInfo(url);
  }

  existsEmail(email: string): Observable<ApiResponse<UserCheck>> {
    const url = `${this.authUrl}/exist-email`;
    const params = { email };
    return this.checkUserInfo(url, params);
  }

  createUser(data: UserInfo): Observable<ApiResponse<UserInfo>> {
    return this.http.post<UserInfo>(this.authUrl, data).pipe(
      map((response) => ({ status: true, response })),
      catchError(() => of({ status: false, message: 'Error de conexion' }))
    );
  }

  loginUser(data: User): Observable<ApiResponse<Login>> {
    const url = `${this.authUrl}/login`;
    return this.http.post<Login>(url, data).pipe(
      map((response) => ({ status: true, response })),
      catchError((err) => of({ status: false, message: err }))
    );
  }
}
