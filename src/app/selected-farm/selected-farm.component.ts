import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import { Farm } from "../models/farm.model";
import {FormsModule} from "@angular/forms";
import {DecimalPipe, NgForOf, NgIf} from "@angular/common";
import {CropConcatPipePipe} from "./CropConcatPipe.pipe";

@Component({
  selector: 'app-selected-farm',
  templateUrl: './selected-farm.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    DecimalPipe,
    CropConcatPipePipe,
  ],
  styleUrls: ['./selected-farm.component.scss']
})
export class SelectedFarmComponent {
  @Input() farms: Farm[] | undefined;
  @Input() selectedFarmIndex = 0;
  @Input() selectedFarm: Farm | undefined;
  @Input() noFarmsMessage: string | null = null;
  @Output() farmChanged = new EventEmitter<number>();

  onFarmChanged(selectedIndex: number): void {
    this.farmChanged.emit(selectedIndex);
  }

  cropsDescription() {
    return this.selectedFarm?.cultures.map((cultures) => cultures.nom).join(', ');
  }
}
