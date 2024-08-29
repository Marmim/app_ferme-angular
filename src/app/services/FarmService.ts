
import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from 'rxjs';
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

  getFarmsByUser(): Observable<Modified[]> {
    const accessToken = localStorage.getItem("access_token");
    return this.httpClient.get<Modified[]>(`${this.apiUrl}/api/user/farms`,{headers:{Authorization:`Basic ${accessToken}`}})
  }
  }

