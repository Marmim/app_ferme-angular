import { Component } from '@angular/core';
import { iconSubset } from './icons/icon-subset';
import {IconSetService} from "@coreui/icons-angular";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Erchadata';

  constructor(private iconSetService: IconSetService) {
    iconSetService.icons = { ...iconSubset };
  }
}
