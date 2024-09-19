import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatDialogModule} from '@angular/material/dialog';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';
import {Farm} from "../models/farm.model";
import {FarmService} from "../services/FarmService";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms"; // Assurez-vous que le chemin est correct

@Component({
  selector: 'app-edit-farm',
  templateUrl: './edit-farm.component.html',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    FormsModule
  ],
  styleUrls: ['./edit-farm.component.scss']
})
export class EditFarmComponent {
  farm: Farm;

  constructor(
    public dialogRef: MatDialogRef<EditFarmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Farm,
    private farmService: FarmService,
    private dialog: MatDialog
  ) {
    this.farm = { ...data };
  }

  onSubmit() {

        this.dialogRef.close(true);
  }

  get culturesString(): string {
    return this.farm.cultures.map(culture => culture.nom,).join(', ');
  }

  set culturesString(value: string) {
    this.farm.cultures = value.split(',').map(name => ({
      nom: name.trim(),
      cultureCoefficient: 0,
      dateSemis: new Date()
    }));
  }

  openConfirmDeleteDialog() {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '400px',
      data: { nomFerme: this.farm.nom }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteFarm();
        window.location.reload();

      }
    });
  }

  deleteFarm() {
    this.farmService.deleteFarmById(this.farm.id!).subscribe(
      () => {
        console.log('Ferme supprimée : ', this.farm.nom);
        this.dialogRef.close();
      },

        (error: any) => {
        console.error('Erreur lors de la suppression de la ferme : ', error);
      }
    );
  }
  updateFarm() {
    this.farmService.updateFarm(this.farm.id, this.farm).subscribe(
      updatedFarm => {
        console.log('Farm updated:', updatedFarm);
        this.dialogRef.close(true);
        window.location.reload();
      },
      error => {
        console.error('Error updating farm:', error);
      }
    );
  }

}
