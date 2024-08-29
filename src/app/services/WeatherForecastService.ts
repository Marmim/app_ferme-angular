
import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable} from "rxjs";

@Injectable()

export class WeatherForecastService{
  private apiUrl = 'https://api.meteoblue.com/weather-forecast';
  private apiKey='xBmAgEZLo70JiWQ8';

constructor(private http: HttpClient) {}
  getForecast(location:string): Observable<any> {
  const url = `${this.apiUrl}?apikey=${this.apiKey}&location=${location}`;
    return this.http.get<any>(url).pipe(
      catchError(error => {
        console.error('Erreur lors de la récupération des données météo', error);
        throw error;
      })
    );
  }

}

