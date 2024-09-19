import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { Farm, Modified } from '../models/farm.model';
import { Subscription } from 'rxjs';
import { FarmService } from '../services/FarmService';
import * as bootstrap from 'bootstrap';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-weather-agre',
  templateUrl: './weather-agre.component.html',
  styleUrls: ['./weather-agre.component.scss']
})
export class WeatherAgreComponent implements OnInit, OnDestroy {

  farms: Modified[] | undefined;
  selectedFarmIndex = 0;
  selectedFarm: Modified | undefined;
  selectedDayIndex: number = 0;
  noFarmsMessage: string | null = null;
  form = new FormGroup({
    selectedFarm: new FormControl<Farm | null>(null),
    canopy: new FormControl<number | null>(null),
  });

  private subscription: Subscription | undefined;

  constructor(
    private farmService: FarmService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.subscription = this.farmService.getFarmsByUser().subscribe(farms => {
      this.farms = farms;
      this.checkIfFarmsExist();
      this.updateSelectedFarm(this.selectedFarmIndex);
    });
  }

  checkIfFarmsExist(): void {
    if (!this.farms || this.farms.length === 0) {
      this.noFarmsMessage = "Aucune ferme ajoutée";
      this.selectedFarm = undefined;

      const modalElement = this.renderer.selectRootElement('#noFarmsModal', true);
      const modal = new bootstrap.Modal(modalElement, { keyboard: false });
      modal.show();
    } else {
      this.noFarmsMessage = null;
    }
  }



  onFarmChanged(selectedIndex: number): void {
    this.selectedFarmIndex = selectedIndex;
    this.updateSelectedFarm(selectedIndex);
  }

  updateSelectedFarm(index: number): void {
    if (this.farms && this.farms.length > index) {
      this.selectedFarm = this.farms[index];
      this.noFarmsMessage = null;
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
