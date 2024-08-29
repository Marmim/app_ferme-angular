import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {SecurityService} from "../services/SecurityService";
import {User} from "../models/User";

@Component({
  selector: 'app-header',
  templateUrl: './custom-header.component.html',
  styleUrls: ['./custom-header.component.scss']
})
export class CustomHeaderComponent  implements OnInit{
  username: string | null = null;
  @Input() sidebarId = 'sidebar';
  constructor(
    private securityService: SecurityService,
  ) { }

  ngOnInit(): void {
    this.username = this.securityService.getUsername();
  }

  handleLogout(): void {
    this.securityService.logout();
  }
}
