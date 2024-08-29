import { Component, OnInit } from '@angular/core';
import {WeatherForecastService} from "../services/WeatherForecastService";

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.scss']
})
export class WeatherForecastComponent implements OnInit{
  ngOnInit(): void {

  }

}
