import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { Farm } from '../models/farm.model';
import { Subscription } from 'rxjs';
import { FarmService } from '../services/FarmService';
import * as bootstrap from 'bootstrap';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-weather-agre',
  templateUrl: './weather-agre.component.html',
  styleUrls: ['./weather-agre.component.scss']
})
export class WeatherAgroComponent implements OnInit, OnDestroy {
  canopy = 70;
  farms: Farm[] | undefined;
  selectedFarmIndex = 0;
  selectedFarm: Farm | undefined;
  selectedDayIndex: number = 0;
  noFarmsMessage: string | null = null;
  form = new FormGroup({
    selectedFarm: new FormControl<Farm | null>(null),
    canopy: new FormControl<number | null>(null),
  });

  crops = [
    {
      name: 'Citrus',
      et0: [3.51, 3.52, 3.53, 3.54, 3.55, 3.56, 3.57],
      canopy: [
        {
          value: 70,
          kc: [0,6, 0,6, 0,6, 0,6, 0,6, 0,6, 0.6],
        },
        {
          value: 50,
          kc: [0,7, 0,7, 0,7, 0,7, 0,7, 0,7, 0.7],
        }
      ]
    },
    {
      name: 'Maïs',
      canopy: [
        {
          value: -1,
          kc: [0,7, 0,7, 0,7, 0,7, 0,7, 0,7, 0.7],
        }
      ],
      et0: [3.59, 3.59, 3.59, 3.59, 3.59, 3.59, 3.59]
    },
    {
      name: 'Carottes',
      canopy: [
        {
          value: -1,
          kc: [0,7, 0,7, 0,7, 0,7, 0,7, 0,7, 0.7],
        }
      ],
      et0: [3.59, 3.59, 3.59, 3.59, 3.59, 3.59, 3.59]
    },
  ];

  selectedCrop = this.crops[0];

  private subscription: Subscription | undefined;

  constructor(
    private farmService: FarmService,
    private renderer: Renderer2
  ) {
  }

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
