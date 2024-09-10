import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';
import {Farm, Modified} from '../models/farm.model';
import * as bootstrap from 'bootstrap';
import {HourlyDailyWeather, HourlyDailyWeatherService} from "./HourlyDailyWeatherService";
import {FarmService} from "../services/FarmService";
import {round} from "@popperjs/core/lib/utils/math";

interface DailyWeather {
  temperature_max: number;
  relativeHumidityMean: number;
  windSpeedMean: number;
  windDirection: number;
  precipitation: number;
  evapotranspiration: number;
}

export interface HourlyWeather {
  temperature: number[][];
  relativeHumidity: number[][];
  windSpeed: number[][];
  windDirection: number[][];
  precipitation: number[][];
}

interface WeatherInfo {
  daily: DailyWeather;
  hourly: HourlyWeather;
}

export interface FarmWeatherInfo {
  farm: Farm;
  weatherInfo: WeatherInfo;
}

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.scss']
})
export class WeatherForecastComponent implements OnInit, OnDestroy {

  farms: Modified[] | undefined;
  selectedFarmIndex = 0;
  selectedFarm: Modified | undefined;
  selectedDayIndex: number = 0;
  weatherData: HourlyDailyWeather | undefined;
  noFarmsMessage: string | null = null;

  private subscription: Subscription | undefined;

  constructor(
    private farmService: FarmService,
    private hourlyDailyWeatherService: HourlyDailyWeatherService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.subscription = this.farmService.getFarmsByUser().subscribe(farms => {
      this.farms = farms;
      this.checkIfFarmsExist();
      this.updateSelectedFarm(this.selectedFarmIndex);
    });
  }

  onFarmChanged(selectedIndex: number): void {
    this.selectedFarmIndex = selectedIndex;
    this.updateSelectedFarm(selectedIndex);
  }

  updateSelectedFarm(index: number): void {
    if (this.farms && this.farms.length > index) {
      this.selectedFarm = this.farms[index];
      this.noFarmsMessage = null;

      if (this.selectedFarm && this.selectedFarm.id && this.selectedFarm.latitude && this.selectedFarm.longitude) {
        this.hourlyDailyWeatherService.getWeatherData(this.selectedFarm.id, this.selectedFarm.latitude, this.selectedFarm.longitude).subscribe(
          (weatherData: any) => {
            this.weatherData = weatherData;
            console.log(weatherData)
          },
          (error: any) => {
            console.error('Error fetching weather data', error);
          }
        );
      }

    }
  }


  onDaySelected(index: number): void {
    this.selectedDayIndex = index;
    this.updateSelectedFarm(this.selectedFarmIndex);
  }

  checkIfFarmsExist(): void {
    if (!this.farms || this.farms.length === 0) {
      this.noFarmsMessage = "Aucune ferme ajoutée";
      this.selectedFarm = undefined;
      const modalElement = this.renderer.selectRootElement('#noFarmsModal', true);
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    } else {
      this.noFarmsMessage = null;
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  get weekdays() {
    const temp = new Date();
    const weekdays: string[] = [];

    for (let i = 0; i < 7; i++) {
      weekdays.push(temp.toLocaleDateString('fr-FR', { weekday: 'short' }));
      temp.setDate(temp.getDate() + 1);
    }

    return weekdays;
  }

  protected readonly round = round;
}
