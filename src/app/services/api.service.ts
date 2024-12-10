import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'https://localhost:7048/api';

  constructor(private http: HttpClient) {}

  get(
    rows: number,
    columns: number,
    totalSimulations: number
  ): Observable<any> {
    const params = {
      rows: rows.toString(),
      columns: columns.toString(),
      totalSimulations: totalSimulations.toString(),
    };

    return this.http.get<any>(`${this.baseUrl}/MLM/get`, { params });
  }
}
