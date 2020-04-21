import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class KittensService {
  constructor(private http: HttpClient) {}

  getKittens(): Observable<any> {
    return this.http.get(`${environment.apiUrl}`);
  }

  createKitten(name: string, age: number): Observable<any> {
    return this.http.post(`${environment.apiUrl}`, { name, age });
  }
}
