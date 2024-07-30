import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { HttpClientModule} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatSidenavComponent } from './mat-sidenav/mat-sidenav.component';
import {NgOptimizedImage} from "@angular/common";
import { MapComponent } from './map/map.component';
import {RouterModule, Routes} from '@angular/router';
import { AddFarmComponent } from './add-farm/add-farm.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule} from "@angular/material/dialog";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatInputModule} from "@angular/material/input";
import {LoginComponent} from "./login/login.component";
import { RegisterComponent } from './register/register.component';
import {
  ContainerComponent,
  HeaderComponent,
  HeaderNavComponent, HeaderTogglerDirective,
  NavItemComponent,
  NavLinkDirective, SidebarBrandComponent, SidebarComponent, SidebarModule, SidebarNavComponent, SidebarToggleDirective
} from "@coreui/angular";
import {CustomHeaderComponent} from "./header/custom-header.component";
import {IconDirective} from "@coreui/icons-angular";
import { LayoutComponent } from './layout/layout.component';


const routes: Routes = [
  { path: '', component: MatSidenavComponent },
  { path: 'map', component: MapComponent },
  { path: 'login', component: LoginComponent}

];

@NgModule({
  declarations: [
    AppComponent,
    MatSidenavComponent,
    CustomHeaderComponent,
    MapComponent,
    AddFarmComponent,
    RegisterComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    MatDialogModule,
    AppRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    BrowserAnimationsModule,
    NgOptimizedImage,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    MatInputModule,
    LoginComponent,
    HeaderComponent,
    ContainerComponent,
    NavItemComponent,
    NavLinkDirective,
    HeaderNavComponent,
    HeaderTogglerDirective,
    IconDirective,
    SidebarModule
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
