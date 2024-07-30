import { Component } from '@angular/core';
import {items} from "./_nav";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  protected readonly items = items;
}
