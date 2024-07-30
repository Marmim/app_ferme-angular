// app.component.ts
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddFarmComponent } from './add-farm/add-farm.component';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app-ferme';


}
