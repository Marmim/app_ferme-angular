import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Modified } from "../models/farm.model";
import { Subscription } from "rxjs";
import { FarmService } from "../services/FarmService";
import * as bootstrap from 'bootstrap';
import { HourlyDailyWeather, WeatherService } from "../services/WeatherService";

@Component({
  selector: 'app-certified-weather',
  templateUrl: './certified-weather.component.html',
  styleUrls: ['./certified-weather.component.scss']
})
export class CertifiedWeatherComponent implements OnInit, OnDestroy {
  farms: Modified[] | undefined;
  hour: number | undefined;
  selectedFarmIndex = 0;
  selectedFarm: Modified | undefined;
  selectedDayIndex: number = 0;
  noFarmsMessage: string | null = null;
  private subscription: Subscription | undefined;

  weatherData: HourlyDailyWeather | undefined;
  errorMessage: string | null = null;

  constructor(
    private farmService: FarmService,
    private renderer: Renderer2,
    private weatherService: WeatherService
  ) {}

  ngOnInit(): void {
    this.subscription = this.farmService.getFarmsByUser().subscribe(farms => {
      this.farms = farms;
      this.hour = new Date().getHours();
      this.checkIfFarmsExist();
      this.updateSelectedFarm(this.selectedFarmIndex);
    });
  }

  updateSelectedFarm(index: number): void {
    if (this.farms && this.farms.length > index) {
      this.selectedFarm = this.farms[index];
      this.noFarmsMessage = null;

      console.log(this.hour);
      const lat = this.selectedFarm?.latitude;
      const lon = this.selectedFarm?.longitude;

      if (lat && lon) {
        this.weatherService.getWeatherData(lat, lon).subscribe(
          (weatherData) => {
            this.weatherData = weatherData;
          },
          (error) => {
            this.errorMessage = "Erreur lors de la récupération des données météo.";
            console.error(error);
          }
        );
      }
    }
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

  onFarmChanged(selectedIndex: number): void {
    this.selectedFarmIndex = selectedIndex;
    this.updateSelectedFarm(selectedIndex);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
