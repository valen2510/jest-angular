import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { Category } from '../interfaces/category.interface';
import { environment } from './../../environments/environment';
import { ApiResponse } from '../interfaces/api-response.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl: string = `${environment.api}/category`;

  constructor(private http: HttpClient) {}

  getAllCategories(): Observable<ApiResponse<Category[]>> {
    return this.http.get<Category[]>(this.apiUrl).pipe(
      map((response) => {
        return { status: true, response};
      }),
      catchError(() =>
        of({ status: false, message: 'Error de conexion', response: [] })
      )
    );
  }
}
