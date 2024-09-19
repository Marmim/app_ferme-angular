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
import { WeatherForecastComponent } from './weather-forecast/weather-forecast.component';
import { SelectedFarmComponent } from './selected-farm/selected-farm.component';
import { WeathercardsComponent } from './weathercards/weathercards.component';
import {ChartjsComponent} from "@coreui/angular-chartjs";
import { WeatherChartComponent } from './weather-chart/weather-chart.component';
import { CertifiedWeatherComponent } from './certified-weather/certified-weather.component';
import { EditFarmComponent } from './edit-farm/edit-farm.component';
import { ConfirmDeleteComponent } from './confirm-delete/confirm-delete.component';
import { CurrentweathercardsComponent } from './currentweathercards/currentweathercards.component';
import {WeatherAgroComponent} from "./weather-agre/weather-agre.component";


const routes: Routes = [
  { path: '', component: MapComponent },
  { path: 'map', component: MapComponent },
  { path: 'login', component: LoginComponent},
  { path: 'inscription', component: RegisterComponent},
  { path: 'weather-forecast', component: WeatherForecastComponent },
  { path: 'certified-weather', component: CertifiedWeatherComponent },
  { path: 'weather-agre', component: WeatherAgroComponent }







];

@NgModule({
  declarations: [
    AppComponent,
    CustomHeaderComponent,
    MapComponent,
    AddFarmComponent,
    RegisterComponent,
    LayoutComponent,
    WeatherForecastComponent,
    WeathercardsComponent,
    WeatherChartComponent,
    CertifiedWeatherComponent,
    ConfirmDeleteComponent,
    CurrentweathercardsComponent,
    WeatherAgroComponent,




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
    SidebarModule,
    ChartjsComponent,
    SelectedFarmComponent,
    SelectedFarmComponent,
    EditFarmComponent,

  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ],
  exports: [
    SelectedFarmComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
