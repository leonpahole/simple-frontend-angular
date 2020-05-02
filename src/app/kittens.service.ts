import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class KittensService {
  constructor(private http: HttpClient) {}

  getKittens(overrideUrl: string = null): Observable<any> {
    return this.http.get(`${overrideUrl || environment.apiUrl}`);
  }

  createKitten(
    name: string,
    age: number,
    overrideUrl: string = null
  ): Observable<any> {
    return this.http.post(`${overrideUrl || environment.apiUrl}`, {
      name,
      age,
    });
  }
}
