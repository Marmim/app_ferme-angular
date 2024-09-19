
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, tap} from 'rxjs';
import { environment } from '../../environments/environment';
import {Farm} from '../models/farm.model';


@Injectable({
  providedIn: 'root'
})
export class FarmService {
  private apiUrl = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) {}

  addFarm(farm: Farm): Observable<Farm> {
    const accessToken = localStorage.getItem("authToken");
    return this.httpClient.post<Farm>(`${this.apiUrl}/create-farm`, farm, {headers:{Authorization:`Basic ${accessToken}`}});
  }

  getFarmsByUser(): Observable<Farm[]> {
    const accessToken = localStorage.getItem("authToken");
    return this.httpClient.get<Farm[]>(`${this.apiUrl}/api/user/farms`,{headers:{Authorization:`Basic ${accessToken}`}})
  }
  deleteFarmById(id: number): Observable<void> {
    const accessToken = localStorage.getItem("authToken");
    const headers = new HttpHeaders({
      'Authorization': `Basic ${accessToken}`
    });
    return this.httpClient.delete<void>(`${this.apiUrl}/deletefarms/${id}`, { headers });
  }

  updateFarm(id: number | undefined, farm: Farm): Observable<Farm> {
    const accessToken = localStorage.getItem("authToken");
    return this.httpClient.put<Farm>(`${this.apiUrl}/updatefarms/${id}`, farm, {headers:{Authorization:`Basic ${accessToken}`}});
  }

}
