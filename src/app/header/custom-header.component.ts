import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Router} from "@angular/router";
import {SecurityService} from "../services/SecurityService";

@Component({
  selector: 'app-header',
  templateUrl: './custom-header.component.html',
  styleUrls: ['./custom-header.component.scss']
})
export class CustomHeaderComponent {
  @Input() sidebarId = 'sidebar';
}
