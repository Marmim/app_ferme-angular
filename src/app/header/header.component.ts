import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Router} from "@angular/router";
import {SecurityService} from "../services/SecurityService";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent
{
  @Input() sidebarActive=false;
  @Output() toggleSidebar= new EventEmitter();
  constructor(private securityService: SecurityService, private router: Router) { }

logout() {

      this.router.navigateByUrl('/login').then(r => console.log(r));
    }

}
