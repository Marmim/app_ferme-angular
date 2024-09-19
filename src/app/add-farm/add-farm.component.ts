import { Component, Inject, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FarmService } from "../services/FarmService";
import {Farm} from "../models/farm.model";

@Component({
  selector: 'app-add-farm',
  templateUrl: './add-farm.component.html',
  styleUrls: ['./add-farm.component.scss']
})
export class AddFarmComponent implements OnInit {
  farmForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddFarmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { lng: number; lat: number },
    public farmService: FarmService
  ) {
    this.farmForm = this.fb.group({
        nom: ['', Validators.required],
        region: ['', Validators.required],
        commune: ['', Validators.required],
        douar: ['', Validators.required],
        longitude: ['', [Validators.required,]],
        latitude: ['', [Validators.required]],
         cultures: this.fb.array([], Validators.required),

      });
  }
  // Getter pour accéder au FormArray des cultures
  get cultures(): FormArray {
    return this.farmForm.get('cultures') as FormArray;
  }

  // Fonction pour créer un FormGroup pour chaque culture
  createCultureGroup(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      semis: ['', Validators.required]
    });
  }

  addCulture(): void {
    this.cultures.push(this.createCultureGroup());
  }


  ngOnInit(): void {
    if (this.data) {
      this.farmForm.patchValue({
        longitude: this.data.lng,
        latitude: this.data.lat
      });
    }
  }

  onSubmit() {
    if (this.farmForm.valid) {

      const farm: Farm = this.farmForm.value;
      const c = farm.cultures.map(culture => ({
        nom: culture.nom,
        cultureCoefficient: 0,
        dateSemis: new Date()
      }));
      const modified = {...farm, cultures: c}
      this.farmService.addFarm(modified).subscribe();
      this.dialogRef.close(farm);
    } else {
      this.farmForm.markAllAsTouched();
    }
  }
  onClose(): void {
    this.dialogRef.close();
  }

  protected regions = [
    'Rabat - Salé - Kénitra',
    'Casablanca - Settat',
    'Marrakech - Safi',
  ];
  protected communes = [
    { name: 'Rabat', region: 'Rabat - Salé - Kénitra' },
    { name: 'Témara', region: 'Rabat - Salé - Kénitra' },
    { name: 'Kénitra', region: 'Rabat - Salé - Kénitra' },
    { name: 'Ben Slimae', region: 'Casablance - Settat' },
    { name: 'Berrechid', region: 'Casablance - Settat' },
    { name: 'El Jadida', region: 'Casablance - Settat' },
    { name: 'Mohammedia', region: 'Casablance - Settat' },
  ];

  protected douars = [
    { name: 'Douar 1', commune: 'Rabat' },
    { name: 'Douar 2', commune: 'Témara' },
    { name: 'Douar 3', commune: 'Kénitra' },
    { name: 'Douar 4', commune: 'Berrechid' },
    { name: 'Douar 5', commune: 'El Jadida' },
    { name: 'Douar 6', commune: 'Mohammedia' },
  ];
}
