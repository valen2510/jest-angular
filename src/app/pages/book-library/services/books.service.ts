import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { ApiResponse } from 'src/app/interfaces/api-response.interface';
import { environment } from 'src/environments/environment';
import { Book } from '../interfaces/books.interface';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private apiUrl: string = `${environment.api}/books`;

  constructor(private http: HttpClient) {}

  getOwnerBooks(owner: string): Observable<ApiResponse<Book[]>> {
    const url = `${this.apiUrl}/owner/${owner}`;
    console.log(url)
    return this.http.get<Book[]>(this.apiUrl).pipe(
      map((response) => {
        return { status: true, response};
      }),
      catchError(() =>
        of({ status: false, message: 'Error de conexion', response: [] })
      )
    );
  }
}
