import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
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

  existsUsername(name: string): Observable<UserCheck | null> {
    const url = `${this.authUrl}/exist-name/${name}`;
    return this.checkUserInfo(url).pipe(
      map((res) => {
        if (!res.status) {
          alert(res.message);
        }
        return res.response?.exists ? res.response : null;
      })
    );
  }

  existsEmail(email: string): Observable<UserCheck | null> {
    const url = `${this.authUrl}/exist-email`;
    const params = { email };
    return this.checkUserInfo(url, params).pipe(
      map((res) => {
        if (!res.status) {
          alert(res.message);
        }
        return res.response?.exists ? res.response : null;
      })
    );
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
      catchError((err) => of({ status: false, message: err}))
    );
  }
}
