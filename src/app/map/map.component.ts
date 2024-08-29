import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import { Map, MapStyle, config, Marker, LngLatLike } from '@maptiler/sdk';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AddFarmComponent } from '../add-farm/add-farm.component';
import { Farm } from '../models/farm.model';
import {FarmService} from "../services/FarmService";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {
  private map!: Map;
  private subscription: Subscription | undefined;
  private coordinatesToAdd: { lng: number; lat: number } | undefined;
  private dialogRef: MatDialogRef<AddFarmComponent> | undefined;
  sidebarActive = false;

  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;

  constructor(private dialog: MatDialog, private farmService: FarmService) {}

  ngOnInit(): void {
    config.apiKey = 'izk8rTQTThy4px2Bm18C';
  }

  ngAfterViewInit() {
    const initialState = { lng: -6.8361, lat: 34.0209, zoom: 10 };

    this.map = new Map({
      container: this.mapContainer.nativeElement,
      style: MapStyle.STREETS,
      center: [initialState.lng, initialState.lat] as LngLatLike,
      zoom: initialState.zoom,
    });

    this.loadUserFarms();

    this.map.on('click', (event: { lngLat: { lng: any; lat: any } }) => {
      if (event.lngLat) {
        this.coordinatesToAdd = { lng: event.lngLat.lng, lat: event.lngLat.lat };
        this.openDialog();
      }
    });
  }

  loadUserFarms(): void {
    this.subscription = this.farmService.getFarmsByUser().subscribe(farms => {
      farms.forEach(farm => {
        new Marker({ color: '#00FF00' })
          .setLngLat([farm.longitude, farm.latitude] as LngLatLike)
          .addTo(this.map);
      });
    });
  }

  openDialog(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    }

    if (this.coordinatesToAdd) {
      this.dialogRef = this.dialog.open(AddFarmComponent, {
        data: this.coordinatesToAdd,
        width: '480px'
      });

      this.dialogRef.afterClosed().subscribe(result => {
        if (result && this.map) {
          const newMarker = new Marker({ color: '#00FF00' })
            .setLngLat([result.longitude, result.latitude] as LngLatLike)
            .addTo(this.map);
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.map?.remove();
  }
}
