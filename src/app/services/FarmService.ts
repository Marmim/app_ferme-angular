
import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {Farm, Modified} from '../models/farm.model';


@Injectable({
  providedIn: 'root'
})
export class FarmService {
  private apiUrl = 'http://localhost:8080/create-farm';


  constructor(private httpClient: HttpClient) {}

  getAllFarms(): Observable<Farm[]> {
    return this.httpClient.get<Farm[]>(this.apiUrl);
  }
  addFarm(farm: Modified): Observable<Modified> {
    return this.httpClient.post<Modified>(this.apiUrl, farm);
  }

  getFarm(id: number): Observable<Farm> {
    return this.httpClient.get<Farm>(`${this.apiUrl}/${id}`);
  }
  deleteFarm(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
  }
}

