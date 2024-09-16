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
    temperature: number[];
    precipitation: number[];
    windspeed: number[];
    relativehumidity:number[];
    winddirection:number[];
    time:string[];


  };


}

@Injectable({ providedIn: 'root' })
export class WeatherService {
  private http = inject(HttpClient);

  getWeatherData(lat: number, lon: number) {
    const apiKey = environment.apiKey;
    const url = `${environment.apiUrl}/basic-1h_basic-day?lat=${lat}&lon=${lon}&apikey=${apiKey}`;
    //const url = "https://my.meteoblue.com/packages/basic-1h_basic-day?lat=47.558&lon=7.573&asl=279&tz=Europe%2FZurich&name=Basel&format=json&history_days=1&apikey=DEMOKEY&sig=3413036bf33758dd1cc57596bf520ca0";
    return this.http.get<HourlyDailyWeather>(url);
  }

}
