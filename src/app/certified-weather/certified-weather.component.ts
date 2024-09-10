import {Component, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {Modified} from "../models/farm.model";
import {Subscription} from "rxjs";
import {FarmService} from "../services/FarmService";
import * as bootstrap from 'bootstrap';


@Component({
  selector: 'app-certified-weather',
  templateUrl: './certified-weather.component.html',
  styleUrls: ['./certified-weather.component.scss']
})
export class CertifiedWeatherComponent implements OnInit, OnDestroy  {
  farms: Modified[] | undefined;
  selectedFarmIndex = 0;
  selectedFarm: Modified | undefined;
  selectedDayIndex: number = 0;
  noFarmsMessage: string | null = null;


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


updateSelectedFarm(index: number): void {
  if (this.farms && this.farms.length > index) {
  this.selectedFarm = this.farms[index];
  this.noFarmsMessage = null;

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
  }


}
