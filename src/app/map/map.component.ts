import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Map, MapStyle, config, Marker, LngLatLike } from '@maptiler/sdk';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AddFarmComponent } from '../add-farm/add-farm.component';
import { Farm } from '../models/farm.model';
import { FarmService } from "../services/FarmService";
import { marker } from "leaflet";
import { EditFarmComponent } from "../edit-farm/edit-farm.component";
import { ConfirmDeleteComponent } from "../confirm-delete/confirm-delete.component";

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

    // Ajout d'un événement de clic pour la carte
    this.map.on('click', (event: { lngLat: { lng: any; lat: any }; originalEvent: MouseEvent  }) => {
      if (event.lngLat) {
        // Assurez-vous que le clic n'a pas été fait sur un marqueur
        if (!event.originalEvent.defaultPrevented) {
          this.coordinatesToAdd = { lng: event.lngLat.lng, lat: event.lngLat.lat };
          this.openDialog();
        }
      }
    });
  }

  loadUserFarms(): void {
    this.subscription = this.farmService.getFarmsByUser().subscribe(farms => {
      farms.forEach(farm => {
        const markerElement = document.createElement('img');
        markerElement.src = 'https://docs.mapbox.com/help/demos/custom-markers-gl-js/mapbox-icon.png'; // URL de l'icône de marqueur
        markerElement.style.width = '30px';
        markerElement.style.height = '40px';

        const marker = new Marker({ element: markerElement })
          .setLngLat([farm.longitude, farm.latitude] as LngLatLike)
          .addTo(this.map);

        // Clic gauche pour modifier
        markerElement.addEventListener('click', (event: MouseEvent) => {
          event.stopPropagation();
          this.openEditFarmDialog(farm);
        });

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

  openEditFarmDialog(farm: Farm): void {
    const dialogRef = this.dialog.open(EditFarmComponent, {
      width: '480px',
      data: farm
    });
  }

  locateUser(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          this.map.setCenter([lng, lat] as LngLatLike);
          this.map.setZoom(15);

          const userMarker = new Marker({ color: '#11ff00' })
            .setLngLat([lng, lat] as LngLatLike)
            .addTo(this.map);

        },
        error => {
          console.error("Erreur de géolocalisation : ", error);
          alert("Impossible de récupérer la position actuelle.");
        }
      );
    } else {
      alert("La géolocalisation n'est pas supportée par votre navigateur.");
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.map?.remove();
  }
}
