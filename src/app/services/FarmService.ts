
import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {Farm, Modified} from '../models/farm.model';


@Injectable({
  providedIn: 'root'
})
export class FarmService {
  private apiUrl = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) {}

  addFarm(farm: Modified): Observable<Modified> {
    const accessToken = localStorage.getItem("access_token");
    return this.httpClient.post<Modified>(`${this.apiUrl}/create-farm`, farm, {headers:{Authorization:`Basic ${accessToken}`}});
  }

  getAllFarms(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.apiUrl}/farms`);
  }



  getFarm(id: number): Observable<Farm> {
    return this.httpClient.get<Farm>(`${this.apiUrl}/${id}`);
  }
  deleteFarm(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
  }
}

