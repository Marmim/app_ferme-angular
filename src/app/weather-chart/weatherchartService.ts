import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {HourlyDailyWeather} from "../weather-forecast/HourlyDailyWeatherService";

export interface CurrentWeather {
  temperature: number;
  relativeHumidity: number;
  windSpeedMean: number;
  windDirection: number;
  precipitation: number;
}

@Injectable({ providedIn: 'root' })
export class weatherChartService {
  private http = inject(HttpClient);

  currentWeather(lat: number, lon: number) {
    const apiKey = environment.apiKey;
    const url = `${environment.apiUrl}/basic-1h?lat=${lat}&lon=${lon}&apikey=${apiKey}`;
    return this.http.get<CurrentWeather>(url);
  }
}
