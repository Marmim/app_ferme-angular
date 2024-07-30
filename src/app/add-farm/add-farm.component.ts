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
    // Initialize the form group
    this.farmForm = this.fb.group({
        nom: ['', Validators.required],
        region: ['', Validators.required],
        commune: ['', Validators.required],
        douar: ['', Validators.required],
        longitude: ['', [Validators.required,]],
        latitude: ['', [Validators.required]],
        cultures: [[], Validators.required],
        cultureCoefficient: ['', Validators.required]
      });
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
    const farm: Farm = this.farmForm.value;
    const c= farm.cultures.map(culture => ({
      nom:culture,
      cultureCoefficient:0
    }));
    const modified={...farm,cultures:c}
    console.log(modified)
    this.farmService.addFarm(modified).subscribe();
    this.dialogRef.close(farm);
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
