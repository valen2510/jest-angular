import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { User, UserCheck } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl: string = 'http://localhost:3001/users/';

  constructor(private http: HttpClient) {}

  private checkUserInfo(url: string): Observable<UserCheck | null> {
    return this.http.get<UserCheck>(url).pipe(
      catchError(() => of(null)));
  }

  existsUsername(name: string): Observable<UserCheck | null> {
    const url = `${this.apiUrl}exist-name/${name}`;
    return this.checkUserInfo(url);
  }

  existsEmail(email: string): Observable<UserCheck | null> {
    const url = `${this.apiUrl}exist-email?email=${email}`;
    return this.checkUserInfo(url);
  }

  createUser(data: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, data);
  }

  loginUser(data: User): Observable<User> {
    const url = `${this.apiUrl}login`;
    return this.http.post<User>(url, data);
  }
}
