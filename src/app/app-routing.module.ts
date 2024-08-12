import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MapComponent} from "./map/map.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {WeatherForecastComponent} from "./weather-forecast/weather-forecast.component";

const routes: Routes = [
  { path: '', component:LoginComponent },
  { path: 'map', component: MapComponent },
  { path: 'login', component: LoginComponent },
  { path: 'inscription', component: RegisterComponent },
  { path: 'weather-forecast', component: WeatherForecastComponent },



];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
