import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

export interface HourlyDailyWeather {
  updatedAt: Date;
  timezone: string;
  hourly: {
    temperature: number[][];
    relativeHumidity: number[][];
    windSpeed: number[][];
    windDirection: number[][];
    precipitation: number[][];
  };
  daily: {
    temperature_max: number[];
    relativeHumidityMean: number[];
    windSpeedMean: number[];
    windDirection: number[];
    precipitation: number[];
  };
}

@Injectable({ providedIn: 'root' })
export class HourlyDailyWeatherService {
  private http = inject(HttpClient);

  getWeatherData(farmId: number | undefined, lat: number, lon: number) {
    const apiKey = environment.apiKey;
    const url = `${environment.apiUrl}/basic-day?lat=${lat}&lon=${lon}&apikey=${apiKey}&farmId=${farmId}`;
    return this.http.get<HourlyDailyWeather>(url);
  }

}
