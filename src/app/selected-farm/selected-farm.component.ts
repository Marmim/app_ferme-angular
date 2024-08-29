import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import {Culture, Farm, Modified} from "../models/farm.model";
import { Subscription } from "rxjs";
import { FarmService } from "../services/FarmService";

@Component({
  selector: 'app-selected-farm',
  templateUrl: './selected-farm.component.html',
  styleUrls: ['./selected-farm.component.scss']
})
export class SelectedFarmComponent implements OnInit, OnDestroy {
  @Input() farms: Modified[] | undefined;
  @Input() selectedFarmIndex = 0;
  @Output() selected = new EventEmitter<number>();

  private subscription: Subscription | undefined;

  selectedFarm: Modified | undefined;

  constructor(private farmService: FarmService) {}

  ngOnInit(): void {
    this.subscription = this.farmService.getFarmsByUser().subscribe(farms => {
      this.farms = farms;
      this.updateSelectedFarm(this.selectedFarmIndex);
    });
  }

  onFarmChanged(selectedIndex: number): void {
    this.selectedFarmIndex = selectedIndex;
    this.updateSelectedFarm(selectedIndex);
    this.selected.emit(selectedIndex);
  }

  updateSelectedFarm(index: number): void {
    if (this.farms && this.farms.length > index) {
      this.selectedFarm = this.farms[index];
      console.log(this.farms[index])

    }
  }
  cropsDescription() {
    return this.selectedFarm?.cultures.map((cultures) => cultures.nom).join(', ');
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
