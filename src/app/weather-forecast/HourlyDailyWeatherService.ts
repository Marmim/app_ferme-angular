import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

export interface HourlyDailyWeather {
  updatedAt: Date;
  timezone: string;
  data_day: {
    temperature_max: number[];
    precipitation: number[];
    windspeed_mean: number[];
    relativehumidity_mean:number[];
  };
  data_1h: {
    temperature: number[][];
    relativeHumidity: number[][];
    windspeed: number[][];
    windDirection: number[][];
    precipitation: number[][];
  };

}

@Injectable({ providedIn: 'root' })
export class HourlyDailyWeatherService {
  private http = inject(HttpClient);

  getWeatherData(lat: number, lon: number) {
    const apiKey = environment.apiKey;
    const url = `${environment.apiUrl}/basic-1h basic-day?lat=${lat}&lon=${lon}&apikey=${apiKey}`;
    return this.http.get<HourlyDailyWeather>(url);
  }

}
